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

  if (!isLoaded || loadingSavedEvents) {
    return (
      <div className="container mx-auto py-8">
        <BarLoader className="mt-4" width={"100%"} color="#2C2C2C" />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-28">
      <h1 className="gradient-title text-4xl sm:text-4xl text-start py-20 font-extrabold font-bold mb-4">Mis Eventos Favoritos:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedEvents?.length ? (
        savedEvents.map((saved) => (
          saved.event ? (
            <VerticalCards
              key={saved.id}
              event={saved.event} 
              onEventAction={fnSavedEvents}
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
