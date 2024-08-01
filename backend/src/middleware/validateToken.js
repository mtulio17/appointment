import { SECRET_TOKEN } from "../config.js";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token recibido:', token); // Debugging line

  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    console.log('Token decodificado:', decoded); // Debugging line
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado." });

    req.user = user;
    next();
  } catch (err) {
    console.error('Error de token:', err); // Debugging line
    return res.status(401).json({ message: "Token invalidado." });
  }
};
