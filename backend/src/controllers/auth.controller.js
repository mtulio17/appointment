import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // verifica si el email ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está en uso. Intenta con otro.' });
    }

    const passwordHashed = await bcrypt.hash(password, 14);

    const newUser = new User({
      username,
      email,
      password: passwordHashed,
    });

    const userSaved = await newUser.save();

    // crear y devolver un token de acceso
    const token = createAccessToken({ id: userSaved._id });
    res.json({
      token, // Devuelve el token en la respuesta
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "Credenciales incorrectas, usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.json({
      token, // devuelve el token en la respuesta
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
  //   res.redirect("/");
};

export const profile = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "No autorizado, token no proporcionado" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    const userFound = await User.findById(decoded.id).select('-password'); // Excluye la contraseña

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error('Error en el perfil:', error);
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};
