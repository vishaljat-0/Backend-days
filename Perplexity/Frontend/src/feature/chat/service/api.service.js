import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
const deletechat = async (chatId) => {
  const res = await api.delete(`/api/chats/delete/${chatId}`);
};
const logout = async () => {
  const res = await api.get("/api/auth/logout");
  return res.data;
};

export { sendMessgae, getChat, getmessage, deletechat,logout };