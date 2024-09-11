import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { getEventParticipants, getSingleEvent, participateInEvent } from "../api/apievents";
import useFetch from "../hooks/use-fetch";


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  
  // Usar useFetch para obtener el evento
  const { isLoading: loadingEvent, data: event, fn: fetchEvent } = useFetch(getSingleEvent, { event_id: id });
  
  // Usar useFetch para obtener los participantes
  const { isLoading: loadingParticipants, data: participants, fn: fetchParticipants } = useFetch(getEventParticipants, { event_id: id });
  
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    if (isLoaded && id) {
      fetchEvent();
      if (user) {
        fetchParticipants();
      }
    }
  }, [isLoaded, id, user]);

  useEffect(() => {
    if (user && participants) {
      setIsParticipating(participants.some(participant => participant.user_id === user.id));
    }
  }, [user, participants]);

  const handleParticipate = async () => {
    if (!user) {
      navigate('/?sign-in=true');
      return;
    }
    
    try {
      const result = await participateInEvent(user.token, id, user.id);
      if (result) {
        setIsParticipating(true);
        alert('Te has registrado exitosamente en el evento.');
      } else {
        alert('Hubo un problema al intentar participar en el evento.');
      }
    } catch (error) {
      console.error('Error al participar en el evento:', error);
    }
  };

  if (loadingEvent) return <div>Cargando evento...</div>;
  if (!event) return <div>Evento no encontrado.</div>;

  const isHost = user && user.id === event.host_id;


  return (
    <div className="container mx-auto py-36 px-4">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <p className="text-gray-600">
          Organizado por <span className="font-semibold">{user.firstName}</span>
        </p>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Column: Event Image */}
      <div className="w-full h-40 lg:h-80 lg:w-auto object-cover object-center rounded-md duration-200 mb-2">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Column: Event Details */}
      <div className="md:w-1/2 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <p className="text-lg">{event.description}</p>
          <div>
            <p><strong>Categoria:</strong> {event.category_name}</p>
            <p><strong>Precio:</strong> {event.price}</p>
          </div>
          <div>
            <p><strong>Locación:</strong> {event.address}, {event.city}, {event.postal_code}, {event.country}</p>
          </div>
          <div>
            <p>
              <strong>Fecha y hora:</strong>{" "}
              {new Date(event.start_date).toLocaleDateString()} {event.start_time}
            </p>
          </div>
          <p><strong>Rango de Edad:</strong> {event.age}</p>
        </div>
        <p className="text-gray-400 mt-4">
          Creado en: {new Date(event.created_at).toLocaleDateString()}
        </p>

        {/* Botón para participar */}
        {!isHost && (
          <button
            onClick={handleParticipate}
            disabled={loadingParticipants || isParticipating}
            className={`mt-4 ${isParticipating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'} text-white py-2 px-4 rounded-md hover:bg-blue-600`}
          >
            {isParticipating ? 'Ya Participas' : 'Participar en el Evento'}
          </button>
        )}
      </div>
    </div>
  </div>
  );
};

export default EventDetails;
