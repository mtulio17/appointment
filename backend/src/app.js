const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/users');
// require('dotenv').config();

const app = express();

// Configurar CORS
app.use(cors());

// Middleware
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/appointment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
}).catch((error) => {
  console.error('Error conectando a MongoDB:', error.message);
});

// Rutas
app.use('/api', userRoutes);

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de appointment');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
