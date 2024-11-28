/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useFetch from "../../hooks/use-fetch";
import { getEventParticipants } from "../../api/apievents";
import { X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const ManageParticipantsModal = ({ event, closeModal, token}) => {
  const [isParticipating, setIsParticipating] = useState(false);
  const { user } = useUser(); // Obtener usuario actual
  const { data: participants = [], error, isLoading: loadingParticipants, fn: fetchParticipants } = useFetch(getEventParticipants);

  useEffect(() => {
    // Asegúrate de que token y event.id existan antes de hacer la consulta
    if (token && event?.id) {
      fetchParticipants(token, event.id);
    }
  }, [event, token, fetchParticipants]); // Solo vuelve a ejecutar cuando cambien event o token

  useEffect(() => {
    if (user && participants) {
      setIsParticipating(participants.some((participant) => participant.user_id === user.id));
      console.log(participants)
    }
  }, [user, participants])


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-80"></div>
    <div className="animate-fade-up bg-white rounded-md shadow-lg p-6 z-10 max-w-lg w-full">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">
          Gestionar Participantes
        </h2>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
        <X size={18} />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
          {loadingParticipants ? (
            <p>Cargando participantes...</p>
          ) : error ? (
            <p>Error al cargar participantes.</p>
          ) : participants.length > 0 ? (
            participants.map((p, i) => (
              <div key={i} className="flex items-center mb-4">
                <img
                  src={p.users?.avatar_url || "/placeholder-avatar.png"}
                  alt={p.users?.full_name || "Usuario"}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex justify-between w-full">
                  <p className="font-medium text-base">{p.users?.full_name}</p>
                  <p className="text-xs px-2 py-1.5 bg-gray-100 border border-slate-100 rounded-lg">
                    {p?.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay participantes para este evento.</p>
          )}
        </div>
      </div>
    </div>
);
};

export default ManageParticipantsModal