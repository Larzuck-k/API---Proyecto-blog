import { where } from "sequelize";
import Publicacion from "../models/publicacion.js";

export const listarPublicaciones = async (req, res) => {

  //Encriptar contraseña y validar que no se ha utilizado el email
  try {
  const Publicaciones = await Publicacion.findAll();
console.log(Publicaciones)
if(Publicaciones.length >=1){
    res.status(200).send(Publicaciones);
  }else{
    res.status(404).send({
      status: "error",
      mensaje:"No se han encontrado resutlados",
    })
  }
  }catch(error){
    res.status(404).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: "+error,
    })

  }
  }

export const crearPublicacion = async (req, res) => {
  const { photo, titulo, contenido } = req.body;
  //Encriptar contraseña y validar que no se ha utilizado el email
  {
   try {
     
 await Publicacion.create({
      photo,
      titulo,
      contenido,
    });
    res.status(200).send({
      status: "success",
      mensaje: "Se ha creado la publicación correctamente",
    });
   } catch (error) {
    res.status(404).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: "+error,
    })
   }
  }
};

export const editarPublicacion = async (req, res) => {
  const { titulo, photo,contenido } = req.body;

  //Encriptar contraseña y validar que no se ha utilizado el email


    try {
     
   
      const nuevaPublicacion = await Publicacion.update(
        { titulo: titulo,photo:photo,contenido:contenido},{
        where: {

          idPublicacion:req.query.id,
        },
      });

     // await nuevoComentario.;
      res.status(200).send({
        status: "success",
        mensaje: "Se ha editado la publicación correctamente",
      });

    

  } 
  catch (error) {
    res.status(404).send({
      status: "Error",
      mensaje:
        "No se ha podido editar la publicación: "+error,
    });
  }
};

export const eliminarPublicacion = async (req, res) => {
  const comentario = await Comentario.findByPk(req.query.id);

  if (comentario) {
    await comentario.destroy();
    res.status(200).send({
      status: "success",
      mensaje: "Se ha eliminado la publicación correctamente",
    });
  } else {
    res.status(404).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado",
    });
  }
};
