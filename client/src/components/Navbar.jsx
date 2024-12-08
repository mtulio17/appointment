import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
// import { Country } from "country-state-city";
import { SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";
import { Calendar, Search, Info, Bookmark, X} from "lucide-react";
import { getEvents } from "../api/apievents";
import useFetch from "../hooks/use-fetch";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const { fn: fnEvents} = useFetch(getEvents, { searchQuery });

  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(
    debounce(async () => {
      if (searchQuery.length > 2) {
        const result = await getEvents({ searchQuery });
        if (result) {
          const sortedSuggestions = result
            .slice(0, 5)
            .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
          setSuggestions(sortedSuggestions);
        }
        setLoading(false);
        setIsSuggestionsOpen(true); // Muestra las sugerencias
      } else {
        setSuggestions([]);
        setIsSuggestionsOpen(false);
      }
    }, 300),
    [searchQuery]
  );

  // Manejo de cambios en el input de búsqueda
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);


  // Manejo de cambios en el input de búsqueda
  useEffect(() => {
    if (searchQuery) {
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
    // Redirigir a la página de resultados con los parámetros de búsqueda
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };
  
  
  return (
    <Disclosure as="nav" className="z-20 absolute top-0 w-full rounded-xl">
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
                <form onSubmit={handleSearch} className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 focus-within:border-[#00798a]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange} 
                    placeholder="Buscar por nombre de actividad"
                    className="w-96 py-1.5 px-4 pr-10 rounded-md border-0 text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:outline-none sm:text-sm"
                  />
                  
                  {/* Botón de limpiar */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 text-Button focus:outline-none rounded-full transition-all duration-300 animate-fade"
                    >
                      <X size={18} />
                    </button>
                  )}

                  {/* Botón de búsqueda */}
                  <button
                    type="submit" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-Button/70 focus:outline-none"
                  >
                    <Search size={20} />
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
                      <Calendar className="mb-1.5 group-hover:text-[#00798a] duration-200" strokeWidth={1} size={20} />
                      <span className="text-xs text-gray-600 font-medium group-hover:text-[#00798a]">Eventos</span>
                    </Link>

                    <Link to="/saved-events" className="flex flex-col items-center group">
                      <Bookmark className="mb-1.5 group-hover:text-[#00798a] duration-200" strokeWidth={1} size={20} />
                      <span className="text-xs text-gray-600 font-medium group-hover:text-[#00798a]">Favoritos</span>
                    </Link>

                    <div className="flex items-center space-x-6">
                      <div className="border-l border-gray-300 h-12" /> {/* línea vertical */}
                      <Link to="/help" className="flex flex-col items-center group">
                        <Info className="mb-1.5 group-hover:text-[#00798a] duration-200" strokeWidth={1} size={20} />
                        <span className="text-xs text-gray-600 font-medium group-hover:text-[#00798a]">Ayuda</span>
                      </Link>
                    </div>

                  <div className="flex items-center mb-1">
                      <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 " } }}>
                        <UserButton.MenuItems>
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