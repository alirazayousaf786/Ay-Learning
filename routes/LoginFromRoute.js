import express from "express";
import {  loginForm } from "../controllers/LoginForm.js";

const router = express.Router();


// Login route
router.post("/login", loginForm);



export default router;
