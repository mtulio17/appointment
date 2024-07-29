import React from 'react';
const HowItWorks = () => {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Como funciona Appointment</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="bg-gray-100 rounded-lg shadow-md p-6 m-2 flex-1">
              <h3 className="text-xl font-bold mb-2">Descubre eventos</h3>
              <p className="text-gray-600 mb-4">
                Descubre eventos y actividades que te podrian interesar.
              </p>
              <a href="#" className="text-blue-500 hover:underline">Buscar eventos</a>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 m-2 flex-1">
              <h3 className="text-xl font-bold mb-2">Crea un evento</h3>
              <p className="text-gray-600 mb-4">
                Se el anfitrion de un evento y conoce nuevas personas.
              </p>
              <a href="#" className="text-blue-500 hover:underline">Crear evento</a>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default HowItWorks