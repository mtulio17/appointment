/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { createEvent, getCategories } from "../api/apievents";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

const eventSchema = yup.object().shape({
  image: yup.mixed().test("fileSize", "La imagen es requerida", (value) => {return value && value.length > 0; }),
  name: yup.string().required("Event name is required"),
  gender: yup.string().required("Gender is required"),
  description: yup.string().required("Description is required"),
  age: yup.number().integer().positive().required("Age is required"),
  category_id: yup.number().required("Category is required"),
  price: yup
  .number()
  .typeError("Precio debe ser un número.") 
  .min(0, "El precio debe ser al menos 0.") 
  .required("Price is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  start_date: yup.date().required("Start date is required"),
  start_time: yup.string().required("Start time is required"),
});

const PostEvent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(eventSchema) });
  const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);
  const { data: eventData, loading: createEventLoading, error: createEventError, fn: createEventFn } = useFetch(createEvent);

  useEffect(() => {
    fetchCategories();
  }, []);


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
  
   // función que maneja el envío del formulario
   const onSubmit = async (data) => {
    if (user) {
      try {
        // cargar la imagen y obtener la URL pública
        const imageFile = data.image[0]; // obtiene el archivo cargado
        const imageUrl = await handleImageUpload(imageFile); // subir el archivo y obtener la URL
        
        if (!imageUrl) {
          toast.error("Hubo un error al subir la imagen.");
          return;
        }
        // prepara los datos del evento incluyendo la URL de la imagen
        const eventData = {
          ...data,
          image: imageUrl, // añade la URL de la imagen
          host_id: user.id,
        };
  
        console.log("Datos del evento antes de enviar:", eventData);
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
      console.log("Evento creado con éxito", eventData.data);
      setTimeout(() => {
        navigate("/my-created-events");
      }, 3000);
    }
  }, [eventData, navigate]);
  
  
  const handleCancel = () => {
    navigate('/');
  };

  if (createEventLoading) return <p>Cargando...</p>;

  if (categoriesError)
    return <p>Error loading categories: {categoriesError.message}</p>;

  return (
    <div className="max-w-7xl mx-auto my-36 p-16 border border-black-50 rounded-md">
    <h1 className="lg:text-4xl font-bold mb-10">Crear un Evento</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pb-16">
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
              <label htmlFor="image" className="block text-sm font-medium text-gray-700"></label>
              <input
                 {...register("image")}
                 type="file"
                 accept="image/*"
                 id="image"
                 className={`input ${errors.image ? "input-error" : ""} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
               />
                </div>

            <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Precio por persona</label>
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
          <div className="col-span-1 md:col-span-4 flex justify-start space-x-4 absolute bottom-0 left-0 mt-4 ml-4">
            <button 
              type="submit" 
              className="bg-Button/80 text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={createEventLoading}
            >
              {createEventLoading ? "Creando evento..." : "Crear Evento"}
            </button>
            
            <button 
              type="button"
              onClick={handleCancel}
              className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
          </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
    </div>
  );
};

export default PostEvent;
