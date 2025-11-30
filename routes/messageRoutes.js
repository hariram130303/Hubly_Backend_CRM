// backend/routes/messageRoutes.js
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Get messages for a ticket
router.get("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const messages = await Message.find({ ticketId }).sort({ createdAt: 1 });
  res.json(messages);
});

// Send a message (user or agent)
router.post("/", async (req, res) => {
  try {
    const { ticketId, from, text } = req.body;

    const message = await Message.create({
      ticketId,
      from,
      text
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ msg: "Unable to send message", error: err });
  }
});

export default router;
