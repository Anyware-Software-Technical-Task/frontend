import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dashboard as DashboardIcon,
  Announcement as AnnouncementIcon,
  Quiz as QuizIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../features/auth/authSlice";
import { fetchAnnouncements } from "../features/announcements/api";
import { fetchQuizzes } from "../features/quizzes/api";
import type { Announcement } from "../features/announcements/api";
import type { Quiz } from "../features/quizzes/api";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);


  useEffect(() => {
    const loadData = async () => {
      try {
        const [announcementsData, quizzesData] = await Promise.all([
          fetchAnnouncements(),
          fetchQuizzes()
        ]);
        setAnnouncements(announcementsData);
        setQuizzes(quizzesData);
      } catch (error) {
        console.error('Failed to load sidebar data:', error);
      }
    };

    loadData();
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: DashboardIcon,
      description: "Overview & analytics",
      badge: null,
    },
    {
      title: "Announcements",
      path: "/dashboard/announcements",
      icon: AnnouncementIcon,
      description: "Manage updates",
      badge: announcements.length > 0 ? announcements.length.toString() : null,
    },
    {
      title: "Quizzes",
      path: "/dashboard/quizzes",
      icon: QuizIcon,
      description: "Create & manage",
      badge: quizzes.length > 0 ? quizzes.length.toString() : null,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home", { replace: true });
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:z-auto lg:shadow-lg lg:h-screen`}
        initial={{ x: -100 }}
        animate={{ x: isOpen ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ 
          width: '288px',
          minWidth: '288px',
          maxWidth: '288px',
          height: '100vh',
          minHeight: '100vh'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-lg opacity-75"></div>
              <div className="relative p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <img
                  src="/Logo.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain filter brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Anyware Exams</h1>
              <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 cursor-pointer rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Area - Takes remaining space */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Main Navigation
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                      `group flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                    onClick={onClose}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      menuItems.find(m => m.path === window.location.pathname)?.path === item.path
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}>
                      <item.icon className={`text-xl ${
                        menuItems.find(m => m.path === window.location.pathname)?.path === item.path
                          ? "text-white"
                          : "text-gray-600"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 ${
                        menuItems.find(m => m.path === window.location.pathname)?.path === item.path
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {/* User Profile Section - Moved here */}
          <div className="mb-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <PersonIcon className="text-white text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">Administrator</p>
                <p className="text-gray-600 text-xs truncate">admin@admin.com</p>
              </div>
              {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 p-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="p-1 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <LogoutIcon fontSize="small" />
              </div>
            </button>
          )}
            </div>
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
