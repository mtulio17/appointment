/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const EventParticipantsModal = ({participants, showModal, event, closeModal}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-80"></div>
    <div className="animate-fade-up bg-white rounded-md shadow-lg p-6 z-10 max-w-lg w-full">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">
          Lista de Participantes 
        </h2>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
        <X size={18} />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {participants.map((p, i) => (
          <div key={i} className="flex items-center mb-4">
            <img src={p.users?.avatar_url} alt={p.users?.first_name} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex justify-between w-full">
              <p className="font-medium text-base">{p.users?.full_name}</p>
              <p className="text-xs px-2 py-1.5 bg-blue-200 rounded-lg bg-gray-100 border border-slate-100">
                {p?.status} 
                <span className="text-blue-500 animate-pulse ml-2 text-sm">
                  •
                </span>
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};


export default EventParticipantsModal;