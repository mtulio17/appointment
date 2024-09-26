import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {BarLoader} from "react-spinners/BarLoader";
import VerticalCards from "../components/VerticalCards";
import useFetch from "../hooks/use-fetch";
import { getSavedEvents } from "../api/apievents";
import HorizontalCards from "../components/HorizontalCards";

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
    <div className="container max-w-7xl mx-auto my-28">
      <h2 className="text-[#2C2C2C] lg:text-3xl font-semibold">Tus eventos favoritos:</h2>
      <hr className="border-b border-gray-200 w-full" />
      <div className="w-full">
      {savedEvents?.length ? (
        savedEvents.map((saved) => (
          saved.event ? (
            <HorizontalCards
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
