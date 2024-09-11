import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  clerkId: {
    type: String,  // almacena el ID del usuario en Clerk
    required: true,
    unique: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
