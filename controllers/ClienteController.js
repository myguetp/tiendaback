'use strict'
let Cliente = require('../models/cliente');
//token
let jwt = require('../helpers/jwt');
//encriptar password
let bcrypt = require('bcryptjs')

/*funciones*/

//Registrar cliente
const registro_cliente = async function(req, res){
    //obtener la data
    let data = req.body;

    //validar correo 
    let clientes_array = [];
    clientes_array = await Cliente.find({email:data.email})
    if(clientes_array.length == 0){       
       //validar econtraseña
        if(data.password){
            //encriptar
            bcrypt.hash(data.password, 9, async function(err, hash){
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data)
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


//Login del cliente
const login_cliente = async function(req, res){
    let data = req.body;
    //verificar existencia de correo
    let cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data:undefined})
    }else{
        //login
        let user = cliente_arr[0];

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

//listar clientes
const listar_clientes_filtro_admin = async function(req,res){

    if(req.user){
        if(req.user.role == 'admin'){
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];
        
            console.log(tipo)
        
            if(tipo == null || tipo == 'null'){
            let reg = await Cliente.find();
            res.status(200).send({data:reg});
            }else{
                if(tipo == 'apellidos'){
                  let reg = await Cliente.find({apellidos: new RegExp(filtro,'i')});
                  res.status(200).send({data:reg});
                }else if(tipo == 'correo'){
                  let reg = await Cliente.find({email: new RegExp(filtro,'i')});
                  res.status(200).send({data:reg});
                }
            }
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});

    }


    
}

//registrar clientes
const registro_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
            var data = req.body;
            //contraseña por defecto
            bcrypt.hash('123456789', 9, async function(err,hash){
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'error en el servidor',data:undefined});
                }
            })

            
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }
}

//obtenr por id cliente
const obtener_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
        let id = req.params['id'];        
        
        try {
            let reg = await Cliente.findById({_id:id});
        
            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined});
        }
      
            
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }
}

//actualizar clienye
const actualizar_cliente_admin =async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
        let id = req.params['id'];       
        var data = req.body; 
        
        let reg = await Cliente.findByIdAndUpdate({_id:id},{
            nombres : data.nombres,
            apellidos : data.apellidos,
            email: data.email,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            genero: data.genero
        })
      
          res.status(200).send({data:reg});  
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }
}

module.exports={
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin
}