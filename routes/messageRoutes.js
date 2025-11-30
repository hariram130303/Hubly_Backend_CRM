import express from "express";
import Message from "../models/Message.js";
import Ticket from "../models/Ticket.js";

const router = express.Router();

/* ======================================================
   GET ALL MESSAGES FOR A TICKET
====================================================== */
router.get("/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;

    const messages = await Message.find({ ticketId }).sort({ createdAt: 1 });

    return res.json(messages);

  } catch (err) {
    return res.status(500).json({ msg: "Failed to load messages" });
  }
});

/* ======================================================
   SEND MESSAGE (USER OR AGENT)
====================================================== */
router.post("/", async (req, res) => {
  try {
    const { ticketId, from, text, senderId } = req.body;

    if (!ticketId || !from || !text) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const message = await Message.create({
      ticketId,
      from,
      text,
      senderId,
      status: "sent"
    });

    // UPDATE ticket last updated time — important for dashboard sorting
    await Ticket.findOneAndUpdate(
      { ticketId },
      { updatedAt: new Date() }
    );

    return res.status(201).json(message);

  } catch (err) {
    return res.status(500).json({
      msg: "Unable to send message",
      error: err.message
    });
  }
});

export default router;
