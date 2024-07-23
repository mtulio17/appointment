// controllers/event.controller.js
import Event from "../models/event.model.js";

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if(!event) return res.status(404).json({ message: "Evento no encontrado." });
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
  if(!event) return res.status(404).json({ message: "Evento no encontrado." });
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if(!event) return res.status(404).json({ message: "Evento no encontrado." });
  res.json(event);
};
