'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//campos de la tabla (modelo cupones)
let CuponSchema = Schema({
    codigo:{type: String, required: true},
    tipo:{type: String, required: true}, //porcentaje Precio fijo
    valor:{type: Number, required: true},
    limite:{type:Number, required: true},
    createdAt: {type:Date, default: Date.now, require: true}    
});

//exportar modelo
module.exports = mongoose.model('cupon', CuponSchema);
