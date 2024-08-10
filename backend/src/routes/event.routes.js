// routes/event.routes.js
import { Router } from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
  getNearbyEventsController,
} from "../controllers/event.controller.js";
import { authRequired } from "../middleware/validateToken.js";

const router = Router();

// la ruta de búsqueda va al principio
router.get("/search", searchEvents);
router.get('/nearby', getNearbyEventsController);

// rutas que utilizan parámetros dinámicos
router.get("/events", getEvents);
router.get("/events/:id", getEvent);
router.post("/events", authRequired, createEvent);
router.put("/events/:id", authRequired, updateEvent);
router.delete("/events/:id", authRequired, deleteEvent);

export default router;
