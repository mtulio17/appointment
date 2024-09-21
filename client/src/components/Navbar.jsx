import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Country } from "country-state-city";
import Select from "react-select";
import { SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";
import { BellPlus, BellRing, Calendar, CirclePlus, CirclePlusIcon, HandHelping, Heart, Search, Info, Bookmark} from "lucide-react";
import { getEvents } from "../api/apievents";
import useFetch from "../hooks/use-fetch";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const { fn: fnEvents, data: events, isLoading: loadingEvents } = useFetch(getEvents, { country, searchQuery });

  // Obtén la lista de países
  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(debounce(async () => {
    if (searchQuery.length > 2) {
      const result = await getEvents({ searchQuery }); // Solo busca por el nombre aquí
      if (result) {
        setSuggestions(result.slice(0, 5)); // Mostrar las primeras 5 sugerencias
      }
    } else {
      setSuggestions([]);
    }
  }, 300), [searchQuery]);

  // Manejo de cambios en el input de búsqueda
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  // Manejo de cambios en el input de búsqueda
  useEffect(() => {
    if (searchQuery || country) {
      // Asegúrate de que `country` tenga el formato correcto (valor del país)
      fnEvents({ country: country?.value || "", searchQuery: searchQuery || "" });
    }
  }, [searchQuery, country]);
  


  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    fetchSuggestions();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const countryValue = country?.value || ""; // Obtén solo el valor del país

    // Navega a la página de resultados con los parámetros de búsqueda
    if (query || countryValue) {
      navigate(`/search?query=${query}&country=${countryValue}`);
    }
  };
  
  
  return (
    <Disclosure as="nav" className="absolute top-0 w-full rounded-xl z-20">
      {({ open }) => (
        <>
          <div className="bg-transparent container mx-auto max-w-full py-2 px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center space-x-14">
                <Link to="/">
                  <div className="flex flex-shrink-0 items-center">
                    <span className="font-bold text-[#f65858] text-lg">Appointment</span>
                  </div>
                </Link>
                <form onSubmit={handleSearch} className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-600">
                  <input type="text" placeholder="Buscar. . ." value={searchQuery} onChange={handleInputChange} className="w-full rounded-md border-0 py-1.5 pl-7 pr-16 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"/>
                      {/* <Select
                      options={countries}
                      value={country}
                      onChange={setCountry} // Asigna directamente el objeto país seleccionado
                      placeholder="Filtrar por país"
                      className="w-48 ml-2 hover:bg-Button"
                      isSearchable
                      menuPlacement="auto"
                      menuPosition="fixed"
                  /> */}
                  <button type="submit" className="absolute right-2 bg-transparent flex items-center justify-center h-full">
                    <Search className="w-5 h-5" stroke="#032f62" />
                  </button>
                </form>
              </div>

              <div className="relative ml-2 space-x-4">
                <SignedOut>
                  <button onClick={() => setShowSignIn(true)} className="text-white font-medium rounded-lg border border-transparent bg-Button px-2 py-2 md:px-4 md:py-3 lg:px-2.5 lg:py-2 lg:text-sm duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 shadow">
                    Crear Nuevo Evento
                  </button>
                  <button onClick={() => setShowSignIn(true)} className="text-[#212121] hover:text-[#335da5] font-medium px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-2.5 text-sm duration-200">
                    Ingresar
                  </button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-10 mr-2">
                    <Link to="/notifications" className="text-gray-600 hover:text-[#335da5] flex flex-col items-center">
                      <BellPlus className="w-5 h-5" />
                    </Link>
                    <Link to="/post-event" className="text-gray-600 hover:text-[#335da5] flex flex-col items-center">
                      <CirclePlus className="w-5 h-5" />
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
                            labelIcon={<Bookmark size={16} />}
                            href="/saved-events"
                          />
                          <UserButton.Link
                            label="Ayuda"
                            labelIcon={<Info size={16} />}
                            href="/help"
                          />
                          <UserButton.Link
                            label="Políticas de Privacidad"
                            labelIcon={<HandHelping size={16} />}
                            href="/privacy-policies"
                          />
                          <UserButton.Action label="manageAccount" />
                        </UserButton.MenuItems>
                      </UserButton>
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