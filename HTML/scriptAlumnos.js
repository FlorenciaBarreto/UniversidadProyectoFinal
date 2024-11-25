window.onload = function() {
    agarrarValores();
};

let queryString, botonBuscar, tablaAlumnos, tablaAsignaturas, noResultsMessage, noResultsAlumnos;

 

function agarrarValores(){    
    tablaAsignaturas = document.getElementById('asignaturas-container');
    tablaAlumnos = document.getElementById('alumnos-container');
    noResultsMessage = document.getElementById('no-asignaturas');
    resultadosAlumnos = document.getElementById('resultados-alumnos');
    resultadosAsignaturas = document.getElementById('resultados-asignaturas');
    noResultsAlumnos = document.getElementById('no-alumnos');    
}


function buscarAlumnos(){
    let identificador = document.getElementById('identificador').value.trim();
    let nombre = document.getElementById('nombre').value.trim();
    tablaAsignaturas.style.display = 'none'; 
    
    //creo que JSON con los datos que ingresen
    let buscarObjeto={};
    if(identificador){
        buscarObjeto={"identificador": identificador};
    } else if(nombre){
        buscarObjeto={"nombre": nombre};
    } else {
        alert("Por favor, ingresa un valor para buscar.");
        return;
    }

    // Crear una cadena de parámetros de URL (query string)
    queryString = new URLSearchParams(buscarObjeto).toString();
    
    let url="http://localhost:3000/alumnos/identificador?";

    if(queryString){
        url += queryString;

        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}).then(
            response=>{
                console.log("lo que sigue es response");
                console.log(response);
                if(response.status==404 || response.status==501){                  
                    // Ocultar la tabla de resultados y mostrar el p
                    tablaAlumnos.style.display = 'none';                    
                    noResultsAlumnos.style.display = 'block';                    
                } else {
                    //Mostrar tabla de resultados y ocultar el p
                    tablaAlumnos.style.display = 'table';
                    noResultsAlumnos.style.display = 'none';
                }            
                return response.json();    
            }           
        ).then(
            data=>{
                if(data.info != undefined){
                    console.log("lo que sigue es data");
                    console.log(data);

                    if(data.info.length>0){
                        //relleno la tabla de alumnos con la info del alumno
                        let out="";
                        for(let item of data.info){                            
                            out += '<tr onclick="buscarAsignaturas(' + item.id + ')">';
                            for(let value of Object.values(item)){
                                out += '<td>' + value + '</td>';
                            }
                            out += '</tr>';
                        }
                        resultadosAlumnos.innerHTML=out;
                    }
                }   
            }
        ).catch(error=>{
            console.error("error al filtrar alumnos: " + error);           
        })
    }
}


//Buscar lista de asignaturas en las que está inscripto
function buscarAsignaturas(id){
    let url="http://localhost:3000/alumnos/asignaturas?id="+id;

    fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}).then(
        response =>{
            console.log("lo que sigue es response");
            console.log(response);
            
            if(response.status==404 || response.status==501){                  
                // Ocultar la tabla de resultados y mostrar el p
                tablaAsignaturas.style.display = 'none';                    
                noResultsMessage.style.display = 'block';                    
            } else {
                //Mostrar tabla de resultados y ocultar el p
                tablaAsignaturas.style.display = 'table';
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
                    //relleno la tabla de asignaturas con la info del alumno
                    let out="";
                    for(let item of data.info){                            
                        out += '<tr>';
                        for(let value of Object.values(item)){
                            out += '<td>' + value + '</td>';
                        }
                        out += '</tr>';
                    }
                    resultadosAsignaturas.innerHTML=out;
                }
            } 
        }
    ).catch(error=>{
        console.error("error al filtrar alumnos: " + error);           
    })
}