import React, {useState} from 'react';
import { LuArrowRight, LuArrowLeft  } from "react-icons/lu";
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
  // const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  // const displayedCategories = showAll ? categories : categories.slice(0, 8);

  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? categories.length - itemsPerPage : prevIndex - itemsPerPage
    );
  }

  const displayedCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);
  return (
    // <section className="py-7 bg-white">
    //   <div className="container bg-link rounded-lg max-w-7xl mx-auto px-4 py-4 shadow-md">
    //     <h2 className="text-2xl text-textPrimary font-bold text-center mb-8">Categorías Populares</h2>
    //     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
    //       {categories.map((category) => (
    //         <div key={category.name} className="flex flex-col items-center text-center p-2 bg-background rounded-lg shadow-md">
    //           <img src={category.icon} alt={category.name} className="w-12 h-12 mb-1" />
    //           <h3 className="text-xl font-semibold">{category.name}</h3>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="flex justify-center mt-8">
    //       <button
    //         onClick={() => setShowAll(!showAll)}
    //         className="bg-button px-6 py-3 rounded text-white hover:bg-buttonHover"
    //       >
    //         {showAll ? 'Ver Menos' : 'Ver Todas'}
    //       </button>
    //     </div>
    //   </div>
    // </section>
    <section className="py-7 bg-Button">
  <div className="container bg-white rounded-lg max-w-7xl mx-auto px-4 py-4 shadow-md">
    <h2 className="text-2xl text-Link font-bold text-center mb-8">Categorías Populares</h2>
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {displayedCategories.map((category) => (
          <div key={category.name} className="flex flex-col items-center text-center p-2 bg-Background1 rounded-lg shadow-lg">
            <img src={category.icon} alt={category.name} className="w-12 h-12 mb-1" />
            <h3 className="text-xl font-semibold text-textPrimary">{category.name}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4">
        <button
          onClick={prevSlide}
          className="bg-Primary px-5 py-5 rounded-full text-white hover:bg-buttonHover"
        >
          <LuArrowLeft/>
        </button>
        <button
          onClick={nextSlide}
          className="bg-Primary px-5 py-5 rounded-full text-white hover:bg-buttonHover"
        >
          <LuArrowRight/>
        </button>
      </div>
    </div>
  </div>
</section>
  );
};

export default PopularCategories;
