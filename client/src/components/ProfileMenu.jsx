import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

const ProfileMenu = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative ml-3">
      <button
        type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={menuOpen} aria-haspopup="true" onClick={toggleMenu}>
        <span className="sr-only">Open user menu</span>
        <img className="h-8 w-8 rounded-full" src={user.picture} alt={user.name} />
      </button>
      {menuOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1"
        >
          <Link to={`/mis-eventos/${user.nickname}`} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
           Mis Eventos
          </Link>
          <Link to={`/grupos/${user.nickname}`} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
            Mis Grupos
          </Link>
          <div className='border-b border-gray-200 mx-2.5 my-2'></div>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
            Notificaciones
          </a>
          <Link to={`/configuración`} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
            Configuración
          </Link>
          <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
