import React from 'react';
// import heroImg from '../assets/images/heroSectionBackground.png';
// import heroImg from '../assets/images/HeroSection.png'
import heroImg from '../assets/images/HeroSection3.png'




const HeroSection = () => {
  ;
  return (
    <section className="relative h-screen max-w-screen-4xl bg-gradient-to-r from-hover to-hover2">
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4">
      <div className="relative z-10 p-4 rounded-lg text-center lg:text-left w-full lg:w-2/3 mx-auto">
        <h3 className="text-4xl md:text-6xl font-bold mb-4 text-textPrimary">
          Descubre Nuevas Experiencias Locales
        </h3>
        <p className="text-2xl text-textPrimary mb-6">
          Explora y participa en eventos cerca de ti para conocer gente nueva y disfrutar de actividades emocionantes que
          enriquecen tu vida social y personal.
        </p>
        <div className="flex justify-center lg:justify-start">
          <div className="flex items-center">
            {/* <input
              type="text"
              placeholder="Ingresa tu ubicación..."
              className="px-4 py-2 rounded-l-lg text-gray-800 w-3/4 lg:w-2/3 bg-background"
            /> */}
            {/* <button className="bg-Button text-white px-6 py-2 rounded-r-lg hover:buttonHover">
              Buscar
            </button> */}
            <button className="bg-Button text-white px-6 py-4 rounded-lg hover:buttonHover">
              Unirme
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full lg:w-1/2 h-full">
        <img src={heroImg} alt="Background" className=" bottom-0 right-0 object-cover h-full w-full lg:w-auto lg:h-auto" />
      </div>
    </div>
  </div>
  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-Background1 to-transparent pointer-events-none"></div>
</section>


  );
};

export default HeroSection;