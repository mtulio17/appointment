import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners/BarLoader";
import VerticalCards from "../components/VerticalCards";
import useFetch from "../hooks/use-fetch";
import { getSavedEvents } from "../api/apievents";
import { useFavorites } from "../context/SaveEventContext";
import { Link } from "react-router-dom";

const SavedEvents = () => {
  const { isLoaded } = useUser();
  const {
    loading: loadingSavedEvents,
    data: savedEvents,
    fn: fnSavedEvents,
  } = useFetch(getSavedEvents);
  const { favorites } = useFavorites(); // Usa el contexto aquí

  useEffect(() => {
    if (isLoaded) fnSavedEvents();
  }, [isLoaded]);

  const handleEventAction = () => {
    fnSavedEvents(); // Refresca la lista de eventos guardados
  };

  if (!isLoaded || loadingSavedEvents) {
    return (
      <div className="container mx-auto py-8">
        <BarLoader className="mt-4" width={"100%"} color="#2C2C2C" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl bg-transparent my-32">
      <div className="flex justify-between items-center mb-10">
        <h2 className="gradient-title lg:text-2xl sm:text-4xl text-start font-semibold">
          Eventos Favoritos
        </h2>
        <Link
          to={"/explore-events"}
          className="text-white bg-[#00798a] mr-4 font-medium lg:text-sm rounded-md px-5 py-2.5 flex items-center text-center focus:outline-none"
        >
          Explorar Eventos
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedEvents?.length ? (
          savedEvents.map((saved) =>
            saved.event ? (
              <VerticalCards
                key={saved.id}
                event={saved.event}
                onEventAction={handleEventAction}
                savedInit={true}
              />
            ) : (
              console.warn(
                "Evento no encontrado para saved_event id:",
                saved.id
              )
            )
          )
        ) : (
          <div className="mx-auto px-4 w-full flex flex-col items-center justify-center text-center space-y-2">
            <img
              src="/placeholder-event.svg"
              alt="Sin eventos"
              className="h-64 lg:w-64 object-contain rounded-lg"
              style={{ aspectRatio: "16/9" }}
            />
            <p className="text-lg font-semibold text-gray-600">
              Aún no tienes eventos en favoritos.
            </p>
            <p className="text-sm text-gray-500">
              Explora otros eventos para añadir los que te gusten.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedEvents;
