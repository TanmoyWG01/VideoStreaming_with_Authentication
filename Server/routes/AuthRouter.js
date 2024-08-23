import express from "express";
import {
  loginValidation,
  signupValidation,
} from "../MiddleWare/Authmiddleware.js";
import { login, signup, deleteInfo, logout } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/logout", logout)
router.delete("/:id", deleteInfo);


export default router;
