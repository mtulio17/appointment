import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { getCategories, getEvents, getEventsByCategory, getSavedEvents } from "../api/apievents";
import { BarLoader } from "react-spinners";
import Pagination from './Pagination';
import HorizontalCards from "./HorizontalCards";
import SkeletonHorizontaCard from "../ui/skeleton/SkeletonHorizontaCard";

const EventsList = () => {
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

  // Obtener eventos y eventos guardados
  useEffect(() => {
    if (isLoaded && !selectedCategory) {
      fnEvents(); // Carga los eventos
      if (isSignedIn && user) {
        fetchSavedEvents(); // Carga los eventos guardados
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Obtener eventos guardados
  const fetchSavedEvents = async () => {
    setLoading(true);
    const token = await session.getToken({ template: "supabase" });
    const { data, error } = await getSavedEvents(token, user.id);
    if (error) {
      console.error("Error al obtener eventos guardados:", error);
    } else if (data) {
      const savedEventIds = data.map(event => event.event_id);
      setSavedEvents(savedEventIds);
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
      sortedEvents.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    } else if (sortOption === "relevance") {
      sortedEvents.sort((a, b) => b.participants - a.participants);
    }
    setFilteredEvents(sortedEvents);
  }, [sortOption, filteredEvents]);

  // Manejar cambio de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calcular eventos en la página actual
  const offset = currentPage * itemsPerPage;
  const currentEvents = filteredEvents.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

  // Manejar cambio de categoría
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Manejar cambio de orden
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (!isLoaded) return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />;

  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  return (
    <section className="py-28">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col pb-6">
          <h2 className="text-[#2C2C2C] lg:text-3xl font-semibold">Eventos cerca de tú zona</h2>
          <div className="flex justify-end space-x-4 mt-4">
            {/* Filtro de categorías */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="text-sm cursor-pointer font-medium text-gray-700 mx-4 py-2.5 w-64 transition duration-300 ease-in-out"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-gray-600 bg-white">
                  {category.name}
                </option>
              ))}
            </select>

            {/* Filtro de orden */}
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="text-sm cursor-pointer font-medium text-gray-700 mx-4 py-2.5 w-64 transition duration-300 ease-in-out"
            >
              <option value="relevance" className="text-gray-600 bg-white">Ordenar por: Relevancia</option>
              <option value="recent" className="text-gray-600 bg-white">Ordenar por: Más recientes</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          {loadingEvents ? (
            Array(5).fill().map((_, index) => <SkeletonHorizontaCard key={index} />)
          ) : (
            currentEvents.map((event) => {
              const isSaved = savedEvents.includes(event.id);
              return (
                <HorizontalCards key={event._id} event={event} savedInit={isSignedIn ? isSaved : false} />
              );
            })
          )}
        </div>

        {/* Componente de paginación */}
        {filteredEvents.length > itemsPerPage && (
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        )}
      </div>
    </section>
  );
};

export default EventsList;
