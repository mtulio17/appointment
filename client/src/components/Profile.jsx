// import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HorizontalCards from './HorizontalCards';
import { dataEvents } from "../data/dataEvents";


const Profile = () => {
  const {user} = useAuth();
  console.log('Usuario en el perfil', user)

  if(!user){
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className='flex'>
      <Sidebar sections={profileSections} />

      <div className="max-w-4xl px-4 mt-14 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-x-6 py-10">
          <div className="min-w-0 flex-auto my-auto">
            <h2 className="text-xl font-bold leading-6 text-TextColor">Hola, {user.username} 👋</h2>
          </div>
          {/* <div className='min-w-0 my-auto'>
          </div> */}
        </div>
        <hr />
        <div className="shrink-0 sm:flex sm:items-end py-3">
          <Link to={`create-event/${user.username}`} className="flex sm:w-1/4 md:w-1/5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Crear Evento
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile