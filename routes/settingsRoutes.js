const express = require("express");
const Setting = require("../models/Setting");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Get current chat bot settings (public for landing page)
router.get("/public", async (req, res) => {
  const cfg = await Setting.findOne();
  res.json(cfg);
});

// Admin: get/update
router.get("/", protect, adminOnly, async (req, res) => {
  const cfg = await Setting.findOne();
  res.json(cfg);
});

router.put("/", protect, adminOnly, async (req, res) => {
  const data = req.body;

  let cfg = await Setting.findOne();
  if (!cfg) {
    cfg = new Setting();
  }

  Object.assign(cfg, data);
  await cfg.save();
  res.json(cfg);
});

module.exports = router;
