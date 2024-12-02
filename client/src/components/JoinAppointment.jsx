/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const JoinAppointment = () => {
  return (
    <div className="flex items-center p-8 py-12 bg-slate-100 rounded-xl max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-start md:items-center w-full">
      <div className="md:w-2/3">
        <h2 className="lg:text-2xl font-bold text-gray-800">Unirse a Appointment</h2>
        <p className="text-gray-600 font-normal lg:text-md mt-6">
          Las personas utilizan Appointment para hacer nuevos amigos, aprender, obtener apoyo,
          salir de su zona de confort y compartir sus intereses y pasiones a través de eventos sociales en todo el mundo.
          La inscripción es totalmente gratuita.
        </p>
        <Link to="/?sign-in=true" className="mt-6 inline-block px-8 py-2 bg-[#00798a] text-white rounded-lg hover:bg-[#00798a]/90 duration-200 focus:outline-none">
          Comenzar hoy
        </Link>
      </div>
      <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6">
        <img src="join_appointment.webp" alt="Join Appointment" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  </div>
  );
};

export default JoinAppointment;
