/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ address}) => {
  const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Coordenadas iniciales de la ubicación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCoordinates = async () => {
      if(!address){
        setError('No se proporciono una dirección válida.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // limpiar error
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
          )}&format=json`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError('No se encontraron coordenadas para la ubicación proporcionada.');
        }
      } catch (err) {
        setError('Hubo un error al obtener las coordenadas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div className="rounded-xl">
    {loading && <p className="flex justify-center text-center">Cargando mapa...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && (
      <MapContainer center={coordinates} zoom={12} style={{ height: "300px", width: "100%" }} className="animate-fade">
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={coordinates}>
          <Popup>
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    )}
  </div>
  );
};

export default MapComponent;