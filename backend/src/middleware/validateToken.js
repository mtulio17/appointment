import { SECRET_TOKEN } from "../config.js";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado." });

    req.user = user; // Esto debería tener el ID del usuario
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalidado." });
  }
};
