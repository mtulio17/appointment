import { SECRET_TOKEN } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token recibido:', token);

  if (!token) return res.status(401).json({ message: "No autorizado" });
  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    console.log('Token decodificado:', decoded);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Error de token:', err);
    return res.status(401).json({ message: "Token invalidado." });
  }
};