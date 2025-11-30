// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.send("Hubly CRM backend up");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
