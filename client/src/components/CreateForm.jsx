// components/CreateForm.jsx
import { useState } from "react";
import { useEvent } from "../context/EventContext";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const { createEvent } = useEvent();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activityName: "",
    description: "",
    price: 0,
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    gender: "",
    age: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = await createEvent(formData);
    if (newEvent) {
      navigate("/suggested-events"); // redirigir
    } else {
      console.error("Error al crear el evento");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-6 bg-white">
      <div className=" pb-12 mt-20">
      <h2 className='text-Button font-semibold leading-6 text-lg text-center my-10'>Crear evento</h2>
        <div className="max-w-2xl gap-y-8 mx-auto border-b border-gray-900/10">
          <input
            label="Nombre de la Actividad"
            id="activityName"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            placeholder="Nombre de la actividad"
            className="placeholder:text-sm"
          />
          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Descripción de la actividad
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="col-span-6 sm:col-span-4">
            <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
              Foto
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      className="sr-only"
                      onChange={handleChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div> */}
          <input
            label="Precio"
            id="price"
            name="price"
            type="number"
            placeholder="precio"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            label="Dirección de la Actividad"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Siempre Viva 123"
          />
          <input
            label="Ciudad"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="San Miguel de Tucumán"
          />
          <input
            label="Provincia"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Tucumán"
          />
          <input
            label="Código postal"
            id="postalCode"
            name="postalCode"
            placeholder="CP XXXX"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <select
            label="País"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            >
            <option value="">Seleccione un país</option>
            <option value="Argentina">Argentina</option>
            <option value="Australia">Australia</option>
            <option value="Mexico">México</option>
          </select>
          <select
            label="Género"
            id="genderRestriction"
            name="genderRestriction"
            value={formData.genderRestriction}
            onChange={handleChange}
            >
            <option value="">Seleccione un género</option>
            <option value="Argentina">No preferencia</option>
            <option value="Australia">Hombre</option>
            <option value="Mexico">Mujer</option>
            </select>
          <input
            label="Edades"
            id="ageRange"
            name="ageRange"
            value={formData.ageRange}
            onChange={handleChange}
          />
          <input
            label="Fecha de inicio"
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <input
            label="Hora de inicio"
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
          />
          <input
            label="Fecha de finalización"
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <input
            label="Hora de finalización"
            id="endTime"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" src='/profile/user:'>
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
