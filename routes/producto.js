'use strict'

const express = require('express');
let productoController = require('../controllers/ProductoController');

let api = express.Router();
let auth = require('../middlewares/authenticate');
//guardar la imagen
let multiparty = require('connect-multiparty');
let path = multiparty({uploadDir: './uploads/productos'})

//registrar
api.post('/registo_producto_admin',[auth.auth,path],productoController.registo_producto_admin);
//listar
api.get('/listar_productos_admin',[auth.auth],productoController.listar_productos_admin);

module.exports = api;   