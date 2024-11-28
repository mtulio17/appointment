import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSession, useUser } from "@clerk/clerk-react"
// import useFetch from "../hooks/use-fetch";
import { getCategories, getEvents, getEventsByCategory, getSavedEvents } from "../api/apievents";
import { BarLoader } from "react-spinners";
import ReactPaginate from 'react-paginate';
import HorizontalCards from "../components/HorizontalCards"
import SkeletonHorizontaCard from "../ui/skeleton/SkeletonHorizontaCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EventsPage = () => {
  const { isLoaded, session } = useSession();
  const { user, isSignedIn } = useUser();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page')) || 1; 
  const eventsPerPage = 10; 

  // Consulta para obtener eventos
  const { data: events, error: fetchError, isLoading: loadingEvents } = useQuery({
    queryKey: ['events', selectedCategory],
    queryFn: async () => {
      const response = selectedCategory ? await getEventsByCategory(user, selectedCategory) : await getEvents();
      return response;
    },
    cacheTime: 1000 * 60 * 10,
    enabled: isLoaded,
  });

  // Consulta para obtener categorías
  useEffect(() => {
    if (isLoaded) {
      getCategories(user).then((data) => {
        if (data) setCategories(data);
      });
    }
  }, [isLoaded, user]);

  // Consulta para obtener eventos guardados
  const { data: savedEventsData, isLoading: loadingSavedEvents } = useQuery({
    queryKey: ['savedEvents', user?.id],
    queryFn: async () => {
      const token = await session.getToken({ template: "supabase" });
      return getSavedEvents(token, user.id);
    },
    enabled: isSignedIn && !!user,
  });

  // Extraer IDs de eventos guardados
  const savedEventIds = savedEventsData ? savedEventsData.map(event => event.event_id) : [];

  // Filtrar y ordenar eventos
  const handleSort = (eventsToSort) => {
    let sortedEvents = [...eventsToSort];

    if (sortOption === "recent") {
      sortedEvents.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    } else if (sortOption === "relevance") {
      sortedEvents.sort((a, b) => b.participants - a.participants);
    }
    return sortedEvents;
  };

  // Aplicar la ordenación
  const filteredEvents = events ? handleSort(events) : [];
  
  // Paginación
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const displayedEvents = filteredEvents.slice(startIndex, endIndex);

  if (!isLoaded) return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />;

  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  return (
    <section className="my-32">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col mb-8">
          <h2 className="text-[#2C2C2C] lg:text-3xl font-semibold">Eventos cerca de tú zona</h2>
          <div className="flex justify-start space-x-8 mt-10 mx-2">
            {/* Filtro de categorías */}
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm cursor-pointer font-medium bg-Button/80 rounded-full text-white text-gray-700 py-2.5 px-4 w-64 transition duration-300 ease-in-out"
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
              onChange={(e) => setSortOption(e.target.value)} 
              className="text-sm cursor-pointer font-medium bg-Button/80 rounded-full text-white text-gray-700 mx-4 py-2.5 px-4 w-64 transition duration-300 ease-in-out"
            >
              <option value="relevance" className="text-gray-600 bg-white">Ordenar por: Relevancia</option>
              <option value="recent" className="text-gray-600 bg-white">Ordenar por: Más recientes</option>
            </select>
          </div>
        </div>

        {/* Listado de eventos */}
        <div className="w-full">
          {loadingEvents || loadingSavedEvents ? (
            Array(8).fill().map((_, i) => <SkeletonHorizontaCard key={i} />)
          ) : (
            displayedEvents.map((event) => {
              const isSaved = savedEventIds.includes(event.id);
              return (
                <HorizontalCards key={event._id} event={event} savedInit={isSignedIn ? isSaved : false} />
              );
            })
          )}
        </div>
        {/* paginación */}
      </div>
    </section>
  );
}

export default EventsPage