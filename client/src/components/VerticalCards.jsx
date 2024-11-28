/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MapPinIcon, CalendarIcon, Bookmark, PencilIcon, UsersIcon } from "lucide-react";
import { useFavorites } from "../context/SaveEventContext";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUser } from "@clerk/clerk-react";
import { saveEvent } from "../api/apievents";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import useFetch from "../hooks/use-fetch";
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const VerticalCards = ({ event, savedInit = false, onEventAction = () => {}, isHost }) => {
  const [saved, setSaved] = useState(savedInit);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { openModal } = useModal();
  const { fn: saveFn, error: saveError, loading: saveLoading } = useFetch(saveEvent);
  const { toggleFavorite, isFavorite } = useFavorites();

  const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
  const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
  const formattedTime = format(combinedDateTime, "HH:mm'hs'");

  useEffect(() => {
    setSaved(savedInit);
  }, [savedInit]);


  // Función para manejar el guardado o eliminación del evento en favoritos
  const handleSaveEvent = async () => {
    if (!isSignedIn || !user) {
      navigate("/?sign-in=true");
      return;
    }
  
    if (event.host_id === user.id) {
      toast.error("No se puede añadir a favoritos un evento propio.");
      return;
    }
  
    try {
      const action = isFavorite(event.id) ? 'delete' : 'save';
      const response = await saveFn({
        user_id: user.id,
        event_id: event.id,
        action,
      });

      // Ejecuta toggleFavorite en el contexto
      toggleFavorite(event);

      if (action === 'delete') {
        toast.info("¡Evento eliminado de favoritos!");
      } else {
        toast.info("¡Evento añadido a favoritos!");
      }

      // Refresca la lista de eventos si es necesario
      onEventAction();
    } catch (err) {
      toast.error("Error al intentar añadir un evento en favoritos:", err);
    }
  };

  // Función para editar el evento
  const handleEditEvent = () => {
    openModal({ type: "edit", event });
  };

  // Función para manejar la gestión de participantes
  const handleManageParticipants = () => {
    openModal({ type: "manageParticipants", event });
  };


  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..";
    }
    return text;
  };
  
  return (
    <div key={event.id} className="relative overflow-hidden cursor-pointer pb-8 my-5 rounded-md">
    <Link to={`/event/${event.id}`}>
      <LazyLoadImage
        src={event.image || "https://placehold.co/400"}
        alt={event?.name}
        className="mx-auto w-full h-32 lg:h-44 object-cover object-center rounded-lg hover:opacity-90 duration-200 mb-2"
        style={{ aspectRatio: "16 / 9" }}
      />
      <div className="p-1">
        <h3 className="lg:text-lg lg:leading-6 tracking-wide text-gray-800 font-semibold hover:underline cursor-pointer mb-1">
          {event.name}
        </h3>
        <p className="text-xs font-medium text-gray-600 mb-3">
          {truncateText(event?.description, 11)}
        </p>
        <div className="flex items-center text-sm text-gray-800 mb-2">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="uppercase">{`${formattedDate} | ${formattedTime}`}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-800 mb-1">
          <MapPinIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-700 uppercase">
            {event.city}, {event.country}
          </span>
        </div>
      </div>
    </Link>

    <button
      disabled={saveLoading}
      className="w-6 h-6 flex items-center justify-center absolute top-2 right-2 rounded-full bg-gray-700 hover:bg-gray-900 transition-colors duration-300"
      onClick={handleSaveEvent}
    >
      {isFavorite(event.id) ? (
        <Bookmark size={18} fill="red" stroke="red" strokeWidth={1.5} />
      ) : (
        <Bookmark size={18} strokeWidth={1.5} className="text-white" />
      )}
    </button>

    {isHost && (
     <>
     {/* Botones para editar evento y gestionar participantes */}
      <button className="w-full bg-transparent text-black text-xs font-medium py-2 rounded-md mt-2 flex items-center justify-center border border-gray-200 hover:border-gray-300 duration-200" onClick={handleEditEvent}>
        <PencilIcon className="mr-2" size={14} strokeWidth={2} />
        Editar evento
      </button>
      <button onClick={handleManageParticipants} className="w-full bg-transparent text-black text-xs font-medium py-2 rounded-md mt-2 flex items-center justify-center border border-gray-200 hover:border-gray-300 duration-200">
        <UsersIcon className="mr-2" size={14} strokeWidth={2} />
        Gestionar Participantes
      </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 lg:w-56 bg-white shadow-lg rounded-lg">
            <ul>
              <li>
                <button
                  className="block text-sm justify-start text-start px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
                  onClick={handleEditEvent}
                >
                  Editar Evento
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    )}
  </div>
  );
};

export default VerticalCards;
