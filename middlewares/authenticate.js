'use strict'
/*verificar autenticidad del token*/

var jwt = require('jwt-simple');
var moment = require('moment');
var secret =  'migueltp';

exports.auth = function(req,res,next){
    
    //verificar envio e cabecera
    if(!req.headers.authorization){
        return res.status(403).send({message: 'noHeadersError'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    var segment = token.split('.');

    console.log(token);
    console.log(segment);

    if(segment.length != 3){
        return res.status(403).send({message: 'InvalidToken'})
    }else{
        try {
            var payload = jwt.decode(token,secret);
            
            if(payload.exp <= moment().unix()){
                return res.status(403).send({message: 'ExpiredToken'})
            }

        } catch (error) {
            return res.status(403).send({message: 'InvalidToken'})
        }
    }

    req.user = payload;

    next();
}