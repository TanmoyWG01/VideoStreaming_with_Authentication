import express from "express";
import {
  accessChat,
  addToGroup,
  //   createChat,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatsController.js";
import { protect } from "../MiddleWare/Authmiddleware.js";

const router = express.Router();

// router.post("/create-chat", protect, createChat);
router.post("/access-chat", protect, accessChat);
router.get("/fetch-chats", protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/group-remove").put(protect, removeFromGroup);

export default router;
