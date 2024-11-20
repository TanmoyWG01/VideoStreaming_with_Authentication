import express from "express";
import {
  loginValidation,
  protect,
  signupValidation,
} from "../MiddleWare/Authmiddleware.js";
import {
  login,
  signup,
  deleteInfo,
  logout,
  allUser,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/logout", logout);
router.delete("/:id", deleteInfo);

// Chatting

router.get("/allUser", protect, allUser);

export default router;
