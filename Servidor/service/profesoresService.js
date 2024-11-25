const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET ALL   Nif, Nombre, Apellido 1, Apellido 2, Ciudad, Sexo,Nombre Departamento.

async function getProfesoresFullList(){
  let sql = 'SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre as "departamento" FROM profesor p LEFT JOIN departamento d ON p.id_departamento=d.id;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET LISTA DE LOS DIFERENTES DEPARTAMENTOS QUE HAY EN LA UNIVERSIDAD
async function getListaDeDepartamentos(){
  let sql = 'SELECT DISTINCT nombre AS "Departamento" FROM departamento;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET POR Nombre, Apellido 1, Sexo y Departamento.
async function filtrarProfesores(filtro) {
  let sql = 'SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre as "departamento" FROM profesor p LEFT JOIN departamento d ON p.id_departamento=d.id WHERE ';

  let hasPrevious=false;
  
  if(filtro.nombre != undefined){
    sql += 'p.nombre LIKE "%' + filtro.nombre + '%"';    
    hasPrevious=true;
  }

  if(filtro.apellido1 != undefined){
    if(hasPrevious){
      sql += ' OR ';
    }
    sql += 'p.apellido1 LIKE "%' + filtro.apellido1 + '%"';    
    hasPrevious=true;
  }

  if(filtro.sexo != undefined){
    if(hasPrevious){
      sql += ' OR ';
    }
    sql += 'p.sexo="' + filtro.sexo + '"';
    hasPrevious=true;
  }

  if(filtro.departamento != undefined){
    if(hasPrevious){
      sql += ' OR ';
    }
    sql += 'd.nombre LIKE "%' + filtro.departamento + '%"';
  }

  sql += ';';

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}





module.exports = {
    getProfesoresFullList,
    getListaDeDepartamentos,
    filtrarProfesores
  }