import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import asyncHandler from "express-async-handler";

//SignUp Validation

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(500).json({ message: "Not Validate the request", error });
  }
  next();
};

//login Validation

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(500).json({ message: "Not Validate the request", error });
  }
  next();
};

//TokenAuthentication

export const authenticateToken = async (req, res, next) => {
  const match = req.cookies.Jwtoken;
  if (!match) {
    return res.status(401).json({
      message: "Access Denied: No Token Provided",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(match, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid Token: User Not Found",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token", success: false });
  }
};

//all-user-chat
// Updated protect middleware
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("Authorization header missing or malformed");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find the user by ID and token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    }).select("-password"); // excluding password for security

    if (!user) {
      console.log("User not found or token not in database");
      return res.status(401).json({ message: "Not authorized, token not found" });
    }
    // Set the user in the request object to access in accessChat
    req.user = user;
    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.log("Token verification error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};


