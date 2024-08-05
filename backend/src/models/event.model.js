// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    activityName: { type: String, required: true },
    description: { type: String, required: true },
    // file: { type: String }, // URL o nombre del archivo
    price: { type: Number, required: true },
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
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);