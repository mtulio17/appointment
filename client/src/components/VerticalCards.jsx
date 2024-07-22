
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LuMapPin, LuCalendarClock, LuHeart   } from "react-icons/lu";
import { useModal } from '../context/ModalContext';


const VerticalCards = ({event}) => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const { openModal } = useModal();


  const handleCardClick = () => {
    openModal(event);
    navigate(`/evento/${event.id}`);
  };
  
    const toggleFavorite = (id) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(id)
          ? prevFavorites.filter((favId) => favId !== id)
          : [...prevFavorites, id]
      );
    };
  console.log(event);
  return (
    <div key={event.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
    <img src={event.file} alt={event.activityName} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{event.activityName}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
      <div className="flex items-center justify-start mt-4">
        <LuMapPin />
        <span className="text-gray-500 mx-2">{event.city}, {event.state}</span>
      </div>
      <div className="flex flex-row items-center justify-start mt-4">
        <LuCalendarClock />
        <span className="text-gray-500">{event.startDate}</span>
        <span className="text-gray-500">{event.endDate}</span>
      </div>
      <div className="mt-4">
        <button onClick={() => openModal(event)} className="bg-Button text-white px-4 py-2 rounded shadow-md hover:bg-ButtonHover" >Ver Más</button>
      </div>
    </div>
    <button
      className="absolute top-2 right-2 text-red-500"
    >
      <LuHeart size={24} />
    </button>
  </div>
  )
}

export default VerticalCards