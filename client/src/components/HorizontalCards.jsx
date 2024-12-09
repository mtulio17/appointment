/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { Share, Bookmark } from "lucide-react";
import {toast} from 'react-toastify';
import ShareModal from './modal/ShareModal'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getCategories, saveEvent } from "../api/apievents";
import { useFavorites } from '../context/SaveEventContext';



const HorizontalCards = ({ event, savedInit, onEventAction = () => {}, isMyEvent = false , isHost, onEdit, onDelete, onCancel}) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [saved, setSaved] = useState(savedInit);
    const { user, isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    
    const { fn: saveFn, error: saveError, loading: saveLoading } = useFetch(saveEvent);
  
    const shareModalOpen = () => setIsShareModalOpen(true);
    const closeShareModal = () => setIsShareModalOpen(false);

    const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
    const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
    const formattedTime = format(combinedDateTime, "HH:mm'hs'");

    // construir la URL del evento dinámicamente para el ShareModal
    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
    const eventUrl = `${baseURL}/event/${event?.id}`; // generar la URL dinámica

    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(' ') + '...';
        }
        return text; 
      };
    
    useEffect(() => {
      if (isShareModalOpen) {
        document.body.style.overflow = 'hidden'; // Desactiva el scroll
      } else {
        document.body.style.overflow = 'unset'; // Restablece el scroll
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isShareModalOpen]);


  
    useEffect(() => {
      setSaved(savedInit);
    }, [savedInit]);

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
  
 

    return (
        <div className="flex items-center justify-between border-b border-gray-200 rounded-lg p-4 mb-2 py-8 transition-shadow duration-300">
            <Link to={`/event/${event.id}`} className="h-32 lg:h-36 lg:w-56 rounded-lg overflow-hidden hover:opacity-80 duration-200" style={{ aspectRatio: '16/9' }}>
                <img src={event.image} alt={event.name} className="w-full h-full object-cover hover:opacity-95 duration-200"
                />
            </Link>
            <div className="flex-1 ml-4">
        {/* Título del evento */}
            <Link to={`/event/${event.id}`} className="block">
                <div className="lg:text-lg font-semibold text-gray-600 mb-2">
                    {event.name}
                </div>
            </Link>
            {/* Descripción o ubicación del evento */}
            <div className="lg:text-sm font-medium text-gray-500 mb-6 max-w-xl">
                {truncateText(event.description, 28)}
            </div>
            {/* Fecha, hora y ciudad del evento */}
            <div className="flex items-center space-x-2">
                <span className="lg:text-sm text-amber-900 font-medium uppercase">{formattedDate} - {formattedTime}</span>
                <span className="text-gray-400">|</span>
                <span className="lg:text-sm font-medium text-amber-900">{event.city}</span>
            </div>
        </div>
         <div className="flex items-center space-x-6">
            {/* Icono de compartir */}
            <button className="text-black hover:text-gray-700" onClick={shareModalOpen}>
                <Share size={20} strokeWidth={1.5} />
            </button>
            {/* Icono de guardar */}
            <button disabled={saveLoading} onClick={handleSaveEvent} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                {isFavorite(event.id) ? (
                    <Bookmark size={20} fill="red" stroke="red" strokeWidth={2} />
                ) : (
                    <Bookmark size={20} strokeWidth={2} />
                )}
            </button>
          </div>
            <ShareModal showModal={isShareModalOpen} closeShareModal={closeShareModal} eventUrl={eventUrl} eventTitle={event.name} />
        </div>
    )
}

export default HorizontalCards