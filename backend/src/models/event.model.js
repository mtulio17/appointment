// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    activityName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "Argentina" },
    gender: { type: String, default: "No preferencia" },
    age: { type: String },
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    imageUrl: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    maxParticipants: { type: Number, default: -1 }, // -1 indica que es sin limite
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);