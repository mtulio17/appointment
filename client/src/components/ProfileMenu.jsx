import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from "lucide-react";

const ProfileMenu = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // console.log(user);

  return (
    <div className="relative ml-3">
      <button
        type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={menuOpen} aria-haspopup="true" onClick={toggleMenu}>
        <span className="sr-only">Abrir menú de usuario</span>
        <img className="h-12 w-12 rounded-full" src={user.picture} alt={user.username} />
      </button>
      {menuOpen && (
        <div className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white border-gray-400 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
           Ver Perfil
          </Link>
          <Link to="/suggested-events" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
            Mis Eventos
          </Link>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
            Notificaciones
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
          Configuración
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
          Ayuda
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
          Sobre Nosotros
          </a>
          <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">
            Cerrar Sesión <LogOut className='w-4 h-4' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
