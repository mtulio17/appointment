import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Pin, CalendarClock, TicketPercent, UserCheck, Heart, Share,} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Obtén el usuario desde el contexto
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
        setParticipants(response.data.participants);
        setIsParticipating(response.data.participants.includes(user?._id)); // valida si el usuario ya participa
      } catch (error) {
        console.error('Error al obtener detalles del evento:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEventDetails();
  }, [id, user?._id]);

  const handleParticipate = async () => {
    if (!user) {
      navigate('/sign-up'); // Redirige si el usuario no está autenticado
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${id}/participate`,
        {},
        { withCredentials: true } // Incluye cookies para enviar el token
      );
      setEvent(response.data.event);
      setParticipants(response.data.event.participants);
      setIsParticipating(true);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/sign-up'); // Redirige si el usuario no está autenticado
      } else {
        console.error('Error al unirse al evento:', error);
      }
    }
  };

  const handleCancelParticipation = async () => {
    if (!user) {
      navigate('/sign-up');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${id}/cancel`,
        {},
        { withCredentials: true } // Incluye cookies para enviar el token
      );
      setEvent(response.data.event);
      setParticipants(response.data.event.participants);
      setIsParticipating(false);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/sign-up');
      } else {
        console.error('Error al cancelar la participación en el evento:', error);
      }
    }
  };

  if (loading) {
    return <p>Cargando detalles del evento...</p>;
  }

  if (!event) {
    return <p>No se encontraron detalles para este evento.</p>;
  }

  return (
    <div className="relative max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md my-28">
      <div className='m-5'>
        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-4">{event.activityName}</h1>
          <button><Heart className='w-6 h-6' /></button>
        </div>
        <div className="flex items-center mb-6">
          <img src={event.host?.avatar} alt="Host" className="w-14 h-14 rounded-full mr-4" />
          <div>
            <p className="text-sm font-semibold">Anfitrión</p>
            <p className="text-sm">{event.host?.name}</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-center justify-between'>
          <img src={event.image} alt={event.activityName} className="max-w-3xl max-h-3xl object-cover rounded-lg mb-4" />
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold">{event.activityName}</p>
                <button><Share className='w-5 h-5' /></button>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900 mb-3">
                <CalendarClock className="w-5 h-5 mr-3 opacity-60" />
                <span className="mr-2">{new Date(event.startDate).toLocaleDateString()}</span>
                <span>{event.startTime}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900 mb-2">
                <TicketPercent className="w-5 h-5 mr-3 opacity-60" />
                <span className="mr-6">${event.price}</span>
                <UserCheck className="w-5 h-5 mr-2 opacity-60" />
                <span>{participants.length}/{event.maxParticipants || '∞'} asistirán</span>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900 mb-3 h-auto">
                <Pin className="w-5 h-5 mr-3 opacity-60" />
                <span>{event.address}, {event.city}, {event.state} {event.postalCode}</span>
              </div>
              <hr className='py-2' />
              <div>
                {/* Aquí iría el mapa de Google */}
              </div>
            </div>
            <div>
              {isParticipating ? (
                <div>
                  <p className="text-green-600">Ya estás participando en este evento</p>
                  <button
                    onClick={handleCancelParticipation}
                    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-500 mt-2"
                  >
                    Cancelar participación
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleParticipate}
                  disabled={participants.length >= event.maxParticipants && event.maxParticipants !== -1}
                  className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-500"
                >
                  Participar
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 md:mr-4">
            <h2 className="text-2xl font-semibold mb-2">Detalles</h2>
            <p className="text-gray-700 mb-4">{event.description}</p>
          </div>
        </div>
        <div className="max-w-3xl p-4">
          <div className='flex items-center justify-between my-5'>
            <h2 className="text-2xl font-semibold">Asistentes ({participants.length})</h2>
            <button className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none">
              Ver más
            </button>
          </div>
          <div className='bg-gray-100 px-3 py-3 rounded'>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
              {participants.slice(0, 3).map((participant) => (
                <div key={participant._id} className="bg-white rounded-lg shadow-md p-4 text-center">
                  <img src={participant.image} alt={participant.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
                  <p className="font-semibold">{participant.name}</p>
                  <p className="text-sm text-gray-500">{participant.role}</p>
                  {participant.isHost && <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">Host</span>}
                </div>
              ))}
              {participants.length > 3 && (
                <div className="bg-white rounded-lg shadow-md p-4 text-center flex items-center justify-center">
                  <div>
                    <div className="flex items-start justify-center">
                      {participants.slice(3, 7).map((participant, index) => (
                        <img
                          key={participant._id}
                          src={participant.image}
                          alt={participant.name}
                          className="w-16 h-16 rounded-full mb-2"
                          style={{ marginLeft: index === 0 ? 0 : '-48px' }}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 mt-2">+{participants.length - 3} más</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
