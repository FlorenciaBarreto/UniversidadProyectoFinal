const servidor = "http://localhost:3000/";


const urlProfesores = servidor += "profesores";
const urlAlumnos = servidor += "alumnos";
const urlCursos = servidor += "cursos";
const urlGestion = servidor += "gestion";






//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//CONVERT TO JSON
function convertToJson(formData){
    let jsonObject={};
    formData.forEach((value,key)=>{
        jsonObject[key]=value;
    });

    console.log(jsonObject);
    return jsonObject;
}




export {urlCliente, urlComercial, convertToJson};            //se exportan sólo los nombres, da igual el argumento