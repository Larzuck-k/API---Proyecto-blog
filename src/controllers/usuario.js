import Usuario from "../models/usuario.js";
import bcrypt, { compare } from "bcrypt";

import fs from "fs";
export const loginUsuario = async (req, res) => {
  try {
    const { password, email } = req.body;
    let Error = "";
    const usuario = await Usuario.findAll({
      where: {
        email: email,
      },
    });

    const rowCount = usuario.length;

    if (rowCount == 1) {
      if (bcrypt.compareSync(password, usuario[0].password) == true) {
        res.status(200).send({
          status: "success",
          mensaje: "Ingreso exitoso",
          user: usuario[0].user,
          email: usuario[0].email,
          idUsuario: usuario[0].idUsuario,

          id: usuario[0].id,
        });
      } else {
        res.status(200).send({
          status: "error",
          mensaje: "Datos incorrectos, verifique e intente de nuevo",
        });
      }
    } else {
      res.status(200).send({
        status: "error",
        mensaje: "Datos incorrectos, verifique e intente de nuevo",
      });
    }
  } catch (error) {
    console.log("error");
    res.status(200).send({
      status: "error",
      mensaje: "Faltan datos, verifique e intente de nuevo",
    });
  }
};
export const imagenUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.body;
    let Error = "";
    const usuario = await Usuario.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });

    const rowCount = usuario.length;

    if (rowCount == 1) {
      const imagePath = usuario[0].photo;
      fs.readFile(imagePath, (err, data) => {
        if(data){
          res.writeHead(200, { "Content-Type": "image/png" })
           
           res.end(data); 
       }else{
       
       fs.readFile("./src/public/ProfileLoading.gif", (err, data) => {
         console.error(err);
         res.end(data);
       })
       }
      })
    }


  } catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Datos incorrectos, verifique e intente de nuevo",
    });
  }
};

export const perfilUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.body;
    let Error = "";
    const usuario = await Usuario.findAll(
      { attributes: ["user", "idUsuario"] },
      {
        where: {
          idUsuario: idUsuario,
        },
      }
    );

    const rowCount = usuario.length;

    if (rowCount == 1) {
      res.status(200).send(usuario);
    } else {
      res.status(200).send({
        status: "error",
        mensaje: "Datos incorrectos, verifique e intente de nuevo",
      });
    }
  } catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Datos incorrectos, verifique e intente de nuevo",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    let val1 = false;
    let val2 = false;
    let mensaje1 = "";
    let mensaje2 = "";

    const { user, password, email } = req.body;
    console.log(req.file);
    let photo = req.file.path;
    //Encriptar contraseña y validar que no se ha utilizado el email
    let salt = 10;
    let Error = "";
    const Validacion1 = await Usuario.findAll({
      where: {
        email: email,
      },
    });

    const rowCount1 = Validacion1.length;

    if (rowCount1 >= 1) {
      val1 = true;
      mensaje1 = "Este correo ya está en uso";
    }
    const validacion2 = await Usuario.findAll({
      where: {
        user: user,
      },
    });

    const rowCount2 = validacion2.length;

    if (rowCount2 >= 1) {
      val2 = true;
      mensaje2 = "Este nombre de usuario ya está en uso";
    }

    if (val1 || val2) {
      if (val1 == true && val2 == false) {
        res.status(200).send({
          status: "error",
          mensaje: mensaje1 + ".",
        });
      }
      if (val2 == true && val1 == false) {
        res.status(200).send({
          status: "error",
          mensaje: mensaje2 + ".",
        });
      }
      if (val1 == true && val2 == true) {
        res.status(200).send({
          status: "error",
          mensaje: mensaje1 + " - " + mensaje2 + ".",
        });
      }
    } else {
      let val = bcrypt.hashSync(password, salt);
      const nuevoUsuario = await Usuario.create({
        photo,
        user,
        password: val,
        email,
      });
      res.status(200).send({
        status: "success",
        mensaje: "Se ha registrado correctamente",
      });
    }
  } catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

export const editarUsaurio = async (req, res) => {
try {
  



  const { user, password, email } = req.body;
  let salt = 10;
  //Encriptar contraseña y validar que no se ha utilizado el email
  const usuario = await Usuario.findByPk(req.query.id);

  if (usuario) {
    try {
      if (password != "") {
        let val = bcrypt.hashSync(password, salt);
        let newphoto = req.file.path;
        usuario.password = val;
      }
      if (newphoto != "") {
        usuario.photo = newphoto;
      }

      usuario.user = user;
      usuario.email = email;
      await usuario.save();
      res.status(200).send({
        status: "success",
        mensaje: "Se ha editado el usuario correctamente",
      });
    } catch (error) {
      res.status(200).send({
        status: "Error",
        mensaje:
          "El usuario o correo ya se encuentra en uso.",
      });
    }
  } else {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado",
    });
  }} catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  
  try {
    
 
  const usuario = await Usuario.findByPk(req.query.id);

  if (usuario) {
    await usuario.destroy();
    res.status(200).send({
      status: "success",
      mensaje: "Se ha eliminado la cuenta correctamente",
    });
  } else {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado",
    });
  }} catch (error) {
    res.status(200).send({
      status: "error",
      mensaje: "Ha ocurrido un error inesperado: " + error,
    });
  }
};
