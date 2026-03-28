import {
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  setChats,
  updateMessages,
  setIsStreaming,
  addEmptyAiMessage,
  appendStreamChunk,
  deleteChat
} from "../chat.slice";
import {
  sendMessgae,
  getChat,
  getmessage,
  streamMessage,
  deletechatapi
} from "../service/api.service";
import { initializesocket } from "../service/chat.socket";
import { useDispatch } from "react-redux";
import { logout } from "../service/api.service";
import { useNavigate } from "react-router-dom";

export const useChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendmessage = async ({ message, chatId }) => {
    try {
      dispatch(setIsLoading(true));

      const data = await sendMessgae({ message, chatId });
      console.log("1. calling streamMessage with", { message, chatId });

      const res = await streamMessage({ message, chatId });

      console.log("2. res is", res);
      console.log("3. res.ok is", res?.ok);
      console.log("4. res.body is", res?.body);
      // const data = await sendMessgae({ message, chatId });

      console.log("API response:", await data);

      const { aiMessage, chat } = data;

      dispatch(createNewChat({ chatId: chat._id, title: chat.title }));
      // user message
      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: message,
          role: "user",
        }),
      );

      // ai message
      if (aiMessage) {
        dispatch(
          addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role || "ai",
          }),
        );
      }

      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const getchats = async () => {
    try {
      dispatch(setIsLoading(true));

      const data = await getChat(); // API

      const chatsArray = data.chats;

      const chatsObject = chatsArray.reduce((acc, chat) => {
        acc[chat._id] = {
          id: chat._id,
          title: chat.title,
          message: [],
          lastUpdated: chat.lastUpdated,
        };
        return acc;
      }, {});

      dispatch(setChats(chatsObject));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const handleOpenChat = async (chatId, chats) => {
    try {
      // agar messages already load hain to API call nahi
      if (chats[chatId]?.message?.length === 0) {
        const data = await getmessage(chatId);

        const { messages } = data;

        const formattedMessages = messages.map((msg) => ({
          content: msg.content,
          role: msg.role,
          createdAt: msg.createdAt,
        }));

        dispatch(
          updateMessages({
            chatId,
            messages: formattedMessages,
          }),
        );
      }

      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  const handleNewChat = () => {
    dispatch(setCurrentChatId(null)); // bas itna hi!
  };
  const handleLogout = async () => {
    try {
      await logout();
      dispatch({ type: "RESET" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
const handleStreamMessage = async ({ message, chatId }) => {
  try {
    dispatch(setIsLoading(true));

    const res = await streamMessage({ message, chatId });
    if (!res.ok) throw new Error("Stream request failed");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let currentChatId = chatId;
    let aiMessageAdded = false; // ← tracks if AI bubble has been created

    dispatch(setIsLoading(false));
    dispatch(setIsStreaming(true));

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        const data = line.slice(6).trim();
        if (data === "[DONE]") {
          dispatch(setIsStreaming(false));
          return;
        }

        try {
          const parsed = JSON.parse(data);

          if (parsed.chat) {
            currentChatId = parsed.chat._id;
            dispatch(createNewChat({ chatId: parsed.chat._id, title: parsed.chat.title }));
            dispatch(addNewMessage({ chatId: parsed.chat._id, content: message, role: "user" }));
            dispatch(setCurrentChatId(parsed.chat._id));
            // ❌ no addEmptyAiMessage here anymore
          }

          if (parsed.text) {
            // ✅ create AI bubble only on first chunk
            if (!aiMessageAdded) {
              dispatch(addEmptyAiMessage({ chatId: currentChatId }));
              aiMessageAdded = true;
            }
            dispatch(appendStreamChunk({ chatId: currentChatId, chunk: parsed.text }));
          }

        } catch (_) {}
      }
    }

  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIsLoading(false));
    dispatch(setIsStreaming(false));
  }
};
const handleDeleteChat = async (chatId) => {
  try {
    await deletechatapi(chatId);      
    dispatch(deleteChat(chatId));  
  } catch (error) {
    dispatch(setError(error.message));
  }
};
  const socket = initializesocket();

  return {
    handleSendmessage,
    socket,
    getchats,
    handleOpenChat,
    handleNewChat,
    handleLogout,
    handleStreamMessage,
    handleDeleteChat
  };
};
