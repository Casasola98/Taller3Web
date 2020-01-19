const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/usuarios', async (req, res) => {
    try {
        let usuarios = await DB.default.usuarios.all();
        res.json(usuarios);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/puntos', urlencodedParser, async (req, res) => {
    try {
        let puntos = await DB.default.puntos.allPuntos(req.body.rutaS);
        res.json(puntos);
    }
    catch (e) {
        console.log(e);
        res.send({ result: false, message: "Invalid username or password" })
    }
});


router.get('/rutas', async (req, res) => {
    try {
        let rutas = {}
        rutas = await DB.default.rutas.all();
        res.json(rutas);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/favoritas/:id_usuario', async (req, res) => {
    try {
        let rutas = {}
        if (req.params.id_usuario) {
            console.log(req.params.id_usuario);
            rutas = await DB.default.rutas.favoritas(req.params.id_usuario); //rutas favoritas
            res.json(rutas);
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/categorias', async (req, res) => {
    try {
        let categorias = await DB.default.rutas.categorias(); //Categorias
        console.log(categorias);
        res.json(categorias);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/notificaciones/:id', async (req, res) => {
    try {
        let dbResult = await DB.default.notificaciones.all(req.params.id);
        res.send(dbResult);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/notificaciones', urlencodedParser, async (req, res) => {
    try {
        if (req.body.read) {
            //Read notifications if body includes it
            try {
                let dbResult = await DB.default.notificaciones.all(req.body.id_usuario);
                res.send(dbResult);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }
        let dbResult = await DB.default.notificaciones.insert(req.body.id_usuario, req.body.mensaje);
        res.send(req.body.usuario);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;