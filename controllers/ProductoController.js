'use strict'

let Producto = require('../models/producto');
//modelo de inventario
let Inventario = require('../models/inventario');
//obtener imagen de la carpeta (manejar archivos)
let fs = require('fs');
var path =  require('path');

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
            let reg = await Producto.create(data);

            //registro de inventario
            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: 'Primer registro',
                producto: reg._id

            });

            //parte de inventario se agrega cuando se haga el inventario

            res.status(200).send({data:reg, inventario});
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
            var filtro = req.params.filtro
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

//muestra la imagen 
const obtener_portada = async function(req,res) {
    var img = req.params.img;

    console.log(img);
    fs.stat('./uploads/productos/'+img, function(err){
        if (!err) {
            //obtenemos el path de la imagen
            let path_img =  './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img =  './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));

        }
    })
}

//actualizar el producto
const obtener_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
        let id = req.params['id'];        
        
        try {
            let reg = await Producto.findById({_id:id});
        
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
// actualizar un producto
const actualizar_producto_admin = async function(req, res){
    //validar data
    if(req.user){
        if (req.user.role == 'admin'){
            //obtener data
            let id = req.params['id'];
            let data = req.body;

            //console.log(req.files);

            if (req.files) {
                //si hayimagen
                let img_path = req.files.portada.path;
                let name = img_path.split('\\');
                let portada_name = name[2];

                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portada_name
                });
                //elimina la imagen para que no se sobrecargue
                fs.stat('./uploads/productos/'+reg.portada, function(err){
                    //verificar que existe imagen
                    if(!err){
                        //eliminamos
                        fs.unlink('./uploads/productos/'+reg.portada, (err) =>{
                            //capturamos si existe un error
                            if(err) throw err;
                        }); 
                    }
                })

                res.status(200).send({data:reg});

               // console.log('si hay imagen');
            }else{
                //no hay imagen
                // console.log('no hay imagen');
                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                });
                res.status(200).send({data:reg});
            }             

           
                             
            
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});

    }

}

const eliminar_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
            let id = req.params['id'];
            
            let reg = await Producto.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});


        
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }
}

/*INVENTARIO*/
//liastar inventarios del ptroducto
const listar_inventario_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
        
            let id = req.params['id'];

            //polularlo despues del . y la palabra eso es para mostrar la data
            let reg = await Inventario.find({producto: id}).populate('admin');          
            //enviar a front
            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});
    }
}

//Eliminar inventario
const eliminar_inventario_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
            //obtener id inventario
            let id = req.params['id'];
            //eliminamso inventario
            let reg = await Inventario.findByIdAndRemove({_id: id});

            //obtener registrod e producto
            let prod = await Producto.findById({_id:reg.producto});
            //calcular stock
            let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad) ;
    
            //actualizacion de stock al producto
            let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{
                stock: nuevo_stock
            }) 

            res.status(200).send({data:producto});
            
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
    listar_productos_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_producto_admin,
    eliminar_inventario_producto_admin
}