import { SECRET_TOKEN } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) return res.status(401).json({ message: "Token invalidado." });
    req.user = user;

    next();
  });
};
