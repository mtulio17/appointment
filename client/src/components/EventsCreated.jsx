import { useEffect, useState } from 'react';
import {useUser} from "@clerk/clerk-react";
import VerticalCards from './VerticalCards';

const MyCreatedEvents = () => {
  const { user, isSignedIn, isLoaded } = useUser(); 

  if (!isSignedIn) {
    return <div>No estás autenticado</div>; // O redirige a la página de inicio de sesión
  }

  return (
    <section className="bg-transparent py-8">
      <div className='border-b border-gray-200 bg-gray-50 py-10'>
      <h2 className="text-3xl font-bold leading-6 text-TextColor mt-10 p-2">Eventos que has creado recientemente: </h2>
      </div>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* {VerticalCards.slice(0, 8).map((event) => (
              <VerticalCards key={event._id} event={event} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCreatedEvents;