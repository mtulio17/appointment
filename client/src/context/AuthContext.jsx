import { createContext, useContext, useState, useEffect} from "react";
// import jwt from "jsonwebtoken";
import axios from "axios";
// import { supabase } from "../supabase/supabase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log('Token almacenado:', token);
        await fetchUserProfile(token);
        setIsAuthenticated(true);
      } else {
        setError(response.data.message || "Error desconocido");
        console.error("Error de inicio de sesión:", response.data);
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setError("Error de inicio de sesión. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUserProfile = async (token) => {
    console.log('Fetching user profile with token:', token);
    try {
      const response = await axios.get("http://localhost:5000/auth/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        const userData = response.data;
        console.log("User data:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
      } else {
        setError(response.data.message || "Error desconocido");
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
      setError("No se pudo cargar el usuario.");
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } finally {
      setLoading(false); // Marca la carga como completa al final
    }
  };


  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };


  
  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
