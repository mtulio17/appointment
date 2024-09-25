import { Suspense, lazy } from "react";
import BarLoader from "react-spinners/BarLoader";
// Carga diferida del componente
const HeroSection = lazy(() => import("../components/HeroSection"));
const LastestEvents = lazy(() => import("../components/LastestEvents"));
const PopularCategories = lazy(() => import("../components/PopularCategories"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
// const EventModal = React.lazy(() => import("../components/EventModal"));

const LoadingSkeleton = () => (
  <div className="loading-container">
    <BarLoader color="#2C2C2C" width={"100%"} />
  </div>
);
const Home = () => {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <HeroSection />
        <LastestEvents />
        <PopularCategories />
        <HowItWorks />
      </Suspense>
    </>
  );
};

export default Home;
