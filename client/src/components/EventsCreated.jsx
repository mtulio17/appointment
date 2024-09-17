import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import VerticalCards from "./VerticalCards";
import useFetch from "../hooks/use-fetch";
import {
  getMyEvents,
  deleteEvent,
  cancelEvent,
  editEvent,
} from "../api/apievents";
// import OptionsModal from '../ui/OptionsModal';

const MyCreatedEvents = () => {
  const { user, isSignedIn } = useUser();
  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);
  const {
    fn: fetchMyEvents,
    data: events,
    error,
    isLoading,
  } = useFetch(getMyEvents);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchMyEvents({ host_id: user.id });
    }
  }, [isSignedIn, user]);

  // const handleEditEvent = (event) => {
  //   setSelectedEvent(event);
  //   setModalOpen(true);
  // };

  // const handleDeleteEvent = async (event) => {
  //   await deleteEvent(user.token, event.id);
  //   fetchMyEvents({ host_id: user.id });
  // };

  // const handleCancelEvent = async (event) => {
  //   await cancelEvent(user.token, event.id);
  //   fetchMyEvents({ host_id: user.id });
  // };

  if (!isSignedIn) {
    return <div>No estás autenticado.</div>;
  }

  if (isLoading) {
    return <div>Cargando eventos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="container mx-auto max-w-7xl bg-transparent py-28">
        <h2 className="gradient-title lg:text-3xl sm:text-4xl text-start font-semibold mb-4">
          Eventos que has creado recientemente:
        </h2>
        <hr className="border-b border-gray-100 w-full" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {events && events.length > 0 ? (
              events.map((event) => (
                <VerticalCards key={event.id} event={event} />
              ))
            ) : (
              <p>No has creado ningún evento aún.</p>
            )}
          </div>
        </div>
      </div>
      {/* {modalOpen && (
      <OptionsModal event={selectedEvent} onClose={() => setModalOpen(false)} onSave={(updatedData) => {
          editEvent(user.token, selectedEvent.id, updatedData);
          setModalOpen(false);
          fetchMyEvents({ host_id: user.id });
        }}
      />
    )} */}
    </section>
  );
};

export default MyCreatedEvents;
