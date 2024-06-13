import Usuario from "../models/usuario.js";
import Publicacion from "../models/publicacion.js";
import { Sequelize, DataTypes } from "sequelize";
import db from "./db.js";
import publicacion from "./publicacion.js";

export default db.define("comentario", {
  idComentario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ComentarioTexto: {
    type: DataTypes.STRING(1000),
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "idUsuario",
    },
  },
  
  idPublicacion: {
    type: DataTypes.INTEGER,
    references: {
      model: Publicacion,
      key: "idPublicacion",
    }
  },
});
