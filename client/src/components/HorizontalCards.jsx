import React from 'react'
import { Link } from 'react-router-dom';
import { dataEvents } from "../data/dataEvents";
import { LuMapPin, LuCalendarClock, LuHeart } from "react-icons/lu";


const HorizontalCards = ({ event }) => {
    // console.log(event.id);
    
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
                                {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500" src='event'>Ver Más Detalles</button> */}
                                <Link to={`events`} className="sm:w-1/4 md:w-1/5  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Ver Más Detalles
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default HorizontalCards