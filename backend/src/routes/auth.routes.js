import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/validateToken.js";
import passport from "passport";

const router = Router();


router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

// inicio de sesión con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/sign-in' }),
  (req, res) => {
    // autenticación exitosa
    res.redirect('/profile');
  }
);

router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});


export default router;
