import { useEffect, useState, useRef, useCallback } from "react"
import { useSession, useUser } from "@clerk/clerk-react"
import useFetch from "../hooks/use-fetch";
import { getCategories, getEvents, getEventsByCategory } from "../api/apievents";
import { BarLoader, PulseLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HorizontalCards from "../components/HorizontalCards"
import SkeletonHorizontaCard from "../ui/skeleton/SkeletonHorizontaCard";

const EventsPage = ({ event }) => {
  const { isLoaded } = useSession();
  const { user } = useUser();
  const { fn: fnEvents, data: events, error: fetchError, isLoading: loadingEvents } = useFetch(getEvents, {});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [participantsByEvent, setParticipantsByEvent] = useState({});
  const [sortOption, setSortOption] = useState("relevance");

  console.log(events);
  

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

    if (sortOption === "recent") {
      sortedEvents.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    } else if (sortOption === "relevance") {
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


  if (!isLoaded) return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />


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

        <div className="w-full">
          {loadingEvents ? (
            // Mostrar esqueleto mientras los eventos están cargando
            Array(8).fill().map((_, index) => <SkeletonHorizontaCard key={index} />)
          ) : (
            filteredEvents && filteredEvents.map((event) => (
              <HorizontalCards key={event._id}  event={event} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default EventsPage