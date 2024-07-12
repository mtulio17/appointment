import React from 'react';
import heroImg from '../assets/images/HeroSection.jpg'

const HeroSection = () => {;
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage:  `url(${heroImg})`  }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Descubre y Participa en Eventos Increíbles</h1>
        <p className="text-2xl mb-6">Encuentra actividades y eventos cerca de ti. Únete hoy y no te pierdas nada.</p>
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="px-4 py-2 rounded-l text-gray-800 w-2/3 md:w-1/2"
          />
          <button className="px-4 py-2 bg-indigo-600 rounded-r hover:bg-indigo-500">Buscar</button>
        </div>
        <div>
          <button className="bg-indigo-600 px-6 py-3 rounded my-2 mr-4 hover:bg-indigo-500">Explora Eventos</button>
          <button className="bg-indigo-600 px-6 py-3 rounded my-2 hover:bg-indigo-500">Publica tu Evento</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;