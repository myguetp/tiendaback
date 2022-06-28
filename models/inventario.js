'use strict'

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//campos de la tabla (modelo inventario)
let InventarioSchema = Schema({
    // en este vinculamos con la tabla o esquema de producto por medio del id
    producto:{type: Schema.ObjectId, ref: 'producto' ,required: true},
    cantidad:{type: Number, require: true},
    // en este vinculamos con la tabla o esquema de admin por medio del id
    admin:{type: Schema.ObjectId, ref: 'admin' ,required: true},
    proveedor:{type: String, require: true},
    createdAt: {type:Date, default: Date.now, require: true}    
});

//exportar modelo
module.exports = mongoose.model('inventario', InventarioSchema);

/*VAMOS A REUTILIZAR EL CONTROLADOR DE PRODUCTO*/
