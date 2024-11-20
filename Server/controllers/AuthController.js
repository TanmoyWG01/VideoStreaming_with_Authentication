import User from "../models/User.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//SignUp Controller

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User is already exists", success: false });
    }
    const userModel = new User({ name, email, password });

    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();

    res.status(200).json({
      message: "SignedUp Successfull",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internel Server Error",
      success: false,
    });
  }
};

//Login Controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed!", success: false });
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return res.status(401).json({
        message: "Authentication failed, wrong password or email!",
        success: false,
      });
    }

    const jwtToken = Jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "2hr" }
    );

    user.tokens.push({ token: jwtToken });
    await user.save();

    // Set token as a Bearer token in the response header
    res.setHeader("Authorization", "Bearer " + jwtToken);

    res.cookie("Jwtoken", jwtToken, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "Login Successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//Delete information

export const deleteInfo = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("SignUp info. has been deleted.");
  } catch (err) {}
};

//logout

export const logout = async (req, res) => {
  try {
    const token = req.cookies.Jwtoken;

    if (token) {
      await User.updateOne(
        { "tokens.token": token },
        { $pull: { tokens: { token: token } } }
      );
    }
    res.clearCookie("Jwtoken", { path: "/" });
    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// All-User (create query)
export const allUser = async (req, res) => {
  try {
    // Check if a search query exists
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: `^${req.query.search}`, $options: "i" } }, // Match names starting with the search query
            { email: { $regex: req.query.search, $options: "i" } }, // Match any part of email
          ],
        }
      : {};

    // Fetch users from the database excluding the current user and sensitive fields
    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password -tokens");

    // Send the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
