import { Router } from "express";

import {
  loginUsuario,
  editarUsuario,
  crearUsuario,
  eliminarUsuario,
  perfilUsuario
} from "../controllers/usuario.js";

const usuario = Router();

// Rutas sin manejo de imágenes
usuario.post("/usuario/login", loginUsuario);
usuario.put("/usuario/edit", editarUsuario);
usuario.post("/usuario/create", crearUsuario);
usuario.delete("/usuario/delete", eliminarUsuario);
usuario.post("/usuario/data", perfilUsuario);

export default usuario;
