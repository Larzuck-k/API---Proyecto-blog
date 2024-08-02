import { QueryTypes } from "sequelize";
import Comentario from "../models/comentario.js";

export const listarporPublicacion = async (req, res) => {

  try {
    const Comentarios = await Comentario.sequelize.query(
      "SELECT `idComentario`, `ComentarioTexto`, comentarios.idUsuario,usuarios.user,comentarios.idUsuario, `idPublicacion`, comentarios.createdAt FROM `comentarios`  INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE idPublicacion = " +
        req.query.id,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(Comentarios);
    if (Comentarios.length >= 1) {
      res.status(200).send(Comentarios);
    } else {
      res.status(200).send({
        status: "error",
        mensaje: "No se han encontrado resutlados",
      });
    }
  } catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

export const crearComentario = async (req, res) => {
  try {
    const { ComentarioTexto, idUsuario, idPublicacion } = req.body;
    //Encriptar contraseña y validar que no se ha utilizado el email
    console.log(idPublicacion);
    await Comentario.create({
      ComentarioTexto,
      idUsuario,
      idPublicacion,
    });
    res.status(200).send({
      status: "success",
      mensaje: "Se ha creado el comentario correctamente",
    });
  } catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

export const editarComentario = async (req, res) => {

  try {
    const { idComentario, ComentarioTexto, idPublicacion } = req.body;

    //Encriptar contraseña y validar que no se ha utilizado el email
  
    const nuevoComentario = await Comentario.update(
      { ComentarioTexto: ComentarioTexto },
      {
        where: {
          idComentario: idComentario,
          idPublicacion: idPublicacion,
        },
      }
    );

    // await nuevoComentario.;
    res.status(200).send({
      status: "success",
      mensaje: "Se ha editado el comentario correctamente",
    });
  } catch (error) {
    res.status(200).send({
      status: "Error",
      mensaje: "No se ha podido editar el comentario: " + error,
    });
  }
};

export const eliminarComentario = async (req, res) => {
try {
  const comentario = await Comentario.findByPk(req.query.id);

  if (comentario) {
    await comentario.destroy();
    res.status(200).send({
      status: "success",
      mensaje: "Se ha eliminado el comentario correctamente",
    });
  } else {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado",
    });
  }
} catch (error) {
  res.status(200).send({
    status: "error",
    mensaje: "Ha ocurrido un error inesperado: " + error,
  });
}
};
