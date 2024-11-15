// import {} from "express-async-handler"
import User from "../models/User.js";
import Chat from "../models/chat-model.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId parameter not sent with request.");
    return res.status(400).json({ message: "UserId parameter is required." });
  }

  try {
    // Check for existing one-on-one chat between the two users
    let isChat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // If chat exists, return it with populated fields
    if (isChat) {
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
      });
      console.log("Existing chat found:", isChat);
      return res.status(200).json(isChat);
    }

    // If no chat exists, create a new chat
    console.log("Creating a new chat between users:", req.user._id, "and", userId);

    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    console.log("New chat created successfully:", fullChat);
    return res.status(200).json(fullChat);
  } catch (error) {
    console.error("Error accessing or creating chat:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const fetchChats = async (req, res) => {
  try {
    const chatResults = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } }
    })
      .populate("users", "-password") 
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({updatedAt: -1})
      .then(async(results) => {
        results = await User.populate(results,{
          path: "latestMessage.sender",
          select: "name pic email"
        })
        res.status(200).send(results)
      })

    if (!chatResults) {
      return res.status(404).json({ message: "No chats found." });
    }

    return res.status(200).json(chatResults);
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill all the fields." });
  }

  let users;
  try {
    users = JSON.parse(req.body.users);
  } catch (error) {
    console.error("[CREATE_GROUP_CHAT]", error);
    return res.status(400).json({ message: "Invalid JSON format for users." });
  }

  if (users.length < 2) {
    return res.status(400).json({ message: "More than 2 users are required to form a group chat." });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password -tokens") // Exclude tokens and password fields
      .populate("groupAdmin", "-password -tokens"); // Exclude tokens and password for the group admin as well

    res.status(200).json(fullGroupChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while creating the group chat." });
  }
};
