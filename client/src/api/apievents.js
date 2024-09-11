import supabaseClient from "../utils/supabase";

// función para obtener eventos con posibilidad de filtrado por ubicación y nombre del evento
export async function getEvents(token, {country, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
  .from("events")
  .select("*");

  if (country) {
    query = query.eq("country", country);
  }

  if (searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetcheando los eventos", error);
    return null;
  }
  return data;
}

export async function getCategories(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetcheando las categorias", error);
    return null;
  }

  return data;
}

export async function getEventsByCategory(token, categoryId) {
  console.log("Category ID:", categoryId); // Añade esta línea para verificar el valor de categoryId
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error fetching events by category:", error);
    return null;
  }

  return data;
}

export async function getMyEvents(token, { host_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("host_id", host_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// función para crear nuevo evento en la db
export async function createEvent(token, _, eventData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("events")
    .insert([eventData])
    .single();

  if (error) {
    console.error("Error creando el evento", error);
    return null;
  }
  return data;
}

// Método para participar en un evento
// Método para participar en un evento
export async function participateInEvent(token, eventId, userId) {
  const supabase = await supabaseClient(token);

  // Verificar si el usuario ya está participando en el evento
  const { data: existingParticipation, error: checkError } = await supabase
    .from("event_participants")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (checkError) {
    console.error("Error al verificar participación en el evento", checkError);
    return null;
  }

  if (existingParticipation.length > 0) {
    console.warn("El usuario ya está participando en el evento");
    return existingParticipation[0]; // Devuelve la participación existente
  }

  // Insertar nueva participación
  const { data, error } = await supabase
    .from("event_participants")
    .insert([{ event_id: eventId, user_id: userId, joined_at: new Date().toISOString(), status: 'active', role: 'participant' }])
    .single();

  if (error) {
    console.error("Error al participar en el evento", error);
    return null;
  }
  return data;
}


// función para obtener los participantes de un evento
// Función para obtener los participantes de un evento
export async function getEventParticipants(token, eventId) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("event_participants")
    .select("user_id")  // Asegúrate de ajustar esto a los campos que realmente necesitas
    .eq("event_id", eventId);

  if (error) {
    console.error("Error al obtener los participantes del evento", error);
    return null;
  }

  return data;
}


export async function getSingleEvent(token, { event_id }) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("events").select("*").eq("id", event_id).single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching single Event:", error);
    return null;
  }

  return data;
}

// - Add / Remove saveEvent
export async function saveEvent(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  // Verificar si el evento ya está guardado
  const { data: existingEvents, error: selectError } = await supabase
    .from("saved_events")
    .select("*")
    .eq("user_id", saveData.user_id)
    .eq("event_id", saveData.event_id);

  if (selectError) {
    console.error("Error al verificar si el evento ya está guardado:", selectError);
    return { error: selectError };
  }

  if (alreadySaved && existingEvents.length === 0) {
    // El evento debería estar guardado pero no lo está
    console.warn("El evento no está guardado en favoritos.");
    return { error: "El evento no está guardado en favoritos." };
  }

  if (alreadySaved) {
    // Eliminar el evento de favoritos
    const { data, error: deleteError } = await supabase
      .from("saved_events")
      .delete()
      .eq("user_id", saveData.user_id)
      .eq("event_id", saveData.event_id);

    if (deleteError) {
      console.error("Error eliminando eventos guardados", deleteError);
      return { error: deleteError };
    }
    return { data };
  } else {
    // Añadir el evento a favoritos
    const { data, error: insertError } = await supabase
      .from("saved_events")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error guardando eventos", insertError);
      return { error: insertError };
    }

    return { data };
  }
}


// - Get saved events
export async function getSavedEvents(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_events")
    .select(`
      id,
      event: events (*)
    `);

  if (error) {
    console.error("Error fetching saved events:", error);
  }

  return data;
}