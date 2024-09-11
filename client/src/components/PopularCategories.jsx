import React from "react";
import axios from "axios";
import sportIcon from "../assets/icons/sport.webp";
import learnIcon from "../assets/icons/learning.webp";
import adventureIcon from "../assets/icons/adventure.webp";
import wellbeingIcon from "../assets/icons/wellbeing.webp";
import recreationalIcon from "../assets/icons/recreational.webp";
import mentalIcon from "../assets/icons/mental.webp";
import socialIcon from "../assets/icons/social.webp";
import culturalIcon from "../assets/icons/cultural.webp";

const PopularCategories = () => {
  const categories = [
    { name: "Deportes y Fitness", icon: sportIcon },
    { name: "Cursos", icon: learnIcon },
    { name: "Aventura y Viajes", icon: adventureIcon },
    { name: "Salud y Bienestar", icon: wellbeingIcon },
    { name: "Recreativas", icon: recreationalIcon },
    { name: "Mentales", icon: mentalIcon },
    { name: "Sociales", icon: socialIcon },
    { name: "Culturales", icon: culturalIcon },
  ];

  const handleCategoryClick = (categoryId) => {
    axios
      .get(`/api/events?category=${categoryId}`)
      .then((response) => {
        // Muestra los eventos filtrados según la categoría
        console.log("Eventos por categoría:", response.data);
      })
      .catch((error) =>
        console.error("Error al obtener eventos por categoría:", error)
      );
  };

  return (
    <section className="py-8 bg-SectionBg">
      <div className="container rounded-lg max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl text-[#2C2C2C] font-bold text-center mb-10">
          Categorías Populares
        </h2>
        <div className="relative">
          <div
            className="grid grid-cols-2 md:grid-cols-8 max-w-7xl mx-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category._id)}
                className="flex flex-none flex-col items-center text-center cursor-pointer mt-2 mx-auto"
                style={{ width: "120px" }}
              >
                <div className="p-2.5 bg-white rounded-full shadow-md mb-2">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-9 h-9"
                  />
                </div>
                <h3 className="text-[16px] font-semibold text-H1Color">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
