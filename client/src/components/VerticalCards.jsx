/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MapPinIcon, Heart, CalendarIcon } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { saveEvent } from "../api/apievents";
import { Link, useNavigate } from "react-router-dom";
// import OptionsModal from "../ui/OptionsModal";

// eslint-disable-next-line react/prop-types
const VerticalCards = ({event, savedInit = false, onEventAction = () => {}, isMyEvent = false , onEdit, onDelete, onCancel}) => {
  const [saved, setSaved] = useState(savedInit)
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { loading: loadingSavedEvent, data: savedEvent, fn: fnSavedEvent} = useFetch(saveEvent);

  const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
  // Formatea la fecha y la hora
  const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
  const formattedTime = format(combinedDateTime, "HH:mm'hs'");

  useEffect(() => {
    setSaved(savedInit);
  }, [savedInit]);

  const handleSaveEvent = async () => {
    if (!isSignedIn || !user) {
      navigate("/?sign-in=true");
      return;
    }

    if (event.host_id === user.id) {
      alert("No se puede guardar en favoritos un evento propio.");
      return;
    }

    if (saved) {
      // Mostrar un alert si el evento ya está guardado y salir
      alert("Este evento ya está guardado en favoritos.");
      return;
    }

    const response = await fnSavedEvent({}, {
      user_id: user.id,
      event_id: event.id,
    });

    if (response?.error) {
      console.error("Error al guardar/eliminar el evento:", response.error);
      return;
    }

    // Solo actualizar el estado si no estaba previamente guardado
    setSaved(true);
    onEventAction(); // Llamar la función para actualizar la lista de eventos guardados si es necesario
  };


  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..";
    }
    return text;
  };
  
  return (
    <div key={event.id} className="relative overflow-hidden cursor-pointer border border-gray-100 pb-8 my-5 rounded-md">
    <Link to={`/event/${event.id}`}>
      <img
        src={event.image || "https://placehold.co/400"}
        alt={event.name || "Event image"}
        loading="lazy"
        className="mx-auto w-full h-32 lg:h-40 object-cover object-center rounded-md hover:opacity-80 duration-200 mb-2"
        style={{ aspectRatio: '16 / 9' }} 
      />
      <div className="p-1">
        <h3 className="text-md text-gray-800 font-semibold hover:underline cursor-pointer mb-1">
          {event.name}
        </h3>
        <p className="text-xs font-medium text-gray-600 mb-4">
          {truncateText(event.description, 11)}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{`${formattedDate} | ${formattedTime}`}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
          <MapPinIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">{event.city}, {event.country}</span>
        </div>
      </div>
    </Link>
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
  </div>
  );
};

export default VerticalCards;
