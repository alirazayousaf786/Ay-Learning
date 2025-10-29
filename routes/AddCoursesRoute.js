import express from "express";
import multer from "multer";
import path from "path";
import {
  AddCourses, getAllCourses, updateCourses, deleteCourses} from "../controllers/AddCoursesControl.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

//  Routes
router.post("/addcourses", upload.single("image"), AddCourses);
router.get("/addcourses", getAllCourses);
router.put("/addcourses/:id", upload.single("image"), updateCourses);
router.delete("/addcourses/:id", deleteCourses);

export default router;
