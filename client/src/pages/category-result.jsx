import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { getCategories, getEventsByCategory } from "../api/apievents";
import { BarLoader } from "react-spinners";
import VerticalCards from "../components/VerticalCards";

const CategoryResult = () => {
  const { categoryId } = useParams();
  const {
    fn: fetchEventsByCategory,
    data: events,
    isLoading: loadingEvents,
    error: eventsError,
  } = useFetch(getEventsByCategory);
  const {
    fn: fetchCategories,
    data: categories,
    isLoading: loadingCategories,
  } = useFetch(getCategories);

  useEffect(() => {
    if (categoryId) {
      fetchEventsByCategory(categoryId);
      fetchCategories();
    }
  }, [categoryId]);

  if (loadingEvents || loadingCategories) {
    return <BarLoader className="mt-[78px]" width={"100%"} color="#2C2C2C" />;
  }

  if (eventsError) {
    return <div>Error al cargar los eventos: {eventsError.message}</div>;
  }
  // Busca el nombre de la categoría seleccionada en la lista de categorías
  const selectedCategory = categories?.find(category => category.id.toString() === categoryId)?.name || "Categoría";

  return (
    <div className="container mx-auto max-w-7xl my-32 mt-8 p-16">
      <h2 className="text-xl font-normal mb-4">
        Resultados relacionados con la categoría:{" "}
        <span className="font-bold">{selectedCategory}.</span>
      </h2>
      {events?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {events.map((event) => (
            <VerticalCards key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p className="flex justify-center py-36 text-center">
          No se encontraron eventos en la categoría {selectedCategory}.
        </p>
      )}
      {/* {events && (
        <div className="flex justify-center mt-10">
          <a
            href="/all-events"
            className="text-sm text-Button font-medium hover:underline px-6 py-2"
          >
            Ver todos los eventos
          </a>
        </div>
      )} */}
    </div>
  );
};

export default CategoryResult;
