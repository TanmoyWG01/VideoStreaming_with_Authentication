import express from "express";
import { accessChat, createGroupChat, fetchChats } from "../controllers/chatsController.js";
import { protect } from "../MiddleWare/Authmiddleware.js";

const router = express.Router();

router.post("/access-chat",protect, accessChat)
router.get("/fetch-chats",protect, fetchChats)
router.route("/group").post(protect,createGroupChat)
// router.route("/rename").put(protect,renameGroup)
// router.route("/groupremove").put(protect,removeFromGroup)
// router.route("/groupadd").put(protect,addToGroup)


export default router;