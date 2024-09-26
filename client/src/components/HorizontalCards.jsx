import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { Share, Bookmark } from "lucide-react";
import ShareModal from './ShareModal'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { saveEvent } from "../api/apievents";
import { toast } from 'react-hot-toast';
// import { dataEvents } from "../data/dataEvents";



const HorizontalCards = ({ event, savedInit, onEventAction = () => {}, isMyEvent = false , isHost, onEdit, onDelete, onCancel}) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [saved, setSaved] = useState(savedInit);
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    const { loading: loadingSavedEvent, data: savedEvent, fn: fnSavedEvent} = useFetch(saveEvent);

    const shareModalOpen = () => {
        setIsShareModalOpen(true);
    };

    const closeShareModal = () => {
        setIsShareModalOpen(false);
    };

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
        toast.error("Este es TU evento.")
        // alert("No se puede guardar en favoritos un evento propio.");
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
  

    return (
        // <Link to="/event-details" className="block">
        <div className="flex items-center justify-between border-b border-gray-200 rounded-lg p-4 mb-2 py-8 transition-shadow duration-300">
            {/* Imagen */}
            <Link to={`/event/${event.id}`} className="h-32 lg:h-24 lg:w-48 rounded-lg overflow-hidden hover:opacity-80 duration-200" style={{ aspectRatio: '16 / 9' }}>
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
            </Link>

            {/* Contenido */}
            <div className="flex-1 ml-4">
                {/* Fecha y Hora */}
                <div className="text-xs text-yellow-800 font-semibold mb-1 uppercase">
                {formattedDate} - {formattedTime}
                </div>

                {/* Título del evento con Link */}
                <Link to={`/event/${event.id}`} className="block">
                    <div className="lg:text-md font-semibold text-gray-800 mb-1">
                        {event.name}
                    </div>
                </Link>

                {/* Ubicación */}
                <div className="text-xs text-gray-600">
                    {event.address}, {event.city}, {event.country}
                </div>

                {/* Número de asistentes */}
                <div className="text-xs text-gray-500 mt-2">
                    {event.host_id}
                </div>
            </div>

            {/* Botones */}
            <div className="flex items-center space-x-3">
                {/* Icono compartir */}
                <button className="text-gray-500 hover:text-gray-700" onClick={shareModalOpen}>
                    <Share />
                </button>

                {/* Icono favorito */}
                <button disabled={loadingSavedEvent} onClick={handleSaveEvent} className="text-gray-500 hover:text-gray-700">
                {saved ? (
                  <Bookmark size={24} fill="red" stroke="red" />
                ) : (
                  <Bookmark size={24} />
                )}
                </button>
            </div>
            <ShareModal showModal={isShareModalOpen} closeShareModal={closeShareModal} eventUrl={event.url} />
        </div>
        // </Link>
    )
}

export default HorizontalCards