import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {BarLoader} from "react-spinners/BarLoader";
import VerticalCards from "../components/VerticalCards";
import useFetch from "../hooks/use-fetch";
import { getSavedEvents } from "../api/apievents";

const SavedEvents = () => {
  const { isLoaded } = useUser();
  const { loading: loadingSavedEvents, data: savedEvents, fn: fnSavedEvents } = useFetch(getSavedEvents);

  useEffect(() => {
    if (isLoaded) fnSavedEvents();
  }, [isLoaded]);

  const handleEventAction = () =>{
    fnSavedEvents();
  }

  // if (!isLoaded || loadingSavedEvents) {
  //   return (
  //     <div className="container mx-auto py-8">
  //       <BarLoader className="mt-4" width={"100%"} color="#2C2C2C" />
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto my-36 max-w-7xl">
      <h1 className="gradient-title lg:text-4xl text-start font-extrabold font-bold mb-10">Tus eventos favoritos:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedEvents?.length ? (
        savedEvents.map((saved) => (
          saved.event ? (
            <VerticalCards
                key={saved.id}
                event={saved.event}
                onEventAction={handleEventAction} // Pasa esta función al componente
                savedInit={true}
              />
          ) : (
            console.warn('Evento no encontrado para saved_event id:', saved.id)
          )
        ))
      ) : (
        <div className="flex justify-center text-center">
          <span className="text-xl font-medium">No hay eventos guardados en favoritos 👀</span>
        </div>
      )}
    </div>
  </div>
  );
};


export default SavedEvents;
