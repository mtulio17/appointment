import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // Importa el método de login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // validacion regex del formato del email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido. Intente con otro.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // despues de un registro exitoso intenta iniciar sesión automáticamente
        await login({ email, password });
        // obtiene la ruta de destino desde el estado o redirige a la ruta deseada
        const redirectTo = location.state?.from || '/suggested-events?location=&interests=';
        console.log('Redirigiendo a:', redirectTo);
        navigate(redirectTo);
      } else {
        setError(data.message || 'Ocurrió un error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <section className="w-full h-screen py-36">
      <div className="max-w-md mx-auto mt-10 p-10 bg-[#ffffff] shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Registrar</h2>
        {error && <p className="text-red-500 text-center mb-6 mt-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Nombre de Usuario:
            </label>
            <input
              autoComplete="on"
              type="text"
              id="username"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tu nombre de usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email*:
            </label>
            <input
              autoComplete="on"
              type="email"
              id="email"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu correo electrónico"
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
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="tu contraseña"
              required
            />
          </div>
          <div className="flex justify-center items-center my-6">
            <h3 className="text-md">¿Ya estás registrado? {"|"}</h3>
            <a href="/sign-in" className="text-md ml-1 underline">
              Iniciar Sesión
            </a>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Registrarme
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
