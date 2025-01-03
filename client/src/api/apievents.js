import supabase, { setSupabaseSession } from "../utils/supabase";

// función para obtener eventos con posibilidad de filtrado por ubicación y nombre del evento
export async function getEvents(token, { searchQuery = "" } = {}) {
  await setSupabaseSession(token);

  let removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const normalizedSearchQuery = removeAccents(searchQuery).trim();

  let query = supabase.from("events").select("*");

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
    console.error("Error fetching events :", error);
    return null;
  }

  return data;
}

export async function getEventsByLocation(
  token,
  { city, country, searchQuery = "" } = {}
) {
  await setSupabaseSession(token);

  let removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const normalizedSearchQuery = removeAccents(searchQuery).trim();

  // Primer intento: buscar eventos en la ciudad
  let query = supabase
    .from("events")
    .select("*")
    .ilike("city", `%${city}`) // Uso de ilike para búsqueda sin distinción de mayúsculas y minúsculas
    .eq("country", country);

  if (normalizedSearchQuery) {
    query = query.ilike("name", `%${normalizedSearchQuery}%`);
  }

  let { data, error } = await query;

  // Si no hay eventos en la ciudad, buscar en el país
  if (!data || data.length === 0) {
    query = supabase.from("events").select("*").eq("country", country); // Solo filtramos por país

    if (normalizedSearchQuery) {
      query = query.ilike("name", `%${normalizedSearchQuery}%`);
    }

    const countryQueryResult = await query;
    data = countryQueryResult.data;
    error = countryQueryResult.error; // Captura el error si lo hay
  }

  if (error) {
    console.error("Error fetching the events by location", error);
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

// export async function getEventsByCategory(token, categoryId, city = null, country = null) {
//   await setSupabaseSession(token);

//   let query = supabase
//     .from("events")
//     .select("*")
//     .eq("category_id", categoryId);

//   // si la ciudad y el país están disponibles, agregar el filtro
//   if (city && country) {
//     query = query
//       .eq("city", city)
//       .eq("country", country);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching events by category:", error);
//     return null;
//   }

//   return data;
// }

// función para crear nuevo evento en la db
export async function createEvent(token, eventData) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("events")
    .insert([eventData])
    .select();

  if (error) {
    return { success: false, error };
  }

  if (!data) {
    return { success: false, error: "No se recibió ningún dato" };
  }
  return { success: true, data }; // devuelve el objeto con éxito verdadero y los datos.
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
    .update({ status: "cancelado" })
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error cancelando el evento:", error);
    return null;
  }

  return data;
}

// Función para actualizar/editar un evento
export async function updateEvent(token, eventId, updatedData) {
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
    .from("event_attendees")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (checkError) {
    console.error("Error al verificar participación en el evento", checkError);
    return null;
  }

  if (existingParticipation.length > 0) {
    if (existingParticipation[0].status === "confirmado") {
      console.warn("El usuario ya está confirmado en el evento");
      return existingParticipation[0];
    }
    console.warn("El usuario ya está registrado pero no confirmado.");
    return existingParticipation[0];
  }

  // Insertar nueva participación
  const { data, error } = await supabase
    .from("event_attendees")
    .insert([
      {
        event_id: eventId,
        user_id: userId,
        joined_at: new Date().toISOString(),
        status: "confirmado",
        role: "participant",
      },
    ])
    .single();

  if (error) {
    console.error("Error al participar en el evento", error);
    throw new Error("Error al registrar la participación. Intenta nuevamente.");
  }
  return data;
}

// Función para obtener los participantes de un evento con sus datos (nombre y avatar)
export async function getEventParticipants(token, eventId) {
  await setSupabaseSession(token);

  // consultar participantes del evento, incluyendo información del usuario
  const {data, error} = await supabase
  .from("event_attendees")
  .select("user_id, users(first_name, avatar_url, full_name), status") 
  .eq("event_id", Number(eventId))
  .order("created_at", {ascending: true})

  if (error) {
    console.error("Error al obtener los participantes del evento", error);
    return null;
  }

  return data;
}


export async function getSingleEventAndHost(token, { event_id }) {
  await setSupabaseSession(token);

  // obtiene los detalles del evento
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("*")
    .eq("id", event_id)
    .single();

  if (eventError) {
    console.error("Error fetching single event:", eventError);
    return null;
  }

   // Usa "host_id" para obtener los datos del anfitrión
   const { data: host, error: hostError } = await supabase
   .from("users")
   .select("full_name, avatar_url")
   .eq("clerk_id", event.host_id)
   .single();

 if (hostError) {
   console.error("Error fetching host data:", hostError);
   return { ...event, host: null };
 }

 // Combina los datos del evento y del host
 return { ...event, host };
}



// - Add / Remove saveEvent
export async function saveEvent(token, saveData) {
  await setSupabaseSession(token);

  // Dependiendo de la acción (`save` o `delete`), guarda o elimina el evento
  if (saveData.action === "delete") {
    // Eliminar el evento guardado
    const { data, error } = await supabase
      .from("saved_events")
      .delete()
      .eq("user_id", saveData.user_id)
      .eq("event_id", saveData.event_id);

    if (error) {
      console.error("Error eliminando evento guardado:", error);
      return { error };
    }

    return { data, message: "Evento eliminado de favoritos" };
  } else {
    // Guardar el evento en favoritos
    const { data, error } = await supabase
      .from("saved_events")
      .insert([
        {
          user_id: saveData.user_id,
          event_id: saveData.event_id,
        },
      ])
      .select();

    if (error) {
      console.error("Error guardando evento en favoritos:", error);
      return { error };
    }

    return { data, message: "Evento guardado en favoritos" };
  }
}

// - Get saved events
export async function getSavedEvents(token) {
  await setSupabaseSession(token);

  const { data, error } = await supabase.from("saved_events").select(`
      id,
      event: event_id (id, name, description, start_date, start_time, city, country, image) 
    `);

  if (error) {
    console.error("Error fetching saved events:", error);
    return [];
  }

  return data;
}

export async function getUserEvents(token, host_id) {
  await setSupabaseSession(token);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("host_id", host_id); 

  if (error) {
    console.error("Error fetching user events:", error.message);
    return [];
  }

  return data;
}
