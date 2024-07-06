import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext();

const TokenProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const getToken = async () => {
      let result = await getAccessTokenSilently();
      setToken(result);
    };
    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export { AuthContext, TokenProvider };