import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: Number,
  password: String,
  role: { type: String, default: "team" }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
