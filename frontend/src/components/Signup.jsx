import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Agar user already login hai, Dashboard redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password });
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-100 via-green-200 to-green-300 px-4">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Start your journey with us. Enjoy premium features!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition placeholder-gray-400 shadow-sm hover:shadow-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition placeholder-gray-400 shadow-sm hover:shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition placeholder-gray-400 shadow-sm hover:shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-lg shadow-lg"
          >
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600 text-center mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>

        {/* Extra Info for mobile responsiveness */}
        <div className="mt-6 text-center text-gray-400 text-xs sm:text-sm">
          By signing up, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}

export default Signup;
