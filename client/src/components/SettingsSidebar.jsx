import React from 'react';
import { User, BookText, Wrench, Mail, Lock, Hash, Heart, Bell, CreditCard, CircleHelp} from "lucide-react";

const sections = [
  { name: 'Editar Perfil', icon: <User /> },
  { name: 'Informacion Personal', icon: <BookText /> },
  { name: 'Gestion de Cuentas', icon: <Wrench /> },
  { name: 'Actualizacion por Email', icon: <Mail /> },
  { name: 'Privacidad', icon: <Lock /> },
  { name: 'Social Media', icon: <Hash /> },
  { name: 'Intereses', icon: <Heart />},
  { name: 'Notifications', icon: <Bell /> },
  { name: 'Metodos de Pago', icon: <CreditCard /> },
  { name: 'Ayuda', icon: <CircleHelp /> },
];

const SettingsSidebar = ({ selectedSection, onSelect }) => {
  return (
    <div className="w-1/4 bg-gray-100 h-full p-4">
      <ul className="space-y-4">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(section.name)}
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
