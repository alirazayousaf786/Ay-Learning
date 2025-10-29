import Register from "../models/Register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 LOGIN FUNCTION
export const loginForm = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🧱 1. Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter both email and password" });
    }

    // 🧱 2. Check if user exists
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 🧱 3. Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // 🧱 4. Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🧱 5. Send response
    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
