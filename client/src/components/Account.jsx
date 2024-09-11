import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'
import { User, BookText, Wrench, Mail, Lock, Hash, Heart, Bell, CreditCard, CircleHelp} from "lucide-react";


const sections = [
  { name: 'Editar Perfil', icon: <User />, path: 'editar-perfil' },
  { name: 'Informacion Personal', icon: <BookText />, path: 'personal' },
  { name: 'Gestion de Cuentas', icon: <Wrench />, path: 'gestion' },
  { name: 'Actualizacion por Email', icon: <Mail />, path: '/email-updates' },
  { name: 'Privacidad', icon: <Lock />, path: '/privacidad' },
  { name: 'Intereses', icon: <Heart />, path: '/interests' },
  { name: 'Notifications', icon: <Bell />, path: '/notifications' },
  // { name: 'Ayuda', icon: <CircleHelp />, path: '/ayuda' },
];

const Account = () => {
  return (
    <div className='flex'>
      <Sidebar sections={sections} />
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>

  )
}

export default Account