window.onload = function() {
    agarrarValores();
    listaGrados();
    tablaAsignaturas.style.display='none';
};


let queryString, desplegable, tablaAsignaturas, resultadosAsignaturas, noResults, tituloTabla; 

function agarrarValores(){    
    desplegable = document.getElementById('grado');
    tablaAsignaturas = document.getElementById('asignaturas-container');
    noResults = document.getElementById('no-asignaturas');
    resultadosAsignaturas = document.getElementById('resultados-asignaturas');
    tituloTabla = document.getElementById('asignaturas-table');
}



function listaGrados(){
    const url= "http://localhost:3000/cursos/grados";

    fetch(url, {method:'GET'}).then(
        response => { 
            console.log(response);
            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            const arrayGrados = data.info;

            desplegable.innerHTML="";

            let out = '<option value=""> -- Seleccione -- </option>';

            for(let item of arrayGrados){
                    out += '<option value="'+item.id+'">'+item.nombre+'</option>';                            
            }

            desplegable.innerHTML = out;            
        }
    ).catch(error=>{
        console.error("Error al buscar la lista de grados: " + error);
    })  
}


function listaAsignaturas(){

    const id = desplegable.value;

    const url= "http://localhost:3000/cursos/asignaturas?id="+id;

    fetch(url, {method:'GET'}).then(
        response => { 
            console.log(response);
            if(response.status==404 || response.status==501){                  
                // Ocultar la tabla de resultados y mostrar el p
                tablaAsignaturas.style.display = 'none';                    
                tituloTabla.style.display = 'none';                    
                noResults.style.display = 'block';                    
            } else {
                //Mostrar tabla de resultados y ocultar el p
                tablaAsignaturas.style.display = 'table';
                tituloTabla.style.display = 'table';
                noResults.style.display = 'none';
            }  


            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            const arrayAsignaturas = data.info;
            if(arrayAsignaturas != undefined){
                tablaAsignaturas.style.display='table';
                tituloTabla.style.display = 'table';
    
                resultadosAsignaturas.innerHTML="";
    
                let out = '';
    
                for(let item of arrayAsignaturas){
                    out += '<tr>';
                    for (let value of Object.values(item)){
                        out += '<td>' + value + '</td>';                            
                    }
                    out += '</tr>';
                }
    
                resultadosAsignaturas.innerHTML = out;            
            }
        }
    )
}