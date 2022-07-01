'use strict'
var Cupon = require('../models/cupon');

//Registro
const registro_cupon_admin = async function(req, res){
    //validacion
    if(req.user){
        if(req.user.role == 'admin'){

            //obtener la data
            let data = req.body;

            let reg = await Cupon.create(data);
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }

}



//Exportacion de modulo
module.exports = {
    registro_cupon_admin
}