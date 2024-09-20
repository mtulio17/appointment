import { useEffect, useState, useRef, useCallback} from "react"
import { useSession, useUser } from "@clerk/clerk-react"
import useFetch from "../hooks/use-fetch";
import { getCategories, getEvents, getEventsByCategory } from "../api/apievents";
import { BarLoader, PulseLoader} from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";

const EventsPage = ({event}) => {
    const { isLoaded } = useSession();
    const { user } = useUser();
    const { fn: fnEvents, data: events, error: fetchError, isLoading: loadingEvents } = useFetch(getEvents, {});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [participantsByEvent, setParticipantsByEvent] = useState({});
    const [sortOption, setSortOption] = useState("relevance");

    useEffect(() => {
      if (isLoaded) {
        getCategories(user).then((data) => {
          if (data) setCategories(data);
        });
      }
    }, [isLoaded, user]);
  
    useEffect(() => {
      if (isLoaded && !selectedCategory) {
        fnEvents(); 
      }
    }, [isLoaded, selectedCategory]);

    // filtrar eventos por categoría cuando el usuario selecciona una
    useEffect(() => {
      if (selectedCategory) {
        getEventsByCategory(user, selectedCategory).then((data) => {
          if (data) setFilteredEvents(data);
        });
      } else {
        setFilteredEvents(events); // Mostrar todos los eventos si no se selecciona categoría
      }
    }, [selectedCategory, user, events]);

    useEffect(() => {
      let sortedEvents = [...filteredEvents];

      if(sortOption === "recent"){
        sortedEvents.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
      }else if (sortOption === "relevance") {
        sortedEvents.sort((a, b) => b.participants - a.participants);
      }

      setFilteredEvents(sortedEvents);;
    }, [sortOption]);


    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value); // Actualiza la categoría seleccionada
    };

    const handleSortChange = (e) => {
      setSortOption(e.target.value);
    };
    
    
    if(!isLoaded) return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />

  
    if (fetchError) {
      return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
    }
  
    return (
      <section className="py-28">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#2C2C2C] lg:text-3xl font-semibold">Eventos cerca de tú zona</h2>
          <div className="flex space-x-4">
            {/* filtro de categorías */}
            <select value={selectedCategory} onChange={handleCategoryChange} className="text-sm cursor-pointer font-medium text-white px-2.5 py-2.5 w-56 bg-Button/80 rounded-full">
              <option value="">Cualquier categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-gray-600 bg-white">
                  {category.name}
                </option>
              ))}
            </select>
            {/* filtrar por relevancia o más recientes */}
            <select value={sortOption} onChange={handleSortChange} className="text-sm font-medium text-white cursor-pointer px-2.5 py-2.5 w-60 bg-Button/80 rounded-full">
            <option value="relevance" className="text-gray-600 font-medium bg-white">Ordenar por: Relevancia</option>
            <option value="recent" className="text-gray-600 font-medium bg-white">Ordenar por: Más recientes</option>
          </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 w-full">
          {filteredEvents &&
            filteredEvents.map((event) => (
              <div key={event._id} className="flex items-start p-4 bg-transparent rounded-lg border-b border-gray-200 last:border-none">
                <LazyLoadImage 
                src={event.image} 
                alt={event.name}
                className="w-24 h-24 rounded-md mr-4 object-cover" style={{ aspectRatio: '16 / 9' }}
                 />
                {/* Contenido del evento */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium mb-2">
                    <span>{new Date(event.start_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>{new Date(event.start_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#2C2C2C]">{event.name}</h3>
                  <span className="text-sm text-gray-500">{event.country}</span>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500">{event.participants} asistentes</span>
                    <button className="text-gray-500 hover:text-gray-700">
                      {/* Ícono de compartir (puedes agregar un ícono SVG o usar una librería de íconos) */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default EventsPage