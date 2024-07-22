import React, { createContext, useState, useContext } from 'react';
import EventModal from '../components/EventModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = (event) => {
    setModalData(event);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
      {/* Aquí el modal debe ser visible en toda la aplicación */}
      {modalData && <EventModal />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

