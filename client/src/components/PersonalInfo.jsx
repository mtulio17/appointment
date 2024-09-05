import React from 'react';

const PersonalInfo = () => {
  return (
    <div className="max-w-2xl p-6 bg-white rounded-lg shadow mt-20">
      <h1 className="text-2xl font-bold mb-4">Información personal</h1>
      <p className="text-sm text-gray-500 mb-6">
        Si completas esta información, mejorarás las recomendaciones de grupos. Tu género y tu cumpleaños no se mostrarán en tu perfil público.
      </p>

      <form>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Cumpleaños</label>
          <div className="flex space-x-2 mt-2">
            <select className="w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
              <option>Mes</option>
              {/* Agrega las opciones de mes aquí */}
            </select>
            <select className="w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
              <option>Día</option>
              {/* Agrega las opciones de día aquí */}
            </select>
            <select className="w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
              <option>Año</option>
              {/* Agrega las opciones de año aquí */}
            </select>
          </div>
          <button className="text-blue-600 text-sm mt-2">Borrar</button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <select className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option>Preferiría no responder</option>
            {/* Agrega más opciones de género aquí */}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">¿Qué estás buscando?</label>
          <div className="flex flex-wrap gap-2 mt-2">
            <button className="flex items-center border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100">
              📚 Practicar aficiones
            </button>
          
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Etapas de la vida</label>
          <div className="flex flex-wrap gap-2 mt-2">
            <button className="flex items-center border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100">
              🎓 Recent Graduate
            </button>
          </div>
        </div>

        <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
