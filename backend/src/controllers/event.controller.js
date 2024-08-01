// controllers/event.controller.js
import Event from "../models/event.model.js";

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Evento no encontrado." });
  res.json(event);
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
  } = req.body;

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
  });
  const savedEvent = await newEvent.save();

  res.json(savedEvent);
};

export const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body);
  res.json(event);
  if (!event) return res.status(404).json({ message: "Evento no encontrado." });
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Evento no encontrado." });
  res.json(event);
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
    if (activityName) query.activityName = { $regex: activityName, $options: "i" };
    if (city) query.city = city;
    if (state) query.state = state;
    if (country) query.country = country;
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };
    if (gender) query.gender = gender;
    if (age) query.age = age;
    if (priceMin) query.price = { $gte: priceMin };
    if (priceMax) query.price = { ...query.price, $lte: priceMax };
  }

  try {
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar eventos", error });
  }
};
