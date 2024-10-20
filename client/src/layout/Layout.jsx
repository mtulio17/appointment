import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <Suspense fallback={"..."}>
        <div className="flex-grow">
          <Outlet />
        </div>
      </Suspense>
      {/* <Footer /> */}
    </div>
    </>
  );
};

export default Layout;
