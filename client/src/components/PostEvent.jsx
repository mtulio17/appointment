/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import AutocompleteAddressInput from "../ui/AutocompleteAdressInput";
import {motion} from "framer-motion"
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { createEvent, getCategories } from "../api/apievents";
import { toast } from 'react-toastify';
import useFetch from "../hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { eventSchema } from "../schemas/EventSchema";

const PostEvent = ({onClose}) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [preview, setPreview] =useState(null)

  const { register, handleSubmit, setValue, formState: { errors }} = useForm({ resolver: yupResolver(eventSchema), mode: "onSubmit" });
  const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);
  const { data: eventData, loading: createEventLoading, error: createEventError, fn: createEventFn } = useFetch(createEvent);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddressSelect = ({ address, city, country }) => {
    setValue('address', address); // Actualiza el campo de dirección en el formulario
    setValue('city', city);       // Actualiza el campo de ciudad en el formulario
    setValue('country', country); // Actualiza el campo de país en el formulario
  };


  const handleImageUpload = async (file) => {
    if (file && file instanceof File) {
      const fileName = `${Date.now()}_${file.name}`;
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Hubo un error al subir el archivo", uploadError);
          return null;
        }

        const { data: publicURLData, error: urlError } = supabase.storage
          .from("event-images")
          .getPublicUrl(fileName);

        if (urlError) {
          console.error("Error al obtener la URL pública:", urlError);
          return null;
        }

        return publicURLData.publicUrl;
      } catch (error) {
        toast.error("Hubo un error al cargar la imagen. Intente con otro.");
        console.error("Error en el manejo de la imagen:", error);
        return null;
      }
    } else {
      toast.error("Archivo inválido o no seleccionado.");
      return null;
    }
  };
  

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result); // establece la vista previa
      reader.readAsDataURL(file);
    }
  };

   // función que maneja el envío del formulario
   const onSubmit = async (data) => {
    if (user) {
      try {
        const imageFile = data.image[0]; // Obtiene el archivo cargado
        const imageUrl = await handleImageUpload(imageFile); // Sube el archivo y obtiene la URL

        if (!imageUrl) {
          toast.error("Hubo un error al subir la imagen.");
          return;
        }
        // Prepara los datos del evento incluyendo la URL de la imagen
        const eventData = {
          ...data,
          image: imageUrl, 
          host_id: user.id,
        };
        
        await createEventFn(eventData);
      } catch (error) {
        toast.error("Hubo un error al intentar crear el evento.");
        console.error("Error al crear el evento:", error);
      }
    } else {
      toast.error("Usuario no autenticado. Por favor, inicia sesión.");
      console.error("Usuario no autenticado.");
    }
  };
  

  // redirige si el evento fue creado con éxito
  useEffect(() => {
    if (eventData?.success) {
      toast.success("Evento creado con éxito.");
      // console.log("Evento creado con éxito", eventData.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      onClose();
    }
  }, [eventData]);

  
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  
  const handleCancel = () => {
    onClose();
  };

  if (createEventLoading) return <p>Cargando...</p>;

  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center overflow-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative"
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Cerrar Modal"
        >
          <X size={20} />
        </button>

        <div className="mb-10 p-2">
        <h1 className="lg:text-3xl font-bold text-start mb-1">Crear un Evento</h1>
        <p className="text-justify text-gray-500 text-sm">Rellene los siguientes campos para crear un nuevo evento.</p>
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

          {/* Imagen */}
      <div className="col-span-1 md:col-span-2">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Imagen del Evento
        </label>
        <input
          {...register("image")}
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          id="image"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.image ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : ""
          }`}
        />
        {preview && <img src={preview} alt="Preview" style={{ maxHeight: "80px" }} className="mt-2" />}
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
              <option value="">{categories ? "Seleccionar Categoría" : "Cargando..."}</option>
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
          {createEventError && (
            <p className="text-red-500 col-span-1 md:col-span-4">{createEventError.message}</p>
          )}

          {/* Botones de Acción */}
          <div className="col-span-1 md:col-span-4 flex justify-start space-x-4 absolute bottom-2 left-2">
            <button
              type="submit"
              className="bg-[#18181b] text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none"
              disabled={createEventLoading}
            >
              {createEventLoading ? "Creando evento..." : "Crear Evento"}
            </button>

            {/* <button
              type="button"
              onClick={handleCancel}
              className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancelar
            </button> */}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostEvent;
