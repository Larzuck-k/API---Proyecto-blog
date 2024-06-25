import express from "express";


import rutausuario from "./src/routes/usuario.js";
import rutacomentario from "./src/routes/comentario.js";
import rutapublicacion from "./src/routes/publicacion.js";
import cnx from "./src/models/db.js";
import cors from 'cors'


import bodyparser from "body-parser";

import dotenv from "dotenv";

dotenv.config({ path: "././.env" });

//creamos el server node
const app = express();

const port = process.env.PORT;
//app.use(cors());


cnx
  .sync({ force: false })
  .then(() => {
    console.log("sincronizacion ok!");
  })
  .catch((error) => {
    console.log(error);
  });

  app.use(cors());

  app.use(bodyparser.urlencoded({extended: true}));
  app.use(bodyparser.json());
app.use(rutacomentario);
app.use(rutausuario);
app.use(rutapublicacion);
app.server = app.listen(port, () => {
  console.log(`Server ejecutandose en ${port}...`);
});

// crud
