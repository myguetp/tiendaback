'use strict'

const express = require('express');
let configController = require('../controllers/configController');

let api = express.Router();
let auth = require('../middlewares/authenticate');
let multiparty = require('connect-multiparty');
let path = multiparty({uploadDir: './uploads/configuraciones'})

/****REGISTO EN DB 
api.post('/actualiza_cofig_admin',auth.auth,configController.actualiza_cofig_admin);
*/

api.put('/actualiza_cofig_admin/:id',[auth.auth,path],configController.actualiza_cofig_admin);
api.get('/obtener_config_admin',auth.auth,configController.obtener_config_admin);
api.get('/obtener_logo/:img',configController.obtener_logo);

module.exports = api;