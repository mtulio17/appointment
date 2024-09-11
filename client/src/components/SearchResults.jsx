import { useEffect, useState } from 'react';
import { getEvents } from '../api/apievents';
import { BarLoader } from "react-spinners";
import { useSearchParams } from 'react-router-dom';
import VerticalCards from './VerticalCards';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true); // Mostrar el loader mientras se obtienen los datos
      const data = await getEvents(null, { searchQuery });
      setResults(data);
      setIsLoading(false); // Ocultar el loader una vez se obtienen los datos
    };

    if (searchQuery) {
      fetchResults();
    } else {
      setIsLoading(false); // En caso de que no haya `searchQuery`, también ocultamos el loader
    }
  }, [searchQuery]);

  if (isLoading) {
    return <BarLoader className="mt-[74px]" width={"100%"} color="#2C2C2C" />;
  }

  return (
    <div className="container mx-auto py-20 mt-8 p-16">
      <h2 className="text-2xl font-medium mb-4">Resultado de tú busqueda relacionado con: {" "}
        <span className='font-extrabold'>{searchQuery}</span>
      </h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {results && results.slice(0, 8).map((event) => (
            <VerticalCards key={event._id} event={event} />
          ))}
          </div>
      ) : (
        <p className='flex justify-center py-36 text-center'>No se encontraron eventos con ese resultado.</p>
      )}
    </div>
  );
};

export default SearchResults;
