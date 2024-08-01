import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//rutas
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";

const PORT = process.env.PORT || 5000;

// Crear el servidor
const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/appointment", {});
    console.log(">>>> MongoDB conectado");
  } catch (error) {
    console.error("---- Error conectando a MongoDB ----- :", error.message);
  }
};
connectDB();

// Rutas
app.use("/api", authRoutes);
app.use("/api", eventRoutes);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de appointment");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
