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

const listar_cupones_admin = async function(req, res){
    //validar data
    if(req.user){
       if (req.user.role == 'admin'){
          
           //paso por parametro
           var filtro = req.params.filtro
           //todos los registros // ordenar con sort
           let reg = await Cupon.find({codigo: new RegExp(filtro, 'i')}).sort({createdAt: -1});
           //enviar data al frontend
           res.status(200).send({data:reg})
       }else{
           res.status(500).send({message: 'NoAcces'});
       }
   }else{
       res.status(500).send({message: 'NoAcces'});

   }
}

const obtener_cupon_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
        let id = req.params['id'];        
        
        try {
            let reg = await Cupon.findById({_id:id});
        
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

const actualizar_cupon_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
            let data = req.body;
            let id = req.params['id'];

            //identidicacion del id
            let reg = await Cupon.findByIdAndUpdate({_id:id},{
                //lo que actualizaremos
                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite
            });

            res.status(200).send({data:reg})
            
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }
}

const eliminar_cupon_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
            let id = req.params['id'];
            
            let reg = await Cupon.findByIdAndRemove({_id:id});
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
    registro_cupon_admin,
    listar_cupones_admin,
    obtener_cupon_admin,
    actualizar_cupon_admin,
    eliminar_cupon_admin
    
}