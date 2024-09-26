import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import VerticalCards from "./VerticalCards";
import useFetch from "../hooks/use-fetch";
import { getMyEvents } from "../api/apievents";
import SkeletonCard from "../ui/skeleton/SkeletonCard";
import ConfirmCancelModal from "./ConfirmCancelModal";
import { Link } from "react-router-dom";
import HorizontalCards from "./HorizontalCards";
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
    <section className="container mx-auto max-w-7xl my-28">
        <h2 className="text-[#2C2C2C] lg:text-3xl font-semibold">
          Eventos que has creado recientemente:
        </h2>
        <hr className="border-b border-gray-200 w-full" />
        {/* <div className="mx-auto"> */}
          <div className="w-full">
            {loadingEvents ? (
              Array(4).fill().map((_, index) => <SkeletonCard key={index} />)
            ) : (
              // mostrar eventos si están disponibles
              events && events.length > 0 ? (
                events.map((event) => (
                  <HorizontalCards 
                    key={event.id} 
                    event={event} 
                    isHost={event.host_id === user.id}
                    onEdit={() => handleCancelEvent(event)}
                    />
                ))
              ) : (
                <div className="my-12">
                  <p><strong>UPS!</strong> Parece que aún no creaste ningún evento.</p>

                  <Link to="/post-event"><button className="bg-red-500 text-white text-sm my-2 px-2 py-2 rounded-lg flex items-center hover:bg-red-700 focus:outline-none">click aquí para crear un evento</button></Link>
                </div>
              )
            )}
          </div>
        {/* </div> */}
      
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
