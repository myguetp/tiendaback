'use strict'

const express = require('express');
let cuponController = require('../controllers/CuponController');

let api = express.Router();
let auth = require('../middlewares/authenticate')


api.post('/registro_cupon_admin',auth.auth,cuponController.registro_cupon_admin);


module.exports = api;