import React from 'react'

const SkeletonHorizontaCard = () => {
  return (
  <div className="flex relative overflow-hidden border border-gray-100 p-5 my-5 rounded-md animate-pulse">
    {/* Imagen en gris */}
    <div className="bg-gray-200 w-32 h-32 lg:w-40 lg:h-40 rounded-md mb-2"></div>
    {/* Contenido de la card en gris */}
    <div className="flex-1 p-4">
      {/* Título */}
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      {/* Descripción */}
      <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
      <div className="h-3 bg-gray-100 rounded mb-2 w-4/5"></div>
      {/* Fecha */}
      <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
      {/* Ubicación */}
      <div className="h-3 bg-gray-50 rounded mb-2 w-1/3"></div>
    </div>
  </div>
  )
}

export default SkeletonHorizontaCard