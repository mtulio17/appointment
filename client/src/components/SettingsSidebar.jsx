import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookText, Wrench, Mail, Lock, Hash, Heart, Bell, CreditCard, CircleHelp} from "lucide-react";

const sections = [
  { name: 'Editar Perfil', icon: <User />, path: 'editar-perfil' },
  { name: 'Informacion Personal', icon: <BookText />, path: 'personal' },
  { name: 'Gestion de Cuentas', icon: <Wrench />, path: 'gestion' },
  { name: 'Actualizacion por Email', icon: <Mail />, path: '/email-updates' },
  { name: 'Privacidad', icon: <Lock />, path: '/privacy' },
  { name: 'Social Media', icon: <Hash />, path: '/social-media' },
  { name: 'Intereses', icon: <Heart />, path: '/interests' },
  { name: 'Notifications', icon: <Bell />, path: '/notifications' },
  { name: 'Metodos de Pago', icon: <CreditCard />, path: '/payment-methods' },
  { name: 'Ayuda', icon: <CircleHelp />, path: '/help' },
];

const SettingsSidebar = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const handleClick = (section) => {
    setSelectedSection(section.name);
    navigate(section.path); 
  };


  return (
    <div className="w-1/4 bg-gray-100 h-full p-4 mt-20">
      <ul className="space-y-4">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(section)}
              className={`block text-left w-full p-2 rounded-lg flex items-center ${
                selectedSection === section.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-blue-100'
              }`}
            >
              <span className="mr-3 text-xl">{section.icon}</span>
              <span className="hidden md:inline">{section.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsSidebar;
