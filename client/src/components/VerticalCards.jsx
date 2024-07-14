import React from 'react'
import { dataEvents } from "../data/dataEvents";


const VerticalCards = () => {
  return (
<section className="py-12 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Ultimos Eventos</h2>
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {dataEvents.slice(0, 4).map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={event.file} alt={event.activityName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.activityName}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-500">{event.city}, {event.state}</span>
                <span className="text-gray-500">{event.startDate} - {event.endDate}</span>
              </div>
              <div className="mt-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Ver Más Detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500">
          Ver Más Eventos
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default VerticalCards