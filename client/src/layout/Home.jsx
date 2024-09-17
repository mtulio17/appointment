import React, { Suspense } from "react";
import { ModalProvider } from "../context/ModalContext";
// Carga diferida del componente
const HeroSection = React.lazy(() => import("../components/HeroSection"));
const LastestEvents = React.lazy(() => import("../components/LastestEvents"));
const PopularCategories = React.lazy(() =>import("../components/PopularCategories"));
const HowItWorks = React.lazy(() => import("../components/HowItWorks"));
const EventModal = React.lazy(() => import("../components/EventModal"));

const Home = () => {
  return (
    <>
      <ModalProvider>
        {/* cada componente con su propio suspense para permitir carga progresiva */}
        <Suspense fallback={<div>Cargando...</div>}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div>Cargando...</div>}>
          <LastestEvents />
        </Suspense>
        <Suspense fallback={<div>Cargando...</div>}>
          <PopularCategories />
        </Suspense>
        <Suspense fallback={<div>Cargando...</div>}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<div>Cargando...</div>}>
          <EventModal />
        </Suspense>
      </ModalProvider>
    </>
  );
};

export default Home;
