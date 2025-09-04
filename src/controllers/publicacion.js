import Publicacion from "../models/publicacion.js";

// 📌 Listar publicaciones
export const listarPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (publicaciones.length > 0) {
      res.status(200).send(publicaciones);
    } else {
      res.status(200).send({
        status: "error",
        mensaje: "No se han encontrado resultados",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

// 📌 Crear publicación (solo texto)
export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    await Publicacion.create({
      titulo,
      contenido,
    });

    res.status(200).send({
      status: "success",
      mensaje: "Se ha creado la publicación correctamente",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

// 📌 Editar publicación
export const editarPublicacion = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    await Publicacion.update(
      { titulo, contenido },
      {
        where: { idPublicacion: req.query.id },
      }
    );

    res.status(200).send({
      status: "success",
      mensaje: "Se ha editado la publicación correctamente",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "No se ha podido editar la publicación: " + error,
    });
  }
};

// 📌 Eliminar publicación
export const eliminarPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.query.id);

    if (publicacion) {
      await publicacion.destroy();
      res.status(200).send({
        status: "success",
        mensaje: "Se ha eliminado la publicación correctamente",
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "No se encontró la publicación",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};
