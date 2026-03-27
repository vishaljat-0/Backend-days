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
        title: chattitle.content.replace(/\*\*/g, "").replace(/"/g, "").trim()
      });
      console.log();
      
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
      content: aiResponce,
      role: "ai",
    });
console.log("AI Response:", aiResponce);
    res.status(201).json({

      success: true,
      message: "Message sent successfully",
      chat,
      userMessage,
      aiMessage
    });
  } catch (error) {
    if(error.message.includes("Quota exceeded")){
      const err = new Error("Quota exceeded");
      err.status = 400;
      next(err);
    }
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


export const streamMessageController = async (req, res, next) => {
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
        title: chattitle.content.replace(/\*\*/g, "").replace(/"/g, "").trim(),
      });
    } else {
      chat = await chatModel.findById(chatId);
      if (!chat) {
        const err = new Error("Chat not found");
        err.status = 404;
        return next(err);
      }
    }

    await messageModel.create({
      chat: chat._id,
      content: message,
      role: "user",
    });

    const messages = await messageModel.find({ chat: chat._id });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Transfer-Encoding", "chunked");
    res.flushHeaders();

    req.on("close", () => {
      console.log("client disconnected early");
    });

    res.write(`data: ${JSON.stringify({ chat })}\n\n`);

    const fullResponse = await genrateResponce(
      messages,
      (text) => {
        if (!res.writableEnded) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }
    );

    if (!res.writableEnded) {
      if (fullResponse) {  // 👈 only save if not empty
        await messageModel.create({
          chat: chat._id,
          content: fullResponse,
          role: "ai",
        });
      }
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (error) {
    console.log("controller error", error);
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};