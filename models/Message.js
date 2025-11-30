import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    ticketId: { 
      type: String, 
      required: true 
    },

    senderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      default: null        // null when sender = user (no account)
    },

    from: { 
      type: String, 
      enum: ["user", "agent"], 
      required: true 
    },

    text: { 
      type: String, 
      required: true 
    },

    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent"
    },

    timestamp: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
