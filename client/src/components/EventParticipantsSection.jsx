import React, {useState, useEffect} from 'react';
import EventParticipantsModal from './EventParticipantsModal'

const EventParticipantsSection = ({ participants, hostId, isHost, userId }) => {
    console.log(participants, hostId, userId);
  const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

      useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = 'hidden'; // Desactiva el scroll
        } else {
          document.body.style.overflow = 'unset'; // Restablece el scroll
        }
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isModalOpen]);
    
  return (
    <div className="w-full">
      <div className="flex items-center justify-between my-5">
        <h2 className="text-2xl font-semibold">
          Asistentes ({participants.length})
        </h2>
        <button className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none" onClick={openModal} >
          Ver más
        </button>
      </div>
      <div className="bg-gray-100 px-3 py-3 rounded">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mostrar hasta 3 primeros participantes */}
          {participants.slice(0, 3).map((participant) => (
            <div
              key={participant.id} // Usar participant.id como key único
              className="bg-white rounded-lg shadow-md p-4 text-center"
            >
              <img
                src={participant.image}
                alt={participant.name}
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <p className="font-semibold">{participant.name}</p>
              <p className="text-sm text-gray-500">
                {participant.id === hostId ? 'Host' : 'Participant'}
              </p>
              {participant.id === hostId && (
                <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                  Host
                </span>
              )}
              {participant.id === userId && (
                <span className="bg-blue-200 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                  You
                </span>
              )}
            </div>
          ))}

          {/* Mostrar imágenes de participantes adicionales si hay más de 3 */}
          {participants.length > 3 && (
            <div
              key="extra-participants" 
              className="bg-white rounded-lg shadow-md p-4 text-center flex items-center justify-center"
            >
              <div>
                <div className="flex items-start justify-center">
                  {participants.slice(3, 7).map((participant, index) => (
                    <img
                      key={participant.id} 
                      src={participant.image}
                      alt={participant.name}
                      className="w-16 h-16 rounded-full mb-2"
                      style={{ marginLeft: index === 0 ? 0 : '-48px' }}
                    />
                  ))}
                </div>
                <span className="text-gray-500 mt-2">
                  +{participants.length - 3} más
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <EventParticipantsModal showModal={isModalOpen} participants={participants} closeModal={closeModal}/>
    </div>
  );
};

export default EventParticipantsSection;