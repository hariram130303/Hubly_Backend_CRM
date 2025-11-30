import express from "express";
import Ticket from "../models/Ticket.js";
import Message from "../models/Message.js";

const router = express.Router();

// create ticket
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, firstMessage } = req.body;

    const ticketId = "T-" + Date.now();

    const ticket = await Ticket.create({
      ticketId,
      user: { name, email, phone },
    });

    if (firstMessage) {
      await Message.create({
        ticketId,
        from: "user",
        text: firstMessage,
      });
    }

    res.status(201).json(ticket);
  } catch (e) {
    res.status(500).json({ msg: "Unable to create ticket" });
  }
});

// get all tickets
router.get("/", async (req, res) => {
  const tickets = await Ticket.find().sort({ updatedAt: -1 });
  res.json(tickets);
});

// ⭐ get single ticket by ticketId
router.get("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });

    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// update ticket
router.put("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const ticket = await Ticket.findOneAndUpdate({ ticketId }, req.body, {
    new: true,
  });
  if (!ticket) return res.status(404).json({ msg: "Ticket not found" });
  res.json(ticket);
});

export default router;
