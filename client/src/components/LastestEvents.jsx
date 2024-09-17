import { useEffect, useState } from "react";
import { getEvents, getSavedEvents } from "../api/apievents";
import useFetch from "../hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import VerticalCards from './VerticalCards';
// import { BarLoader } from "react-spinners";

const LastestEvents = () => {
  const { isLoaded } = useSession();
  const { user, isSignedIn } = useUser()
  const { fn: fnEvents, data: events, error: fetchError} = useFetch(getEvents, {});
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(events);

  console.log(user)

  useEffect(() => {
    if (isLoaded) {
      fnEvents(); // carga los eventos

      if (isSignedIn && user) {
        fetchSavedEvents(); // carga los eventos guardados 
      }
    }
  }, [isLoaded, isSignedIn, user]);
  
  // funcion para obtener los eventos guardados por el usuario
  const fetchSavedEvents = async () => {
    setLoading(true);
    const token = await user?.getToken({ template: "supabase" });
    const { data, error } = await getSavedEvents(token, user.id); // llamadaa a la API para obtener eventos guardados

    if (error) {
      console.error("Error al obtener eventos guardados:", error);
    } else {
      const savedEventIds = data.map(event => event.event_id); // obtenemos solo los ID's de los eventos guardados
      setSavedEvents(savedEventIds);
    }
    setLoading(false);
  };

  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  return (
    <section className="py-10 bg-transparent">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#2C2C2C] lg:text-2xl font-bold">Próximos Eventos</h2>
        <a href="/all-events" className="text-sm text-Button font-medium hover:underline px-6 py-2">Ver todos los eventos</a>
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {events && events.slice(0, 8).map((event) => {
            // verificar si el evento ya está guardado (solo si el usuario está autenticado)
            const isSaved = savedEvents.includes(event.id); 
            return (
              <VerticalCards key={event._id} event={event} savedInit={isSignedIn ? isSaved : false} // si está autenticado, pasamos el estado de guardado
              />
            );
          })}
        </div>
      </div>
    </div>
  </section>
  );
};

export default LastestEvents;
