/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MapPinIcon, Heart} from "lucide-react";
import { LuCalendar, LuClock } from "react-icons/lu";
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { saveEvent } from "../api/apievents";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const VerticalCards = ({event, savedInit = false, onEventAction = () => {}, isMyEvent = false }) => {
  const [saved, setSaved] = useState(savedInit)
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { loading: loadingSavedEvent, data: savedEvent, fn: fnSavedEvent} = useFetch(saveEvent);

  useEffect(() => {
    // Actualizar el estado inicial basado en la respuesta del backend si es necesario
    setSaved(savedInit);
  }, [savedInit]);

  const handleSaveEvent = async () => {
    if (!isSignedIn || !user) {
      navigate("/?sign-in=true");
      return;
    }

    if (event.host_id === user.id) {
      alert("No se puede guardar en favoritos un evento propio");
      return;
    }

    const alreadySaved = saved;

    const response = await fnSavedEvent({ alreadySaved }, {
      user_id: user.id,
      event_id: event.id
    });

    if (response?.error) {
      console.error("Error al guardar/eliminar el evento:", response.error);
      return;
    }

    setSaved(!alreadySaved);  // Alternar el estado de guardado
    onEventAction();          // Actualizar la lista de eventos guardados si es necesario
  };


  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..";
    }
    return text;
  };
  
  return (
    <div key={event.id} className="relative overflow-hidden cursor-pointer border border-gray-100 pb-8 my-8 rounded-lg">
    <Link to={`/event/${event.id}`}>
      <img
        src={event.image || "/placeholder.svg?height=200&width=400"}
        alt={event.name || "Event image"}
        className="mx-auto w-full h-40 lg:h-48 lg:w-full object-cover object-center rounded-md hover:opacity-80 duration-200 mb-2"
      />
      <div className="p-1">
        <h3 className="text-lg font-semibold hover:underline cursor-pointer mb-1">
          {event.name}
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          {truncateText(event.description, 11)}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <LuCalendar className="mr-2 h-4 w-4" />
          <span>{new Date(event.start_date).toLocaleDateString()}</span>
          <LuClock className="mr-2 h-4 w-4 ml-4" />
          <span>{event.start_time}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
          <MapPinIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">{event.city}, {event.country}</span>
        </div>
      </div>
    </Link>
    {(
      <button
        disabled={loadingSavedEvent}
        className="w-15 absolute top-2 right-2 text-white hover:text-red-500"
        onClick={handleSaveEvent}
      >
        {saved ? (
          <Heart size={22} fill="red" stroke="red" />
        ) : (
          <Heart size={22} />
        )}
      </button>
    )}
  </div>
  );
};

export default VerticalCards;
