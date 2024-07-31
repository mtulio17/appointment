// import React from 'react';
import { ModalProvider } from '../context/ModalContext';
import HeroSection from '../components/HeroSection';
import PopularCategories from '../components/PopularCategories';
import LastestEvents from '../components/LastestEvents';
import EventModal from '../components/EventModal';
import HowItWorks from '../components/HowItWorks'

const Home = () => {
  return (
    <>
      <ModalProvider>
        <HeroSection />
        <LastestEvents />
        <PopularCategories />
        <HowItWorks/>
        <EventModal />
      </ModalProvider>
    </>
  );
};

export default Home;
