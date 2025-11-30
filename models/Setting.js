// backend/models/Setting.js
import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    headerColor: { type: String, default: "#1f2933" },

    backgroundColor: { type: String, default: "#f3f4f6" },

    initialMessage: { 
      type: String, 
      default: "Hey! 👋 How can we help today?" 
    },

    introFormLabels: {
      name:  { type: String, default: "Your name" },
      email: { type: String, default: "Your email" },
      phone: { type: String, default: "Your phone" }
    },

    popupText: {
      type: String,
      default:
        "Want to chat about Hubly? I’m a chatbot here to help you find your way."
    },

    missedChatTimerMinutes: { 
      type: Number, 
      default: 5 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
