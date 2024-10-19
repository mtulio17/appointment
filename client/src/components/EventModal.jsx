/* eslint-disable react/prop-types */
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AutocompleteAddressInput from '../ui/AutocompleteAdressInput';
import { editEvent, getCategories } from '../api/apievents';
import useFetch from '../hooks/use-fetch';
import { toast } from 'react-toastify';
import { yupResolver} from '@hookform/resolvers/yup';
import { eventSchema } from '../schemas/EventSchema';
import { X } from 'lucide-react';

const EventModal = ({ event, onClose }) => {
  const {user} = useUser();
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(eventSchema),
  });

  const {data: eventData, loading: editEventLoading, error: editEventError, fn: editEventFn} = useFetch(editEvent);
  const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);

  useEffect(() => {
    fetchCategories();
  }, [])

  const handleAddressSelect = ({ address, city, country }) => {
    setValue('address', address);
    setValue('city', city);   
    setValue('country', country); 
  };

  useEffect(() => {
    if (event) {
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
    if (event?.id) {
      try {
        const updatedEventData = { ...data };

        await editEventFn(event.id, updatedEventData);
        toast.success("Evento actualizado con éxito. ✔");
        onClose();
      } catch (error) {
        toast.error("Hubo un error al intentar actualizar el evento.");
        console.error("Error actualizando el evento:", error);
      }
    }
  };

   useEffect(() => {
    if (eventData?.success) {
      toast.success("Evento actualizado con éxito.");
      console.log("Evento actualizado con éxito", eventData.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      onClose();
    }
  }, [eventData]);


  if (editEventLoading) return <p>Cargando...</p>;
  if (categoriesError) return <p>Error cargando categorías: {categoriesError.message}</p>;

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

          {/* Mensaje de Error en la Creación del Evento */}
          {editEventError && (
            <p className="text-red-500 col-span-1 md:col-span-4">{editEventError.message}</p>
          )}

          {/* Botones de Acción */}
          <div className="col-span-1 md:col-span-4 flex justify-start space-x-4 absolute bottom-2 left-2">
            <button
              type="submit"
              className="bg-[#18181b] text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none"
              disabled={editEventLoading}
            >
              {editEventLoading ? "Actualizando evento..." : "Actualizar evento"}
            </button>
          </div>
        </form>
        {editEventError && <p>Error actualizando el evento: {editEventError.message}</p>}
      </div>
    </div>
  );
};

export default EventModal;
