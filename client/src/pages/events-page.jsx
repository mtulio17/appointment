import { useEffect, useState, useRef, useCallback } from "react"
import { useSession, useUser } from "@clerk/clerk-react"
import useFetch from "../hooks/use-fetch";
import { getCategories, getEvents, getEventsByCategory, getSavedEvents } from "../api/apievents";
import { BarLoader, PulseLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Pagination from '../components/Pagination';
import HorizontalCards from "../components/HorizontalCards"
import SkeletonHorizontaCard from "../ui/skeleton/SkeletonHorizontaCard";


const EventsPage = () => {
  const { isLoaded, session } = useSession();
  const { user, isSignedIn } = useUser();
  const { fn: fnEvents, data: events, error: fetchError, isLoading: loadingEvents } = useFetch(getEvents, {});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [participantsByEvent, setParticipantsByEvent] = useState({});
  const [sortOption, setSortOption] = useState("relevance");
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5; // Número de eventos por página
  const [currentPage, setCurrentPage] = useState(0); // Página actual
 

// Obtener categorías
  useEffect(() => {
    if (isLoaded) {
      getCategories(user).then((data) => {
        if (data) setCategories(data);
      });
    }
  }, [isLoaded, user]);


  // useEffect(() => {
  //   if (isLoaded && !selectedCategory) {
  //     fnEvents();
  //   }
  // }, [isLoaded, selectedCategory]);

  // Obtener eventos y eventos guardados
  useEffect(() => {
    if (isLoaded && !selectedCategory) {
      fnEvents(); // carga los eventos

      if (isSignedIn && user) {
        fetchSavedEvents(); // carga los eventos guardados 
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Obtener eventos guardados
  const fetchSavedEvents = async () => {
    setLoading(true);
    const token = await session.getToken({ template: "supabase" });
    const { data, error } = await getSavedEvents(token, user.id); // llamadaa a la API para obtener eventos guardados

    if (error) {
      console.error("Error al obtener eventos guardados:", error);
    } else if (data) {
      const savedEventIds = data.map(event => event.event_id);
      setSavedEvents(savedEventIds);
    }else {
      console.warn("No se encontraron eventos guardados.");
    }
    setLoading(false);
  };

   // Filtrar eventos por categoría
  useEffect(() => {
    if (selectedCategory) {
      getEventsByCategory(user, selectedCategory).then((data) => {
        if (data) setFilteredEvents(data);
      });
    } else {
      setFilteredEvents(events); // Mostrar todos los eventos si no se selecciona categoría
    }
  }, [selectedCategory, events, user]);

// Ordenar eventos por relevancia o fecha
  useEffect(() => {
    let sortedEvents = [...filteredEvents];
    if (sortOption === "recent") {
      sortedEvents.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    } else if (sortOption === "relevance") {
      sortedEvents.sort((a, b) => b.participants - a.participants);
    }
    setFilteredEvents(sortedEvents);
  }, [sortOption]);

 
  // Manejar cambio de página
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);  // Actualiza la categoría seleccionada
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (!isLoaded) return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />


  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  return (
    <section className="py-28">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col pb-6">
          {/* <div> */}
          <h2 className="text-[#2C2C2C] lg:text-3xl font-semibold">Eventos cerca de tú zona</h2>
          <div className="flex justify-end space-x-4 mt-4">
            {/* filtro de categorías */}
            <select value={selectedCategory} onChange={handleCategoryChange} className="text-sm cursor-pointer rounded-full font-medium text-gray-700 mx-4 py-2.5 w-64 transition duration-300 ease-in-out w-50 ">
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-gray-600 bg-white">
                  {category.name}
                </option>
              ))}
            </select>

            {/* filtrar por relevancia o más recientes */}
            <select value={sortOption} onChange={handleSortChange} className="text-sm cursor-pointer font-medium bg-Button/80 rounded-full text-white text-gray-700 mx-4 py-2.5 px-4 w-64 transition duration-300 ease-in-out w-50">
              <option value="relevance" className="text-gray-600 bg-white">Ordenar por: Relevancia</option>
              <option value="recent" className="text-gray-600 bg-white">Ordenar por: Más recientes</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          {loadingEvents ? (
            // Mostrar esqueleto mientras los eventos están cargando
            Array(5).fill().map((_, index) => <SkeletonHorizontaCard key={index} />)
          ) : (
            // Mostrar eventos
            filteredEvents && filteredEvents.map((event) => {
              const isSaved = savedEvents.includes(event.id); 
                return (
              <HorizontalCards key={event._id} event={event} savedInit={isSignedIn ? isSaved : false} />
            );
})
          )}
        </div>
       
      </div>
    </section>
  )
}

export default EventsPage