import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = (location.state as any)?.from?.pathname || "/dashboard";
  
  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Brand & Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:w-1/2 p-12 flex flex-col justify-center items-center text-center lg:text-left lg:items-start bg-gradient-to-br from-slate-50 to-gray-50"
            >
              {/* Logo */}
              <div className="mb-8 flex flex-row gap-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
                  <img
                    src="/Logo.png"
                    alt="Logo"
                    className="h-12 w-12 object-contain filter brightness-0 invert"
                  />
                </div>
               <div className="flex flex-col">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Anyware Exams
                </h1>
                <p className="text-gray-600 text-lg">
                  Professional Learning Platform
                </p>
               </div>
              </div>

              {/* Welcome Message */}
              <div className="mb-12 max-w-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Welcome back to your learning journey
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Access your personalized dashboard, track progress, and continue where you left off.
                </p>
              </div>

              {/* Illustration */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src="/d4c7253d-1892-4a3d-a788-379771622a88.png"
                  alt="Login Illustration"
                  className="w-full max-w-sm opacity-80"
                  loading="lazy"
                />
              </div>

              {/* Bottom Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 w-full">
                <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Reliable</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 p-12 flex flex-col justify-center"
            >
              <div className="max-w-sm mx-auto w-full">
                {/* Form Header */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Sign in to your account
                  </h3>
                  <p className="text-gray-600">
                    Enter your credentials to access your account
                  </p>
                </div>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Invalid email or password</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-br from-blue-500 to-indigo-600  text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <CircularProgress size={20} color="inherit" className="mr-2" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      Contact administrator
                    </button>
                  </p>
                </div>

                {/* Help Links */}
                <div className="mt-6 text-center">
                  <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    Forgot your password?
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
