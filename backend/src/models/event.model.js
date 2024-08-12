// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    activityName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "Argentina" },
    gender: { type: String, default: "No preferencia" },
    age: { type: String },
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endDate: { type: Date },
    endTime: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// crea el índice geoespacial en el campo 'location'
// eventSchema.index({ location: '2dsphere' });

export default mongoose.model("Event", eventSchema);