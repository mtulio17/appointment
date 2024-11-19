import { getEvents, getEventsByLocation, getSavedEvents } from "../api/apievents";
import { useSession, useUser } from "@clerk/clerk-react";
import VerticalCards from './VerticalCards';
import SkeletonCard from "../ui/skeleton/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useLocation from "../hooks/useLocation";

const LastestEvents = () => {
  const { isLoaded, session } = useSession();
  const { user, isSignedIn } = useUser();

  const { city, country, loading: locationLoading, error: locationError } = useLocation();
  // console.log("Ubicación detectada:", city, country);

  // react-query para obtener los eventos
  const { data: events, error: fetchError, isLoading: loadingEvents } = useQuery({
    queryKey: ['events', city, country],
    queryFn: async () => {
      if (city && country) {
        return getEventsByLocation(session?.getToken(), { city, country });
      } else {
        return getEvents(session?.getToken()); // obtener todos los eventos si no hay ubicación
      }
    },
    enabled: isLoaded && !locationLoading, // ejecuta la consulta solo cuando se haya cargado la ubicación
  });

  // react-query para obtener los eventos guardados por el usuario
  const { data: savedEventsData, isLoading: loadingSavedEvents } = useQuery({
    queryKey: ['savedEvents', user?.id],
    queryFn: async () => {
      const token = await session.getToken({ template: "supabase" });
      return getSavedEvents(token, user.id);
    },
    enabled: isSignedIn && !!user, // Solo ejecuta la consulta si el usuario está autenticado
  });

    // si hay eventos guardados, extraemos sus ID's
    const savedEventIds = savedEventsData ? savedEventsData.map(event => event.event_id) : [];

  // Manejo de errores
  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  // Si hubo un error con la ubicación, puedes manejarlo aquí
  if (locationError) {
    console.warn("Error de ubicación:", locationError.message);
    throw new Error(locationError.message);
  }

  return (
    <section className="py-10 bg-transparent">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#2C2C2C] lg:text-2xl font-bold">Próximos Eventos</h2>
        <Link to={"/explore-events"} className="text-sm lg:text-sm text-Button font-medium hover:underline px-6 py-2">Ver todos los eventos</Link>
      </div>
      <div className="mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {locationLoading || loadingEvents || loadingSavedEvents ? (
            Array(8).fill().map((_, index) => <SkeletonCard key={index} />)
          ) : (
            // Mostrar eventos ordenados por proximidad
            events && events.slice(0, 8).map((event) => {
              const isSaved = savedEventIds.includes(event.id);
              return (
                <VerticalCards 
                  key={event._id} 
                  event={event} 
                  savedInit={isSignedIn ? isSaved : false}  // si está autenticado, pasamos el estado de guardado
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default LastestEvents;
