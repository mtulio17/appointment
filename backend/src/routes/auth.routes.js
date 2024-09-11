import { Router } from "express";
import { register, login, logout, profile} from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/validateToken.js";

const router = Router();

// rutas de inicio de sesión
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;
