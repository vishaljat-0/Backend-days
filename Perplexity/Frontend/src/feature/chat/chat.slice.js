import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    isStreaming: false,

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

      state.chats[chatId].message.push({
        content,
        role,
        createdAt: new Date().toISOString(),
      });
    },
    addEmptyAiMessage: (state, action) => {
      const { chatId } = action.payload;
      if (!state.chats[chatId]) return;
      state.chats[chatId].message.push({
        content: "",
        role: "ai",
        createdAt: new Date().toISOString(),
      });
    },
    appendStreamChunk: (state, action) => {
      const { chatId, chunk } = action.payload;
      if (!state.chats[chatId]) return;
      const messages = state.chats[chatId].message;
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === "ai") {
        lastMsg.content += chunk;
      }
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
    setIsStreaming: (state, action) => {
      state.isStreaming = action.payload;
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
    resetState: (state) => {
      state.chats = {};
      state.currentChatId = null;
      state.isLoading = false;
      state.error = null;
      state.isStreaming = false;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setIsLoading,
  setError,
  addEmptyAiMessage,
  setIsStreaming,

  createNewChat,
  addNewMessage,
  updateMessages,
  resetState,
  appendStreamChunk,
} = chatSlice.actions;
export default chatSlice.reducer;
