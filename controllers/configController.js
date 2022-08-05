
var Config = require('../models/config');
var fs = require('fs'); 
var path = require('path'); 

const obtener_config_admin = async function(req,res){
    if(req.user){
        if (req.user.role == 'admin'){

          let reg = await Config.findById({_id:"62dc988ed3b4e573fd119652"});

          res.status(200).send({data:reg})
         
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});

    }

}



const actualiza_cofig_admin = async function(req,res){
    if(req.user){
        if (req.user.role == 'admin'){

            let data = req.body;
   
            if(req.files){
                console.log('si hay imagen');
                //data con imagen
                let img_path = req.files.logo.path;
                let name = img_path.split('\\');
                let logo_name = name[2];

                let reg = await Config.findByIdAndUpdate({_id:"62dc988ed3b4e573fd119652"},{
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    logo: logo_name,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });

                fs.stat('./uploads/configuraciones/'+reg.logo, function(err){
                    //verificar que existe imagen
                    if(!err){
                        //eliminamos
                        fs.unlink('./uploads/configuraciones/'+reg.logo, (err) =>{
                            //capturamos si existe un error
                            if(err) throw err;
                        }); 
                    }
                })
                res.status(200).send({data:reg});
            }else{
                console.log('no hay imagen');
                //data sin imagen
                //sale del id en robo3T
                let reg = await Config.findByIdAndUpdate({_id:"62dc988ed3b4e573fd119652"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });
                res.status(200).send({data:reg});
            }

      


            /************registro en DB
            await Config.create({
                categorias: [],
                titulo: 'Createx',
                logo: 'logo.png',
                serie: 0001,
                correlativo: 000001,
            });*/
         
        }else{
            res.status(500).send({message: 'NoAcces'});
        }
    }else{
        res.status(500).send({message: 'NoAcces'});

    }
}

//muestra la imagen 
const obtener_logo = async function(req,res) {
    var img = req.params.img;

    console.log(img);
    fs.stat('./uploads/configuraciones/'+img, function(err){
        if (!err) {
            //obtenemos el path de la imagen
            let path_img =  './uploads/configuraciones/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img =  './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));

        }
    })
}

module.exports = {
    actualiza_cofig_admin,
    obtener_config_admin,
    obtener_logo
}