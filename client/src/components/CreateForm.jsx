// components/CreateForm.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createEvent } from "../api/apievents";
import useFetch from "../hooks/use-fetch";
import supabaseClient from "../utils/supabase";
import { toast } from 'react-hot-toast';

//esquema de validación con Yup
const schema = yup.object().shape({
  activityName: yup.string().required("El nombre de la actividad es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  category: yup.string().required("La categoría es obligatoria"),
  price: yup.number().min(0, "El precio no puede ser negativo").required("El precio es obligatorio"),
  address: yup.string().required("La dirección es obligatoria"),
  city: yup.string().required("La ciudad es obligatoria"),
  state: yup.string().required("La provincia es obligatoria"),
  postalCode: yup.string().required("El código postal es obligatorio"),
  country: yup.string().required("El país es obligatorio"),
  gender: yup.string().required("El género es obligatorio"),
  age: yup.string().required("La edad es obligatoria"),
  startDate: yup.date().required("La fecha de inicio es obligatoria"),
  startTime: yup.string().required("La hora de inicio es obligatoria"),
  endDate: yup.date().required("La fecha de finalización es obligatoria"),
  endTime: yup.string().required("La hora de finalización es obligatoria"),
});

const CreateForm = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Hook para manejar la creación del evento
  const { fn: createEventFn, error, isLoading: loadingForm } = useFetch(createEvent);

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  console.log(user.id)

  useEffect(() => {
    // Obtener categorías desde Supabase
    const fetchCategories = async () => {
      const { data, error } = await supabaseClient
        .from('categories')
        .select('*');
        
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onSubmit = async (data) => {
    let imageUrl = '';

    if (image) {
      // Subir la imagen a Supabase Storage
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('event-images')
        .upload(`${user.id}/${image.name}`, image);

      if (imageError) {
        console.error('Error al subir la imagen:', imageError);
        return;
      }

      // Obtener la URL pública de la imagen
      const { publicURL, error: urlError } = supabaseClient
        .storage
        .from('event-images')
        .getPublicUrl(imageData.path);

      if (urlError) {
        console.error('Error obteniendo la URL pública de la imagen:', urlError);
        return;
      }

      imageUrl = publicURL; // Guardar la URL pública
    }

    // Preparar los datos del evento
    const eventData = {
      activityName: data.activityName,
      description: data.description,
      category: data.category,
      price: data.price,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      gender: data.gender,
      age: data.age,
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      endTime: data.endTime,
      image: imageUrl, // Guardar la URL de la imagen
      host_id: user.id, // ID del usuario actual como host
    };

    await createEventFn(eventData); // Llamar a la función de creación del evento

    if (!error) {
      navigate('/my-created-events'); // Navegar a otra página después de la creación
      toast.success('El evento fue exitoso');
    } else {
      toast.error('Ocurrió un error al crear el evento');
      console.error('Error al crear el evento:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loadingForm) {
    return <div>Creando evento...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl bg-white mx-auto p-28 rounded-lg shadow">
    <h2 className="text-2xl font-semibold text-start mb-8">Crear un Evento</h2>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="activityName" className="block text-sm font-medium text-gray-700">Nombre de la Actividad</label>
        <input
          id="activityName"
          placeholder="Yoga en el parque"
          {...register("activityName", { required: "Activity Name es obligatorio" })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.activityName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.activityName && <p className="text-red-500 text-sm mt-1">{errors.activityName.message}</p>}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
        <input
          id="city"
          placeholder="Buenos Aires, Capital"
          {...register("city", { required: "City is required" })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
        <input
          id="postalCode"
          placeholder="X5000"
          {...register("postalCode", { required: "Postal Code is required" })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
        <select
          id="gender"
          {...register("gender", { required: "Género es obligatorio." })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">Seleccionar género</option>
          <option value="Male">Sin preferencia</option>
          <option value="Female">Mujer</option>
          <option value="Female">Hombre</option>
          <option value="Female">Otro</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
        <select
          id="age"
          {...register("age", { required: "Edad es obligatorio." })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">Seleccionar Rango de Edad</option>
          <option value="18-25">18-25</option>
          <option value="25-35">25-35</option>
          <option value="35-50">35-50</option>
          <option value="50-70">50-70</option>
          {/* Age options here */}
        </select>
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
        <select id="category" {...register("category")} className={`mt-1 block w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}>
          <option value="">Seleccionar Categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          id="price"
          type="number"
          placeholder="0"
          {...register("price", { required: "Precio es obligatorio." })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
        <select
          id="country"
          {...register("country", { required: "Género es obligatorio." })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">Seleccionar un País</option>
          <option value="Argentina">Argentina</option>
          <option value="México">México</option>
          <option value="Australia">Australia</option>
        </select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
      </div>

      <div className="col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          placeholder="Breve descripción de tu evento.."
          {...register("description", { required: "Description is required" })}
          rows={3}
          className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen del Evento</label>
        <input id="image" type="file" onChange={handleImageChange} className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección - Calle</label>
        <input
          id="address"
          placeholder="123 Main St"
          {...register("address", { required: "Address is required" })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
        <input
          id="startDate"
          type="date"
          {...register("startDate", { required: "Start Date is required" })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
        <input
          id="startTime"
          type="time"
          {...register("startTime", { required: "Start Time is required" })}
          className={`mt-1 block w-full px-3 py-2 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
      </div>
    </div>

    <div className="mt-12 flex justify-start text-start">
      <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear Evento
      </button>
      <button type="button" onClick={handleCancel} className="w-full md:w-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Cancelar
      </button>
    </div>
  </form>
  );
};

export default CreateForm;
