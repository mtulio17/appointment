import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ address, city, country }) => {
  const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Coordenadas iniciales (Londres)
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const location = "juan Domingo Perón 2085, yerba buena, Argentina"


  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null); // Limpiar error al iniciar la búsqueda
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            location
          )}&format=json`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError('No se encontraron coordenadas para la ubicación proporcionada.');
        }
      } catch (err) {
        setError('Error al obtener las coordenadas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [location]);

  return (
    <div className='rounded-xl'>
      {loading && <p className='flex justify-center text-center'>Cargando mapa...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <MapContainer center={coordinates} zoom={13} style={{ height: "280px", width: "100%" }} className='animate-fade'>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>
              {location}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;