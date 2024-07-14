import React from 'react';
import heroImg from '../assets/images/heroSection2.jpg'

const HeroSection = () => {;
  return (
    <section className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${heroImg})` }}>
    <div className="absolute inset-0"></div>
    <div className="container px-4 relative z-10 flex flex-col lg:flex-row items-start justify-start">
      <div className="text-center lg:text-left lg:w-1/2">
        <h1 className="text-5xl font-bold mb-4 text-textPrimary">Descubre Nuevas Experiencias Locales</h1>
        <p className="text-2xl mb-6 text-">
          Explora y participa en eventos cerca de ti para conocer gente nueva y disfrutar de actividades emocionantes que
          enriquecen tu vida social y personal.
        </p>
        <div className="flex justify-center lg:justify-start">
          <div className="flex items-center">
          <input
            type="text"
            placeholder="Ingresa tu ubicación..."
            className="px-4 py-2 rounded-l-lg text-gray-800 w-3/4 lg:w-2/3"
          />
          <button className="bg-button text-white px-6 py-2 rounded-r-lg hover:buttonHover">
            Buscar
          </button>
        </div>
        </div>
      </div>
    </div>
  </section>
    

  );
};

export default HeroSection;