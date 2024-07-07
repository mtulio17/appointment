import { useState, useEffect } from "react";
import { Disclosure, Menu, Transition} from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { LuSettings2, LuSearch, LuLogOut, LuLogIn, LuMenu, LuX } from "react-icons/lu";
import Appointment from '../assets/images/Appointment.png'
import ProfileMenu from './ProfileMenu'
// import UserLogged from "./UserLogged";

const Navbar = () => {
     const [open, setOpen] = useState(false)
     const [query, setQuery] = useState('');
     const [token, setToken] = useState(null);
     const { loginWithRedirect, loginWithPopup, user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

     const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };  

    const handleSearch = () => {
        // Implementa la lógica de búsqueda aquí
        console.log('Búsqueda realizada:', query, 'en', location);
    };
    
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const openMenu = () => {
        if (isAuthenticated) {
          setOpen(!open);
        } else {
          loginWithRedirect();
        }
      };


      const handleLogout = async () => {
        if (isAuthenticated) {
          await logout();
          setToken(null);
          localStorage.removeItem("session"); // Opcional
        }
      };
    
      const fetchToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
        } catch (error) {
          console.error("Error obteniendo token:", error);
          loginWithPopup(); 
        }
      };
    
      useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
          fetchToken(); // Buscar traer el token si hay sesión almacenada
        }
        return () => {};
      }, []);


      return (
        <>
          <Disclosure as="nav" className="bg-gray-400">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl py-2 px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                     <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                     <Disclosure.Button>
                      <span className="absolute -inset-0.5">
                        <span className="sr-only">Abrir menu
                          {open ? (
                            <LuX className="block h-6 w-6" aria-hidden="true"/>
                          ) : (
                            <LuMenu className="block h-6 w-6" aria-hidden="true"/>
                          )}
                        </span>
                      </span>
                     </Disclosure.Button>
                     </div>
                      {/* Nav */}
                    {/* <div className="flex flex-1 items-center justify-center sm:justify-start md:justify-between"> */}
                      <div className="flex flex-shrink-0 items-center">
                        <img
                          className="h-40 sm:h-28 md:h-40 w-50"
                          src={Appointment}
                          alt="Appointment"
                        />
                      </div>
                      <div className="sm:ml-6">
                        <div className="flex">
                          {/* inputs */}
                          <div className="w-full flex items-center ml-6">
                            <div className="w-4/5 flex items-center mr-3">
                              <div className="flex border-colorGrey rounded-xl">
                                <input
                                  type="text"
                                  placeholder="Buscar..."
                                  value={query}
                                  onChange={handleQueryChange}
                                  className="h-10 w-1/2 pl-1 ml-2 rounded-l-xl border-r border-colorWhite focus:outline-none text-sm"
                                />
                                <input
                                  type="text"
                                  placeholder={location}
                                  value={location}
                                  onChange={handleLocationChange}
                                  className="h-10 pl-1 w-5/12 rounded-r-xl focus:outline-none text-xs"
                                />
                              </div>
                              <button
                                onClick={handleSearch}
                                className="rounded-xl bg-none text-colorGrey hover:bg-colorWhite px-3 py-2.5 "
                              >
                                <LuSearch className="text-xl" />
                              </button>
                            </div>
                            <div className="navbar-filters text-colorWhite">
                              {/* <button className="rounded-md bg-colorBlue hover:opacity-50 mx-1 bg-black px-3.5 py-2.5 flex items-center justify-center">
                                                        <LuSettings2 className='text-xl mr-2' />
                                                        Filtros
                                                    </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
    
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            {isAuthenticated ? (
                            <>
                            <ProfileMenu handleLogout={handleLogout} user={user}/>
                            </>
                            ) : (
                            <button onClick={loginWithRedirect}>Iniciar sesión <LuLogIn/></button>
                            )}
                          </div>
                        </Menu>
                      </div>
                    </div>
                  </div>
                {/* </div> */}
              </>
            )}
          </Disclosure>
        </>
      );
    };
    
export default Navbar;
