const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET LISTA DE LOS DIFERENTES GRADOS QUE HAY EN LA UNIVERSIDAD
async function getListaDeGrados(){
  let sql = 'SELECT * FROM grado;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}



//GET LISTA DE ASIGNATURAS DE UN GRADO QUE LE VAMOS A INDICAR . Mostrar: id, nombre,créditos, curso, cuatrimestre y nombre profesor
async function getListaDeAsignaturasPorGrado(idGrado){
  let sql = "SELECT a.id, a.nombre, a.creditos, a.curso, a.cuatrimestre, p.nombre as 'NombreProfesor', p.apellido1 as 'ApellidoProfesor'  FROM asignatura a LEFT JOIN profesor p ON a.id_profesor=p.id WHERE id_grado=" + idGrado + ";";

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}










//cambiar nombres de las funciones
module.exports = {
    getListaDeGrados,
    getListaDeAsignaturasPorGrado
  }