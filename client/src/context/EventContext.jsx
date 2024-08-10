import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

// Proveedor del contexto de eventos
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // crear un evento nuevo
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

  // función para obtener todos los eventos (puede ser por cercanía o según la ubicación del usuario)
  const fetchEvents = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/nearby?lat=${lat}&lng=${lng}`
      );
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Error al obtener eventos");
      }
    } catch (error) {
      console.error("Error en la solicitud de eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // acá se podria llamar a fetchEvents con la ubicación actual del usuario al cargar la página
    // fetchEvents(userLocation.lat, userLocation.lng);
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, fetchEvents, createEvent }}>
      {children}
    </EventContext.Provider>
  );
};


export const useEvent = () => useContext(EventContext);