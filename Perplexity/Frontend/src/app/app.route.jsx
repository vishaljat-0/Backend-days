import { createBrowserRouter } from "react-router-dom";
import Login from "../feature/auth/pages/Login";
import Register from "../feature/auth/pages/register";
import Protected from "../feature/auth/components/Protected";
import Dashboard from "../feature/chat/pages/Dashboard";
import { Navigate } from "react-router-dom";
import EmailVerified from "../feature/auth/pages/EmailVerified";

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
    path: "/email-verified",
    element: <EmailVerified />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]);
