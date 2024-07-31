import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Cargando contenido ...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
