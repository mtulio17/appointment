// routes/event.routes.js
import { Router } from "express";
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent, searchEvents, participateInEvent, cancelParticipation, getUserCreatedEvents, getEventsByCategory } from "../controllers/event.controller.js";
import { authRequired } from "../middleware/validateToken.js";
import upload from "../middleware/uploadEvent.js";

const router = Router();

// rutas para eventos
router.get("/events/:id", getEvent);
router.get("/events", getEvents);
router.post("/events", authRequired, upload.single('image'), createEvent);
router.put("/events/:id", authRequired, updateEvent);
router.delete("/events/:id", authRequired, deleteEvent);
router.post('/events/:id/participate', authRequired, participateInEvent);
router.post('/events/:id/cancel', authRequired, cancelParticipation);
router.get('/events/created', authRequired, getUserCreatedEvents);
router.get('/events/category', authRequired, getEventsByCategory);
router.get("/events/search", searchEvents);


export default router;
