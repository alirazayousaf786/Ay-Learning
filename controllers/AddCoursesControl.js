import AddCoursesModel from "../models/AddCourses.js";

// Add Course
export const AddCourses = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !paragraph || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = await AddCoursesModel.create({
      title,
      paragraph,
      imageURL: image,
    });

    res.status(201).json(newCourse);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await AddCoursesModel.find();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Course
export const updateCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, paragraph } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedCourse = await AddCoursesModel.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(paragraph && { paragraph }),
        ...(image && { imageURL: image }),
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Course
export const deleteCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await AddCoursesModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
