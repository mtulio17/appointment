import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HorizontalCards from './HorizontalCards';
import { dataEvents } from "../data/dataEvents";





const Profile = () => {
  const { user } = useParams();

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 mt-14 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-x-6 py-10">
          <div className="flex flex-col min-w-0 gap-x-4 ">
            <div className=''>
              <img className="h-14 w-14 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixdivb=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <div>
              <a className="text-sm" href="#">Editar Perfil</a>
            </div>
          </div>
          <div className="min-w-0 flex-auto my-auto">
            <h2 className="text-xl font-semibold leading-6 text-TextColor">Hola, {user}!</h2>
          </div>
          <div className='min-w-0 my-auto'>
            <button
              className="text-Button font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
     
            >
              Crear Evento
            </button>
          </div>
        </div>

        <hr />

        <div className="shrink-0 sm:flex sm:items-end py-3">
          {/* <Link to={`/profile/${user.nickname}/create`} className="flex sm:w-1/4 md:w-1/5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Crear Evento
          </Link> */}
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h2>Mis proximos eventos</h2>
          
              <div className="max-w-6xl mx-auto">
                <div className="">
                  {dataEvents.slice(0, 8).map((event) => (
                    <HorizontalCards
                      key={event.id}
                      event={event}
                    //openModal={openModal}
                    />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="" className="bg-link text-white px-6 py-3 rounded hover:bg-linkHover">
                    Ver Más Eventos
                  </a>
                </div>
              </div>
           

        </div>
      </div>

    </div>
  )
}

export default Profile