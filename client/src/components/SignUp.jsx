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
  const { login, loading } = useAuth();

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

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <section className="w-full py-24">
      <div className="max-w-md mx-auto mt-10 p-10 bg-[#ffffff] shadow-md rounded-lg">
      <h2 className="text-4xl font-sans font-semibold text-center mb-10">Appointment</h2>
        {error && <p className="text-red-500 text-center mb-6 mt-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm mb-2">
              Nombre de usuario<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="on"
              type="text"
              id="username"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none placeholder:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="on"
              type="email"
              id="email"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none placeholder:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm mb-2">
              Contraseña<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="on"
              type="password"
              id="password"
              className="w-full bg-[#fbfbfb] px-4 py-2 border rounded-lg focus:outline-none placeholder:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center w-full max-w-80 mx-auto mt-6 bg-Button text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            Continuar
          </button>
          <button type="button" onClick={handleGoogleLogin} className="flex justify-center items-center w-full max-w-80 mx-auto mt-4 border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-sky-100/50 focus:outline-sky-100 duration-300">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5 mr-3"
          />
          Continuar con Google
         </button>
        </form>
        <div className="flex justify-center items-center mt-6">
            <h3 className="text-xs">¿Ya eres miembro?</h3>
            <a href="/sign-in" className="text-xs font-medium hover:underline ml-1">
             Iniciar sesión
            </a>
          </div>
          <hr className="border-gray-200 mx-20 mt-2" />
          <p className="justify-center items-center text-center text-gray-700 text-pretty mt-4 text-xs">Si continúas, aceptas los <a href="#" className="font-medium hover:underline">Términos del servicio</a> de Appointment y confirmas que has leído nuestra <a href="#" className="font-medium hover:underline">Política de privacidad</a>.</p>
      </div>
    </section>
  );
};

export default SignUp;
