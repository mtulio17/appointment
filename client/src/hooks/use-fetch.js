import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useSession();

  const fn = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      // No intentes obtener un token si no hay sesión
      const supabaseAccessToken = session ? await session.getToken({ template: "supabase" }) : null;
      const res = await cb(supabaseAccessToken, ...args, options);
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fn, data, error, isLoading };
};

export default useFetch;