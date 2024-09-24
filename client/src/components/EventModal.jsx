import React, { useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { useForm } from 'react-hook-form';

const EventModal = ({event, onClose}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const {openModal} = useModal();

  useEffect(() => {
    // Prellenar los campos del formulario con los datos del evento
    setValue("name", event.name);
    setValue("gender", event.gender);
    setValue("age", event.age);
    setValue("price", event.price);
    setValue("description", event.description);
    setValue("address", event.address);
    setValue("category_id", event.category_id);
    setValue("city", event.city);
    setValue("country", event.country);
    setValue("start_date", event.start_date);
    setValue("start_time", event.start_time);
  }, [event, setValue]);

  const onSubmit = (data) => {
    // Aquí iría la lógica para enviar los datos actualizados al backend
    console.log(data);
    // Luego cierra el modal
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className='bg-white rounded-lg p-6 max-w-lg w-full shadow-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ... (Tu formulario aquí, igual al que compartiste antes) ... */}
        <button type="submit" className="btn">Actualizar Evento</button>
        <button type="button" onClick={onClose} className="btn">Cancelar</button>
      </form>
      </div>
    </div>
  );
};

export default EventModal;