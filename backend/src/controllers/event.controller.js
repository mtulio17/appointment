// controllers/event.controller.js
import mongoose from "mongoose";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

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

  const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  };

  export const getEvent = async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "Evento no encontrado." });
      }
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
      }
      res.json(event);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener el evento", error });
    }
  };
  

  export const createEvent = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
      return res.status(400).json({ message: "No se encontró el usuario autenticado" });
    }
  
    const {
      activityName,
      description,
      category,
      price,
      address,
      city,
      postalCode,
      country,
      gender,
      age,
      startDate,
      startTime,
    } = req.body;
  
    const imageUrl = req.file ? `/uploads/events/${req.file.filename}` : null;
  
    try {
      // buscar al usuario por su ID de Clerk (clerkId)
      const user = await User.findOne({ clerkId: req.auth.userId });
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // buscar la categoría en la db
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(400).json({ message: "Categoría no encontrada" });
      }
  
      const newEvent = new Event({
        user: user._id, // asigna el ObjectId del usuario como host
        activityName,
        description,
        category: categoryDoc._id, // asigna el ObjectId de la categoría
        price,
        address,
        city,
        postalCode,
        country,
        gender,
        age,
        startDate,
        startTime,
        imageUrl,
      });
  
      const savedEvent = await newEvent.save();
  
      // asocia el evento al usuario
      user.events.push(savedEvent._id);
      await user.save();
  
      res.status(201).json({ message: "Evento creado con éxito", event: savedEvent });
    } catch (error) {
      console.error("Error al crear el evento:", error);
      res.status(500).json({ message: "Error al crear el evento", error });
    }
  };

  export const updateEvent = async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!event) return res.status(404).json({ message: "Evento no encontrado." });
      if (event.user.toString() !== req.user.id){
        return res.status(403).json({message: 'No estás autorizado para actualizar este evento.'})
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el evento", error });
    }
  };


  export const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: "Evento no encontrado." });
  
      if (event.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "No autorizado para eliminar este evento." });
      }
      await event.deleteOne();
      res.json({ message: "Evento eliminado exitosamente." });
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar el evento", error });
    }
  };
  
  export const searchEvents = async (req, res) => {
    const { activityName, category } = req.query;
    const query = {};

    // búsqueda por nombre de actividad
    if (activityName) {
      query.activityName = { $regex: activityName, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" }; // búsqueda insensible a mayúsculas/minúsculas
    }

    try {
      const events = await Event.find(query);
      res.json(events);
    } catch (error) {
      console.error("Error al buscar eventos:", error); 
      res.status(500).json({ message: "Error al buscar eventos", error });
    }
  };

  export const getEventsByCategory = async (req, res) => {
    try {
      const { category } = req.query;
      const events = await Event.find({ category }).populate("category");
      res.json(events);
    } catch (error) {
      console.error('Error al obtener eventos por categoría:', error);
      res.status(500).json({ message: 'Error al obtener eventos por categoría.' });
    }
  };
  

  export const getUserCreatedEvents = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'Usuario no autenticado.' });
      }
  
      const userId = mongoose.Types.ObjectId(req.user.id);  // Convertir a ObjectId
      console.log("ID de usuario autenticado:", userId);
  
      const events = await Event.find({ user: userId });
      console.log("Eventos encontrados para el usuario:", events);
  
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'No has creado eventos todavía.' });
      }
  
      res.json(events);
    } catch (error) {
      console.error('Error al obtener eventos creados por el usuario:', error);
      res.status(500).json({ message: 'Error al obtener eventos creados.' });
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
      console.error("Error al unirse al evento:", error);
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
