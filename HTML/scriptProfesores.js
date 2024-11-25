window.onload = function() {
    fullList();
    frenarSubmit();
    rellenarDepartamentos();    
  };

let formulario, queryString, formData, formObject;


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//FRENAR EL SUBMIT PARA NO PERDER LA INFO
function frenarSubmit(){
    formulario = document.getElementById("filter-form");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        // Crear un objeto FormData con los datos del formulario
        formData = new FormData(this);

        // Convertir FormData a un objeto
        formObject = convertToJson(formData);
        
        // Crear una cadena de parámetros de URL (query string)
        queryString = new URLSearchParams(formObject).toString();
        
        //aplicar el filtro de profesores
        filtrarProfesores();    
    })
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//CONVERT TO JSON
function convertToJson(formData){
    let jsonObject={};
    formData.forEach((value,key)=>{
        // Solo agregar campos que no estén vacíos
        if(value.trim() !== ""){
            jsonObject[key]=value;
        }        
    });
    console.log(jsonObject);
    return jsonObject;
}



//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺      
//GET LISTA DE PROFESORES
function fullList(){   
    let url = "http://localhost:3000/profesores";    
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


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺              
//FUNCION RELLENAR EL SELECT DE DEPARTAMENTOS

function rellenarDepartamentos(){
    const url= "http://localhost:3000/profesores/departamentos/";

    fetch(url, {method:'GET'}).then(
        response => { 
            console.log(response);
            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            const arrayDepartamentos = data.info;

            let desplegable = document.getElementById("departamento");
            desplegable.innerHTML="";

            let out = '<option value="">Seleccione</option>';

            for(let item of arrayDepartamentos){
                
                for (let value of Object.values(item)){
                    out += '<option>' + value + '</option>';                            
                }
            }

            desplegable.innerHTML = out;            
        }
    ).catch(error=>{
        console.error("Error al buscar la lista de departamentos: " + error);
    })      
}



//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//FILTRAR PROFESORES SEGUN LO QUE SE INGRESE EN EL FORMULARIO
function filtrarProfesores(){
    let datos = new FormData(formulario);
    const tabla = document.getElementById('professors-table');
    const noResultsMessage = document.getElementById('no-results');

    let url = "http://localhost:3000/profesores/filtro?" + queryString;

    if(queryString){
        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}).then(
            response=>{
                console.log("lo que sigue es response");
                console.log(response);
                if(response.status==404){                  
                    // Ocultar la tabla de resultados y mostrar el p
                    tabla.style.display = 'none';
                    noResultsMessage.style.display = 'block';                    
                } else {
                    //Mostrar tabla de resultados y ocultar el p
                    tabla.style.display = 'table';
                    noResultsMessage.style.display = 'none';
                } 
                return response.json();    
            }           
        ).then(           
            data=>{
                if(data.info != undefined){
                    console.log("lo que sigue es data");
                    console.log(data);
                
                    if(data.info.length>0){
                         rellenarTabla(data.info);
                    } 
                }                                
                
            }
        ).catch(error=>{
            console.error("error al filtrar profesores: " + error);           
        })
    }

    formulario.reset();    
}