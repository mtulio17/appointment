import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Si existe un token de acceso, configúralo en la sesión
  if (supabaseAccessToken) {
    await supabase.auth.setSession({ supabaseAccessToken });
  }

  return supabase;
};

export default supabaseClient;
