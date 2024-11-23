import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const setSupabaseSession = async (supabaseAccessToken) => {
  if (supabaseAccessToken) {
    // console.log("Configurando la sesión de Supabase con el token:", supabaseAccessToken);
    await supabase.auth.setSession({ access_token: supabaseAccessToken });
    // console.log("Sesión de Supabase configurada con éxito.");
  } else {
    console.error("No se proporcionó un token de acceso válido.");
  }
};


export default supabase;
