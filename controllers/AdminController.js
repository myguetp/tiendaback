'use strict'

let Admin = require('../models/admin');
//token
let jwt = require('../helpers/jwt');
//encriptar password
let bcrypt = require('bcryptjs')

/*funciones*/

//Registrar administrador
const registro_admin = async function(req, res){
    //obtener la data
    let data = req.body;

    //validar correo 
    let admin_array = [];
    admin_array = await Admin.find({email:data.email})
    if(admin_array.length == 0){       
       //validar econtraseña
        if(data.password){
            //encriptar
            bcrypt.hash(data.password, 9, async function(err, hash){
                if(hash){
                    data.password = hash;
                    let reg = await Admin.create(data)
                    res.status(200).send({data: reg});
                }else{
                    res.status(200).send({message: 'ErrorServer',data:undefined});  
                }
            })
        }else{
           res.status(200).send({message: 'No hay conraseña',data:undefined});

        }
        
        
    }else{
        res.status(200).send({message: 'Correo ya existe',data:undefined});
    }


   
}

//Login del admin
const login_admin = async function(req, res){
    let data = req.body;
    //verificar existencia de correo
    let admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data:undefined})
    }else{
        //login
        let user = admin_arr[0];

        //comparar contraseñas
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token:jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'contraseña no coincide', data:undefined})

            }
        });

      
       
    }

    //res.status(200).send({data:data})
}

module.exports={
    registro_admin,
    login_admin
}