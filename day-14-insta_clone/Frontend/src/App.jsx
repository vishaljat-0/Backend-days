import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "./style.scss";
import { Authprovider } from "./Feature/Auth/Auth.context";

function App() {
  return(
  <Authprovider>
    <AppRoutes />
  </Authprovider>
)};

export default App;
