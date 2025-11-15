import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // optional, toast use kar sakte ho future messages ke liye

const Home = () => {
  const navigate = useNavigate();

  // Agar user already login hai, Dashboard redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
      toast.success("Welcome back!"); // optional toast
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/30 backdrop-blur-sm">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow">
          Welcome to Notes App
        </h1>

        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Organize your notes easily — create, edit, and manage them anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 sm:py-4 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-1/2 bg-gray-200 text-gray-800 py-3 sm:py-4 rounded-xl hover:bg-gray-300 hover:scale-105 transform transition-all duration-300 shadow focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-gray-400 text-sm">
          Start managing your notes today — safe, fast, and simple!
        </p>
      </div>
    </div>
  );
};

export default Home;
