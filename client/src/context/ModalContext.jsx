import { createContext, useState, useContext, useEffect } from 'react';
import EventModal from '../components/modal/EventModal';
import { EmailConfirmationModal } from '../components/modal/EmailConfirmationModal ';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = (event) => {
    console.log('Abriendo modal con evento:', event); // Verifica cuándo se llama a openModal
    setModalData(event);
    document.body.classList.add('overflow-hidden'); // bloquea scroll
  };
  

  const closeModal = () => {
    setModalData(null);
    document.body.classList.remove('overflow-hidden'); // permite scrollear
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
      
      {modalData?.type === 'edit' && (
        <EventModal event={modalData.event} onClose={closeModal} />
      )}

      {modalData?.type === 'emailConfirmation' && (
        <EmailConfirmationModal event={modalData.event} onClose={closeModal} onConfirm={modalData.onConfirm} />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

