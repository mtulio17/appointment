import { useState, useEffect } from 'react';
import { useToken } from '../context/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

const Settings = () => {
  const { user, isAuthenticated } = useAuth0();
  const token = useToken();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Otros campos que necesites
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        // Otros campos que necesites inicializar
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario al backend
  };

  return (
    <div>
      <h2>Configuración</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {/* Otros campos del formulario */}
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Settings;
