import { createContext, useState, useContext, useEffect } from "react";
import EventModal from "../components/modal/EventModal";
import ManageParticipantsModal from "../components/modal/ManageParticipantsModal";
import { EmailConfirmationModal } from "../components/modal/EmailConfirmationModal ";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = (event) => {
    // console.log("Abriendo modal con evento:", event);
    setModalData(event);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setModalData(null);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}

      {modalData?.type === "edit" && (
        <EventModal event={modalData.event} onClose={closeModal} />
      )}

      {modalData?.type === "manageParticipants" && (
        <ManageParticipantsModal
          participants={modalData.event?.participants || []}
          event={modalData.event}
          onClose={closeModal}
        />
      )}

      {modalData?.type === "emailConfirmation" && (
        <EmailConfirmationModal
          event={modalData.event}
          onClose={closeModal}
          onConfirm={modalData.onConfirm}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
