import express from "express";
import Setting from "../models/Setting.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   PUBLIC: FETCH SETTINGS (Shown on landing page + widget)
====================================================== */
router.get("/public", async (req, res) => {
  try {
    const cfg = await Setting.findOne();
    res.json(cfg);
  } catch (error) {
    res.status(500).json({ message: "Failed to load settings" });
  }
});

/* ======================================================
   ADMIN: GET SETTINGS
====================================================== */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const cfg = await Setting.findOne();
    res.json(cfg);
  } catch (error) {
    res.status(500).json({ message: "Failed to load settings" });
  }
});

/* ======================================================
   ADMIN: UPDATE SETTINGS
====================================================== */
router.put("/", protect, adminOnly, async (req, res) => {
  try {
    const data = req.body;

    let cfg = await Setting.findOne();
    if (!cfg) cfg = new Setting();

    Object.assign(cfg, data);
    await cfg.save();

    res.json(cfg);
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings" });
  }
});

export default router;
