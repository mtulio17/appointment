import React from "react";
import heroImg from "../assets/images/HeroSection3.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    // <section className="relative h-screen max-w-screen-4xl bg-gradient-to-r from-hover to-hover2">
    <section className="relative w-full my-28">
      {/* <section className="relative h-screen max-w-screen-4xl bg-gradient-to-r from-background to-Background1"> */}
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl sm:my-5 px-4">
          <div className="relative z-10 p-4 rounded-lg text-center lg:text-left w-full lg:w-2/3 mx-auto">
            <h3 className="text-4xl md:text-6xl lg:text-5xl font-extrabold tracking-normal mb-4 text-[#212121]/90">
              La plataforma de las personas: {" "}
              <h2 className="text-primaryHover">donde las actividades se</h2>
              <h2>convierten en experiencias</h2>
            </h3>
            <p className="lg:text-lg font-medium lg:w-3/4 text-[#212121]/70 mb-6">
              Explora y participa en eventos cerca de ti para conocer gente
              nueva y disfrutar de actividades emocionantes que enriquecen tu
              vida social y personal.
            </p>
            <div className="flex justify-center lg:justify-start">
              <div className="flex items-center mt-4">
                <Link to="/sign-up" className="bg-Button text-white font-medium px-3.5 py-3.5 rounded-lg hover:bg-ButtonHover duration-300 shadow-md">
                  Quiero ser parte de Appointment
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-1/3 h-full md:flex">
            <img
              src={heroImg}
              alt="Background"
              className=" bottom-0 right-0 object-cover h-3/4 w-3/4 md:h-full md:w-full lg:w-auto lg:h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
