/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import EventParticipantsModal from "./EventParticipantsModal";
// import { useUser } from '@clerk/clerk-react';

const EventParticipantsSection = ({ participants, hostId, userId }) => {
  // console.log(participants, hostId, userId);
  // const [participantDetails, setParticipantDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Desactiva el scroll
    } else {
      document.body.style.overflow = "unset"; // Restablece el scroll
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  


  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mt-16 mb-2">
        <h2 className="lg:text-lg font-semibold">
          Asistentes ({participants && participants.length})
        </h2>
        <button
          className="lg:text-sm text-Button font-normal hover:underline px-6 py-2"
          onClick={openModal}
        >
          Ver todo
        </button>
      </div>
      <div className="bg-white px-4 py-4 rounded">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mostrar hasta 3 primeros participantes */}
          {participants &&
            participants.slice(0, 3).map((participant) => (
              <div
                key={participant.user_id} // Usar participant.user_id como key único
                className="bg-white rounded-lg shadow-md p-4 text-center"
              >
                <img
                  src={participant.image}
                  alt={participant.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold">{participant.name}</p>
                <p className="text-xs text-gray-500">
                  {participant.user_id === hostId ? "Host" : "Participante"}
                </p>
                {participant.user_id === hostId && (
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                    Organizador
                  </span>
                )}
                {participant.user_id === userId && (
                  <span className="bg-blue-200 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                    Tú
                  </span>
                )}
              </div>
            ))}

          {/* Mostrar imágenes de participantes adicionales si hay más de 3 */}
          {participants && participants.length > 3 && (
            <div
              key="extra-participants"
              className="bg-white rounded-lg shadow-md p-4 text-center flex items-center justify-center"
            >
              <div>
                <div className="flex items-start justify-center">
                  {participants &&
                    participants
                      .slice(3, 7)
                      .map((participant, index) => (
                        <img
                          key={participant.user_id}
                          src={participant.image}
                          alt={participant.name}
                          className="w-16 h-16 rounded-full mb-2"
                          style={{ marginLeft: index === 0 ? 0 : "-48px" }}
                        />
                      ))}
                </div>
                <span className="text-gray-500 mt-2">
                  +{participants && participants.length - 3} más
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <EventParticipantsModal
        showModal={isModalOpen}
        participants={participants}
        closeModal={closeModal}
      />
    </div>
  );
};

export default EventParticipantsSection;
