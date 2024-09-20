import React, { Suspense } from "react";
import { ModalProvider } from "../context/ModalContext";
// Carga diferida del componente
const HeroSection = React.lazy(() => import("../components/HeroSection"));
const LastestEvents = React.lazy(() => import("../components/LastestEvents"));
const PopularCategories = React.lazy(() => import("../components/PopularCategories"));
const HowItWorks = React.lazy(() => import("../components/HowItWorks"));
// const EventModal = React.lazy(() => import("../components/EventModal"));

const Home = () => {
  return (
    <>
      <Suspense fallback={"null"}>
        <ModalProvider>
          <HeroSection />
          <LastestEvents />
          <PopularCategories />
          <HowItWorks />
          {/* <EventModal /> */}
        </ModalProvider>
      </Suspense>
    </>
  );
};

export default Home;
