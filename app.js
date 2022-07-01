'use strict'

const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

//inicializacion de rutas para que funcionen
let cliente_route = require('./routes/cliente');
let admin_route = require('./routes/admin');
let producto_route = require('./routes/producto');
let cupon_route = require('./routes/cupon')

/*Conexion al puerto*/
let port = process.env.PORT || 9000;

/*Conectar a base de datos*/
//Ruta de Conexion
mongoose.connect('mongodb://127.0.0.1:27017/tienda',(err, res)=>{
    //verificar si existe error o no
    if(err){
        //existe error
        console.log(err)
    }else{
        //conexion exitosa
        console.log('Servidor correcto')
        //Escuchar el puerto
        app.listen(port,function(){
            console.log(`servidor corriendo puerto ${port}`);
        });
    }
});

//parsear la data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));


//Permiso de conexion entre front y back
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//ruta uso
app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);
app.use('/api',cupon_route);

//inicializador 
module.exports = app;
