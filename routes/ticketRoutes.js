import express from "express";
import Ticket from "../models/Ticket.js";
import Message from "../models/Message.js";

const router = express.Router();

/* ======================================================
   CREATE NEW TICKET (User from widget)
====================================================== */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, firstMessage } = req.body;

    if (!name || !email) {
      return res.status(400).json({ msg: "Name & Email required" });
    }

    const ticketId = "T-" + Date.now();

    const ticket = await Ticket.create({
      ticketId,
      user: { name, email, phone }
    });

    // Store first user message
    if (firstMessage) {
      await Message.create({
        ticketId,
        from: "user",
        text: firstMessage,
        status: "delivered"
      });
    }

    res.status(201).json(ticket);

  } catch (err) {
    res.status(500).json({ msg: "Unable to create ticket", error: err });
  }
});

/* ======================================================
   GET ALL TICKETS (Admin Dashboard)
====================================================== */
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ updatedAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: "Error loading tickets" });
  }
});

/* ======================================================
   GET SINGLE TICKET BY ticketId
====================================================== */
router.get("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });

    if (!ticket)
      return res.status(404).json({ msg: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
});

/* ======================================================
   UPDATE TICKET (assign, change status, etc.)
====================================================== */
router.put("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      req.body,
      { new: true }
    );

    if (!ticket)
      return res.status(404).json({ msg: "Ticket not found" });

    res.json(ticket);

  } catch (err) {
    res.status(500).json({ msg: "Failed to update ticket" });
  }
});

export default router;
