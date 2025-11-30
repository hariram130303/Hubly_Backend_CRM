// backend/models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true, // Example: T-2025-00123
    },

    user: {
      name:  { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },

    // Assigned support agent
    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
