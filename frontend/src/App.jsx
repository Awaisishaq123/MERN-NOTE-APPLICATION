import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouter/route.jsx";
// import { AuthProvider } from "./context/AuthContext.js";

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
