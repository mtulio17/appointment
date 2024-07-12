import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

const TokenProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const getToken = async () => {
      try {
        const result = await getAccessTokenSilently();
        setToken(result);
      } catch (error) {
        console.error("Error obteniendo token:", error);
      }
    };

    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

const useToken = () => {
  return useContext(AuthContext);
};

export { AuthContext, TokenProvider, useToken };
