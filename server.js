import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import Register from "./routes/authRoutes.js";
import AddCourses from "./routes/AddCoursesRoute.js";
import AddBlog from "./routes/AddBlogRoute.js"; 
import Contact from "./routes/ContactRoute.js"
import  AdminLogin  from "./routes/AdminLoginRoute.js";
import LoginForm from "./routes/LoginFromRoute.js";
dotenv.config();
connectDB();

const app = express();

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", Register);
app.use("/api", AddCourses);
app.use("/api", AddBlog); 
app.use("/api",Contact);
app.use("/api",AdminLogin)
app.use("/api",LoginForm)

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
