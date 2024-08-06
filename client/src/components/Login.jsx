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

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <section className="w-full py-24">
      <div className="max-w-md mx-auto mt-10 p-10 bg-[#ffffff] shadow-md rounded-lg">
        <h2 className="text-4xl font-sans font-semibold text-center mb-10">Appointment</h2>
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
              placeholder="Correo electrónico"
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
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center items-center mt-1">
            <a href="#" className="text-sm font-medium hover:underline ml-1">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center w-full max-w-80 mx-auto mt-6 bg-Button text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            Iniciar Sesión
          </button>
        </form>
        <button type="button" onClick={handleGoogleLogin} className="flex justify-center items-center w-full max-w-80 mx-auto mt-4 border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-sky-100/50 focus:outline-sky-100 duration-300">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5 mr-3"
          />
          Continuar con Google
         </button>
          <div className="flex justify-center items-center mt-6">
            <h3 className="text-xs">¿Aún no sos miembro?</h3>
            <a href="/sign-up" className="text-xs font-medium hover:underline ml-1">
              Registrate
            </a>
          </div>
          <hr className="border-gray-200 mx-20 mt-2" />
          <p className="justify-center items-center text-center text-gray-700 text-pretty mt-4 text-xs">Si continúas, aceptas los <a href="#" className="font-medium hover:underline">Términos del servicio</a> de Appointment y confirmas que has leído nuestra <a href="#" className="font-medium hover:underline">Política de privacidad</a>.</p>
      </div>
    </section>
  );
};

export default Login;
