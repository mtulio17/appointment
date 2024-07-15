import React from 'react';
import heroImg from '../assets/images/heroSectionBackground.png'

const HeroSection = () => {
  ;
  return (
    <section className="relative h-screen max-w-screen-4xl flex items-center justify-center bg-gradient-to-r from-background to-Background1">
    {/* Div para el fondo con gradientes */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-Link to-purple-500 transform -skew-y-4 origin-top-left shadow-lg"></div>
    <div className="absolute rounded-full  inset-0 bg-gradient-to-r from-Button to-ButtonHover w-1/2 transform -skew-y-6 origin-top-left shadow-xl"></div>
      <div className="absolute inset-0 mt-4">
        <img src={heroImg} alt="Background" className="absolute bottom-0 right-0 w-full h-full object-cover " />
      </div>
      <div className="container px-4 relative z-10 flex flex-col lg:flex-row items-start justify-start">
        <div className="relative z-10 p-8  rounded-lg max-w-lg text-center lg:text-left lg:w-1/2">
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
              <button className="bg-Primary text-white px-6 py-2 rounded-r-lg hover:buttonHover">
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