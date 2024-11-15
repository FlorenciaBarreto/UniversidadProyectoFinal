const express = require("express");
const router = express.Router();

const profesoresService = require("../service/profesoresService");



//GET FULL LIST
router.get("/", async function(req, res){
    let code, msg;    
    try{
        const fullList = await profesoresService.getProfesoresFullList();
        let info=fullList.info;
        code=200;
        msg="Listado de Profesores";
        res.status(200).json({code, msg, info})               //info es un array
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})












module.exports = router;