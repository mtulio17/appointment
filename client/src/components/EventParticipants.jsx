/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import EventParticipantsModal from "./modal/EventParticipantsModal";

const EventParticipants = ({ participants = [], hostId, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // posiciona al host al inicio y elimina duplicados
  const uniqueParticipants = [
    ...participants.filter((p) => p.user_id === hostId), // Host primero
    ...participants.filter((p) => p.user_id !== hostId), // Otros participantes
  ].filter(
    (participant, index, self) =>
      index === self.findIndex((p) => p.user_id === participant.user_id)
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mt-16 mb-2">
        <h2 className="lg:text-lg font-semibold">
          Asistentes ({uniqueParticipants.length})
        </h2>
        <button
          className="lg:text-sm text-Button font-normal hover:underline px-6 py-2"
          onClick={openModal}
        >
          Ver todo
        </button>
      </div>
      <div className="bg-white px-2 py-4 rounded">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mostrar hasta 3 primeros participantes */}
          {uniqueParticipants.slice(0, 3).map((p) => (
                <div key={p.user_id} className="bg-white rounded-lg shadow p-4 text-center">
                  <img
                    src={p.users?.avatar_url}
                    alt={p.users?.first_name}
                    className="w-10 h-10 rounded-full mx-auto mb-2"
                  />
                  <p className="font-medium">{p.users?.first_name}</p>
                  <p className="text-xs text-gray-500">
                    {p.user_id === hostId ? "Host" : "Participante"}
                  </p>
                  {p.user_id === hostId && (
                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      Organizador
                    </span>
                  )}
                  {p.user_id === userId && (
                    <span className="bg-blue-200 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                      Tú
                    </span>
                  )}
                </div>
              ))}
          {/* Mostrar imágenes de participantes adicionales si hay más de 3 */}
          {uniqueParticipants.length > 3 && (
            <div
              key="extra-participants"
              className="bg-white rounded-lg shadow-md p-4 text-center flex items-center justify-center"
            >
              <div>
                <div className="flex items-start justify-center">
                  {uniqueParticipants.slice(3, 7).map((p, index) => (
                    <img key={p.user_id} src={p?.avatar_url} alt={p?.name} className="w-12 h-12 rounded-full mb-2" style={{ marginLeft: index === 0 ? 0 : "-48px" }}
                    />
                  ))}
                </div>
                <span className="text-gray-500 mt-2">
                  +{uniqueParticipants.length - 3} más
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <EventParticipantsModal
        showModal={isModalOpen}
        participants={uniqueParticipants}
        closeModal={closeModal}
      />
    </div>
  );
};

export default EventParticipants;