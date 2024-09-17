import React from "react";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
<section className="relative w-full my-28">
  {/* Formas abstractas SVG */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Forma 1 */}
    <svg
      className="absolute top-0 left-0 w-[300px] h-[300px] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <path
        fill="#FF6F61" // Coral
        d="M40.2,-47.1C52.7,-39.5,62.2,-26.7,64.7,-12.3C67.2,2.1,62.7,17.9,54.7,30.2C46.6,42.6,34.9,51.5,21.3,56.3C7.6,61.2,-8.1,62.2,-23.7,57.1C-39.3,52.1,-54.8,41.1,-64.3,26.7C-73.9,12.3,-77.6,-5.4,-71.8,-19.6C-65.9,-33.8,-50.5,-44.5,-35.6,-51.9C-20.7,-59.4,-10.4,-63.7,2.2,-66C14.8,-68.4,29.6,-68.7,40.2,-47.1Z"
        transform="translate(100 100)"
      />
    </svg>

    {/* Forma 2 */}
    <svg
      className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-40"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <path
        fill="#00CCFF" // Azul claro
        d="M30.2,-50.4C41.6,-41.1,51.7,-33.3,60.2,-22.5C68.7,-11.7,75.6,1.2,73.8,13.7C72.1,26.1,61.8,38.2,50.1,46.6C38.4,55,25.3,59.7,11.2,62.9C-3,66,-16.1,67.5,-26.6,61.3C-37.1,55,-44.9,41,-52.5,28.5C-60.1,16.1,-67.6,5.3,-67.2,-6.4C-66.7,-18,-58.3,-30.5,-47.3,-39.9C-36.3,-49.3,-22.7,-55.7,-8.5,-55.7C5.8,-55.7,11.6,-49.4,30.2,-50.4Z"
        transform="translate(100 100)"
      />
    </svg>

    {/* Forma 3 */}
    <svg
      className="absolute top-1/4 left-1/4 w-[250px] h-[250px] opacity-30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <path
        fill="#FFCC00" // Amarillo
        d="M50.1,-48.8C63.6,-42.1,73.1,-31.7,75.6,-20.3C78.1,-8.9,73.5,4.3,66.3,15.5C59.1,26.7,49.2,35.7,37.7,41.8C26.1,48,12.8,50.2,-0.4,48.9C-13.7,47.6,-27.4,42.8,-37.9,32.9C-48.4,22.9,-54.8,7.7,-55.5,-7.3C-56.1,-22.2,-51,-37.7,-38.8,-49.2C-26.5,-60.7,-7.6,-67.8,8.2,-67.5C24,-67.2,35.4,-60.5,50.1,-48.8Z"
        transform="translate(100 100)"
      />
    </svg>

    {/* Forma 4 */}
    <svg
      className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] opacity-40"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <path
        fill="#00FF99" // Verde menta
        d="M38.4,-54.1C48.7,-44.9,55.5,-30.8,58.7,-15.3C61.8,0.2,60.3,16.7,50.8,29.8C41.3,43,24.9,52.8,11.2,58.6C-2.5,64.5,-13.8,65.7,-23.3,58.5C-32.8,51.3,-39.8,35.8,-48.7,23.5C-57.6,11.2,-68.4,2.2,-71.8,-7.6C-75.2,-17.5,-71.2,-27.7,-63.2,-37.3C-55.2,-46.9,-42.8,-54.9,-30.2,-56.5C-17.6,-58.1,-8.8,-53.2,2.5,-51.2C13.9,-49.2,27.7,-50,38.4,-54.1Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>

  {/* Contenido principal */}
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl sm:my-5 px-4">
      <motion.div
        className="relative z-10 p-4 rounded-lg text-center lg:text-left w-full lg:w-2/3 mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl md:text-6xl lg:text-5xl font-bold tracking-normal mb-4">
          ¡Conéctate, participa y disfruta!{" "}
          <h2 className="text-primaryHover">Transforma cada actividad</h2>
          <h2>en una experiencia única</h2>
        </h3>
        <p className="lg:text-lg font-medium lg:w-3/4 text-[#212121]/70 mb-6">
          Únete a nuestra comunidad y descubre eventos emocionantes cerca de ti. Haz nuevas conexiones, vive momentos memorables y lleva tu vida social al siguiente nivel.
        </p>
        <div className="flex justify-center lg:justify-start">
          <div className="flex items-center mt-4">
            <Link
              to="/?sign-in=true"
              className="bg-[#003366] text-white font-medium px-2.5 py-2.5 rounded-lg hover:bg-[#66CDAA] duration-300 shadow-md"
            >
              Quiero ser parte de Appointment
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative w-full lg:w-1/3 h-full md:flex"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
      </motion.div>
    </div>
  </div>
</section>

  );
};


export default HeroSection;
