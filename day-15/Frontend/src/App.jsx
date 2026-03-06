import React from "react";
import AppRoutes from "./Routing/AppRoutes";
import './features/shared/styles/global.scss'
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  return (
   
      <AuthProvider>
        
        <AppRoutes />
      </AuthProvider>
    
  );
}

export default App;