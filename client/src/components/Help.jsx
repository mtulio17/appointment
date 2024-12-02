import React, { useState } from 'react';
import BackButton from '../ui/button/BackButton';

const faqs = [
  {
    question: "¿Cómo crear un evento?",
    answer: "Explicación paso a paso de cómo los usuarios pueden crear un evento, añadir detalles (fecha, hora, ubicación, descripción) y gestionar participantes."
  },
  {
    question: "¿Cómo unirse a un evento?",
    answer: "Instrucciones para encontrar eventos relevantes, unirse y confirmar participación."
  },
  {
    question: "¿Cómo editar mi perfil?",
    answer: "Detalles sobre cómo actualizar información personal, cambiar la foto de perfil, intereses, etc."
  },
  {
    question: "¿Cómo encontrar eventos que coincidan con mis intereses?",
    answer: "Explicación sobre el algoritmo o las opciones de filtrado por intereses o ubicaciones."
  },
  {
    question: "¿Qué hacer si no recibo notificaciones?",
    answer: "Solución de problemas comunes relacionados con las notificaciones push o por correo electrónico."
  },
  {
    question: "¿Cómo eliminar mi cuenta?",
    answer: "Instrucciones para cerrar o desactivar la cuenta si el usuario decide dejar de usar la app."
  },
  {
    question: "Guías Paso a Paso - Cómo empezar",
    answer: "Explicación básica para nuevos usuarios, cómo registrarse y comenzar a usar la app."
  },
  {
    question: "Guías Paso a Paso - Cómo gestionar eventos",
    answer: "Explicaciones sobre cómo modificar, cancelar o actualizar un evento una vez creado."
  },
  {
    question: "Guías Paso a Paso - Cómo conectarse con otros usuarios",
    answer: "Instrucciones para chatear, enviar mensajes y compartir información con otros participantes del evento."
  },
 
];

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index); 
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-32">
       <div className="absolute top-30 left-16 mb-10">
        <BackButton label="Volver" />
      </div>
      <h2 className="text-3xl font-bold mb-10 text-start underline">Centro de Ayuda</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b">
          <button
            className="w-full text-left py-4 px-6 text-lg font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            onClick={() => toggleAccordion(index)}
          >
            {faq.question}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              index === activeIndex ? "max-h-screen py-4 px-6" : "max-h-0"
            }`}
          >
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Help;
