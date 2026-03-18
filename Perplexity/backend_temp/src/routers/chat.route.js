import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { deleteChat, getChats, getMessages, sendMessageController } from "../controllers/chat.controller.js";
const chatRouter = Router();



chatRouter.post("/message",authmiddleware,sendMessageController);
chatRouter.get("/", authmiddleware, getChats)

chatRouter.get("/:chatId/messages", authmiddleware, getMessages)

chatRouter.delete("/delete/:chatId", authmiddleware, deleteChat)



export default chatRouter