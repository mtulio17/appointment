import { useState, useEffect } from "react";
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
    <Disclosure as="nav" className="absolute top-0 w-full rounded-xl  z-20">
    {({ open }) => (
      <>
        <div className="container mx-auto max-w-7xl py-2 px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-40 sm:h-28 md:h-40 w-50"
                src={Appointment}
                alt="Appointment"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center">
                <input
                  type="text"
                  placeholder="Busca una actividad..."
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="px-4 py-2 rounded-l-lg text-TextColor bg-white shadow border border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Ingresa tu ubicación..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="px-4 py-2 rounded-r-lg text-TextColor bg-white shadow border border-gray-200"
                />
                <button
                  onClick={handleSearch}
                  className="bg-Button text-white py-3 px-3 rounded-lg hover:bg-ButtonHover shadow ml-2"
                >
                  <LuSearch/>
                </button>
              </div>
              <div className="lg:hidden flex items-center gap-4">
                <button
                  className="text-Button font-medium"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <LuSearch className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="relative ml-3">
                  {isAuthenticated ? (
                    <ProfileMenu handleLogout={handleLogout} user={user} />
                  ) : (
                    <button
                      className="flex w-full items-center justify-center rounded-lg border border-transparent bg-Button px-3 py-2 md:px-4 md:py-3 text-base font-medium text-white hover:bg-ButtonHover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow"
                      onClick={loginWithRedirect}
                    >
                      Login
                    </button>
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
