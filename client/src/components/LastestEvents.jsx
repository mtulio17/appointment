import React from 'react'
import VerticalCards from './VerticalCards'
import { dataEvents } from "../data/dataEvents";
// import { useModal } from '../context/ModalContext';

const LastestEvents = () => {
    // const { openModal } = useModal();
  return (
    <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Últimos Eventos</h2>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataEvents.slice(0, 4).map((event) => (
            <VerticalCards
            key={event.id}
              event={event}
              //openModal={openModal}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="bg-link text-white px-6 py-3 rounded hover:bg-linkHover">
            Ver Más Eventos
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default LastestEvents