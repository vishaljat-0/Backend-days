import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { chatTitle, genrateResponce } from "../services/ai.service.js";

export const sendMessageController = async (req, res, next) => {
  try {
    const { message, chatId } = req.body;

    if (!message) {
      const err = new Error("Message content is required");
      err.status = 400;
      return next(err);
    }

    let chat;
    if (!chatId) {
      const chattitle = await chatTitle(message);
      chat = await chatModel.create({
        user: req.user.id,
        title: chattitle.content,
      });
    } else {
      chat = await chatModel.findById(chatId);
      if (!chat) {
        const err = new Error("Chat not found");
        err.status = 404;
        return next(err);
      }
    }

    const userMessage = await messageModel.create({
      chat: chat._id || chatId,
      content: message,
      role: "user",
    });

    const messages = await messageModel.find({ chat: chat._id || chatId });

    const aiResponce = await genrateResponce(messages);
    const aiMessage = await messageModel.create({
      chat: chat._id || chatId,
      content: aiResponce.content,
      role: "ai",
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      userMessage,
      aiMessage
    });
  } catch (error) {
    const err = new Error(error.message || "Error sending message");
    err.status = 500;
    next(err);
  }
};

export async function getChats(req, res, next) {
    try {
        const user = req.user;

        if (!user || !user.id) {
            const err = new Error("User not authenticated");
            err.status = 401;
            return next(err);
        }

        const chats = await chatModel.find({ user: user.id });

        res.status(200).json({
            success: true,
            message: "Chats retrieved successfully",
            chats
        });
    } catch (error) {
        const err = new Error(error.message || "Error retrieving chats");
        err.status = 500;
        next(err);
    }
}

export async function getMessages(req, res, next) {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            const err = new Error("Chat ID is required");
            err.status = 400;
            return next(err);
        }

        const chat = await chatModel.findOne({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            const err = new Error("Chat not found");
            err.status = 404;
            return next(err);
        }

        const messages = await messageModel.find({
            chat: chatId
        });

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages
        });
    } catch (error) {
        const err = new Error(error.message || "Error retrieving messages");
        err.status = 500;
        next(err);
    }
}

export async function deleteChat(req, res, next) {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            const err = new Error("Chat ID is required");
            err.status = 400;
            return next(err);
        }

        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            const err = new Error("Chat not found");
            err.status = 404;
            return next(err);
        }

        await messageModel.deleteMany({
            chat: chatId
        });

        res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });
    } catch (error) {
        const err = new Error(error.message || "Error deleting chat");
        err.status = 500;
        next(err);
    }
}