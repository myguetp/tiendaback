'use strict'

const express = require('express');
let productoController = require('../controllers/ProductoController');

let api = express.Router();
let auth = require('../middlewares/authenticate');
//guardar la imagen
let multiparty = require('connect-multiparty');
let path = multiparty({uploadDir: './uploads/productos'})

/*PRODUCTO */
//registrar
api.post('/registo_producto_admin',[auth.auth,path],productoController.registo_producto_admin);
//listar
api.get('/listar_productos_admin/:filtro?',auth.auth,productoController.listar_productos_admin);
//mostrar imagen (es publico por eso no tiene el auth)
api.get('/obtener_portada/:img',productoController.obtener_portada);
//obtener el producto
api.get('/obtener_producto_admin/:id',auth.auth,productoController.obtener_producto_admin);
//actualizar el producto
api.put('/actualizar_producto_admin/:id',[auth.auth,path],productoController.actualizar_producto_admin);
//eliminar el producto
api.delete('/eliminar_producto_admin/:id',auth.auth,productoController.eliminar_producto_admin);


/*LISTAR PRODUCTO*/
//listar
api.get('/listar_inventario_producto_admin/:id',auth.auth,productoController.listar_inventario_producto_admin)
//eliminar
api.delete('/eliminar_inventario_producto_admin/:id',auth.auth,productoController.eliminar_inventario_producto_admin);
//registro
api.post('/registro_inventario_producto_admin',auth.auth,productoController.registro_inventario_producto_admin)

module.exports = api;   