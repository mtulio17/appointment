import { createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (response.ok) {
        await fetchUserProfile();
      } else {
        const errorText = await response.json();
        setError(errorText.message);
        console.error('Error de inicio de sesión:', errorText);
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Error de inicio de sesión.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Guarda los datos del usuario en localStorage
      } else {
        const errorText = await response.json();
        setError(errorText.message);
        console.error('No se pudo cargar el usuario, respuesta:', errorText);
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      setError('No se pudo cargar el usuario.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login,logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;