import React from 'react'
import { dataEvents } from "../data/dataEvents";


const VerticalCards = () => {
  return (
    <section className="py-12 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Eventos Populares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {dataEvents.slice(0, 4).map((event) => (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={event.img} alt={event.activityName} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{event.activityName}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-500">{event.city}, {event.state}</span>
              <span className="text-gray-500">{event.startDate} - {event.endDate}</span>
            </div>
            <button className="bg-indigo-600 text-white my-2 px-4 py-2 rounded">Ver Detalles</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}

export default VerticalCards