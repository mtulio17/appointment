/* eslint-disable react/prop-types */
import { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import AutocompleteAddressInput from '../../ui/AutocompleteAdressInput';
import { getCategories, updateEvent } from '../../api/apievents';
import useFetch from '../../hooks/use-fetch';
import { toast } from 'react-toastify';
import { yupResolver} from '@hookform/resolvers/yup';
import { eventSchema } from '../../schemas/EventSchema';
import { X } from 'lucide-react';

const EventModal = ({ event, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(eventSchema(false)),
  });

  const {data: eventData, loading: updateEventLoading, error: updateEventError, fn: updateEventFn} = useFetch(updateEvent);
  const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);

  useEffect(() => {
    fetchCategories();
  }, [])


  console.log("Errores del formulario:", errors);


  const handleAddressSelect = ({ address, city, country }) => {
    setValue('address', address);
    setValue('city', city);   
    setValue('country', country); 
  };

  useEffect(() => {
    if (event) {
      console.log("")
      setValue('name', event.name);
      setValue('gender', event.gender);
      setValue('description', event.description);
      setValue('age', event.age);
      setValue('category_id', event.category_id);
      setValue('price', event.price);
      setValue('address', event.address);
      setValue('country', event.country);
      setValue('city', event.city);
      setValue('start_date', event.start_date);
      setValue('start_time', event.start_time);
    }
  }, [event, setValue]);


  const onSubmit = async (data) => {
    if (!event?.id) {
      toast.error("No se encontró el ID del evento.");
      return;
    }
    try {
      // Llama a la función para actualizar el evento
      await updateEventFn(event.id, data);
  
      toast.success("Evento actualizado con éxito.");
      onClose();
      setTimeout(() => {
        window.location.reload(); // recarga la página
      }, 3000);
    } catch (error) {
      toast.error("Hubo un error al intentar actualizar el evento.");
      console.error("Error en la actualización del evento:", error);
    }
  };
  
  useEffect(() => {
    if (eventData?.success) {
      toast.success("Evento actualizado con éxito.");
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  
    if (updateEventError) {
      toast.error("Error al actualizar el evento.");
    }
  }, [eventData]);
  

  if (updateEventLoading) return <p>Cargando...</p>;
  if (categoriesError) return <p>Error cargando categorías: {categoriesError.message}</p>;

  if(updateEventError) return <p className="text-red-500 col-span-1 md:col-span-4">{updateEventError.message}</p>
        
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 modal-overlay">
         {/* Botón de cierre */}
      <div className='bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg animate-fade-up'>
         <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Cerrar Modal"
        >
          <X size={20} />
        </button>
        <div className="mb-10 p-2">
        <h1 className="lg:text-3xl font-bold text-start mb-1">Crear un Evento</h1>
        <p className="text-justify text-gray-500 text-sm">Rellene los siguientes campos para actualizar el evento.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pb-28">
          {/* Nombre del Evento */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del Evento</label>
            <input
              {...register("name")}
              placeholder={errors.name ? errors.name.message : "Nombre del evento o actividad"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.name ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* Género */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Género</label>
            <select
              placeholder={errors.gender ? errors.gender.message : "Seleccionar género"}
              {...register("gender")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.gender ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            >
              <option value="">Selecciona Género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="unisex">Unisex</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Edad */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              {...register("age")}
              type="number"
              min="0"
              placeholder={errors.age ? errors.age.message : "Edad mínima"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.age ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* Precio por Persona */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Precio por Persona</label>
            <input
              {...register("price")}
              type="number"
              placeholder={errors.price ? errors.price.message : "Precio por persona"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.price ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* Descripción */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              {...register("description")}
              
              placeholder={errors.description ? errors.description.message : "Descripción del evento o actividad"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none ${
                errors.description ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* Dirección */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <AutocompleteAddressInput
              onSelect={handleAddressSelect}
              name="address"
              placeholder="Buscar dirección"
              value={watch('address')}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* Error de validación para dirección */}
            {errors.address && <p className="text-red-600 text-sm p-1">{errors.address?.message}</p>}
          </div>

          {/* Categoría */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Agrega una Categoría</label>
            <select
              {...register("category_id")}
              name="category_id"
              placeholder={errors.category_id ? errors.category_id.message : "Categoría"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.category_id ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            >
             <option value="" disabled>
              {getCategories?.length ? "Seleccionar Categoría" : "Cargando..."}
            </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Ciudad */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input
              {...register("city")}
              name="city"
              readOnly
              placeholder={errors.city ? errors.city.message : "Ciudad"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.city ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* País */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">País</label>
            <input
              name="country"
              readOnly
              placeholder={errors.country ? errors.country.message : "País"}
              {...register("country")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.country ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* Fecha de Inicio */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <input
              {...register("start_date")}
              type="date"
              placeholder={errors.start_date ? errors.start_date.message : "Fecha de inicio"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.start_date ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>

          {/* Hora de Inicio */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
            <input
              {...register("start_time")}
              type="time"
              placeholder={errors.start_time ? errors.start_time.message : "Hora de inicio"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.start_time ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>
          
          {/* Botones de Acción */}
          <div className="col-span-1 md:col-span-4 flex justify-start space-x-4 absolute bottom-2 left-2">
            <button type="submit" className="bg-[#18181b] text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none" disabled={updateEventLoading}>
              {updateEventLoading ? "Actualizando evento..." : "Actualizar evento"}
            </button>
          </div>
        </form>
        {updateEventError && <p>Error actualizando el evento: {updateEventError.message}</p>}
      </div>
    </div>
  );
};

export default EventModal;
