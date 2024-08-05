import React, { useState } from 'react';

// Componente reutilizable para los inputs de texto
const TextInput = ({ label, id, name, type = "text", value, onChange, placeholder }) => (
  <div className="col-span-6 sm:col-span-4">
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);

const SelectInput = ({ label, id, name, value, onChange, options }) => (
  <div className="col-span-6 sm:col-span-4">
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const CreateForm = () => {
  const [error, setError] = useState("");
  const defaultImage = 'https://via.placeholder.com/150';
  const [formData, setFormData] = useState({
    activityName: '',
    description: '',
    file: null,
    price: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Argentina',
    genderRestriction: 'No preferencia',
    ageRange: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e, req) => {
    e.preventDefault();
    setError("");

    const {
      activityName,
      description,
      file,
      price,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      genderRestriction,
      ageRange,
      startDate,
      startTime,
      endDate,
      endTime,
    } = formData;

    const imageUrl = file ? URL.createObjectURL(file) : defaultImage;

    const dataToSend = {
      activityName,
      description,
      image: imageUrl,
      price,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      genderRestriction,
      ageRange,
      startDate,
      startTime,
      endDate,
      endTime,
    };

    try {
        const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log('Evento creado');
      } else {
        setError(responseData.message || 'Ocurrió un error al crear el evento.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error al crear el evento.');
    }
  };

    return (


        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-6 bg-white">
      <div className=" pb-12 mt-20">
      <h2 className='text-Button font-semibold leading-6 text-lg text-center my-10'>Crear evento</h2>
        <div className="max-w-2xl gap-y-8 mx-auto border-b border-gray-900/10">
          <TextInput
            label="Nombre de la Actividad"
            id="activityName"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            placeholder="Ajedrez en el Parque"
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
          <div className="col-span-6 sm:col-span-4">
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
          </div>
          <TextInput
            label="Precio"
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextInput
            label="Dirección de la Actividad"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Siempre Viva 123"
          />
          <TextInput
            label="Ciudad"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="San Miguel de Tucumán"
          />
          <TextInput
            label="Provincia"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Tucumán"
          />
          <TextInput
            label="Código postal"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <SelectInput
            label="País"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={['Argentina', 'Australia', 'Mexico']}
          />
          <SelectInput
            label="Género"
            id="genderRestriction"
            name="genderRestriction"
            value={formData.genderRestriction}
            onChange={handleChange}
            options={['No preferencia', 'Masculino', 'Femenino', 'Otros']}
          />
          <TextInput
            label="Edades"
            id="ageRange"
            name="ageRange"
            value={formData.ageRange}
            onChange={handleChange}
          />
          <TextInput
            label="Fecha de inicio"
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <TextInput
            label="Hora de inicio"
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
          />
          <TextInput
            label="Fecha de finalización"
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <TextInput
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
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    )
}

export default CreateForm