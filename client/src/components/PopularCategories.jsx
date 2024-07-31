import React, { useState, useEffect } from 'react';
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import sportIcon from '../assets/icons/sport.webp';
import learnIcon from '../assets/icons/learning.webp';
import adventureIcon from '../assets/icons/adventure.webp';
import wellbeingIcon from '../assets/icons/wellbeing.webp';
import recreationalIcon from '../assets/icons/recreational.webp';
import mentalIcon from '../assets/icons/mental.webp';
import socialIcon from '../assets/icons/social.webp';
import culturalIcon from '../assets/icons/cultural.webp';





const categories = [
  { name: 'Deportes y Fitness', icon: sportIcon },
  // { name: 'Interior', icon: indoorIcon },
  // { name: 'Invierno', icon: winterIcon },
  { name: 'Cursos', icon: learnIcon },
  // { name: 'Acuáticos', icon: aquaticIcon },
  // { name: 'Motor', icon: motorIcon },
  // { name: 'Equipo', icon: teamIcon },
  { name: 'Aventura y Viajes', icon: adventureIcon },
  { name: 'Salud y Bienestar', icon: wellbeingIcon },
  { name: 'Recreativas', icon: recreationalIcon },
  // { name: 'Extremos', icon: extremeIcon },
  { name: 'Mentales', icon: mentalIcon },
  { name: 'Sociales', icon: socialIcon },
  { name: 'Culturales', icon: culturalIcon },

];

const PopularCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPageDesktop = 5;
  const itemsPerPageMobile = 2;
  // const isMobile = window.innerWidth <= 768;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollContainerRef = React.createRef();

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -150,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 150,
      behavior: 'smooth',
    });
  };

  const itemsPerPage = isMobile ? 2 : 5;

  // const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop; 
  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex - 1 < 0 ? categories.length - 1 : prevIndex - 1
  //   );
  // };

  // const displayedCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);
  return (


    < section className="py-2 bg-SectionBg" >
      <div className="container rounded-lg max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl text-H2Color font-bold text-center mb-8">Categorías Populares</h2>
        <div className="relative">
          <div
            className="grid grid-cols-2 md:grid-cols-8 max-w-6xl mx-auto"
            ref={scrollContainerRef}
            style={{ scrollBehavior: 'smooth' }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-none flex-col items-center text-center cursor-pointer mt-2 mx-auto"
                style={{ width: '120px' }}
              >
                <div className='p-4 bg-white rounded-full shadow-md'>
                  <img src={category.icon} alt={category.name} className="w-12 h-12 mb-1" />
                </div>
                <h3 className="text-xl font-semibold text-H1Color">{category.name}</h3>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4">
            <button
              onClick={scrollLeft}
              className="px-5 py-5 rounded-full text-4xl text-white hover:bg-ButtonHover"
            >
              <LuArrowLeft />
            </button>
            <button
              onClick={scrollRight}
              className="px-5 py-5 rounded-full text-4xl text-white hover:bg-ButtonHover"
            >
              <LuArrowRight />
            </button>
          </div> */}
        </div>
      </div>
    </section >
  );
};

export default PopularCategories;
