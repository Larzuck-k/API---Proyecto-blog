import { Sequelize, DataTypes } from "sequelize";

import db from "./db.js";

export default db.define('publicacion', {
  idPublicacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  photo: {
    type: DataTypes.BLOB
  },
  titulo: {
    type: DataTypes.STRING(200)
  },
  
  contenido: {
    type: DataTypes.STRING(5000)
  }
});
