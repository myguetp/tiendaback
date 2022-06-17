'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//campos de la tabla (modelo administradores)
let AdminSchema = Schema({
    nombres:{type:String, required: true},
    apellidos:{type:String, required: true},  
    email:{type:String, required: true},
    password:{type:String, required: true},
    telefono:{type:String, required: true},   
    rol:{type:String, required: true},
    dni:{type:String, required: true},    
});

//exportar modelo
module.exports = mongoose.model('admin', AdminSchema);