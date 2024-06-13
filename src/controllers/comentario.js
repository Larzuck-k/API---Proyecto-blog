import { where } from "sequelize";
import Comentario from "../models/comentario.js";

export const listarporPublicacion = async (req, res) => {

  //Encriptar contraseña y validar que no se ha utilizado el email
  try {
  const Comentarios = await Comentario.findAll({
    where: {
      idPublicacion: req.query.id,
    },
  });
console.log(Comentarios)
if(Comentarios.length >=1){
    res.status(200).send(Comentarios);
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

export const crearComentario = async (req, res) => {
  const { ComentarioTexto, idUsuario, idPulicacion } = req.body;
  //Encriptar contraseña y validar que no se ha utilizado el email
  {
   try {
     
 await Comentario.create({
      ComentarioTexto,
      idUsuario,
      idPulicacion,
    });
    res.status(200).send({
      status: "success",
      mensaje: "Se ha creado el comentario correctamente",
    });
   } catch (error) {
    res.status(404).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: "+error,
    })
   }
  }
};

export const editarComentario = async (req, res) => {
  const { idComentario, ComentarioTexto, idPublicacion } = req.body;

  //Encriptar contraseña y validar que no se ha utilizado el email


    try {
     
   
      const nuevoComentario = await Comentario.update(
        { ComentarioTexto: ComentarioTexto},{
        where: {
          idComentario: idComentario,
          idPublicacion: idPublicacion,
        },
      });

     // await nuevoComentario.;
      res.status(200).send({
        status: "success",
        mensaje: "Se ha editado el comentario correctamente",
      });

    

  } 
  catch (error) {
    res.status(404).send({
      status: "Error",
      mensaje:
        "No se ha podido editar el comentario: "+error,
    });
  }
};

export const eliminarComentario = async (req, res) => {
  const comentario = await Comentario.findByPk(req.query.id);

  if (comentario) {
    await comentario.destroy();
    res.status(200).send({
      status: "success",
      mensaje: "Se ha eliminado el comentario correctamente",
    });
  } else {
    res.status(404).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado",
    });
  }
};
