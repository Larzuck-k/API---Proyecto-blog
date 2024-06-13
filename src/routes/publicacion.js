import { Router } from "express";
import {
  listarPublicaciones,
  editarPublicacion,
  crearPublicacion,
  eliminarPublicacion
} from "../controllers/publicacion.js";
const publicacion = Router();

publicacion.get("/publicacion/listing", listarPublicaciones);
publicacion.put("/publicacion/edit", editarPublicacion);
publicacion.post("/publicacion/create", crearPublicacion);
publicacion.delete("/publicacion/delete", eliminarPublicacion);

export default publicacion;
