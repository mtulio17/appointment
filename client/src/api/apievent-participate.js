import supabaseClient from "../utils/supabase";

// Función para participar en un evento
export async function participateInEvent(eventId, userId) {
    const supabase = await supabaseClient();
  
    const { data, error } = await supabase
      .from('event_participants')
      .insert([
        {
          event_id: eventId,
          user_id: userId,
          joined_at: new Date(),
          status: '', // O el estado que desees por defecto
          role: '', // O el rol que desees por defecto
        },
      ])
      .single();
  
    if (error) {
      console.error('Error participando en el evento:', error);
      return { error };
    }
    return data;
  }

// Función para verificar si el usuario ya está participando
export async function checkParticipation(eventId, userId) {
    const supabase = await supabaseClient();
  
    const { data, error } = await supabase
      .from('event_participants')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();
  
    if (error) {
      console.error('Error verificando la participación:', error);
      return { error };
    }
    return data;
  }