import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 📌 Helper to generate tokens
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ------------------ SIGNUP ------------------
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    // ✅ CRITICAL VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (typeof password !== "string") {
      return res.status(400).json({
        message: "Password must be a string",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      role: role || "team",
      password: hashedPassword,
    });

    const cleanUser = user.toObject();
    delete cleanUser.password;

    res.status(201).json({
      message: "Account created",
      user: cleanUser,
      token: generateToken(user),
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
};


// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const cleanUser = user.toObject();
    delete cleanUser.password;

    res.json({
      message: "Login successful",
      user: cleanUser,
      token: generateToken(user),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
