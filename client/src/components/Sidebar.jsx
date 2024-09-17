import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleHelp } from "lucide-react";
// import { User, BookText, Wrench, Mail, Lock, Hash, Heart, Bell, CreditCard, CircleHelp} from "lucide-react";


const Sidebar = ({ sections, title }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const handleClick = (section) => {
    setSelectedSection(section.name);
    navigate(section.path); 
  };

  return (
    <div className="w-1/4 bg-gray-100 h-full p-4 mt-20">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
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
        <li>
          <button className='block text-left w-full p-2 rounded-lg'>
            <a href="ayuda" className='flex items-center bg-blue-500 bg-transparent text-gray-700 hover:bg-blue-100'>
              <span className="mr-3 text-xl"> <CircleHelp /></span>
              <span className="hidden md:inline">Ayuda</span>
            </a>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;