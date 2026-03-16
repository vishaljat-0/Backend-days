import { createBrowserRouter } from "react-router-dom";
import Login from "../feature/auth/pages/Login";
import Register from "../feature/auth/pages/register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },{
    path: "/",
    element: <h1>Home</h1>,
  }
]);
