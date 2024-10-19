import { useCallback, useEffect, useState, memo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
// import { Country } from "country-state-city";
//
import { SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";
import { Calendar, CirclePlus, HandHelping, Search, Info, Bookmark} from "lucide-react";
import { getEvents } from "../api/apievents";
import useFetch from "../hooks/use-fetch";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [country, setCountry] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const { fn: fnEvents, data: events, isLoading: loadingEvents } = useFetch(getEvents, { searchQuery });


  // Obtén la lista de países
  // const countries = Country.getAllCountries().map(country => ({
  //   value: country.isoCode,
  //   label: country.name
  // }));

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
    if (searchQuery) {
      // Asegúrate de que `country` tenga el formato correcto (valor del país)
      fnEvents({ searchQuery: searchQuery || "" });
    }
  }, [searchQuery]);
  


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
    // Navega a la página de resultados con los parámetros de búsqueda
    if (query) {
      navigate(`/search?query=${query}`);
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
                <form onSubmit={handleSearch} className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-1 focus-within:ring-Button">
                  <input type="text" placeholder="Buscar por nombre de evento.." value={searchQuery} onChange={handleInputChange} className="w-96 rounded-md border-0 py-1.5 px-4 pr-16 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"/>
                  <button type="submit" className="absolute right-2 bg-transparent flex items-center justify-center h-full">
                    <Search className="w-5 h-5" stroke="#032f62" />
                  </button>
                </form>
              </div>

              <div className="relative ml-2 space-x-4">
                <SignedOut>
                  <button onClick={() => setShowSignIn(true)} className="text-white font-medium rounded-lg border border-transparent bg-[#00798a] px-2 py-2 md:px-4 md:py-3 lg:px-2.5 lg:py-2 lg:text-sm duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 shadow">
                    Crear Nuevo Evento
                    {/* <LucidePlusCircle size={16} className="ml-2" strokeWidth={1.5} /> */}
                  </button>
                  <button onClick={() => setShowSignIn(true)} className="text-[#212121] hover:text-[#335da5] font-medium px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-2.5 text-sm duration-200">
                    Ingresar
                  </button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-10 mr-2">
                    <Link to="/my-created-events" className="flex flex-col items-center group">
                      <Calendar className="w-5 h-5 mb-1.5 text-gray-800 group-hover:text-[#00798a] duration-200" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600 font-medium group-hover:text-[#00798a]">Eventos</span>
                    </Link>

                    <Link to="/saved-events" className="flex flex-col items-center group">
                      <Bookmark className="w-5 h-5 mb-1.5 text-gray-800 group-hover:text-[#00798a] duration-200" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600 font-medium group-hover:text-[#00798a]">Favoritos</span>
                    </Link>

                    <div className="flex items-center space-x-6">
                      <div className="border-l border-gray-300 h-8" /> {/* línea vertical */}
                      <Link to="/help" className="flex flex-col items-center group">
                        <Info className="w-5 h-5 mb-1.5 text-gray-800 group-hover:text-[#00798a] duration-200" strokeWidth={1.5} />
                        <span className="text-xs text-gray-600 font-medium group-hover:text-[#00798a]">Ayuda</span>
                      </Link>
                    </div>

                  <div className="flex items-center mb-1">
                      <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 " } }}>
                        <UserButton.MenuItems>
                          {/* <UserButton.Link
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
                          /> */}
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
                  signUpForceRedirectUrl="/"
                  fallbackRedirectUrl="/"
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