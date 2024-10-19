import { useEffect, useState } from "react";
import { fetchCityAndCountry } from "./fetchCityAndCountry";

const useLocation = () => {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit') === null;
    const deniedLocation = localStorage.getItem('deniedLocation') === 'true';

    const getLocation = async () => {
      if (navigator.geolocation) {
        // Pregunta si es la primera visita o si se ha denegado previamente
        if (firstVisit || deniedLocation) {
          const allowLocation = window.confirm(
            "Para mejorar la experiencia, debe permitir la ubicación para mostrar eventos cercanos a usted."
          );

          if (!allowLocation) {
            setCity(null); // Si no permite, asegurarse de que city y country sean null
            setCountry(null);
            setLoading(false);
            localStorage.setItem('firstVisit', 'false'); // Guardar en localStorage para no preguntar nuevamente
            localStorage.setItem('deniedLocation', 'true'); // Guardar que el usuario ha denegado el acceso
            return;
          }
          localStorage.setItem('firstVisit', 'false'); // Guardar en localStorage si se permite
          localStorage.removeItem('deniedLocation'); // Limpiar el estado de denegación si se permite el acceso
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const locationData = await fetchCityAndCountry(
                latitude,
                longitude
              );
              setCity(locationData.city);
              setCountry(locationData.country);
              setLoading(false);
            } catch (err) {
              setError(err);
              setLoading(false);
            }
          },
          (err) => {
            if (err.code === err.PERMISSION_DENIED) {
              console.warn("Geolocation permission denied.");
              setCity(null);
              setCountry(null);
              setLoading(false);
            } else {
              setError(err);
              setLoading(false);
            }
          }
        );
      } else {
        setError(new Error("Geolocation not supported"));
        setLoading(false);
      }
    };

    getLocation();
  }, []); // Solo ejecuta el efecto una vez al montar el componente

  return { city, country, loading, error };
};

export default useLocation;
