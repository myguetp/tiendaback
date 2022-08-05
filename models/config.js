'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//campos de la tabla (modelo administradores)
let ConfigSchema = Schema({
    categorias:[{type:Object, required: true}],
    titulo:{type:String, required: true},  
    logo:{type:String, required: true},
    serie:{type:String, required: true},
    correlativo:{type:String, required: true},  
});

//exportar modelo
module.exports = mongoose.model('config', ConfigSchema);