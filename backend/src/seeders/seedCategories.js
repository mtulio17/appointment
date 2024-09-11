import mongoose from 'mongoose';
import Category from '../models/category.model.js';  // Asegúrate de que la ruta sea correcta

mongoose.connect('mongodb://localhost:27017/appointment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  { name: 'fitness', label: 'Fitness' },
  { name: 'comida', label: 'Comida y Bebidas' },
  { name: 'aprendizaje', label: 'Aprendizaje' },
  { name: 'lectura', label: 'Lectura y Escritura' },
  { name: 'aventura', label: 'Aventura y Viajes' },
  { name: 'salud', label: 'Salud y Bienestar' },
  { name: 'recreativas', label: 'Recreativas' },
  { name: 'culturales', label: 'Culturales' },
];

const populateCategories = async () => {
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('Categorías insertadas correctamente');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error insertando categorías:', err);
    mongoose.connection.close();
  }
};

populateCategories();
