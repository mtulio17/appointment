import { useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import useToken from '../context/AuthContext'; // Asegúrate de tener este hook importado

const TextInput = ({ label, id, name, type = 'text', value, onChange, placeholder }) => (
  <div className="col-span-4">
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={name}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const SelectInput = ({ label, id, name, value, onChange, options }) => (
  <div className="col-span-4">
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <select
        id={id}
        name={name}
        autoComplete={name}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const CreateForm = () => {
//   const { user, isAuthenticated } = useAuth0();
//   const token = useToken();

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
    genderRestriction: '',
    ageRange: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    //Para enviar los datos del formulario al back
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 ml-auto mr-auto">
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <TextInput
            label="Nombre de la Actividad"
            id="activityName"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            placeholder="Ajedrez en el Parque"
          />
          <div className="col-span-4">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Descripción de la actividad
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-4">
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
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
  );
};

export default CreateForm;
