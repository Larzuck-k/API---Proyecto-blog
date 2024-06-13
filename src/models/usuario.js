import { Sequelize, DataTypes } from "sequelize";

import db from "./db.js";

export default db.define('usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(400),
    unique: true
  },
  user: {
    type: DataTypes.STRING(250),
    unique: true
  },
  password: {
    type: DataTypes.STRING(5000)
  },
  photo: {
    type: DataTypes.STRING(5000)
  }
});
