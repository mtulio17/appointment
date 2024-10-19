import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/apievents";
import { ChevronLeft, ChevronRight, } from "lucide-react";
import SkeletonCategory from "../ui/skeleton/SkeletonCategory";
import Slider from "react-slick";
import useFetch from "../hooks/use-fetch";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

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
  
  
  const trendCategories = categories?.slice(0, 9) || [];

    // Configuración del slider
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      nextArrow: (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <ChevronRight className="h-6 w-6 text-black" />
        </div>
      ),
      prevArrow: (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
         <ChevronLeft className="h-6 w-6 text-black" />
        </div>
      ),
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    };
  
    if (isLoading) {
      return (
        <section className="py-12">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-lg lg:text-2xl font-bold mb-6">Explorar las categorías principales</h2>
            <div className="relative p-4 rounded-lg">
              <Slider {...settings}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <SkeletonCategory key={index} />
                ))}
              </Slider>
            </div>
          </div>
        </section>
      );
    }

    if (error) return <div>Error al cargar las categorías: {error.message}</div>;
  
    return (
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-lg lg:text-2xl font-bold mb-6">Explorar las categorías populares</h2>
          <div className="relative p-4 rounded-lg ">
            <Slider {...settings}>
            {trendCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="flex flex-col items-center justify-center text-center cursor-pointer p-4 transition-transform transform hover:scale-105"
          >
            <div className="duration-200 p-4 rounded-lg lg:w-24 lg:h-20 bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
              <img
                src={category.icon || 'https://placehold.co/600x400@2x.png'}
                alt={category.name}
                className="w-8 h-8"
                loading="lazy"
              />
            </div>
            <h3 className="mt-5 lg:text-[14px] w-24 justify-center text-center font-semibold text-gray-800">{category.name}</h3>
          </div>
        ))}
      </Slider>
          </div>
        </div>
      </section>
  );
};

export default PopularCategories;
