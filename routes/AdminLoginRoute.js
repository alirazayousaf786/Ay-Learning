import express from "express";
import { AdminLogin } from "../controllers/AdminLoginControl.js";

const router = express.Router();

// Admin Login Route
router.post("/adminlogin", AdminLogin);

export default router;
