import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import VerticalCards from "./VerticalCards";
import useFetch from "../hooks/use-fetch";
import { getMyEvents } from "../api/apievents";
import SkeletonCard from "../ui/skeleton/SkeletonCard";
import ConfirmCancelModal from "./ConfirmCancelModal";
import { Link } from "react-router-dom";
// import OptionsModal from '../ui/OptionsModal';

const MyCreatedEvents = () => {
  const { user, isSignedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { fn: fetchMyEvents, data: events, error,  isLoading: loadingEvents } = useFetch(getMyEvents);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchMyEvents({ host_id: user.id });
    }
  }, [isSignedIn, user]);


  const handleCancelEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

    // Función para confirmar la cancelación
  const handleConfirmCancel = async () => {
    console.log("Cancelar evento:", selectedEvent.id);
    // Aquí deberías implementar la lógica para cancelar/eliminar el evento en el backend
    // await deleteEvent(selectedEvent.id);
    handleCloseModal();
    fetchMyEvents({ host_id: user.id }); 
  };


  if (!isSignedIn) {
    return <div>No estás autenticado.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="container mx-auto max-w-6xl bg-transparent my-32">
        <h2 className="gradient-title lg:text-3xl sm:text-4xl text-start font-semibold mb-4">
          Eventos que has creado recientemente:
        </h2>
        <hr className="border-b border-gray-100 w-full" />
        <div className="container mx-auto px-4 max-w-7xl">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {loadingEvents ? (
              Array(4).fill().map((_, index) => <SkeletonCard key={index} />)
            ) : (
              // mostrar eventos si están disponibles
              events && events.length > 0 ? (
                events.map((event) => (
                  <VerticalCards 
                    key={event.id} 
                    event={event} 
                    isHost={event.host_id === user.id}
                    onEdit={() => handleCancelEvent(event)}
                    />
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <p>No has creado ningún evento aún.</p>
                  <Link to="/post-event">¿Te gustaría crear tu primer evento?</Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {isModalOpen && selectedEvent && (
        <ConfirmCancelModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}  // Confirmar la cancelación del evento
      />
      )}
    </section>
  );
};

export default MyCreatedEvents;
