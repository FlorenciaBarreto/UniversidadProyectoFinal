const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET ALL   Nif, Nombre, Apellido 1, Apellido 2, Ciudad, Sexo,Nombre Departamento.

async function getProfesoresFullList(){
  let sql = 'Select p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre as "departamento" FROM profesor p LEFT JOIN departamento d ON p.id_departamento=d.id;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}






//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
//GET POR QUERY  Nif, Nombre, Apellido 1, Apellido 2, Ciudad, Sexo, Nombre Departamento.












//cambiar nombres de las funciones
module.exports = {
    getProfesoresFullList
  }