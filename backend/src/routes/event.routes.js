// routes/event.routes.js
import { Router } from "express";
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent, searchEvents, participateInEvent } from "../controllers/event.controller.js";
import { authRequired } from "../middleware/validateToken.js";

const router = Router();

// rutas que utilizan parámetros dinámicos
router.get("/events/:id", getEvent); // primero van las rutas que usan ':id'
router.get("/events", getEvents); // luego las rutas que no usan ':id'

// ruta de 'eventos cercanos' debería venir después para evitar conflictos
// router.get('/events/nearby', getNearbyEventsController);
router.post("/events", authRequired, createEvent);
router.put("/events/:id", authRequired, updateEvent);
router.delete("/events/:id", authRequired, deleteEvent);
router.post('/:id/participate', authRequired, participateInEvent);

// ruta de búsqueda también debe estar después de las rutas de 'events'
router.get("/search", searchEvents);

export default router;
