import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSession, useUser } from "@clerk/clerk-react"
import { Listbox } from '@headlessui/react';
// import useFetch from "../hooks/use-fetch";
import { getCategories, getEvents, getEventsByCategory, getSavedEvents } from "../api/apievents";
import { BarLoader } from "react-spinners";
import HorizontalCards from "../components/HorizontalCards"
import SkeletonHorizontaCard from "../ui/skeleton/SkeletonHorizontaCard";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import BackButton from "../ui/button/BackButton";

const EventsPage = () => {
  const { isLoaded, session } = useSession();
  const { user, isSignedIn } = useUser();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOptions, setSortOptions] = useState("Ordenar por:");
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

    if (sortOptions === "recent") {
      sortedEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOptions === "relevance") {
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
       <div className="absolute top-30 left-16 mb-10">
        <BackButton label="Volver" />
      </div>
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col mb-8">
          <h2 className="text-[#2C2C2C] lg:text-3xl font-bold">Eventos más destacados en Appointment
          </h2>
          <div className="flex justify-start space-x-8 mt-10 mx-2">
            {/* Filtro de categorías */}
            <div className="w-72">
              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-full bg-[#00798a] py-2.5 px-4 lg:text-sm text-left text-white font-medium shadow transition duration-300 ease-in-out hover:bg-[#00798a]/90 focus:outline-none focus:ring-1 focus:ring-[#00798a]/80">
                    <span className="block truncate">
                      {categories.find((cat) => cat.id === selectedCategory)?.name || 'Todas las categorías'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Listbox.Option
                      key=""
                      value=""
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-[#00798a]/20 text-[#00798a]' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            Todas las categorías
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <CheckIcon className="h-5 w-5 text-[#00798a]" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                    {categories.map((category) => (
                      <Listbox.Option
                        key={category.id}
                        value={category.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-[#00798a]/20 text-[#00798a]' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                              {category.name}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon className="h-5 w-5 text-Button" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            {/* Filtro de orden */}
            <div className="w-72">
            <Listbox value={sortOptions} onChange={setSortOptions}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-full bg-[#00798a] py-2.5 px-4 lg:text-sm text-left text-white font-medium shadow transition duration-300 ease-in-out hover:bg-[#00798a]/90 focus:outline-none focus:ring-2 focus:ring-[#00798a]/80">
                  <span className="block truncate">
                    {sortOptions || 'Ordenar por'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronsUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Listbox.Option
                    // key="relevance"
                    value="Ordenar por: relevancia"
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-[#00798a]/20 text-[#00798a]' : 'text-gray-900'}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          Por relevancia
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-5 w-5 text-[#00798a]" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                  <Listbox.Option
                    // key="recent"
                    value="Ordenar por: recientes"
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-[#00798a]/20 text-[#00798a]' : 'text-gray-900'}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          Más recientes
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-5 w-5 text-[#00798a]" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
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