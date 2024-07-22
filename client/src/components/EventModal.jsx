import React from 'react';
import { useModal } from '../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { LuX } from "react-icons/lu";

const EventModal = () => {
  const { modalData, closeModal } = useModal();
  const navigate = useNavigate();

  if (!modalData) return null;

  const handleClose = () => {
    closeModal();
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-5/6 p-6">
        <button onClick={handleClose} className="absolute top-4 right-4 text-background hover:text-gray-900">
          <LuX/>
        </button>
        <h2 className="text-2xl font-bold mb-4">{modalData.activityName}</h2>
        <img src={modalData.file} alt={modalData.activityName} className="w-full h-64 object-cover mb-4" />
        <p className="text-lg mb-4">{modalData.description}</p>
        <div className="flex items-center mb-4">
          <p className="text-gray-500">{modalData.city}, {modalData.state}</p>
        </div>
        <div className="flex items-center mb-4">
          <p className="text-gray-500">{modalData.startDate} - {modalData.endDate}</p>
        </div>
        <div>
            <div>

            </div>
        <button className="bg-Button text-white px-4 py-2 rounded shadow-md hover:bg-ButtonHover">
            Participar
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default EventModal;