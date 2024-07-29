import React from 'react'
import { dataEvents } from "../data/dataEvents";
import { LuMapPin, LuCalendarClock, LuHeart   } from "react-icons/lu";


const HorizontalCards = ({event}) => {
    return (
        <section className="">
                <div className="max-w-6xl mx-auto">
                    <div>
                        
                            <div className="bg-white rounded-lg shadow-md flex overflow-hidden my-2">
                                <img src={event.file} alt={event.activityName} className="w-32 h-32 object-cover" />
                                <div className="p-4 flex-1">
                                    <h3 className="text-lg font-semibold mb-2">{event.activityName}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-gray-500">{event.city}, {event.state}</p>
                                        <div className="text-gray-500">{event.startDate} - {event.endDate}</div>
                                    </div>
                                    <div className="mt-4">
                                        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Ver Más Detalles</button>
                                    </div>
                                </div>
                            </div>
                 
                    </div>
                </div>
      
        </section>
    )
}

export default HorizontalCards