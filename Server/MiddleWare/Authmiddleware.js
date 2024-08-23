import Joi from "joi";
import jwt from "jsonwebtoken"
import User from "../models/User.js";

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
    req.user=user;
    next();
    
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token", success: false });
  }
};
