import { getEvents, getSavedEvents } from "../api/apievents";
import { useSession, useUser } from "@clerk/clerk-react";
import VerticalCards from './VerticalCards';
import SkeletonCard from "../ui/skeleton/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
// import { BarLoader } from "react-spinners";

const LastestEvents = () => {
  const { isLoaded, session } = useSession();
  const { user, isSignedIn } = useUser();

  // react-query para obtener los eventos
  const { data: events, error: fetchError, isLoading: loadingEvents } = useQuery({
      queryKey: ['events'], // clav única para esta consulta
      queryFn: getEvents,    // función para obtener los eventos
      cacheTime: 1000 * 60 * 10,
      enabled: isLoaded, 
  });

  // react-query para obtener los eventos guardados por el usuario
  const { data: savedEventsData, isLoading: loadingSavedEvents } = useQuery({
      queryKey: ['savedEvents', user?.id],
      queryFn: async () => {
      const token = await session.getToken({ template: "supabase" });
      return getSavedEvents(token, user.id);
    },
     enabled: isSignedIn && !!user, // solo ejecuta la consulta si el usuario está autenticado
  });

  // si hay eventos guardados, extraemos sus ID's
  const savedEventIds = savedEventsData ? savedEventsData.map(event => event.event_id) : [];

  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  return (
    <section className="py-10 bg-transparent">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[#2C2C2C] lg:text-2xl font-bold">Próximos Eventos</h2>
          <a href="/all-events" className="text-sm lg:text-base text-Button font-medium hover:underline px-6 py-2">Ver todos los eventos</a>
        </div>
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {loadingEvents || loadingSavedEvents ? (
              // Mostrar esqueleto mientras los eventos están cargando
              Array(8).fill().map((_, index) => <SkeletonCard key={index} />)
            ) : (
              // Mostrar eventos una vez cargados
              events && events.slice(0, 8).map((event) => {
                // Verificar si el evento ya está guardado (solo si el usuario está autenticado)
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
