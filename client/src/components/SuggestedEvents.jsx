import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import VerticalCards from "./VerticalCards";
import axios from "axios";


const SuggestedEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const {user} = useAuth();
  
  useEffect(() => {
    const fetchSuggestedEvents = async () => {
      try {
        // fetcheamos los parámetros de consulta de la URL
        const queryParams = new URLSearchParams(window.location.search).toString();
        console.log('Fetching events with query params:', queryParams);
        const response = await axios.get(`http://localhost:5000/api/search?${queryParams}`);
        
        console.log('Eventos recibidos:', response.data); // verificamos los eventos en consola
        setEvents(response.data);
      } catch (error) {
        console.error('Error al obtener eventos sugeridos:', error);
        setError('No se pudieron obtener los eventos sugeridos.');
      }
    };

    fetchSuggestedEvents();
  }, []);

  if(!user){
    return <div>Cargando...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="py-36 bg-transparent">
    <div className="container mx-auto px-4 max-w-7xl">
    <h2 className="text-4xl font-bold leading-6 text-TextColor mb-14">Bienvenido, {user.username} 👋</h2>
      <h2 className="text-xl text-start text-[#2C2C2C] text-2xl font-semibold mb-4">Aquí hay algunos eventos cerca de tu zona</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.slice(0, 4).map((event) => (
          <VerticalCards key={event._id} event={event} />
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="bg-link text-white px-6 py-3 rounded hover:bg-linkHover">
          Ver Más Eventos
        </a>
      </div>
    </div>
  </section>
);
};

export default SuggestedEvents;
