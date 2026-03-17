import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../feature/auth/auth.slice.js"

 export const store = configureStore({
    reducer:{
        auth:authreducer
    }

})