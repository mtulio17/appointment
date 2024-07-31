import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setUser} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data); // Actualiza el estado del usuario en el contexto
        navigate('/profile');
      } else {
        setError(data.message || 'Ocurrió un error, credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Credenciales incorrectas, por favor verifique bien los datos ingresados.');
    }
  };


  return (
    <section className='w-full h-screen py-40'>
    <div className="max-w-md mx-auto mt-10 p-10 bg-[#ffffff] shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-center mb-6 mt-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email*:</label>
          <input
            autoComplete='on'
            type="email"
            id="email"
            className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='tu correo electronico' 
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña*:</label>
          <input
            autoComplete='on'
            type="password"
            id="password"
            className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none"
            placeholder='tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
    </section>
  );
};

export default Login;