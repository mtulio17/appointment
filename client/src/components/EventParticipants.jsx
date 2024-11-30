/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import EventParticipantsModal from "./modal/EventParticipantsModal";

const EventParticipants = ({ participants = [], host, hostId, isHost, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("Host:", host);
    console.log("Participants:", participants);
  }, [host, participants]);
  

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
    ...(host
      ? [
          {
            user_id: hostId,
            avatar_url: host?.avatar_url || "https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-avatar-placeholder-abstract-white-blue-green-png-image_3918476.jpg",
            full_name: host?.full_name || "Organizador",
            isHost: true,
          },
        ]
      : []),
    ...participants.map((p) => ({
      user_id: p.user_id,
      avatar_url: p.users?.avatar_url || "https://media.istockphoto.com/id/1435566677/vector/placeholder-icon-illustration.jpg?s=612x612&w=0&k=20&c=mMfFWN3fGUOv5S75bC5tmMSzFDNoqiCQFfVoMTsC4n0=",
      full_name: p.users?.full_name || "Participante",
      isHost: false,
    })),
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
            Ver todos
          </button>
        </div>
        <div className="bg-white px-2 py-4 rounded">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mostrar hasta 3 primeros participantes */}
          {uniqueParticipants.slice(0, 3).map((p) => (
            <div key={p.user_id} className="bg-white rounded-lg shadow p-4 text-center">
              <img
                src={p.avatar_url}
                alt={p.full_name}
                className="w-8 h-8 rounded-full mx-auto mb-2"
              />
              <p className="font-medium text-sm mb-1">{p.full_name}</p>
              {p.isHost ? (
                <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                  Organizador
                </span>
              ) : (
                <p className="text-xs text-gray-500">Participante</p>
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
                <div key="extra-participants" className="bg-white rounded-lg shadow-md p-4 text-center flex items-center justify-center">
                  <div>
                    <div className="flex items-start justify-center">
                      {uniqueParticipants.slice(3, 7).map((p, index) => (
                        <img key={p.user_id} src={p?.avatar_url} alt={p.users?.first_name} className="w-12 h-12 rounded-full mb-2" style={{ marginLeft: index === 0 ? 0 : "-48px" }}
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
          isHost={isHost}
          // onRemoveParticipant={handleRemoveParticipant}
        />
      </div>
  );
};

export default EventParticipants;