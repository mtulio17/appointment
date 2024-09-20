const SkeletonCategory = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center cursor-pointer transition-transform transform hover:scale-105">
      {/* Contenedor del ícono circular (Placeholder) */}
      <div className="flex items-center justify-center bg-gray-200 rounded-full mb-2 w-16 h-16 animate-pulse">
        {/* Placeholder del ícono */}
        <div className="w-24 h-20 bg-gray-200 rounded"></div>
      </div>
      {/* Texto debajo del ícono (Placeholder) */}
      <div className="w-20 h-4 bg-gray-100 mt-2 rounded animate-pulse"></div>
    </div>
  );
};

export default SkeletonCategory;
