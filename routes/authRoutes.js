import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// USER SIGNUP
router.post("/signup", signup);

// USER LOGIN
router.post("/login", login);

export default router;
