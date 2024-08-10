import express from "express";
import mongoose from "mongoose";
import session from 'express-session';
import cors from "cors";
import morgan from "morgan";
import passport from './controllers/passport.js';
import cookieParser from "cookie-parser";
//rutas
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

// crear el servidor
const app = express();

// configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Asegúrate de que este es el correcto
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'my_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/appointment", {});
    console.log(">>>> MongoDB conectado");
  } catch (error) {
    console.error("---- Error conectando a MongoDB ----- :", error.message);
  }
};
connectDB();

// rutas
app.use("/auth", authRoutes);
app.use("/api", eventRoutes);

// endpoint de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de appointment");
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
