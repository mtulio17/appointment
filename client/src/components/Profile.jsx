import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ajedrez from '../assets/images/ajedrez-event.jpg'

const Profile = () => {
  const { user } = useParams();

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixdivb=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div class="min-w-0 flex-auto">
              <h2 class="text-sm font-semibold leading-6 text-gray-900">{user}</h2>
            </div>
          </div>
        </div>

        <hr />

        <div class="shrink-0 sm:flex sm:items-end py-3">
          <Link to={`/profile/${user.nickname}/create`} className="flex sm:w-1/4 md:w-1/5 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Crear Evento
          </Link>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <h2>Mis proximos eventos</h2>
          <ul>
            <li class="flex py-2 shadow-md rounded-lg">
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={ajedrez} alt="" class="h-full w-full object-cover object-center" />
              </div>

              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h2>
                      <a href="#">Ajedrez en el Parque</a>
                    </h2>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">San Miguel de Tucuman, Tucuman</p>

                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                  <p class="text-gray-500">Gratis</p>
                  <div class="flex">
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500 pr-3">Cancelar</button>
                  </div>
                </div>
              </div>
            </li>

            <li class="flex py-2 shadow-md rounded-lg">
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={ajedrez} alt="" class="h-full w-full object-cover object-center" />
              </div>

              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h2>
                      <a href="#">Ajedrez en el Parque</a>
                    </h2>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">San Miguel de Tucuman, Tucuman</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                  <p class="text-gray-500">Gratis</p>

                  <div class="flex">
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500 pr-3">Cancelar</button>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>

    </div>
  )
}

export default Profile