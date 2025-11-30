const express = require("express");
const Ticket = require("../models/Ticket");
const Message = require("../models/Message");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", protect, async (req, res) => {
  const totalTickets = await Ticket.countDocuments();
  const resolved = await Ticket.countDocuments({ status: "resolved" });
  const unresolved = totalTickets - resolved;

  res.json({
    totalTickets,
    resolved,
    unresolved,
    resolvedPercent: totalTickets
      ? Math.round((resolved / totalTickets) * 100)
      : 0
  });
});

module.exports = router;
