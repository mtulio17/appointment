// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Pin, CalendarClock, TicketPercent, UserCheck, Heart} from "lucide-react";
// import { useModal } from "../context/ModalContext";

const VerticalCards = ({ event }) => {
  // const [favorites, setFavorites] = useState([]);
  // const navigate = useNavigate();
  // const { openModal } = useModal();

  // const handleCardClick = () => {
  //   openModal(event);
  //   navigate(`/evento/${event.id}`);
  // };

  // const toggleFavorite = (id) => {
  //   setFavorites((prevFavorites) =>
  //     prevFavorites.includes(id)
  //       ? prevFavorites.filter((favId) => favId !== id)
  //       : [...prevFavorites, id]
  //   );
  // };
  // console.log(event);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..";
    }
    return text;
  }

  return (
    <div key={event._id} className="relative overflow-hidden cursor-pointer pb-8 my-8">
      <img
        src={event.file}
        alt={event.activityName}
        className="mx-auto w-full h-40 lg:h-44 lg:w-full object-cover object-center rounded-md hover:opacity-80 duration-200 mb-2"
      />
      <div className="p-1">
        <h3 className="text-lg font-semibold hover:underline cursor-pointer mb-1">
          {event.activityName}
        </h3>
        <p className="text-sm font-medium text-gray-600 mb-3">
          {truncateText(event.description, 11)}
        </p>
        <div className="flex items-center text-sm font-medium text-gray-900 mb-3">
          <Pin className="w-5 h-5 mr-3 opacity-60" />
          <span>{event.city}, {event.state}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-900 mb-3">
          <CalendarClock className="w-5 h-5 mr-3 opacity-60" />
          <span className="mr-2">{new Date(event.startDate).toLocaleDateString()}</span>
          <span>{event.startTime}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-900 mb-2">
          <TicketPercent className="w-5 h-5 mr-3 opacity-60" />
          <span className="mr-6">{event.price}</span>
          <UserCheck className="w-5 h-5 mr-2 opacity-60" />
          <span>{event.attendees?.length || 0} asistirán</span> {/* Manejo seguro */}
        </div>
        <button className="absolute top-2 right-2 text-white hover:text-red-500">
          <Heart size={22} />
        </button>
      </div>
    </div>

  );
};

export default VerticalCards;
