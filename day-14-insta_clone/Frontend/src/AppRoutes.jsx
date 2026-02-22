import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Feature/Auth/Pages/Login";
import Registration from "./Feature/Auth/Pages/Registration";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<h1>Home</h1>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/Register" element={<Registration/>} />

      </Routes>
    </BrowserRouter>
  )
}

 export default AppRoutes