'use strict'

const express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();
let auth = require('../middlewares/authenticate')

/*metodos o funciones desde controllers*/

//enviar data
api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente);

//obtener data
api.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth,clienteController.listar_clientes_filtro_admin);
//registrar cliente
api.post('/registro_cliente_admin',auth.auth,clienteController.registro_cliente_admin);
//obtener data id
api.get('/obtener_cliente_admin/:id',auth.auth,clienteController.obtener_cliente_admin);
//actualizar
api.put('/actualizar_cliente_admin/:id',auth.auth,clienteController.actualizar_cliente_admin);



module.exports = api;