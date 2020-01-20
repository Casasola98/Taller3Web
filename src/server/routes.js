const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended : false});

router.post('/getPuntos', urlencodedParser, async (req , res)=> {
    try{
        console.log(req.body);
        let puntos = await DB.default.puntos.getPuntos(req.body.rutaS);
        res.send({result:true, puntos:puntos});
    }
    catch(e){
        console.log(e);
        res.send({result:false,message:"Invalid username or password"})
    }
});

router.post('/addRuta', urlencodedParser, async (req , res)=> {
    try{
        
        var elJSON = JSON.parse(req.body.elJSON);
        let ruta = await DB.default.rutas.addRuta(req.body.nombre, req.body.descripcion);
        
        for (var point in elJSON){
            console.log(elJSON[point].nombre);
            let puntos = await DB.default.puntos.addPunto(elJSON[point].nombre, elJSON[point].descripP, elJSON[point].latitud, elJSON[point].longitud, req.body.nombre);
        }
        //let ruta = await DB.default.rutas.addRuta(req.body.nombre, req.body.descripcion);
        //let puntos = await DB.default.puntos.addPunto(req.body.rutaS);
        res.send({result:true});
    }
    catch(e){
        console.log(e);
        res.send({result:false,message:"Invalid username or password"})
    }
});

router.get('/rutas', async (req, res) =>{
    try{
        let rutas = await DB.default.rutas.rutas(); //Categorias
        console.log(rutas);
        res.json(rutas);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;