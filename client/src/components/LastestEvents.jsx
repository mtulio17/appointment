import React from 'react'
import VerticalCards from './VerticalCards'
import { dataEvents } from "../data/dataEvents";
// import { useModal } from '../context/ModalContext';

const LastestEvents = () => {
    // const { openModal } = useModal();
  return (
    <section className="py-4 bg-transparent">
    <div className="container mx-auto px-4 max-w-7xl">
      <h2 className="flex justify-start text-start text-[#2C2C2C] text-2xl font-bold mb-2">Últimos Eventos cerca de tu zona:</h2>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {dataEvents.slice(0, 8).map((event) => (
            <VerticalCards key={event.id} event={event}
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