window.onload = function() {
    agarrarValores();
    listaGrados();
};

let desplegable, noResults, listadoAsignaturas, msgFinal;

function agarrarValores(){
    desplegable = document.getElementById('grado');
    noResults = document.getElementById('no-asignaturas');
    listadoAsignaturas = document.getElementById('lista-asignaturas');
    msgFinal = document.getElementById('msgFinal');
}


function listaGrados(){
    const url= "http://localhost:3000/gestion/grados";    

    fetch(url, {method:'GET'}).then(
        response => { 
            console.log(response);
            
            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            const arrayGrados = data.info;
            
            console.debug("esto es arrayGrados" + arrayGrados);
            console.log("esto es arrayGrados" + arrayGrados);

            desplegable.innerHTML="";

            let out = '<option value=""> -- Seleccione -- </option>';

            for(let item of arrayGrados){
                //para sumar el onchange  onchange="buscarAsignaturas(' + item.id + ')"
                out += '<option value="'+item.id+'">' + item.nombre + '</option>';                           
            }

            desplegable.innerHTML = out;            
        }
    ).catch(error=>{
        console.error("Error al buscar la lista de grados: " + error);
    })  
}




function buscarAsignaturas(){
    idGrado=desplegable.value;
    const url= "http://localhost:3000/gestion/asignaturas?id="+idGrado;

    fetch(url, {method:'GET'}).then(
        response => { 
            console.log(response);
            if(response.status==404 || response.status==501){                  
                // mostrar el p y ocultar asignaturas previas si las hubiera 
                listadoAsignaturas.innerHTML="";                    
                noResults.style.display = 'block';             
                msgFinal.style.display = 'none';             
            } else {
                //ocultar el p                
                noResults.style.display = 'none';
            }  
            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            const arrayAsignaturas = data.info;
            if(arrayAsignaturas != undefined){                
    
                listadoAsignaturas.innerHTML="";
    
                let out = '';
    
                for(let item of arrayAsignaturas){
                    out += '<li>';
                    out += '<input type="checkbox" id="' + item.id + '" value="' + item.id + '"><label for="' + item.id + '">' + item.nombre + '</label>';
                    out += '</li>';
                }
    
                listadoAsignaturas.innerHTML = out;            
            }
        }
    ).catch(error=>{
        console.error("Error al buscar la lista de grados: " + error);
    }) 
}




function generarMatricula(){
    let datos = {};
    let idAlumno = document.getElementById('idAlumno').value;
    let idCurso = document.getElementById('anio').value;
    let idAsignatura = [];


    //Agarrar los id de los checkboxes
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Recorrer todos los checkboxes
    checkboxes.forEach((checkbox) => {
        // Si está marcado, añadir el ID al array
        if (checkbox.checked) {
          idAsignatura.push(checkbox.value);
        }
    });

    datos={
        idAlumno: idAlumno,
        idAsignatura: idAsignatura,
        idCurso: idCurso
    }  

    //info pa mi
    console.log("esto es datos " + datos);

    let url = "http://localhost:3000/gestion";

    fetch(url, {method:'POST', body: JSON.stringify(datos), headers: {'Content-Type': 'application/json'}}).then(
        response => { 
            console.log(response);
            return response.json();
        }
    ).then(
        data=>{
            console.log("Esto es data: " + data);
            console.log(data);
            msgFinal.style.display = 'block';
            msgFinal.textContent = JSON.stringify(data.msg);            
        }
    ).catch(error=>{
        console.error("Error al buscar la lista de grados: " + error);
    })   
}