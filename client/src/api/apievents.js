import supabase, {setSupabaseSession} from "../utils/supabase";

// función para obtener eventos con posibilidad de filtrado por ubicación y nombre del evento
export async function getEvents(token, { country = "", searchQuery = "" } = {}) {
  await setSupabaseSession(token);

  let removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  
  const normalizedSearchQuery = removeAccents(searchQuery).trim();

  let query = supabase.from("events").select("*");

  if (country) {
    query = query.eq("country", country);
  }

  if (normalizedSearchQuery) {
    query = query.ilike("name", `%${normalizedSearchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching the events", error);
    return null;
  }
  return data;
}


export async function getMyEvents(token, { host_id }) {
  await setSupabaseSession(token);

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

export async function getCategories(token) {
  await setSupabaseSession(token);

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetcheando las categorias", error);
    return null;
  }
  
  return data;
}


export async function getEventsByCategory(token, categoryId) {
  await setSupabaseSession(token);

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

// función para crear nuevo evento en la db
export async function createEvent(token, eventData) {
  console.log("Datos enviados a Supabase:", eventData);

  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .single();

  if (error) {
    console.error("Error al crear el evento:", error);
    return { success: false, error };
  }

  if (!data) {
    console.error("No se recibió ningún dato de Supabase.");
    return { success: false, error: "No se recibió ningún dato" };
  }

  console.log("Evento creado con éxito:", data);
  return { success: true, data };  // devuelve el objeto con éxito verdadero y los datos.
}


// Función para eliminar un evento
export async function deleteEvent(token, eventId) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error eliminando el evento:", error);
    return null;
  }

  return data;
}

// Función para cancelar un evento (podría ser una actualización del estado del evento)
export async function cancelEvent(token, eventId) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("events")
    .update({ status: "cancelled" })
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error cancelando el evento:", error);
    return null;
  }

  return data;
}

// Función para editar un evento
export async function editEvent(token, eventId, updatedData) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("events")
    .update(updatedData)
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error editando el evento:", error);
    return null;
  }

  return data;
}


// Método para participar en un evento
export async function participateInEvent(token, eventId, userId) {
  await setSupabaseSession(token);

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
    .insert([{ event_id: eventId, user_id: userId, joined_at: new Date().toISOString(),
      status: 'confirmed', role: 'participant' }])
    .single();

  if (error) {
    console.error("Error al participar en el evento", error);
    return null;
  }
  return data;
}

// Función para obtener los participantes de un evento
export async function getEventParticipants(token, eventId) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("event_participants")
    .select("user_id")
    .eq("event_id", Number(eventId));  // Asegúrate de que eventId es un número

  if (error) {
    console.error("Error al obtener los participantes del evento", error);
    return null;
  }

  return data;
}


export async function getSingleEvent(token, { event_id }) {
  await setSupabaseSession(token);

  let query = supabase.from("events").select("*").eq("id", event_id).single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching single Event:", error);
    return null;
  }

  return data;
}

// - Add / Remove saveEvent
export async function saveEvent(token, saveData) {
  await setSupabaseSession(token);

  // verificar si el evento ya está guardado
  const { data: existingEvents, error: selectError } = await supabase
    .from("saved_events")
    .select("*")
    .eq("user_id", saveData.user_id)
    .eq("event_id", saveData.event_id);

  if (selectError) {
    console.error("Error al verificar si el evento ya está guardado:", selectError);
    return { error: selectError };
  }

  if (saveData.alreadySaved) {
    // Si ya está guardado y se desea desmarcar (eliminar)
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
  } else if (existingEvents.length === 0) {
    // Si no está guardado, se agrega a favoritos
    const { data, error: insertError } = await supabase
      .from("saved_events")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error guardando eventos", insertError);
      return { error: insertError };
    }

    return { data };
  } else {
    // Si ya está guardado, no se inserta dos veces
    console.warn("El evento ya está guardado en favoritos.");
    return { data: existingEvents };
  }
}



// - Get saved events
export async function getSavedEvents(token) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("saved_events")
    .select(`id,
      event: events (*)
    `);

  if (error) {
    console.error("Error fetching saved events:", error);
  }

  return data;
}