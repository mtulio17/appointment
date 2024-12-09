/* eslint-disable react/prop-types */
import { FacebookIcon, Linkedin, Twitter, Mail, Link, X   } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";


const ShareModal = ({ eventUrl, eventTitle, showModal, closeShareModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // bloquear el scroll cuando se abre el modal
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!showModal) return null;
  
  // opciones de redes sociales
  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter  size={22}/>,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={22}/>,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    },
    {
      name: "Facebook",
      icon: <FacebookIcon size={22} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    },
    {
      name: "Email",
      icon: <Mail size={22} />,
      url: `mailto:?subject=${encodeURIComponent(`Te invito al evento: ${eventTitle}`)}&body=${encodeURIComponent(`${eventTitle} - ${eventUrl}`)}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(eventUrl).then(() => {
      toast.success("¡Enlace copiado al portapapeles!");
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black opacity-70" onClick={closeShareModal}></div>
      
      {/* Contenedor del modal */}
      <div className="animate-fade-up bg-slate-100 rounded-lg shadow-lg p-6 z-10 max-w-lg w-full">
        {/* Encabezado */}
        <div>
          <h2 className="flex text-center justify-center text-2xl font-bold text-pretty">Compartir este evento</h2>
          <button onClick={closeShareModal} className="absolute text-gray-600 top-4 right-4">
            <X size={20} />
          </button>
        </div>
        

        {/* Opciones para compartir */}
        <div className="flex flex-col space-y-4 p-4">
        {shareOptions.map((option) => (
          <a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start gap-3 p-3 rounded-lg text-gray-600 hover:text-[#00798a] transition duration-300"
          >
            <span className="text-[#00798a] text-xl">{option.icon}</span>
            <span className="font-medium">{option.name}</span>
          </a>
        ))}

        {/* Botón para copiar enlace */}
        <button
          onClick={copyLink}
          className="flex items-center justify-start gap-3 p-3 rounded-lg text-gray-600 hover:text-[#00798a]  transition duration-300"
        >
          <Link size={22} className="text-[#00798a]" />
          <span className="font-medium">Copiar enlace</span>
        </button>
      </div>

      </div>
    </div>
  );
};

export default ShareModal;
