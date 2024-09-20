import React from 'react'
import { Link } from 'react-router-dom';
import { Share, Bookmark } from "lucide-react";
// import { dataEvents } from "../data/dataEvents";



const HorizontalCards = ({ event }) => {
    // console.log(event.id);

    return (
        <Link to="/event-details" className="block">
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 mb-2 hover:shadow-lg transition-shadow duration-300">
                {/* Imagen */}
                <div className="w-32 h-20 rounded-lg overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contenido */}
                <div className="flex-1 ml-4">
                    {/* Fecha y Hora */}
                    <div className="text-xs text-yellow-600 font-semibold mb-1">
                        {event.start_date} - {event.start_time}
                    </div>

                    {/* Título del evento */}
                    <div className="text-sm font-bold text-gray-800 mb-1">
                        {event.name}
                    </div>

                    {/* Ubicación */}
                    <div className="text-xs text-gray-600">
                        {event.address}, {event.city}, {event.country}
                    </div>

                    {/* Número de asistentes */}
                    <div className="text-xs text-gray-500 mt-2">
                       {event.host_id}
                    </div>
                </div>

                {/* Botones */}
                <div className="flex items-center space-x-3">
                    {/* Icono compartir */}
                    <button className="text-gray-500 hover:text-gray-700">
                        <Share />
                    </button>

                    {/* Icono favorito */}
                    <button className="text-gray-500 hover:text-gray-700">
                        <Bookmark />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default HorizontalCards