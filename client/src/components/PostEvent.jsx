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
  const [preview, setPreview] =useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // estado de carga
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, setValue, formState: { errors }} = useForm({ resolver: yupResolver(eventSchema(true)), mode: "onSubmit" });
  const { data: categories, error: categoriesError, fn: fetchCategories } = useFetch(getCategories);
  const { fn: createEventFn, error: createEventError } = useFetch(createEvent);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // bloquear el scroll cuando se abre el modal
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const showToast = sessionStorage.getItem("showToast");
    const toastMessage = sessionStorage.getItem("toastMessage");
    if (showToast && toastMessage) {
      toast.success(toastMessage, {
        autoClose: 5000
      });
  
      //limpiar sessionStorage después de mostrar el toast
      sessionStorage.removeItem("showToast");
      sessionStorage.removeItem("toastMessage");
    }
  }, []);
  
  
  const handleAddressSelect = ({ address, city, country }) => {
    setValue('address', address); // Actualiza el campo de dirección en el formulario
    setValue('city', city);       // Actualiza el campo de ciudad en el formulario
    setValue('country', country); // Actualiza el campo de país en el formulario
  };


  // cargar la imagen en el storage de supabase
  const handleImageUpload = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage.from("event-images").upload(fileName, file);
      if (error) throw new Error("Error al subir la imagen.");
      const { data: urlData } = supabase.storage.from("event-images").getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (err) {
      toast.error("Error al subir la imagen.");
      console.error(err);
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const imageFile = data.image[0];
      const imageUrl = await handleImageUpload(imageFile);

      if (!imageUrl) {
        throw new Error("No se pudo cargar la imagen.");
      }

      const eventData = { ...data, image: imageUrl, host_id: user.id };
      await createEventFn(eventData);

      // cerrar el modal y recargar la página
      onClose();
      sessionStorage.setItem("showToast", "true"); // guardar flag para el toast
      sessionStorage.setItem("toastMessage", "El evento ha sido creado exitosamente! Gracias por ser un miembro de Appointment 🎉");
      navigate(0); // forzamos la recarga de la página
    } catch (error) {
      setErrorMessage(error.message || "Hubo un error al crear el evento. Por favor, verifique los datos ingresados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (categoriesError) return <p>Hubo un error al obtener las categorias: {categoriesError.message}</p>;

  return (
    <div id="modal-overlay" className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center overflow-auto">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        {/* Botón de cierre */}
          <button type="button" onClick={onClose} aria-label="Cerrar modal" className="absolute right-6 top-10 transform -translate-y-1/2 text-Button focus:outline-none rounded-full">
            <X size={20} />
          </button>
        {/* contenido del modal */}
        <div className="mb-10 p-2">
        <h1 className="lg:text-3xl font-bold text-start mb-2">Crear un Evento en {" "}
           <span className="text-[#f65858]">Appointment</span>
         </h1>
        <p className="text-justify text-gray-600 text-sm px-1">Rellene los siguientes campos para crear un nuevo evento.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pb-28">
          {/* nombre del evento */}
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
          {/* género */}
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
              placeholder={errors.address ? errors.address.message : "Buscar dirección"}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.address ? "border-red-600 placeholder-red-600 focus:ring-red-500 focus:border-red-500" : " "
              }`}
              />
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
          {/* Botones de acción */}
          <div className="col-span-1 md:col-span-4 flex justify-start space-x-4 absolute bottom-2 left-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#18181b] text-white font-medium rounded-lg p-2 px-4 shadow focus:outline-none rounded-lg hover:bg-black ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creando evento..." : "Crear Evento"}
          </button>
          
           </div>
            {/* mensaje de error si la solicitud falla */}
            {createEventError && (
            <p className="text-red-500 col-span-1 md:col-span-4">{createEventError.message}</p>
            )}
        </form>
      </motion.div>
    </div>
  );
};

export default PostEvent;
