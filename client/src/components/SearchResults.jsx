import { useEffect } from "react";
import { getEvents } from "../api/apievents";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import VerticalCards from "./VerticalCards";
import useFetch from "../hooks/use-fetch";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || ""; // Obtén el query de la URL

  // Usa tu hook useFetch con la función getEvents
  const { fn: fetchEvents, data: results, isLoading } = useFetch(getEvents);

  useEffect(() => {
    if (searchQuery) {
      // Realiza la búsqueda final basada en los parámetros de la URL
      fetchEvents({ searchQuery });
    }
  }, [searchQuery]);

  if (isLoading) {
    return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />;
  }

  return (
    <div className="container lg:max-w-7xl mx-auto my-36 mt-8 p-16">
      <h2 className="text-2xl font-medium mb-4">
        Resultado de tú búsqueda: {" "}
        <span className="font-extrabold">
          {searchQuery && `${searchQuery}`}{" "}
        </span>
      </h2>
      {results?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {results.slice(0, 8).map((event) => (
            <VerticalCards key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p className="flex justify-center py-36 text-center">
          No se encontraron eventos con ese resultado.
        </p>
      )}
    </div>
  );
};

export default SearchResults;