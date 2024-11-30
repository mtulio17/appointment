import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import VerticalCards from "./VerticalCards";
import useFetch from "../hooks/use-fetch";
import {  getMyEvents } from "../api/apievents";
import SkeletonCard from "../ui/skeleton/SkeletonCard";
import { PlusCircle } from "lucide-react";
import PostEvent from "./PostEvent";


const EventsCreated = () => {
  const { user, isSignedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageParticipantsModalOpen, setIsManageParticipantsModalOpen] = useState(false);
  const [isPostEventModalOpen, setIsPostEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // hooks para manejar fetch de eventos y participantes
  const {fn: fetchMyEvents,data: events,error, isLoading: loadingEvents} = useFetch(getMyEvents);
 

  useEffect(() => {
    if (isSignedIn && user) {
      fetchMyEvents({ host_id: user.id });
    }
  }, [isSignedIn, user]);

  const handleCancelEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleManageParticipantsModal = (event) => {
    setSelectedEvent(event);
    setIsManageParticipantsModalOpen(true);
  };
  
  // const closeManageParticipantsModal = () => {
  //   setIsManageParticipantsModalOpen(false);
  // };


  // función para abrir y cerrar el modal de PostEvent
  const openPostEventModal = () => {setIsPostEventModalOpen(true)};
  const closePostEventModal = () => {setIsPostEventModalOpen(false)};

  if (!isSignedIn) {
    return <div>No estás autenticado.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="container mx-auto max-w-6xl bg-transparent my-32">
      <div className="flex justify-between items-center mb-10">
        <h2 className="gradient-title lg:text-2xl sm:text-4xl text-start font-semibold">
          Eventos que has creado recientemente
        </h2>
        <button onClick={openPostEventModal} className="text-white bg-[#00798a] mr-4 font-medium lg:text-sm rounded-md px-5 py-2.5 flex items-center text-center focus:outline-none">
         Crear un Evento
        <PlusCircle className="ml-2 flex justify-start items-center" size={18} stroke="white" strokeWidth={2} />
      </button>
      </div>

      <div className="container mx-auto px-4 w-full">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {loadingEvents ? 
                (Array(4).fill().map((_, index) => <SkeletonCard key={index}
                 />)
                  ) : // mostrar eventos si están disponibles
                  events && events.length > 0 ? (
                    events.map((event) => (
                      <VerticalCards
                        key={event.id}
                        event={event}
                        isHost={event.host_id === user.id}
                        onEdit={() => handleCancelEvent(event)}
                        onManageParticipants={() => handleManageParticipantsModal(event)}
                      />
                    ))
                  ) : (
                <div className="container mx-auto px-4 w-full flex flex-col items-center justify-center text-center space-y-4">
                   <img 
                    src="/placeholder-event.svg" 
                    alt="Sin eventos" 
                    className="h-64 lg:w-64 object-contain rounded-lg"
                    style={{ aspectRatio: "16/9" }}
                  />
                <p className="text-lg font-semibold text-gray-600">Aún no has creado ningún evento</p>
                <p className="text-sm text-gray-500">¡Empieza a crear eventos para que otros puedan unirse!</p>
              </div>              
            )}
          </div>
        </div>
      </div>
{/*           
      {isManageParticipantsModalOpen && selectedEvent && (
        <ManageParticipantsModal
          event={selectedEvent}
          closeModal={closeManageParticipantsModal}
        />
      )} */}

      {isPostEventModalOpen && <PostEvent onClose={closePostEventModal} />}
    </section>
  );
};

export default EventsCreated;
