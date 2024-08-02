import Publicacion from "../models/publicacion.js";

import fs from "fs";


export const listarPublicaciones = async (req, res) => {
  //Encriptar contraseña y validar que no se ha utilizado el email
  try {
    const Publicaciones = await Publicacion.findAll({
      order: [['createdAt', 'DESC']], // or 'ASC' for ascending order
    });
    console.log(Publicaciones);
    if (Publicaciones.length >= 1) {
      res.status(200).send(Publicaciones);
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

export const imagenPublicacion = async (req, res) => {
  const { idPublicacion } = req.body;
  let Error = "";
  const publicacion = await Publicacion.findAll({
    where: {
      idPublicacion: idPublicacion,
    },
  });

  const rowCount = publicacion.length;

  if (rowCount == 1) {
    const imagePath = publicacion[0].photo;
    fs.readFile(imagePath, (err, data) => {
console.log()
if(data){
   res.writeHead(200, { "Content-Type": "image/png" })
    
    res.end(data); 
}else{
//want return a loading gif if the upload file is not found
fs.readFile("./src/public/PostLoading.gif", (err, data) => {
  console.error(err);
  res.end(data);
});
}

  

    });
  } else {
    res.status(200).send({
      status: "error",
      mensaje: "Datos incorrectos, verifique e intente de nuevo",
    });
  }

 
};

export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    let photo = req.file.path;
    //Encriptar contraseña y validar que no se ha utilizado el email
    {
      await Publicacion.create({
        photo,
        titulo,
        contenido,
      });
      res.status(200).send({
        status: "success",
        mensaje: "Se ha creado la publicación correctamente",
      });
    }
  } catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

export const editarPublicacion = async (req, res) => {
  try {
    const { titulo, photo, contenido } = req.body;

    //Encriptar contraseña y validar que no se ha utilizado el email

    const nuevaPublicacion = await Publicacion.update(
      { titulo: titulo, photo: photo, contenido: contenido },
      {
        where: {
          idPublicacion: req.query.id,
        },
      }
    );

    // await nuevoComentario.;
    res.status(200).send({
      status: "success",
      mensaje: "Se ha editado la publicación correctamente",
    });
  } catch (error) {
    res.status(200).send({
      status: "Error",
      mensaje: "No se ha podido editar la publicación: " + error,
    });
  }
};

export const eliminarPublicacion = async (req, res) => {
  try {
    
 
  const comentario = await Comentario.findByPk(req.query.id);

  if (comentario) {
    await comentario.destroy();
    res.status(200).send({
      status: "success",
      mensaje: "Se ha eliminado la publicación correctamente",
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
