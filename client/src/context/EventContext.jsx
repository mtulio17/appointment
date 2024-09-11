import { createContext, useContext, useState, useEffect, useCallback} from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const EventContext = createContext();

// Proveedor del contexto de eventos
export const EventProvider = ({ children }) => {
  const {getToken} = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [validationError, setValidationError] = useState(null);
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);

  // creaar un evento nuevo
  const createEvent = async (eventData) => {
    try {
      const token = await getToken();
      console.log("token del evento", token);
      const response = await axios.post(
        "http://localhost:5000/api/events", eventData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // incluir el token en el header
          },
        }
      );
      setEvents((prevEvents) => [...prevEvents, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error al crear evento:", error);
      if (error.response && error.response.status === 401) {
        return { error: "No autorizado" };
      } else {
        return { error: "Error al crear evento" };
      }
    }
  };

  // obtener eventos
  // const fetchEvents = async (filters = {}) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const queryString = new URLSearchParams(filters).toString();
  //     const response = await axios.get(
  //       `http://localhost:5000/api/events?${queryString}`
  //     );
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error("Error al obtener eventos:", error);
  //     setError("Error al obtener eventos");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Obtener detalles de un evento específico
  const fetchEventDetails = useCallback(async (eventId, userId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching details for event', eventId);
      const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
      console.log('Event data', response.data);
      setEvent(response.data);
      setParticipants(response.data.participants || []);
      setIsParticipating(response.data.participants?.includes(userId) || false);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError('Error al obtener detalles del evento');
    } finally {
      setLoading(false);
    }
  }, []);
  // Búsqueda avanzada de eventos
  const searchEvents = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await axios.get(
        `http://localhost:5000/api/events/search?${queryString}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error al buscar eventos:", error);
      setError("Error al buscar eventos");
    } finally {
      setLoading(false);
    }
  };

  // Validar dirección
  // const validateAddress = async (address) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/validate-address",
  //       { address }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     setValidationError(error.response.data.message);
  //     return null;
  //   }
  // };

  // Participar en un evento
  const participateInEvent = async (eventId, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/participate`,
        {},
        { withCredentials: true }
      );
      setEvent(response.data.event);
      setParticipants((prevParticipants) => [...prevParticipants, userId]);
      setIsParticipating(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        console.error("Error al unirse al evento:", error);
        setError("Error al unirse al evento");
      }
    }
  };

  // Cancelar participación en un evento
  const cancelParticipation = async (eventId, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/cancel`,
        {},
        { withCredentials: true }
      );
      setEvent(response.data.event);
      setParticipants((prevParticipants) =>
        prevParticipants.filter((participant) => participant !== userId)
      );
      setIsParticipating(false);
    } catch (error) {
      console.error("Error al cancelar la participación en el evento:", error);
      setError("Error al cancelar la participación en el evento");
    }
  };

  // Cancelar el evento
  const cancelEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        withCredentials: true,
      });
      setEvent(null);
      setParticipants([]);
      alert("El evento ha sido cancelado correctamente");
    } catch (error) {
      console.error("Error al cancelar el evento:", error);
      setError("Error al cancelar el evento");
      alert("Error al cancelar el evento");
    }
  };

  // EventContext.jsx
  const getUserCreatedEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events/created', {
        withCredentials: true, // esto es necesario para enviar cookies 
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos creados:', error);
      throw error;
    }
  };
  
  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  return (
    <EventContext.Provider value={{ 
      events, event, loading, error, participants, isParticipating, 
       searchEvents, createEvent, fetchEventDetails, 
      participateInEvent, cancelParticipation, cancelEvent, 
      getUserCreatedEvents}}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
