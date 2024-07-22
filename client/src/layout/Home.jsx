import React from 'react';
import EventCard from "../components/EventCard";
import Slider from "../components/Slider";
import HeroSection from '../components/HeroSection';
import PopularCategories from '../components/PopularCategories';
import HorizontalCards from '../components/HorizontalCards';
import VerticalCards from '../components/VerticalCards';
import LastestEvents from '../components/LastestEvents';


const Home = () => {
  return (
    <>
    <HeroSection/>
    <PopularCategories/>
    <LastestEvents/>
    {/* <HorizontalCards/> */}
      {/* <Slider /> */}
      {/* <EventCard /> */}
      {/* mas componentes del home inicial ..*/}
    </>
  );
};

export default Home;
