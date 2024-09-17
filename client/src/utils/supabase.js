// supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const setSupabaseSession = async (supabaseAccessToken) => {
  if (supabaseAccessToken) {
    await supabase.auth.setSession({ supabaseAccessToken });
  }
};

export default supabase;
