// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },   // changed to String
  password:  { type: String, required: true },

  // Roles: admin (full access), team (support agent)
  role: { 
    type: String, 
    enum: ["admin", "team"],
    default: "team"
  },

  createdAt: { type: Date, default: Date.now }
});

// Hide password when sending JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
