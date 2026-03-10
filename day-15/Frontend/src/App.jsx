import React from "react";
import AppRoutes from "./Routing/AppRoutes";
import "./features/shared/styles/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import {SongProvider} from "../src/features/home/contexts/song.context"
function App() {
  return (
    <AuthProvider>
      <SongProvider>
        <AppRoutes />
      </SongProvider>
    </AuthProvider>
  );
}

export default App;
