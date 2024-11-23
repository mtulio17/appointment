import { setSupabaseSession } from './supabase';

export const setSupabaseSessionFromClerk = async (session) => {
  try {
    const supabaseAccessToken = await session.getToken({ template: 'supabase' });

    // console.log("Supabase Access Token:", supabaseAccessToken);

    if (supabaseAccessToken) {
      await setSupabaseSession(supabaseAccessToken);
      // console.log('Sesión de Supabase configurada con éxito.');
    } else {
      console.error('No se pudo obtener el token de Supabase.');
    }
  } catch (error) {
    // console.error('Error al sincronizar la sesión con Supabase:', error.message);
  }
};
