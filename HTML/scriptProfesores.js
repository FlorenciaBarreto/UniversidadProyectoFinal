window.onload = fullList();



window.ondblclick = function(){
    formulario = document.getElementById("filter-form");

    formulario.addEventListener("submit", function(e){
    alert("Le diste a submit");
    e.preventDefault();    
})
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺                 

//GET LISTA DE PROFESORES
function fullList(){        
    const url= "http://localhost:3000/profesores";

    fetch(url, {method:'GET'}).then(
        response => { 
            console.log(response);
            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            const arrayProfesores = data.info;
            rellenarTabla(arrayProfesores);
        }
    ).catch(error=>{
        console.error("Error al buscar la lista de profesores: " + error);
    })   
}



//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺              
//FUNCION RELLENAR TABLA

function rellenarTabla(data){                                               //data es un array
    let table = document.getElementById("resultados-profesores");
    table.innerHTML="";

    let out="";
    for(let item of data){
        out += '<tr>';

        for (let value of Object.values(item)){
            out += '<td>' + value + '</td>';
        }      

        out += '</tr>';
    }

    table.innerHTML=out;
}