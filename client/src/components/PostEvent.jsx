/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { useEffect} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// import { BarLoader } from "react-spinners";
import { createEvent, getCategories} from "../api/apievents";
import ImageUpload from "../ui/ImageUpload";
import useFetch from "../hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

const eventSchema = yup.object().shape({
    image: yup.mixed().required("Image is required"),
    name: yup.string().required("Event name is required"),
    gender: yup.string().required("Gender is required"),
    description: yup.string().required("Description is required"),
    age: yup.string().required("Age is required"),
    category_id: yup.string().required("Category is required"),
    price: yup.number().required("Price is required"),
    address: yup.string().required("Address is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    start_date: yup.date().required("Start date is required"),
    start_time: yup.string().required("Start time is required"),
  });
  
  const PostEvent = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
      resolver: yupResolver(eventSchema),
    });
  
    const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);
    const { loading, error: createEventError, fn: createEventFn } = useFetch(createEvent);

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);
  
    const onSubmit = async (data) => {
        if (user) {
          const eventData = {
            ...data,
            host_id: user.id // Aquí se asigna el ID del usuario autenticado al campo host_id
          };
          const result = await createEventFn(null, eventData);
          if (result) navigate("/my-created-events");
        } else {
          console.error("User not authenticated");
        }
      };
    const handleImageUpload = (url) => {
      setValue("image", url);
    };

    if (loading) return <p>Loading...</p>;
  
    if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;
  
    return (
        <div>
        <h1 className="container py-36 font-extrabold text-5xl sm:text-7xl text-center pb-8">
          Crear un Evento
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUpload onUpload={handleImageUpload} />
            )}
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
  
          <input placeholder="Nombre del Evento" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
  
          <textarea placeholder="Descripción del Evento" {...register("description")} />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
  
          <input type="number" placeholder="Edad mínima" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
  
          <input type="text" placeholder="Género" {...register("gender")} />
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
  
          <select {...register("category_id")} placeholder="Categoría">
            <option value="">Selecciona una categoría</option>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
  
          <input type="number" placeholder="Precio" {...register("price")} />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
  
          <input placeholder="Dirección" {...register("address")} />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
  
          <input placeholder="País" {...register("country")} />
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}
  
          <input placeholder="Ciudad" {...register("city")} />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
  
          <input type="date" placeholder="Fecha de Inicio" {...register("start_date")} />
          {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
  
          <input type="time" placeholder="Hora de Inicio" {...register("start_time")} />
          {errors.start_time && <p className="text-red-500">{errors.start_time.message}</p>}
  
          {createEventError && <p className="text-red-500">{createEventError.message}</p>}
  
          <button type="submit" className="mt-2 text-lg">
            Crear Evento
          </button>
        </form>
      </div>
    );
  };

export default PostEvent;
