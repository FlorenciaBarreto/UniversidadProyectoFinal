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


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET LISTA DE ASIGNATURAS POR GRADO
async function getListaDeAsignaturasPorGrado(idGrado){
  let sql = "SELECT id, nombre FROM asignatura where id_grado=" + idGrado + ";";

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//POST ALUMNO_SE_MATRICULA
async function matricularAlumno(datos) {
  let sql = 'INSERT INTO alumno_se_matricula_asignatura (id_alumno, id_asignatura, id_curso_escolar) VALUES ("' + datos.idAlumno + '", "' + datos.idAsignatura + '", "' + datos.idCurso + '")';

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}

















//Funciones a exportar
module.exports = {
  getListaDeGrados,
  getListaDeAsignaturasPorGrado,
  matricularAlumno
  }