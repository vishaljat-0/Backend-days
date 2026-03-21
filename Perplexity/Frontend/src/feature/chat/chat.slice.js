import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,

    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title,
          message: [],
          lastUpdated: new Date().toISOString(),
        };
      }
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: "",
          message: [],
        };
      }

      state.chats[chatId].message.push({ content, role, createdAt: new Date().toISOString() });
    },
    setChats: (state, action) => {
  state.chats = action.payload;
},
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateMessages: (state, action) => {
      const { chatId, messages } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: "",
          message: [],
          lastUpdated: null,
        };
      }

      state.chats[chatId].message = messages;
    },
  },
  resetState: (state) => {
       state.chats = {};
       state.currentChatId = null;
       state.isLoading = false;
       state.error = null;
     },
appendStreamChunk: (state, action) => {
  const { chatId, chunk } = action.payload;
  if (!state.chats[chatId]) return;

  const messages = state.chats[chatId].messages;
  const lastMsg = messages[messages.length - 1];

  if (lastMsg?.role === "assistant") {
    lastMsg.content += chunk;           // ✅ stream chunk jodta jaega
  }
},

});


export const {
  setChats,
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  updateMessages,
  resetState,
  appendStreamChunk
} = chatSlice.actions;
export default chatSlice.reducer;
