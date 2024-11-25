const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET POR ID o NOMBRE a se mostrarán en una tabla a continuación con los campos: Id, NIF, Nombre, Apellido1, Apellido2, Ciudad, Sexo.

async function getAlumnoPorIdentificador(filtro){
  let sql = 'SELECT id, nif, nombre, apellido1, apellido2, ciudad, sexo FROM alumno WHERE ';
  
  if(filtro.identificador != undefined){
    console.debug("length de identif : " + filtro.identificador.length)

    if(filtro.identificador.length==8){
      sql += 'nif LIKE "' + filtro.identificador + '%"';
    } else {
      sql += 'id=' + filtro.identificador;
    }
  } else if(filtro.identificador==undefined && filtro.nombre != undefined){
    sql += 'nombre LIKE "%' + filtro.nombre + '%"';
  }

  sql += ';';     

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}




//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET LISTA DE ASINATURAS  se deben de mostrar los campos: id, Nombre, Créditos, curso y cuatrimestre

async function getAsignaturas(id){
  let sql = 'SELECT a.Id, a.nombre, a.creditos, a.curso, a.cuatrimestre FROM asignatura a JOIN alumno_se_matricula_asignatura m ON a.Id = m.id_asignatura WHERE m.id_alumno = '+ id + ';';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}





module.exports = {
      getAlumnoPorIdentificador,
      getAsignaturas
  }