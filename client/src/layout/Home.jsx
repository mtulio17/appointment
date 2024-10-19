import { Suspense, lazy } from "react";
import BarLoader from "react-spinners/BarLoader";
import Footer from "../components/Footer";
// Carga diferida del componente
const HeroSection = lazy(() => import(/* webpackPrefetch: true */ "../components/HeroSection"));
const LastestEvents = lazy(() => import(/* webpackPrefetch: true */ "../components/LastestEvents"));
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
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <LastestEvents />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <PopularCategories />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <HowItWorks />
      </Suspense>
      <Footer />
    </>
  );
};

export default Home;
