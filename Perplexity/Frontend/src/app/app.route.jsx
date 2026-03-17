import { createBrowserRouter } from "react-router-dom";
import Login from "../feature/auth/pages/Login";
import Register from "../feature/auth/pages/register";
import Protected from "../feature/auth/components/Protected";
import Dashboard from "../feature/chat/pages/Dashboard";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]);
