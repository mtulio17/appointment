// controllers/event.controller.js
import mongoose from "mongoose";
import Event from "../models/event.model.js";

export const getEvents = async (req, res) => {
  const { city, state, startDate, endDate } = req.query;

  const query = {};

  if (city) query.city = city;
  if (state) query.state = state;
  if (startDate) query.startDate = { $gte: new Date(startDate) };
  if (endDate) query.endDate = { $lte: new Date(endDate) };

  try {
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener eventos", error });
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ message: "Evento no encontrado." });
    res.json(event);
  } catch (error) {
    return res.status(400).json({ message: "ID no válido para ObjectId" });
  }
};

export const createEvent = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: "No se encontró el usuario autenticado" });
  }
  const {
    activityName,
    description,
    price,
    address,
    city,
    state,
    postalCode,
    country,
    gender,
    age,
    startDate,
    startTime,
    endDate,
    endTime,
  } = req.body;

  const newEvent = new Event({
    user: req.user.id, // Aquí se usa el ID del usuario autenticado
    activityName,
    description,
    price,
    address,
    city,
    state,
    postalCode,
    country,
    gender,
    age,
    startDate,
    startTime,
    endDate,
    endTime,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento", error });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Evento no encontrado." });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evento", error });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Evento no encontrado." });
    res.json({ message: "Evento eliminado exitosamente." });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el evento", error });
  }
};

export const searchEvents = async (req, res) => {
  const {
    activityName,
    city,
    state,
    country,
    startDate,
    endDate,
    gender,
    age,
    priceMin,
    priceMax,
    location,
    interests,
  } = req.query;

  const query = {};

  //logica para sugerencias
  if (location || interests) {
    if (location) {
      query.$or = [{ city: location }, { country: location }];
    }

    if (interests) {
      const interestsArray = Array.isArray(interests) ? interests : [interests];
      query.interests = { $in: interestsArray };
    }
  } else {
    if (activityName)
      query.activityName = { $regex: activityName, $options: "i" };
    if (city) query.city = city;
    if (state) query.state = state;
    if (country) query.country = country;
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };
    if (gender) query.gender = gender;
    if (age) query.age = age;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = priceMin;
      if (priceMax) query.price.$lte = priceMax;
    };    
  }

  try {
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error("Error al buscar eventos:", error); 
    res.status(500).json({ message: "Error al buscar eventos", error });
  }
};


export const participateInEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    // verifica si el usuario es el creador del evento
    if (event.user.toString() === userId) {
      return res.status(400).json({ message: "No puedes unirte a tu propio evento" });
    }
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: "Ya estás participando en este evento" });
    }
    if (event.maxParticipants !== -1 && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ message: "El evento ha alcanzado el límite de participantes" });
    }
    event.participants.push(userId);
    await event.save();

    return res.json({ message: "Te has unido al evento", event });
  } catch (error) {
    return res.status(500).json({ message: "Error al unirse al evento", error });
  }
};

export const cancelParticipation = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    if (!event.participants.includes(userId)) {
      return res.status(400).json({ message: "No estás participando en este evento" });
    }

    event.participants = event.participants.filter(participant => participant.toString() !== userId);
    await event.save();

    return res.json({ message: "Has cancelado tu participación en el evento", event });
  } catch (error) {
    return res.status(500).json({ message: "Error al cancelar la participación en el evento", error });
  }
};