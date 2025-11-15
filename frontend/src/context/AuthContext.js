// import { createContext, useState, useEffect } from "react";

// // 1️⃣ Context create karo
// export const AuthContext = createContext();

// // 2️⃣ Provider component
// export const AuthProvider = ({ children }) => {
//   // Initial token from localStorage
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   // Login function: token save + state update
//   const login = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//   };

//   // Logout function: token remove + state update
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   // Boolean flag: user logged in or not
//   const isLoggedIn = !!token;

//   return (
//     <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
