/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ManageParticipantsModal = ({participants = [], loading = false, eventId, closeModal}) => {
  
  useEffect(() => {
    if (eventId) {
      console.log("Participantes recibidos en el modal:", participants);
    }
  }, [eventId, participants]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <ClipLoader color={"#212121"} size={40} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="animate-fade-up bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gestionar Participantes</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <div key={participant.user_id} className="flex items-center mb-4">
                <img
                  src={participant.users?.avatar_url || "/placeholder-avatar.png"}
                  alt={participant.users?.full_name || "Usuario"}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex justify-between w-full">
                  <p className="font-medium text-base">
                    {participant.users?.full_name || "Usuario desconocido"}
                  </p>
                  <p
                    className={`text-xs px-2 py-1 border rounded-lg ${
                      participant?.status === "confirmed"
                        ? "bg-green-100 border-green-300 text-green-800"
                        : "bg-gray-100 border-gray-300 text-gray-800"
                    }`}
                  >
                    {participant?.status || "Sin estado"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Aún no hay participantes registrados para este evento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageParticipantsModal;
