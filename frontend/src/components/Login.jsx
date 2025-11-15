import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Agar user already login hai, Dashboard redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-200 px-4">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue to your dashboard
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 placeholder-gray-400 shadow-sm hover:shadow-md transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 placeholder-gray-400 shadow-sm hover:shadow-md transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-lg shadow-lg"
          >
            Login
          </button>

          {/* Signup redirect */}
          <p className="text-sm text-gray-600 text-center mt-3">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>

        {/* Extra mobile-friendly info */}
        <div className="mt-6 text-center text-gray-400 text-xs sm:text-sm">
          By logging in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}

export default Login;
