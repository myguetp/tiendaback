'use strict'

const express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();

/*metodos o funciones desde controllers*/

//enviar data
api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente);

//obtener data
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?',clienteController.listar_clientes_filtro_admin);


module.exports = api;