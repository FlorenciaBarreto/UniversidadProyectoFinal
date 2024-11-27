/**
 * Service Profesores
 * @namespace profesoresService
 */


const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Lista completa de todos los Profesores de la Universidad. 
 * @function getProfesoresFullList
 * @memberof profesoresService
 * @returns {object} Un JSON con el listado de profesores y su información (nif, nombre, apellidos, ciudad, sexo y nombre del departamento).
 */

async function getProfesoresFullList(){
  let sql = 'SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre as "departamento" FROM profesor p LEFT JOIN departamento d ON p.id_departamento=d.id;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Listado de los diferentes Departamentos que hay en la Universidad.
 * @function getListaDeDepartamentos
 * @memberof profesoresService
 * @returns {object} Lista de Departamentos.
 */
async function getListaDeDepartamentos(){
  let sql = 'SELECT DISTINCT nombre AS "Departamento" FROM departamento;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Filtrar profesores por Nombre, Apellido, Sexo y/o Departamento.
 * @function filtrarProfesores
 * @memberof profesoresService
 * @param {object} filtro - Puede contener Nombre, Apellido, Sexo y/o Departamento.
 * @returns {object} Un JSON con el listado de profesores filtrados y su información.
 */
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