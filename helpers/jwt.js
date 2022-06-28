'use strict'

//crear token
const jwt = require('jwt-simple');
let moment = require('moment');
//contraseña para encriptar datos
let secret = 'migueltp';

//funciones
exports.createToken = function(user){
    let payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        lat: moment().unix(),
        exp: moment().add(60,'days').unix()

    }
    return jwt.encode(payload,secret);
}
