import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ajedrez from '../assets/images/ajedrez-event.jpg'

const Profile = () => {
const { user } = useParams();

const events = [
  {
    "id": 1,
    "name": "Ajedrez en el Parque",
    "location": "San Miguel de Tucuman, Tucuman",
    "price": "Gratis",
    "image": "ajedrez.jpg"
  },
  {
    "id": 2,
    "name": "Ajedrez en el Parque",
    "location": "San Miguel de Tucuman, Tucuman",
    "price": "Gratis",
    "image": "ajedrez.jpg"
  }
]

  

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.picture} alt={user.name} /> */}
            <div className="min-w-0 flex-auto">
              <h2 className="text-sm font-semibold leading-6 text-gray-900">{user}</h2>
            </div>
          </div>
        </div>
        <hr />
        <div className="shrink-0 sm:flex sm:items-end py-3">
          <Link to={`/crear-evento/formulario`} className="flex sm:w-1/4 md:w-1/5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Crear Evento
          </Link>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <h2>Mis proximos eventos</h2>
          <ul>
          {events.map((event) => (
            <li key={event.id} className="flex py-2 shadow-md rounded-lg">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={ajedrez} alt={event.name} className="h-full w-full object-cover object-center" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h2>
                      <a href="#">{event.name}</a>
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{event.location}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">{event.price}</p>
                  <div className="flex">
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 pr-3">Cancelar</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>

    </div>
  )
}

export default Profile