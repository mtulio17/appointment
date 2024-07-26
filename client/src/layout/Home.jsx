import React from 'react';
import { ModalProvider } from '../context/ModalContext';
import EventCard from "../components/EventCard";
import Slider from "../components/Slider";
import HeroSection from '../components/HeroSection';
import PopularCategories from '../components/PopularCategories';
import HorizontalCards from '../components/HorizontalCards';
import VerticalCards from '../components/VerticalCards';
import LastestEvents from '../components/LastestEvents';
import EventModal from '../components/EventModal';

const Home = () => {
  return (
    <>
      <ModalProvider>
        <HeroSection />
        <LastestEvents />
        <PopularCategories />
        <EventModal />
      </ModalProvider>
    </>
  );
};

export default Home;
