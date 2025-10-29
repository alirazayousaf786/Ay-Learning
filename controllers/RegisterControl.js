import Register from "../models/Register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerForm = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return res.status(400).json({ msg: "Please fill in all fields" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });

    const existingUser = await Register.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRegister = await Register.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newRegister._id, email: newRegister.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: newRegister._id,
        name: `${newRegister.firstName} ${newRegister.lastName}`,
        email: newRegister.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await Register.find().select("-password"); // password hide
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch users", error: error.message });
  }
};