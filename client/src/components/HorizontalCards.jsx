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
import { saveEvent } from "../api/apievents";
import { useFavorites } from '../context/SaveEventContext';
// import { dataEvents } from "../data/dataEvents";



const HorizontalCards = ({ event, savedInit, onEventAction = () => {}, isMyEvent = false , isHost, onEdit, onDelete, onCancel}) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [saved, setSaved] = useState(savedInit);
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();
    
    const { fn: saveFn, error: saveError, loading: saveLoading } = useFetch(saveEvent);
  
    const shareModalOpen = () => setIsShareModalOpen(true);
    const closeShareModal = () => setIsShareModalOpen(false);

    const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
    const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
    const formattedTime = format(combinedDateTime, "HH:mm'hs'");
    
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
            <Link to={`/event/${event.id}`} className="h-32 lg:h-24 lg:w-48 rounded-lg overflow-hidden hover:opacity-80 duration-200" style={{ aspectRatio: '16 / 9' }}>
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
            </Link>
            <div className="flex-1 ml-4">
                {/* Fecha y Hora */}
                <div className="text-xs text-yellow-800 font-semibold mb-1 uppercase">
                {formattedDate} - {formattedTime}
                </div>

                <Link to={`/event/${event.id}`} className="block">
                    <div className="lg:text-md font-semibold text-gray-800 mb-1">
                        {event.name}
                    </div>
                </Link>
                {/* ubicación */}
                <div className="text-xs text-gray-600">
                    {event.address}, {event.city}, {event.country}
                </div>
              </div>
            <div className="flex items-center space-x-3">
                {/* icono compartir */}
                <button className="text-black hover:text-gray-700" onClick={shareModalOpen}>
                    <Share size={20} strokeWidth={1.5} />
                </button>
                <button disabled={saveLoading} onClick={handleSaveEvent} className="text-black hover:text-gray-700">
                    {isFavorite(event.id) ? (
                        <Bookmark size={20} fill="red" stroke="red" strokeWidth={1.5} />
                    ) : (
                        <Bookmark size={20}  strokeWidth={1.5} />
                    )}
                </button>
            </div>
            <ShareModal showModal={isShareModalOpen} closeShareModal={closeShareModal} eventUrl={event.url} />
        </div>
    )
}

export default HorizontalCards