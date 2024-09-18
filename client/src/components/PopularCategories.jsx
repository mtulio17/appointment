import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/apievents";
import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle } from "lucide-react";
import useFetch from "../hooks/use-fetch";
import Slider from "react-slick";

const PopularCategories = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const {fn: fetchCategories, data: categories, error, isLoading} = useFetch(getCategories);

  useEffect(() => {
    if (isLoaded) fetchCategories();
  }, [isLoaded]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      navigate(`/events/category/${categoryId}`);
    } else {
      console.error("El ID de la categoría es indefinido");
    }
  };

  if (error) return <div>Error al cargar las categorías: {error.message}</div>;
  
  // if (isLoading) {
    //   return <BarLoader className="mt-[74px]" width={"100%"} color="#2C2C2C" />;
    // }
    
  const trendCategories = categories?.slice(0, 10) || [];

    // Configuración del slider
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronRight className="h-5 w-5 text-black" /> {/* Flecha siguiente */}
        </div>
      ),
      prevArrow: (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronLeft className="h-5 w-5 text-black" /> {/* Flecha anterior */}
        </div>
      ),
      responsive: [
        {
          breakpoint: 1024, // Tablet
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600, // Mobile
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480, // Small mobile
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

  return (
    <section className="py-12">
    <div className="container rounded-lg max-w-7xl mx-auto px-4 my-8">
      <h2 className="text-lg lg:text-2xl text-[#2C2C2C] font-extrabold mb-12">
        Categorías Populares
      </h2>
      <div className="relative my-12 p-2 rounded-lg">
        <Slider {...settings}>
          {trendCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center justify-center text-center cursor-pointer transition-transform transform hover:scale-105 p-2"
            >
              {/* Contenedor del ícono circular */}
              <div className="flex items-center justify-center bg-gradient-to-b from-indigo-200 to-indigo-400 rounded-full shadow-lg hover:shadow-xl mb-2 w-16 h-16 mx-auto">
                <img
                  loading="lazy"
                  src={category.icon || "https://placehold.co/600x400@2x.png"}
                  alt={category.name}
                  className="w-8 h-8 flex items-center justify-center"
                />
              </div>
              {/* text debajo del ícono */}
              <h3 className="text-sm font-semibold text-gray-600 hover:text-[#032f62] mt-1 whitespace-nowrap">
                {category.name}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </section>
  );
};

export default PopularCategories;
