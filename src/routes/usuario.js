import { Router } from "express";
import multer from "multer";

import {
  
  loginUsuario,
  editarUsaurio,
  crearUsuario,
  eliminarUsuario,
  imagenUsuario,
  perfilUsuario
} from "../controllers/usuario.js";
const usuario = Router();



// Set up multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
      // Change the name of the file here
      let format = file.mimetype.replace("image/","")
  
      cb(null, file.fieldname + '-' + Date.now()+"."+format)
  }
});

// Set up multer file filter
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname.toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
      return cb(null,true);
  } else {
      cb('Subir solamente formatos de tipo imagen: (jpeg|jpg|png|gif)');
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});



usuario.post("/usuario/login", loginUsuario);

usuario.post("/usuario/profile", imagenUsuario);
usuario.put("/usuario/edit",upload.single('photo'), editarUsaurio);
usuario.post("/usuario/create",upload.single('photo'), crearUsuario);
usuario.delete("/usuario/delete", eliminarUsuario);
usuario.post("/usuario/data", perfilUsuario);

export default usuario;
