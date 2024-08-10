// server/utils/getNearbyEvents.js
import Event from "../models/event.model.js";

export const getNearbyEvents = async (lat, lng, maxDistance = 100) => {
  try {
    // busca los eventos dentro de un radio de `maxDistance` kms desde las coordenadas proporcionadas
    const events = await Event.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], maxDistance / 6378.1], // 6378.1 es el radio de la tierra en kms
        },
      },
    });
    return events;
  } catch (error) {
    console.error("Error obteniendo eventos cercanos:", error);
    throw new Error("Error obteniendo eventos cercanos");
  }
};
