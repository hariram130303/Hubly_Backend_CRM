import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    from: { type: String, enum: ["user", "agent"], required: true },
    text: String,
    status: {
      type: String,
      enum: ["sent", "delivered"],   // you can add "read" later
      default: "delivered",          // since it's already in DB
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
