import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { session, isSignedIn } = useSession();

  const fn = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      // si el usuario no está logueado, no intentamos obtener el token de Supabase
      if (!isSignedIn) {
        console.log("User is not signed in, skipping Supabase token fetch.");
        const res = await cb(null, ...args, options);  // Llamar a la función con null como token
        if (!res) {
          throw new Error("No data received from the function.");
        }
        setData(res);
        return;
      }
      // si el usuario está logueado, obtenemos el token de Supabase
      const supabaseAccessToken = await session.getToken({ template: 'supabase' });

      if (!supabaseAccessToken) {
        throw new Error("No Supabase access token available.");
      }

      const res = await cb(supabaseAccessToken, ...args, options);

      if (!res) {
        throw new Error("No data received from the function.");
      }

      setData(res);
    } catch (err) {
      console.error("Error fetching data: ", err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fn, data, error, isLoading };
};

export default useFetch;
