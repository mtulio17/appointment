import React from 'react';
import EventCard from "../components/EventCard";
import Slider from "../components/Slider";
import HeroSection from '../components/HeroSection';
import PopularCategories from '../components/PopularCategories';


const Home = () => {
  return (
    <>
    <HeroSection/>
    <PopularCategories/>
      {/* <Slider /> */}
      {/* <EventCard /> */}
      {/* mas componentes del home inicial ..*/}
    </>
  );
};

export default Home;
