import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events/search${location.search}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchEvents();
  }, [location.search]);

  return (
    <div>
      <h2>Resultados de la búsqueda</h2>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <h3>{event.activityName}</h3>
              <p>{event.description}</p>
              <p>{event.city}, {event.state}, {event.country}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron eventos.</p>
      )}
    </div>
  );
};

export default SearchResults;
