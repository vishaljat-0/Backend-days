import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";

import { useAuth } from "../feature/auth/hook/auth.hook";
import { useEffect } from "react";
function App() {
  const auth = useAuth();



useEffect(()=>{
auth.handlegetme()
},[])


  return <>
  <RouterProvider router={router}>

  </RouterProvider>
  
  </>
}

export default App;
