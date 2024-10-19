import { useUser } from '@clerk/clerk-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { getSavedEvents } from '../api/apievents';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const {isLoaded, user} = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      loadSavedEvents();
    }
  }, [isLoaded, user]);

  // función para cargar eventos guardados
  const loadSavedEvents = async () => {
    const savedEvents = await getSavedEvents(user.access_token);
    setFavorites(savedEvents.map(saved => saved.event)); 
  };

  // verifica si un evento está en favoritos
  const isFavorite = (eventId) => {
    return favorites.some(event => event.id === eventId);
  };

   // Alternar favorito: añadir o eliminar un evento
   const toggleFavorite = (event) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === event.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== event.id); // Eliminar
      } else {
        return [...prevFavorites, event]; // Agregar
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loadSavedEvents }}>
      {children}
    </FavoritesContext.Provider>
  );
};