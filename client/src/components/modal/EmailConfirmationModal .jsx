/* eslint-disable react/prop-types */
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import { useState } from "react";

export const EmailConfirmationModal = ({ event, onClose, onConfirm }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "El email no puede estar vacío.";
    if (!regex.test(email)) return "Por favor, ingresa un email válido.";
    return "";
  };

  const handleSubmit = async () => {
    setIsSending(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const validationError = validateEmail(email);
      if (validationError) throw new Error(validationError);
    
      const eventData = {
        user_name: "Nombre del Usuario",
        event_name: event?.name || "Evento",
        event_date: `${event?.start_date || ""} ${event?.start_time || ""}`,
        event_location: `${event?.address || ""}, ${event?.city || ""}, ${event?.country || ""}`,
      };
    
      await emailjs.send(
        "service_widi06p", 
        "template_jucttkb",
        { to_email: email, ...eventData },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    
      await onConfirm(email); // Puede lanzar errores
      setSuccessMessage("¡Email enviado con éxito!");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Error inesperado al enviar el email.");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      setEmail("");
      setErrorMessage("");
      setSuccessMessage("");
      onClose();
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full animate-fade-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medium">Confirmar Email</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSending}
          >
            <X />
          </button>
        </div>
        <p className="text-gray-700 mb-10">
          !Estás a un solo paso de inscribirte al evento {" "}<strong>{event?.name || "Evento"}</strong>!
          Por favor confirma tu
          correo electrónico para enviarte los detalles.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value);
           if (errorMessage) setErrorMessage("");
          }}
          placeholder="Ingresa tu email"
          className="w-full p-2 border rounded-lg mb-6"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
        <button onClick={handleSubmit} className={`bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 ${
          (!email || isSending) && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!email || isSending}
        >
          {isSending ? "Enviando..." : "Confirmar Email"}
        </button>
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};
