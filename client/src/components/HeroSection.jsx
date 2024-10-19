import { useEffect, useState } from "react";
import {motion} from "framer-motion";
import {LazyLoadImage} from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const HeroSection = () => {
  const [imageOrder, setImageOrder] = useState([1, 2, 3, 4, 5]);

  // Función que rota el orden de las imágenes
  const rotateImages = () => {
    setImageOrder((prevOrder) => {
      const [first, ...rest] = prevOrder;
      return [...rest, first];
    });
  };

  return (
    <section className="relative w-full my-32">
     {/* Efecto de fondo degradado en el lado derecho */}
     <div 
     className="absolute right-0 top-0 w-2/4 h-full blur-xl z-0" 
     style={{ background: "linear-gradient(190.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.15) 40.92%, rgba(204, 171, 238, 0.09) 72.35%)"}}
     />

    <div className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4">
      {/* Texto del Hero */}
      <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
        <h1 className="lg:text-6xl md:text-5xl font-bold mb-4">
          ¡Conéctate, participa y disfruta!
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Únete a nuestra comunidad y descubre eventos emocionantes cerca de ti. Haz nuevas conexiones, vive momentos memorables y lleva tu vida social al siguiente nivel.
        </p>
        <div className="flex space-x-4 justify-center lg:justify-start">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link
            to="/?sign-in=true"
            className="border border-[#00798a] text-white bg-[#00798a] font-medium lg:text-[15px] px-5 py-3 rounded-lg flex items-center text-center focus:outline-none"
          >
            Quiero ser parte de la comunidad
            {/* <ArrowRightCircle className="ml-2" size={16} /> */}
          </Link>
        </motion.div>
        </div>
      </div>

    {/* Imágenes flotantes en formato entrelazado */ }
    <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-12 lg:mt-0 z-10">
      <div className="relative w-full h-[500px] flex items-center justify-center">
        {/* Imagen 1 (izquierda, columna principal) */}
        <LazyLoadImage
            src="https://plus.unsplash.com/premium_photo-1685366454253-cb705836c5a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 1"
            className="absolute top-3 left-16 w-44 h-64 object-cover rounded-xl shadow-xl"
            style={{
              zIndex: 1,
            }}
          />
        {/* Imagen 2 (derecha, superior) */}
        <LazyLoadImage
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 2"
          className="absolute top-2 right-[-10%] w-40 h-60 object-cover rounded-xl shadow-xl transform translate-y-[10%]"
            
        />
        {/* Imagen 3 (izquierda, inferior, ligeramente superpuesta) */}
        <LazyLoadImage
          src="https://plus.unsplash.com/premium_photo-1682401101125-e9ee884768da?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 3"
          className="absolute bottom-2 left-36 w-44 h-60 object-cover rounded-xl shadow-xl transform translate-y-[5%] translate-x-[20%]"
          style={{
            zIndex: 0, // Para que se superponga ligeramente a la imagen de la derecha
          }}
        />
        {/* Imagen 4 (superior derecha, entrelazada) */}
        <LazyLoadImage
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 4"
          className="absolute top-14 left-[50%] w-40 h-56 object-cover rounded-xl shadow-xl transform translate-y-[5%] translate-x-[-15%]"
          style={{
            zIndex: 1, // Por detrás de otras imágenes
          }}
        />
        {/* Imagen 5 (inferior derecha) */}
        <LazyLoadImage
          src="https://plus.unsplash.com/premium_photo-1705882849770-984e7935a359?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 5"
          className="absolute bottom-[2%] right-16 w-40 h-56 object-cover rounded-xl shadow-xl transform translate-y-[-10%]"
          style={{
            zIndex: 1,
          }}
        />
        </div>
        </div>
      </div>
  </section>
  );
};


export default HeroSection;
