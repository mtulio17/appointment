/* eslint-disable react/prop-types */
import emailjs from "@emailjs/browser";
import { useUser } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {motion} from "framer-motion"
import { validateEmail } from "../../lib/validateEmail";


export const EmailConfirmationModal = ({ event, onClose, onConfirm }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user} = useUser();

  const generateCalendarLinks = () => {
    const startDate = event?.start_date;
    const startTime = event?.start_time;
    const eventLocation = `${event?.address || ""}, ${event?.city || ""}, ${event?.country || ""}`;
    const eventTitle = event?.name;

    // Formato de fecha para los enlaces de calendario (Asegúrate de que el formato sea correcto)
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 2); // Asume duración del evento de 2 horas.

    const formattedStart = startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]; // Google y Outlook requieren el formato ISO sin caracteres especiales
    const formattedEnd = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0];

  
    return {
      googleCalendarLink: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formattedStart}/${formattedEnd}&location=${eventLocation}`,
      outlookCalendarLink: `https://outlook.office.com/calendar/action/compose?rru=addevent&startdt=${formattedStart}&enddt=${formattedEnd}&subject=${eventTitle}&location=${eventLocation}`,
      icsFileLink: `https://calendar.google.com/calendar/ical/${encodeURIComponent(eventTitle)}%40google.com/public/basic.ics`
    };
};


  //  inicializa el estado del email con el email del usuario, si existe
  useEffect(() => {
    if (user?.emailAddresses && user.emailAddresses.length > 0) {
      setEmail(user.emailAddresses[0].emailAddress); 
    }
  }, [user?.emailAddresses]);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // bloquear el scroll cuando se abre el modal
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async () => {
    setIsSending(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const validationError = validateEmail(email);
      if (validationError) throw new Error(validationError);

      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
      const eventURL = `${baseURL}/event/${event?.id}`;

      const eventParams = {
        user_name: user?.firstName || "username",  // {{user_name}}
        event_name: event?.name || "Evento",    //{{event_name}}
        event_date: `${event?.start_date || ""} ${event?.start_time || ""}`, // {{event_date}} en el template
        event_location: `${event?.address || ""}, ${event?.city || ""}, ${event?.country || ""}`,  // {{event_location}}
        event_url: eventURL,
        ...generateCalendarLinks(),
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
    <div id="modal-overlay"  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
       <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Confirmar Email</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 duration-300" disabled={isSending}>
            <X />
          </button>
        </div>
        <p className="text-gray-700 mb-10">
          Por favor, ingresar tu email para confirmar tu inscripción y obtener acceso al evento.
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
     <div className="relative w-full mb-10">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}  
          placeholder="Ingresar un email válido"
          className="w-full p-2 pr-10 border rounded-lg"
        />
        {email && (
          <button
            type="button"
            onClick={() => setEmail("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>
        <button onClick={handleSubmit} className={`bg-gray-900 text-white px-4 py-2 rounded-lg w-full hover:bg-black duration-200 ${
          (!email || isSending) && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!email || isSending}
        >
          {isSending ? "Enviando..." : "Confirmar Email"}
        </button>
        </motion.div> 
      </div>
  );
};
