import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

// Proveedor del contexto de eventos
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // creaar un evento nuevo
  const createEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        return newEvent;
      } else {
        const errorText = await response.text();
        console.error("Error al crear evento:", errorText);
        return null;
      }
    } catch (error) {
      console.error("Error en la solicitud de creación de evento:", error);
      return null;
    }
  };

  const fetchEvents = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5000/api/events?${queryString}`);
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        const errorText = await response.text();
        console.error("Error al obtener eventos:", errorText);
        setError(errorText);
      }
    } catch (error) {
      console.error("Error en la solicitud de eventos:", error);
      setError("Error en la solicitud de eventos");
    } finally {
      setLoading(false);
    }
  };

    // Búsqueda avanzada de eventos
    const searchEvents = async (searchParams) => {
      setLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(searchParams).toString();
        const response = await fetch(`http://localhost:5000/api/events/search?${queryString}`);
        
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          const errorText = await response.text();
          console.error("Error al buscar eventos:", errorText);
          setError(errorText);
        }
      } catch (error) {
        console.error("Error en la solicitud de búsqueda de eventos:", error);
        setError("Error en la solicitud de búsqueda de eventos");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, error, fetchEvents, createEvent, searchEvents }}>
      {children}
    </EventContext.Provider>
  );
};


export const useEvent = () => useContext(EventContext);