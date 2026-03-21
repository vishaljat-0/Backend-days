import {
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  setChats,
  updateMessages,
} from "../chat.slice";
import { sendMessgae, getChat ,getmessage } from "../service/api.service";
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
      // const data = await sendMessgae({ message, chatId });

console.log("API response:",  await data);

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
    })
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

    const data = await getChat();   // API

    const chatsArray = data.chats;

    const chatsObject = chatsArray.reduce((acc, chat) => {
      acc[chat._id] = {
        id: chat._id,
        title: chat.title,
        message: [],
        lastUpdated: chat.lastUpdated
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
        createdAt: msg.createdAt
      }));

      dispatch(updateMessages({
        chatId,
        messages: formattedMessages
      }));
    }

    dispatch(setCurrentChatId(chatId));

  } catch (error) {
    dispatch(setError(error.message));
  }
};
 const handleNewChat = () => {
  dispatch(setCurrentChatId(null));  // bas itna hi!
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

  const socket = initializesocket();

  return {
    handleSendmessage,
    socket,
    getchats,
    handleOpenChat,
    handleNewChat,
    handleLogout
  };
};
