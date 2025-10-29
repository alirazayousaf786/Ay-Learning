import dotenv from "dotenv";
dotenv.config();

export const AdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Wrong username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
