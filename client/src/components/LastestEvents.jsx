import { useEffect } from "react";
import { getEvents } from "../api/apievents";
import useFetch from "../hooks/use-fetch";
import { useSession } from "@clerk/clerk-react";
import VerticalCards from './VerticalCards';
// import { BarLoader } from "react-spinners";

const LastestEvents = () => {
  const { isLoaded } = useSession();
  const {
    fn: fnEvents,
    data: events,
    // isLoading: loadingEvents,
    error: fetchError,
  } = useFetch(getEvents, {});

  console.log(events);

  useEffect(() => {
    if (isLoaded) fnEvents();
  }, [isLoaded]);
  
  // if (loadingEvents) {
  //     return <BarLoader className="mt-4" width={"100%"} color="#2C2C2C" />;
  // }

  if (fetchError) {
    return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
  }

  return (
    <section className="py-10 bg-transparent">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#2C2C2C] text-2xl font-bold">
          Próximos Eventos
        </h2>
        <a
          href="#"
          className="text-sm text-Button font-medium hover:underline px-6 py-3"
        >
         Ver todos los eventos
        </a>
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {events && events.slice(0, 12).map((event) => (
            <VerticalCards key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default LastestEvents;
