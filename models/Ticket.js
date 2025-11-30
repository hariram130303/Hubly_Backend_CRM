// backend/models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketId: 
    { type: String, 
      unique: true, 
      required: true },
    user: {
      name: String,
      email: String,
      phone: String,
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // teammate
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
