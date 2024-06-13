import { Router } from "express";
import {
  crearComentario,
  editarComentario,
  eliminarComentario,
  listarporPublicacion
} from "../controllers/comentario.js";
const comentario = Router();

comentario.get("/comentario/listingPID", listarporPublicacion);
comentario.put("/comentario/edit", editarComentario);
comentario.post("/comentario/create", crearComentario);
comentario.delete("/comentario/delete", eliminarComentario);

export default comentario;
