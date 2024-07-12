import React from 'react';
import EventCard from "../components/EventCard";
import Slider from "../components/Slider";
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <>
    <HeroSection/>
      <Slider />
      <EventCard />
      {/* mas componentes del home inicial ..*/}
    </>
  );
};

export default Home;
