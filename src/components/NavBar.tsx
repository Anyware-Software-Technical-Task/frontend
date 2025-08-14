import { Link } from "react-router-dom";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);


  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 shadow-lg border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 text-white font-bold text-xl hover:scale-105 transition-transform duration-200"
          >
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <span>Anyware Exams</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/login"
              className="px-6 py-2 font-medium rounded-lg text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            onClick={() => setDrawerOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-full bg-gray-900 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-white font-bold text-lg">Menu</h2>
                  <button
                    className="text-white hover:text-gray-300 p-2"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-row gap-3">
                  <Link
                    to="/login"
                    className="flex-1 py-3 px-4 font-medium text-center rounded-lg text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Login
                  </Link>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
