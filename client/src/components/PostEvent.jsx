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
          navigate("/my-created-events");
        } else {
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

  if (loading) return <p>Loading...</p>;

  if (categoriesError)
    return <p>Error loading categories: {categoriesError.message}</p>;

  return (
    <div>
      <h1 className="container py-28 font-extrabold lg:text-2xl text-center pb-8">
        Crear un Evento
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
         <ImageUpload onUpload={handleImageUpload} token={user?.token} />

          {/* Mostrar errores para el campo de la imagen */}
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        <input
          {...register("name")}
          placeholder="Nombre del evento o actividad"
          className={`input ${errors.name ? "input-error" : ""}`}
        />
        <input
          {...register("gender")}
          placeholder="Genero"
          className={`input ${errors.gender ? "input-error" : ""}`}
        />
        <textarea
          {...register("description")}
          placeholder="Descripción del evento o actividad"
          className={`input ${errors.description ? "input-error" : ""}`}
        />
        <input
          {...register("age")}
          type="number"
          placeholder="Edad minima"
          className={`input ${errors.age ? "input-error" : ""}`}
        />
        <select
          {...register("category_id")}
          className={`input ${errors.category_id ? "input-error" : ""}`}
        >
          <option value="">Seleccionar Categoria</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <input
          {...register("price")}
          type="number"
          placeholder="Precio por persona"
          className={`input ${errors.price ? "input-error" : ""}`}
        />
        <input
          {...register("address")}
          placeholder="Dirección"
          className={`input ${errors.address ? "input-error" : ""}`}
        />
        <input
          {...register("city")}
          placeholder="Ciudad"
          className={`input ${errors.city ? "input-error" : ""}`}
        />
        <input
          {...register("country")}
          placeholder="Pais"
          className={`input ${errors.country ? "input-error" : ""}`}
        />
        <input
          {...register("start_date")}
          type="date"
          placeholder="Dia de inicio"
          className={`input ${errors.start_date ? "input-error" : ""}`}
        />
        <input
          {...register("start_time")}
          type="time"
          placeholder="Hora de inicio"
          className={`input ${errors.start_time ? "input-error" : ""}`}
        />
        {createEventError && (
          <p className="text-red-500">{createEventError.message}</p>
        )}
        <button type="submit" className="btn-primary mt-4" disabled={loading}>
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default PostEvent;
