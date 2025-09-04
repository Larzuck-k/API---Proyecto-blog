import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

// LOGIN
export const loginUsuario = async (req, res) => {
  try {
    const { password, email } = req.body;

    const usuario = await Usuario.findOne({
      where: { email: email },
    });

    if (!usuario) {
      return res.status(200).send({
        status: "error",
        mensaje: "Datos incorrectos, verifique e intente de nuevo",
      });
    }

    const passwordValida = bcrypt.compareSync(password, usuario.password);

    if (passwordValida) {
      res.status(200).send({
        status: "success",
        mensaje: "Ingreso exitoso",
        user: usuario.user,
        email: usuario.email,
        idUsuario: usuario.idUsuario,
        id: usuario.id,
      });
    } else {
      res.status(200).send({
        status: "error",
        mensaje: "Datos incorrectos, verifique e intente de nuevo",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Error en el servidor: " + error,
    });
  }
};

// PERFIL DE USUARIO
export const perfilUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.body;

    const usuario = await Usuario.findOne({
      attributes: ["user", "idUsuario"],
      where: { idUsuario },
    });

    if (usuario) {
      res.status(200).send(usuario);
    } else {
      res.status(404).send({
        status: "error",
        mensaje: "Usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Error en el servidor: " + error,
    });
  }
};

// CREAR USUARIO
export const crearUsuario = async (req, res) => {
  try {
    const { user, password, email } = req.body;

    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(200).send({
        status: "error",
        mensaje: "Este correo ya está en uso.",
      });
    }

    const existeUser = await Usuario.findOne({ where: { user } });
    if (existeUser) {
      return res.status(200).send({
        status: "error",
        mensaje: "Este nombre de usuario ya está en uso.",
      });
    }

    const salt = 10;
    const passwordHash = bcrypt.hashSync(password, salt);

    await Usuario.create({
      user,
      password: passwordHash,
      email,
    });

    res.status(200).send({
      status: "success",
      mensaje: "Se ha registrado correctamente",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Error en el servidor: " + error,
    });
  }
};

// EDITAR USUARIO
export const editarUsuario = async (req, res) => {
  try {
    const { user, password, email } = req.body;
    const usuario = await Usuario.findByPk(req.query.id);

    if (!usuario) {
      return res.status(404).send({
        status: "error",
        mensaje: "Usuario no encontrado",
      });
    }

    if (password && password.trim() !== "") {
      const salt = 10;
      usuario.password = bcrypt.hashSync(password, salt);
    }

    usuario.user = user || usuario.user;
    usuario.email = email || usuario.email;

    await usuario.save();

    res.status(200).send({
      status: "success",
      mensaje: "Se ha editado el usuario correctamente",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "No se ha podido editar el usuario: " + error,
    });
  }
};

// ELIMINAR USUARIO
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.query.id);

    if (!usuario) {
      return res.status(404).send({
        status: "error",
        mensaje: "Usuario no encontrado",
      });
    }

    await usuario.destroy();
    res.status(200).send({
      status: "success",
      mensaje: "Se ha eliminado la cuenta correctamente",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      mensaje: "Error en el servidor: " + error,
    });
  }
};
