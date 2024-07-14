import { useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { LuLogIn } from "react-icons/lu";
import Appointment from '../assets/images/Appointment.png'
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const handleLogout = async () => {
    if (isAuthenticated) {
      await logout({ returnTo: window.location.origin });
    }
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
    <Disclosure as="nav" className="bg-link relative z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl py-2 px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-40 sm:h-28 md:h-40 w-50"
                  src={Appointment}
                  alt="Appointment"
                />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    {isAuthenticated ? (
                      <ProfileMenu handleLogout={handleLogout} user={user} />
                    ) : (
                      <button
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-button px-4 py-3 text-base font-medium text-white hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={loginWithRedirect}
                      >
                        Login
                      </button>
                    )}
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
