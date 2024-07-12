// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Importa tu modelo de usuario u otro modelo según sea necesario

// // Ruta para cargar datos iniciales
// router.post('/init', async (req, res) => {
//   try {
//     // Ejemplo de datos de prueba para usuarios
//     const users = [
//       { username: 'user1', email: 'user1@example.com' },
//       { username: 'user2', email: 'user2@example.com' },
//     ];

//     // Guardar los usuarios en la base de datos
//     await User.insertMany(users);

//     res.status(200).json({ message: 'Datos iniciales cargados exitosamente' });
//   } catch (error) {
//     console.error('Error al cargar datos iniciales:', error.message);
//     res.status(500).json({ error: 'Error al cargar datos iniciales' });
//   }
// });

// module.exports = router;
