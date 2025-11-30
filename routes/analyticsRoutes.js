import express from "express";
import Ticket from "../models/Ticket.js";
import Message from "../models/Message.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/analytics/summary
router.get("/summary", protect, async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const resolved = await Ticket.countDocuments({ status: "resolved" });
    const unresolved = totalTickets - resolved;

    res.json({
      totalTickets,
      resolved,
      unresolved,
      resolvedPercent: totalTickets
        ? Math.round((resolved / totalTickets) * 100)
        : 0,
    });

  } catch (err) {
    res.status(500).json({ message: "Analytics failed", error: err.message });
  }
});

export default router;
