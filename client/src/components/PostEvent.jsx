/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { createEvent, getCategories } from "../api/apievents";
import ImageUpload from "../ui/ImageUpload";
import useFetch from "../hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { toast } from 'react-hot-toast';

const eventSchema = yup.object().shape({
  image: yup.string().required("Image is required"),
  name: yup.string().required("Event name is required"),
  gender: yup.string().required("Gender is required"),
  description: yup.string().required("Description is required"),
  age: yup.number().integer().positive().required("Age is required"),
  category_id: yup
    .number()
    .integer()
    .positive()
    .required("Category is required"),
  price: yup.number().positive().required("Price is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  start_date: yup.date().required("Start date is required"),
  start_time: yup.string().required("Start time is required"),
});

const PostEvent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(eventSchema) });

  const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);
  const { loading, error: createEventError, fn: createEventFn } = useFetch(createEvent);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = async (data) => {
    if (user) {
      // Primero sube la imagen y obtiene la URL
      const imageFile = data.image[0];
      const imageURL = await handleImageUpload(imageFile);

      if (imageURL) {
        // Luego crea el evento con la URL de la imagen
        const eventData = {
          ...data,
          host_id: user.id,
          image: imageURL,  // Asegúrate de que el campo para la imagen sea correcto
        };
        console.log("Datos del evento antes de enviar:", eventData);

        const result = await createEventFn(null, eventData);
        console.log("Resultado de createEventFn:", result);

        if (result) {
          toast.success('Evento Creado');
          navigate("/my-created-events");
        } else {
          toast.error("Error al crear el evento")
          console.error("No se pudo crear el evento");
        }
      } else {
        console.error("No se pudo obtener la URL de la imagen");
      }
    } else {
      console.error("User not authenticated");
    }
  };

  const handleImageUpload = async (file) => {
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        return null;
      }

      const { publicURL, error: urlError } = supabase.storage
        .from("event-images")
        .getPublicUrl(fileName);

      if (urlError) {
        console.error("Error getting public URL:", urlError);
        return null;
      }

      return publicURL;
    }
    return null;
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  if (categoriesError)
    return <p>Error loading categories: {categoriesError.message}</p>;

  return (
    <div className="max-w-7xl mx-auto my-28 p-16 border border-black-50 rounded-md">
      <h1 className="lg:text-4xl font-bold mb-10">
        Crear un Evento
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
         
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nombre del Evento</label>
              <input
                {...register("name")}
                placeholder="Nombre del evento o actividad"
                className={`input ${errors.name ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>

            <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Genero</label>
            <input
              {...register("gender")}
              placeholder="Genero"
              className={`input ${errors.gender ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              {...register("age")}
              type="number"
              placeholder="Edad minima"
              className={`input ${errors.age ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>

            <div className="col-span-1 md:col-span-2">
              <ImageUpload onUpload={handleImageUpload} token={user?.token} />
              {/* Mostrar errores para el campo de la imagen */}
              {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            </div>

            <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              {...register("price")}
              type="number"
              placeholder="Precio por persona"
              className={`input ${errors.price ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                {...register("description")}
                placeholder="Aquí puedes agregar mas informacion del evento"
                className={`input ${errors.description ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              {...register("address")}
              placeholder="Dirección"
              className={`input ${errors.address ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Agrega una categoría</label>

              <select
                {...register("category_id")}
                className={` input ${errors.category_id ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="">Seleccionar Categoria</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          
            <div>
            <label className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input
              {...register("city")}
              placeholder="Ciudad"
              className={`input ${errors.city ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">País</label>
            <input
              {...register("country")}
              placeholder="Pais"
              className={`input ${errors.country ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
    
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <input
              {...register("start_date")}
              type="date"
              placeholder="Dia de inicio"
              className={`input ${errors.start_date ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
            <input
              {...register("start_time")}
              type="time"
              placeholder="Hora de inicio"
              className={`input ${errors.start_time ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
         
          {createEventError && (
            <p className="text-red-500">{createEventError.message}</p>
          )}
        <button type="submit" className="w-2/3 md:w-2/3 md:h-2/3 my-auto mx-auto bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
          Crear Evento
        </button>
        <button type="button" onClick={handleCancel} className="w-2/3 md:w-2/3 my-auto mx-auto bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Cancelar
      </button>
      </form>
    </div>
  );
};

export default PostEvent;
