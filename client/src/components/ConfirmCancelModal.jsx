import React from 'react'

const ConfirmCancelModal = ({ event, onClose, handleConfirmCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Estás a punto de cancelar un evento</h2>
        <p className="mb-6">¿Estás seguro de que deseas eliminar el evento {" "}
          <span className='font-semibold'>{event.name}</span>
          ?
        </p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="btn btn-secondary px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button onClick={() => handleConfirmCancel(event)} className="btn btn-danger px-4 py-2 bg-red-600 text-white rounded">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;