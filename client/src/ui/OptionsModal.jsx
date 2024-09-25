import { Menu} from '@headlessui/react';
import { Pencil, Trash, X, XCircle } from 'lucide-react';
import { useState } from 'react';

const OptionsModal = ({ event, isOpen, onClose, onSave }) => {

  const [formData, setFormData] = useState({
    name: event?.name || "",
    description: event?.description || "",
    date: event?.date || "",
    // otros campos
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData); // Llama a la función de guardado en MyCreatedEvents
    onClose(); // Cierra el modal después de guardar
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Evento</h2>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          {/* Agregar más campos según sea necesario */}
        </form>
        <button onClick={handleSubmit}>Guardar Cambios</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default OptionsModal;
