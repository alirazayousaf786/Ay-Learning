import mongoose from "mongoose";

const addBlogSchema = new mongoose.Schema({
  imageBlogURL: { type: String, required: true },
  addBlogTitle: { type: String, required: true },
  addBlogParagraph: { type: String, required: true },
});

export default mongoose.model("addBlog", addBlogSchema);
