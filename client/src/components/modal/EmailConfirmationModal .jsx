/* eslint-disable react/prop-types */
import emailjs from "@emailjs/browser";
import { useUser } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { useState } from "react";
import { validateEmail } from "../../lib/validateEmail";

export const EmailConfirmationModal = ({ event, onClose, onConfirm }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
    setIsSending(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const validationError = validateEmail(email);
      if (validationError) throw new Error(validationError);

      const eventParams = {
        user_name: user?.firstName || "username",  // {{user_name}}
        event_name: event?.name || "Evento",    //{{event_name}}
        event_date: `${event?.start_date || ""} ${event?.start_time || ""}`, // {{event_date}} en el template
        event_location: `${event?.address || ""}, ${event?.city || ""}, ${event?.country || ""}`,  // {{event_location}}
        event_url: `https://appointment-gilt.vercel.app/event/${event?.id}` //URL del evento
      };
      
      await emailjs.send(
        "service_widi06p", 
        "template_jucttkb",
        { to_email: email, ...eventParams }, 
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      await onConfirm(email);
      setSuccessMessage("¡Email enviado con éxito! Por favor revisa tu casilla de correo para ver la información del evento al que te registraste.");
    } catch (error) {
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

      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Confirmar Email</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700" disabled={isSending}>
            <X />
          </button>
        </div>
        <p className="text-gray-700 mb-10">
          Por favor, ingresa tu email para confirmar tu inscripción y obtener acceso al evento.
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
        <input type="email" value={email} onChange={(e) => {setEmail(e.target.value);
          if (errorMessage) setErrorMessage("");
          }}
          placeholder="Ingresar tu email válido"
          className="w-full p-2 py-2 px-2 border rounded-lg mb-10"
        />
        <button onClick={handleSubmit} className={`bg-gray-900 text-white px-4 py-2 rounded-lg w-full hover:bg-black duration-200 ${
          (!email || isSending) && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!email || isSending}
        >
          {isSending ? "Enviando..." : "Confirmar Email"}
        </button>
      </div>
    </div>
  );
};
