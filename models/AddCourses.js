import mongoose from "mongoose";

const addcoursesSchema = new mongoose.Schema({
  imageURL: { type: String, required: true },
  title: { type: String, required: true },
  paragraph: { type: String, required: true },
});

export default mongoose.model("AddCourses", addcoursesSchema);
