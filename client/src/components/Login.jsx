import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading, user, error: authError } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials);
      const user = JSON.parse(localStorage.getItem('user')); // almacenamos el usuario en localStorage
      if (user) {
        const queryParams = new URLSearchParams({
          location: user.location || '', // usa un valor por defecto si no existe
          interests: user.interests ? user.interests.join(',') : '', // usa un valor por defecto si no existe
        }).toString();

        console.log('Parámetros de consulta:', queryParams);

        navigate(`/suggested-events?${queryParams}`);
      } else {
        setError('No se pudo cargar el perfil del usuario.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Credenciales incorrectas, por favor verifique bien los datos ingresados.');
    }
  };

  return (
    <section className="w-full h-screen py-36">
      <div className="max-w-md mx-auto mt-10 p-10 bg-[#ffffff] shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        {authError && <p className="text-red-500 text-center mb-6 mt-2">{authError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email*:
            </label>
            <input
              autoComplete="on"
              type="email"
              id="email"
              name="email"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
              value={credentials.email}
              onChange={handleChange}
              placeholder="tu correo electronico"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Contraseña*:
            </label>
            <input
              autoComplete="on"
              type="password"
              id="password"
              name="password"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="tu contraseña"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center items-center my-6">
            <h3 className="text-md">¿Aún no sos miembro? {"|"}</h3>
            <a href="/sign-up" className="text-md ml-1 underline text-Button">
              Regístrate
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
