// routes/event.routes.js
import { Router } from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents
} from "../controllers/event.controller.js";
import { authRequired } from "../middleware/validateToken.js";

const router = Router();

router.get("/events", authRequired, getEvents);
// router.get("/events", getEvents);
router.get("/events/:id", authRequired, getEvent);
// router.get("/events/:id", getEvent);
router.post("/events", authRequired, createEvent);
router.put("/events/:id", authRequired, updateEvent);
router.delete("/events/:id", authRequired, deleteEvent);
router.get("/search", searchEvents);

export default router;
