/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MapPinIcon, CalendarIcon, Bookmark, EllipsisIcon } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUser } from "@clerk/clerk-react";
import { saveEvent } from "../api/apievents";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const VerticalCards = ({ event, savedInit = false, onEventAction = () => {}, isMyEvent = false, isHost, onEdit, onDelete }) => {
  const [saved, setSaved] = useState(savedInit);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { openModal } = useModal();

  const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
  const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
  const formattedTime = format(combinedDateTime, "HH:mm'hs'");

  useEffect(() => {
    setSaved(savedInit);
  }, [savedInit]);

  // useMutation para manejar el guardado y eliminación de eventos
  const saveEventMutation = useMutation({
    mutationFn: (params) => saveEvent(params),
    onSuccess: (data, variables) => {
      setSaved(variables.alreadySaved ? false : true); // actualiza el estado basado en la respuesta
      onEventAction(); // si es necesario, actualizamos la lista de eventos
    },
    onError: (error) => {
      console.error("Error al guardar/eliminar evento:", error);
    },
  });

  const handleSaveEvent = () => {
    if (!isSignedIn || !user) {
      navigate("/?sign-in=true");
      return;
    }

    if (event.host_id === user.id) {
      alert("No se puede guardar en favoritos un evento propio.");
      return;
    }

    // invoca mutación para guardar o eliminar evento
    saveEventMutation.mutate({
      user_id: user.id,
      event_id: event.id,
      alreadySaved: saved, // si ya está guardado, lo eliminamos; si no, lo guardamos
    });
  };

  // Función para editar el evento
  const handleEditEvent = () => {
    openModal({ type: "edit", event }); // Abrir el modal de edición
  };

  // Función para cancelar el evento
  const handleCancelEvent = () => {
    openModal({ type: "cancel", event }); // Abrir el modal de confirmación
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
        alt={event.name || "event image"}
        className="mx-auto w-full h-32 lg:h-44 object-cover object-center rounded-lg hover:opacity-80 duration-200 mb-2"
        style={{ aspectRatio: "16 / 9" }}
      />
      <div className="p-1">
        <h3 className="lg:text-lg lg:leading-0 tracking-wide text-gray-800 font-semibold hover:underline cursor-pointer mb-1">
          {event.name}
        </h3>
        <p className="text-xs font-medium text-gray-600 mb-3">
          {truncateText(event.description, 11)}
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
      disabled={saveEventMutation.isLoading}
      className="w-15 absolute top-2 right-2 text-white hover:text-gray-100"
      onClick={handleSaveEvent}
    >
      {saved ? (
        <Bookmark size={20} fill="red" stroke="red" />
      ) : (
        <Bookmark size={20} />
      )}
    </button>

    {isHost && (
      <>
        <button
          className="btn btn-edit absolute left-0 py-0.5 px-1.5 text-Button rounded-lg"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <EllipsisIcon size={16} />
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
              <li>
                <button
                  className="block text-sm justify-start text-start px-4 py-2 text-red-600 hover:bg-gray-200 w-full"
                  onClick={handleCancelEvent}
                >
                  Cancelar Evento
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
