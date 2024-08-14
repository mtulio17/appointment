// components/CreateForm.jsx
import { useState } from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";

//esquema de validación con Yup
const schema = yup.object().shape({
  activityName: yup.string().required("El nombre de la actividad es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
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
  const { createEvent } = useEvent();
  const navigate = useNavigate();

  // Utilizar useForm con validación
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('activityName', data.activityName);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('postalCode', data.postalCode);
    formData.append('country', data.country);
    formData.append('gender', data.gender);
    formData.append('age', data.age);
    formData.append('startDate', data.startDate);
    formData.append('startTime', data.startTime);
    formData.append('endDate', data.endDate);
    formData.append('endTime', data.endTime);
    if (image) {
      formData.append('image', image);
    }
  
    const newEvent = await createEvent(formData);
    if (newEvent) {
      navigate("/suggested-events"); // redirigir
    } else {
      console.error("Error al crear el evento");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-4xl p-6 bg-white">
    <div className="pb-12 mt-20">
      <h2 className="text-Button font-semibold leading-6 text-lg text-center my-10">Crear evento</h2>
      <div className="max-w-2xl gap-y-8 mx-auto border-b border-gray-900/10">
        <input
          placeholder="Nombre de la actividad"
          {...register("activityName")}
          className={`placeholder:text-sm ${errors.activityName ? 'border-red-500' : ''}`}
        />
        {errors.activityName && <p className="text-red-500 text-sm">{errors.activityName.message}</p>}
          <div>
            <label>Imagen</label>
            <input type="file" onChange={handleImageChange} />
          </div>
        <div className="col-span-6 sm:col-span-4">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Descripción de la actividad
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>

        <input
          placeholder="Precio"
          type="number"
          {...register("price")}
          className={`placeholder:text-sm ${errors.price ? 'border-red-500' : ''}`}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <input
          placeholder="Siempre Viva 123"
          {...register("address")}
          className={`placeholder:text-sm ${errors.address ? 'border-red-500' : ''}`}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

        <input
          placeholder="San Miguel de Tucumán"
          {...register("city")}
          className={`placeholder:text-sm ${errors.city ? 'border-red-500' : ''}`}
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

        <input
          placeholder="Tucumán"
          {...register("state")}
          className={`placeholder:text-sm ${errors.state ? 'border-red-500' : ''}`}
        />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}

        <input
          placeholder="CP XXXX"
          {...register("postalCode")}
          className={`placeholder:text-sm ${errors.postalCode ? 'border-red-500' : ''}`}
        />
        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}

        <select {...register("country")} className={`placeholder:text-sm ${errors.country ? 'border-red-500' : ''}`}>
          <option value="">Seleccione un país</option>
          <option value="Argentina">Argentina</option>
          <option value="Australia">Australia</option>
          <option value="Mexico">México</option>
        </select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}

        <select {...register("gender")} className={`placeholder:text-sm ${errors.gender ? 'border-red-500' : ''}`}>
          <option value="">Seleccione un género</option>
          <option value="No preferencia">No preferencia</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}

        <input
          placeholder="Edades"
          {...register("age")}
          className={`placeholder:text-sm ${errors.age ? 'border-red-500' : ''}`}
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}

        <input
          type="date"
          {...register("startDate")}
          className={`placeholder:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
        />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}

        <input
          type="time"
          {...register("startTime")}
          className={`placeholder:text-sm ${errors.startTime ? 'border-red-500' : ''}`}
        />
        {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}

        <input
          type="date"
          {...register("endDate")}
          className={`placeholder:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
        />
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}

        <input
          type="time"
          {...register("endTime")}
          className={`placeholder:text-sm ${errors.endTime ? 'border-red-500' : ''}`}
        />
        {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
      </div>
    </div>
    <div className="mt-6 flex items-center justify-center gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancelar
      </button>
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Guardar
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
