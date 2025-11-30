// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone:{ type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "team" }, 
  createdAt: { type: Date, default: Date.now } // admin or team member
});

export default mongoose.model("User", userSchema);
