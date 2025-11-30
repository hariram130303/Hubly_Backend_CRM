// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

const app = express();

// ----------------------
//  MIDDLEWARE
// ----------------------
app.use(cors({
  origin: "*",        // or frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json({ limit: "2mb" })); // prevents large-body crash
app.use(express.urlencoded({ extended: true }));

// ----------------------
//  ROUTES
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.send("✨ Hubly CRM backend is running...");
});

// ----------------------
//  SERVER
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
