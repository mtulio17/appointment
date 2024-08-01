import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: 'GET',
          credentials: 'include',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          const errorText = await response.text();
          console.error('No se pudo cargar el usuario, respuesta:', errorText);
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    };
    
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
