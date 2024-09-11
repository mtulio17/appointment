import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Disclosure, Menu } from "@headlessui/react";
import { Country } from "country-state-city";
import { LuHeart, LuSearch} from "react-icons/lu";
import Appointment from "../assets/images/Appointment.png";
import { SignedIn, SignedOut, SignIn, UserButton, useUser} from "@clerk/clerk-react";
import { BellRing, Calendar, ChevronDown, CirclePlusIcon, HandHelping} from "lucide-react";
import { getEvents } from "../api/apievents";
import useFetch from "../hooks/use-fetch";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const { fn: fnEvents, data: events, isLoading: loadingEvents } = useFetch(getEvents, { country, searchQuery });

  const {isLoaded} = useUser();

  // Obtén la lista de países
  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  // Manejo de cambios en el input de búsqueda
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  useEffect(() => {
    if (isLoaded && (searchQuery || country)) {
      fnEvents();
    }
  }, [isLoaded, country, searchQuery]);

   // Manejo de cambios en el input de búsqueda
   const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      fnEvents().then((result) => {
        if (result) {
          setSuggestions(result.slice(0, 4)); // mostrar las primeras 5 sugerencias
        }
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const normalizeText = (text) => {
    return text
      .normalize('NFD') // Descompone caracteres acentuados en caracteres base + acento
      .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
      .toLowerCase(); // Convierte a minúsculas
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = normalizeText(searchQuery.trim()); 
    if (query || country) {
      navigate(`/search?query=${query}&country=${country}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    navigate(`/search?query=${suggestion.name}&country=${country}`);
  };


  return (
    <Disclosure as="nav" className="absolute top-0 w-full rounded-xl z-20">
      {({ open }) => (
        <>
          <div className="bg-[#fbfbfb] container mx-auto max-w-full py-2 px-2 sm:px-6 lg:px-8 border-b border-gray-100 fixed">
            <div className="relative flex h-14 items-center justify-between">
              <Link to="/">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-20 w-20 sm:h-20 md:h-20 lg:w-20 lg:h-20"
                    src={Appointment}
                    alt="Appointment"
                  />
                </div>
              </Link>

              <form className="flex-1 justify-start items-start space-x-2 ml-8" onSubmit={handleSearch}>
                <div className="relative hidden lg:flex items-center">
                  <input
                    type="text"
                    name="search-query"
                    placeholder="Buscar eventos.."
                    className="p-1.5 pl-4 px-16 bg-[#fbfbfb] border border-gray-300 rounded-l-lg focus:outline-none placeholder:text-sm placeholder:font-normal focus:border-blue-800 placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <Menu as="div" className="relative ml-2">
                  <Menu.Button className="inline-flex items-center p-2 border border-gray-300 rounded-md">
                    {country || 'Filtrar por país'}
                    <ChevronDown className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 py-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {countries.map((country) => (
                      <Menu.Item key={country.value}>
                        {({ active }) => (
                          <button
                            onClick={() => setCountry(country.value)}
                            className={`block w-full px-4 py-2 text-left ${active ? 'bg-gray-100' : ''}`}
                          >
                            {country.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
                  <button className="p-2.5 bg-[#032f62] border border-Button/50 rounded-r-xl text-white focus:outline-none">
                    <LuSearch className="text-white" />
                  </button>
                  {/* Sugerencias de búsqueda */}
                  {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </form>
              
              <div className="relative ml-2 space-x-4">
                <SignedOut>
                  <button onClick={() => setShowSignIn(true)} className="text-[#212121] hover:text-[#335da5] font-semibold px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-2.5 text-sm duration-200">
                    Iniciar Sesión
                  </button>
                  <button onClick={() => setShowSignIn(true)} className="text-white font-medium rounded-lg border border-transparent bg-Button px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-2 text-sm duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 shadow">
                    Registrarme
                  </button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-10 mr-2">
                    <Link to="/notifications" className="text-[#212121] hover:text-[#335da5] flex flex-col items-center">
                      <BellRing className="w-5 h-5" />
                    </Link>
                    <Link to="/post-event" className="text-[#212121] hover:text-[#335da5] flex flex-col items-center">
                      <CirclePlusIcon className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center">
                      <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 " } }}>
                        <UserButton.MenuItems>
                          <UserButton.Link
                            label="Mis Eventos"
                            labelIcon={<Calendar size={16} />}
                            href="/my-created-events"
                          />
                          <UserButton.Link
                            label="Eventos Guardados"
                            labelIcon={<LuHeart size={16} />}
                            href="/saved-events"
                          />
                          <UserButton.Link
                            label="Ayuda"
                            labelIcon={<HandHelping size={16} />}
                            href="#"
                          />
                          <UserButton.Link
                            label="Politicas de Privacidad"
                            labelIcon={<HandHelping size={16} />}
                            href="#"
                          />
                          <UserButton.Action label="manageAccount" />
                        </UserButton.MenuItems>
                      </UserButton>
                      {/* <span className="text-center text-xs font-medium">{">"}</span> */}
                    </div>
                  </div>
                </SignedIn>
              </div>
            </div>
            {showSignIn && (
              <div
                className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
                onClick={handleOverlayClick}
              >
                <SignIn
                  signUpForceRedirectUrl="/my-created-events"
                  fallbackRedirectUrl="/my-created-events"
                />
              </div>
            )}
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
