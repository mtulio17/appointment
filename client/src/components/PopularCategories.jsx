import React, {useState} from 'react';
import sportIcon from '../assets/icons/sport.png';
import indoorIcon from '../assets/icons/indoor.png';
import winterIcon from '../assets/icons/winter.png';
import learnIcon from '../assets/icons/learning.png';
import aquaticIcon from '../assets/icons/aquatic.png';
import motorIcon from '../assets/icons/motor.png';
import teamIcon from '../assets/icons/team.png';
import adventureIcon from '../assets/icons/adventure.png';
import wellbeingIcon from '../assets/icons/wellbeing.png';
import recreationalIcon from '../assets/icons/recreational.png';
import extremeIcon from '../assets/icons/extreme.png';
import mentalIcon from '../assets/icons/mental.png';
import socialIcon from '../assets/icons/social.png';
import culturalIcon from '../assets/icons/cultural.png';



const categories = [
  { name: 'Deportes', icon: sportIcon },
  { name: 'Interior', icon: indoorIcon },
  { name: 'Invierno', icon: winterIcon },
  { name: 'Cursos', icon: learnIcon },
  { name: 'Acuáticos', icon: aquaticIcon },
  { name: 'Motor', icon: motorIcon },
  { name: 'Equipo', icon: teamIcon },
  { name: 'Aventura y Viajes', icon: adventureIcon },
  { name: 'Salud y Bienestar', icon: wellbeingIcon },
  { name: 'Recreativas', icon: recreationalIcon },
  { name: 'Extremos', icon: extremeIcon },
  { name: 'Mentales', icon: mentalIcon },
  { name: 'Sociales', icon: socialIcon },
  { name: 'Culturales', icon: culturalIcon },

];

const PopularCategories = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? categories : categories.slice(0, 8);
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Categorías Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {displayedCategories.map((category) => (
            <div key={category.name} className="flex flex-col items-center text-center p-2 bg-white rounded-lg shadow-md">
              <img src={category.icon} alt={category.name} className="w-12 h-12 mb-1" />
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-indigo-600 px-6 py-3 rounded text-white hover:bg-indigo-500"
          >
            {showAll ? 'Ver Menos' : 'Ver Todas'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
