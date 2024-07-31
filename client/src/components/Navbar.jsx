import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { LuLogIn, LuSearch } from "react-icons/lu";
import Appointment from '../assets/images/Appointment.png'
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState('');
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const handleLogout = async () => {
    if (isAuthenticated) {
      await logout({ returnTo: window.location.origin });
    }
  };

  const handleSearch = () => {
    console.log('Buscar actividad:', activity);
    console.log('Buscar ubicación:', location);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        console.error("Error obteniendo token:", error);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    // <Disclosure as="nav" className=" fixed top-0 left-1/2 transform -translate-x-1/2 w-3/4 bg-gradient-to-r bg-white bg-opacity-80  rounded-xl shadow-lg z-20">
    <Disclosure as="nav" className="absolute top-0 w-full rounded-xl z-20">
    {({ open }) => (
      <>
        <div className="container mx-auto max-w-full py-2 px-2 sm:px-6 lg:px-8 border-b border-gray-200/80">
          <div className="relative flex h-16 items-center justify-between">
            <Link to="/">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-40 w-40 sm:h-28 md:h-40 lg:w-36 lg:h-36" src={Appointment} alt="Appointment"
              />
            </div>
            </Link>
            <div className="flex-1 justify-start items-start space-x-4 ml-10">
              <div className="hidden lg:flex items-center">
                <input
                  type="text"
                  placeholder="Buscar actividades..."
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="p-2 pl-3 px-24 bg-transparent border border-gray-300 rounded-l-lg focus:outline-none placeholder:text-[16px] placeholder:font-normal focus:border-gray-800 placeholder:text-gray-700"
                  />
                <input
                  type="text"
                  placeholder="Ciudad o barrio..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="p-2 pl-3 px-10 bg-transparent border-t border-b border-gray-300 focus:outline-none placeholder:text-[16px] placeholder:font-normal focus:border-gray-800 placeholder:text-gray-700"
                />
                <button
                  onClick={handleSearch}
                  className="p-3 bg-Button border border-Button/40 rounded-r-xl text-white focus:outline-none"
                >
                  <LuSearch className="text-white" />
                </button>
              </div>
              <div className="lg:hidden flex items-center gap-4">
                <button
                  className="text-Button font-medium"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <LuSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative ml-3">
                  {isAuthenticated ? (
                    <ProfileMenu handleLogout={handleLogout} user={user} />
                  ) : (
                    <div className="flex justify-between items-center space-x-2">    
                    <Link
                      className="font-normal text-gray-800 rounded-lg border border-transparent px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-2.5 text-[16px] font-semibold duration-300 hover:text-Button focus:outline-none"
                      to="sign-in"
                    >
                    Iniciar sesión
                    </Link>
                    <button className="text-white font-medium rounded-lg border border-transparent bg-Button px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-2.5 text-sm font-semibold hover:bg-ButtonHover duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow"
                    // onClick={handleLoginClick}
                    >
                     Registrarme
                    </button>
                    </div>
                  )}
                </div>
          </div>
        </div>
        {isExpanded && (
          <div className="lg:hidden px-2 pt-2 pb-3 space-y-1 bg-Link">
            <input
              type="text"
              placeholder="Busca una actividad..."
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="px-4 py-2 mb-2 rounded-lg text-gray-800 bg-background w-full"
            />
            <input
              type="text"
              placeholder="Ingresa tu ubicación..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 mb-2 rounded-lg text-gray-800 bg-background w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-Button text-white px-6 py-2 rounded-lg hover:bg-ButtonHover w-full"
            >
              Buscar
            </button>
          </div>
        )}
      </>
    )}
  </Disclosure>
  );
};

export default Navbar;
