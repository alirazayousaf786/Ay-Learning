import express from "express";
import multer from "multer";
import path from "path";
import { AddBlog, getAllBlog, updateBlog, deleteBlog } from "../controllers/AddBlogControl.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/addblog", upload.single("imageBlogURL"), AddBlog);
router.get("/addblog", getAllBlog);
router.put("/addblog/:id", upload.single("imageBlogURL"), updateBlog);
router.delete("/addblog/:id", deleteBlog);

export default router;
