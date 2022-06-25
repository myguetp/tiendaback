'use strict'

let Producto = require('../models/producto');

//registrar prducto
const registo_producto_admin = async function(req, res){
    //validar data
    if(req.user){
        if (req.user.role == 'admin'){
            //obtener data
            let data = req.body;
            
            let img_path = req.files.portada.path;
            let name = img_path.split('\\');
            let portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = portada_name;
            let reg = await Producto.create(data)

            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});

    }

}

const listar_productos_admin = async function(req, res){
     //validar data
     if(req.user){
        if (req.user.role == 'admin'){
           
            //paso por parametro
            let filtro = req.paramas['filtro'];
            //todos los registros
            let reg = await Producto.find({titulo: new RegExp(filtro, 'i')});
            //enviar data al frontend
            res.status(200).send({data:reg})
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});

    }
}

//exportar metodos
module.exports = {
    registo_producto_admin,
    listar_productos_admin
}