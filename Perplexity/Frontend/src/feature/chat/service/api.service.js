import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

const sendMessgae = async ({ message, chatId }) => {
  const res = await api.post("/api/chats/message", { message, chatId });
  return res.data;
};

const getChat = async () => {
  const res = await api.get("/api/chats");
  return res.data;
};
const getmessage = async (chatId) => {
  const res = await api.get(`/api/chats/${chatId}/messages`);
  return res.data;
};
const deletechatapi = async (chatId) => {
  const res = await api.delete(`/api/chats/delete/${chatId}`);
};
const logout = async () => {
  const res = await api.get("/api/auth/logout");
  return res.data;
};
const streamMessage = ({ message, chatId }) => {
  return fetch("/api/chats/ask-stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message, chatId }),
  });
};  

export { sendMessgae, getChat, getmessage, deletechatapi, logout, streamMessage,  };

