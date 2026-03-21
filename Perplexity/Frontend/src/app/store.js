import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../feature/auth/auth.slice.js"
import chatSlice from "../feature/chat/chat.slice.js"

 export const store = configureStore({
    reducer:{
        auth:authreducer,
        chat:chatSlice
    }

})