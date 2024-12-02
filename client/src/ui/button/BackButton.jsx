/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = ({ label = "Volver", className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // -1 para retroceder una ruta en el historial de rutas
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center text-sm font-medium text-gray-600 duration-300 hover:text-gray-900 hover:underline ${className}`}
    >
      <ArrowLeftIcon className="mr-2 w-4 h-4" />
      {label}
    </button>
  );
};

export default BackButton;
