import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Announcement as AnnouncementIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { fetchAnnouncements } from "../features/announcements/api";
import type { Announcement } from "../features/announcements/api";
import SharedCard from "../components/SharedCard";

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  useEffect(() => {
    fetchAnnouncements()
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load announcements.");
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Filter announcements based on search and role
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || announcement.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(announcements.map(a => a.role)));

  // Get role statistics
  const roleStats = uniqueRoles.reduce((acc, role) => {
    acc[role] = announcements.filter(a => a.role === role).length;
    return acc;
  }, {} as Record<string, number>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading announcements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Enhanced Header Section */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs md:text-sm font-medium mb-3 md:mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Announcements Center
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Stay Updated with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Latest News
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Get real-time updates, important announcements, and stay connected with your learning community.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AnnouncementIcon className="text-blue-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{announcements.length}</p>
              <p className="text-xs md:text-sm text-gray-600">Total</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUpIcon className="text-green-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
                {announcements.filter(a => new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </p>
              <p className="text-xs md:text-sm text-gray-600">This Week</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <ScheduleIcon className="text-purple-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
                {announcements.filter(a => new Date(a.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
              </p>
              <p className="text-xs md:text-sm text-gray-600">Today</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FilterIcon className="text-orange-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{uniqueRoles.length}</p>
              <p className="text-xs md:text-sm text-gray-600">Categories</p>
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="all">All Categories</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)} ({roleStats[role]})
                    </option>
                  ))}
                </select>
                
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                  <AddIcon />
                  <span className="hidden sm:inline">New Announcement</span>
                  <span className="sm:hidden">Create</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Role Distribution */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {uniqueRoles.map((role) => (
                <div key={role} className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{roleStats[role]}</div>
                  <div className="text-xs md:text-sm text-gray-600 capitalize">{role}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Announcements Grid */}
          <motion.div variants={itemVariants}>
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AnnouncementIcon className="text-gray-400 text-4xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedRole !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "There are no announcements yet. Be the first to create one!"
                  }
                </p>
                {!searchTerm && selectedRole === "all" && (
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                    Create First Announcement
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAnnouncements.map((announcement) => (
                  <motion.div
                    key={announcement._id}
                    variants={itemVariants}
                    className="group"
                  >
                    <SharedCard
                      type="announcement"
                      title={announcement.title}
                      content={announcement.content}
                      author={announcement.author}
                      role={announcement.role}
                      createdAt={announcement.createdAt}
                      onClick={() => {
                        console.log("Announcement clicked:", announcement.title);
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Announcements;
