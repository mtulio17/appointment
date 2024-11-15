import { Facebook, Linkedin, Twitter, Mail, Link, X   } from "lucide-react";

const ShareModal = ({ eventUrl, showModal, closeShareModal }) => {
  if (!showModal) return null;

  const shareOptions = [
    // { name: 'WhatsApp', icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${eventUrl}` },
    { name: 'Facebook', icon: <Facebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${eventUrl}` },
    { name: 'Twitter', icon: <Twitter />, url: `https://twitter.com/intent/tweet?url=${eventUrl}` },
    { name: 'LinkedIn', icon: <Linkedin />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${eventUrl}` },
    { name: 'Email', icon: <Mail />, url: `mailto:?subject=Check out this event&body=${eventUrl}` },
  ];

  const copyLink = () => {
    const copied = navigator.clipboard.writeText(eventUrl);
    alert('Link copiado al portapapeles!');
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="animate-jump-in bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Compartir</h2>
          <button onClick={closeShareModal} className="text-gray-500 hover:text-gray-700">
          <X />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
            >
              {option.icon}
              <span>{option.name}</span>
            </a>
          ))}
          <button onClick={copyLink} className="flex items-center space-x-3 text-gray-700 hover:text-gray-900">
          <Link />
            <span>Copiar link</span>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
