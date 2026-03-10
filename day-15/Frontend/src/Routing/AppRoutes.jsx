import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "../features/auth/pages/register";
import FaceExpression from "../features/expression/components/FaceExpression";
import Login from "../features/auth/pages/Login";
import Protected from "../features/auth/components/Protected";
import Home from "../features/home/pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Protected><Home/> </Protected>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
