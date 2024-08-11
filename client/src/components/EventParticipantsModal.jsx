import React, { useState } from 'react';
import { X } from "lucide-react";


const EventParticipantsModal = ({participants, showModal, closeModal}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Participantes</h2>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
        <X />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center mb-4">
            <img src={participant.image} alt={participant.name} className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="font-semibold">{participant.name}</p>
              <p className="text-sm text-gray-500">{participant.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};


export default EventParticipantsModal;