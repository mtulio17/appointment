import { useEffect } from "react"
import { useSession } from "@clerk/clerk-react"
import useFetch from "../hooks/use-fetch";
import VerticalCards from "../components/VerticalCards";
import { getEvents } from "../api/apievents";

const EventsPage = ({event}) => {
    const { isLoaded } = useSession();
    const { fn: fnEvents, data: events, error: fetchError } = useFetch(getEvents, {});
  
    useEffect(() => {
      if (isLoaded) fnEvents();
    }, [isLoaded]);
  
    if (fetchError) {
      return <div className="flex justify-center text-center">Error cargando eventos: {fetchError.message}</div>;
    }
  
    return (
      <section className="py-28">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#2C2C2C] text-3xl font-semibold">Eventos cerca de tú zona</h2>
            <div className="flex space-x-8">
              {/* Filtros */}
              <button className="text-sm text-gray-800 px-4 py-2 bg-gray-100 rounded-md">Cualquier categoría</button>
              <button className="text-sm text-gray-800 px-4 py-2 bg-gray-100 rounded-md">Ordenar por: Relevancia</button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
          {events && events.map((event) => (
            <div key={event._id} className="flex items-center p-4 bg-white shadow-sm rounded-lg">
              <img src={event.image} alt={event.name} className="w-16 h-16 rounded-md mr-4" loading="lazy" />
              <div className="flex flex-col">
                <h3 className="text-lg font-medium text-[#2C2C2C]">{event.name}</h3>
                <span className="text-sm text-gray-500">{event.start_date}</span>
                <span className="text-sm text-gray-500">{event.country}</span>
                <span className="text-sm text-gray-500">{event.participants} asistentes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsPage