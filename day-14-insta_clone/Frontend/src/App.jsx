import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "./style.scss";
import { Authprovider } from "./Feature/Auth/Auth.context";
import { FeedProvider } from "./Feature/Post/Feed.context";

function App() {
  return (
    <Authprovider>
      <FeedProvider>
        <AppRoutes />
      </FeedProvider>
    </Authprovider>
  );
}

export default App;
