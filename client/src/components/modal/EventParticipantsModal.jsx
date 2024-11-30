/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const EventParticipantsModal = ({participants, showModal, closeModal}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="animate-fade-up bg-white rounded-md shadow-lg p-6 z-10 max-w-lg w-full">
        <div className="flex justify-between items-center mb-10">
          <h2 className="lg:text-2xl font-semibold">Lista de Participantes</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {participants.map((p, i) => (
            <div
              key={i}
              className={`flex items-center mb-4 ${
                p.isHost ? "bg-blue-50 rounded-md py-2 " : ""
              }`}
            >
              <img
                src={p.avatar_url || "/default-avatar.png"}
                alt={p.full_name || "Participante"}
                className="w-9 h-9 rounded-full mr-4"
              />
                <div className="flex justify-between w-full">
        <div>
          <p className="font-medium text-base">
            {p?.full_name || "Oculto"}
          </p>
          {/* Mostrar Organizador o Participante debajo del nombre */}
          <span
            className={`text-xs font-semibold ${
              p.isHost ? "text-blue-700" : "text-gray-500"
            }`}
          >
            {p.isHost ? "Organizador" : "Participante"}
          </span>
        </div>
              {/* Mostrar estado solo si existe */}
              {p.status && !p.isHost && (
                <p className="text-xs px-2 py-1.5 bg-gray-100 rounded-lg border border-slate-100">
                  {p.status}
                  <span className="text-blue-500 animate-pulse ml-2 text-base">•</span>
                </p>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
);
};


export default EventParticipantsModal;