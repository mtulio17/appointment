import React, {useState} from 'react'
import { LuLogOut } from "react-icons/lu";


const ProfileMenu = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
console.log(menuOpen);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    };
    return (
        <div class="relative ml-3">
            <div>
                <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={menuOpen} aria-haspopup="true" onClick={toggleMenu}>
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src={props.user.picture} alt={props.user.name} />
                </button>
            </div>
            {menuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Mi Perfil</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Notificaciones</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={props.handleLogout}>Cerrar Session<LuLogOut /></a>
                </div>
            )}
        </div>
    )
}

export default ProfileMenu