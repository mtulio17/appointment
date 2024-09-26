import { getEvents } from "../api/apievents";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import VerticalCards from "./VerticalCards";
import { useQuery } from "@tanstack/react-query";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || ""; // obtiene el Query de la URL
  const country = searchParams.get("country") || "";  // Obtén el country de la URL

  // useQuery para obtener los eventos basados en los parámetros de búsqueda
  const { data: results, isLoading, error } = useQuery({
    queryKey: ['searchEvents', { searchQuery, country }],
    queryFn: () => getEvents({ searchQuery, country }), // pasamos los parámetros de búsqueda
    enabled: !!searchQuery || !!country, // solo ejecutamos si hay una query o un país
  });

  if (isLoading) {
    return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />;
  }

  if (error) {
    return <div>Hubo un error al cargar los resultados de la búsqueda: {error.message}</div>;
  }

  return (
    <div className="container lg:max-w-7xl mx-auto my-36 mt-8 p-16">
    <h2 className="text-2xl font-medium mb-4">
      Resultado de tú búsqueda:{" "}
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