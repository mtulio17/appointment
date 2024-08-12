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
  const {
    activityName,
    description,
    // file,
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
    // lat,
    // lng,
  } = req.body;

  // if (lat === undefined || lng === undefined) {
  //   return res
  //     .status(400)
  //     .json({ message: "Se requieren latitud y longitud para el evento" });
  // }
  const newEvent = new Event({
    user: req.user._id,
    activityName,
    description,
    // file,
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
    // location: {
    //   type: "Point",
    //   coordinates: [lng, lat], // coordenadas en el orden [lng, lat]
    // },
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
  const userId = req.user._id; 

  console.log('Request body:', req.body);
  console.log('User ID:', req.user._id);
  console.log('Event ID:', req.params.id);
  try {

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: 'Ya estás participando en este evento' });
    }
    if (event.maxParticipants > 0 && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'El evento ha alcanzado el número máximo de participantes' });
    }
    event.participants.push(userId);
    await event.save();
    res.status(200).json({ event });
  } catch (error) {
    console.error('Error al participar en el evento:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};