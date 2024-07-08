import React from 'react';
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <EventCard />
      <Footer/>
    </>
  );
};

export default Home;
