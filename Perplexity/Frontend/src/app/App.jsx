import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";

import { useAuth } from "../feature/auth/hook/auth.hook";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  const auth = useAuth();
   const authLoading = useSelector((state) => state.auth.loading);
  const chatLoading = useSelector((state) => state.chat.isLoading);



useEffect(()=>{
auth.handlegetme()
},[])


  return <>
  <RouterProvider router={router}>

  </RouterProvider>
  
  </>
}

export default App;
