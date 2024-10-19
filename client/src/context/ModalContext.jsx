import { createContext, useState, useContext, useEffect } from 'react';
import EventModal from '../components/EventModal';
// import ConfirmCancelModal from '../components/ConfirmCancelModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = (event) => {
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

      {/* {modalData?.type === 'cancel' && (
        <ConfirmCancelModal event={modalData.event} onClose={closeModal} />
      )} */}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

