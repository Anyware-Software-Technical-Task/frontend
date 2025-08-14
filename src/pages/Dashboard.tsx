import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Announcement as AnnouncementIcon,
  Quiz as QuizIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { fetchAnnouncements } from "../features/announcements/api";
import { fetchQuizzes } from "../features/quizzes/api";
import type { Announcement } from "../features/announcements/api";
import type { Quiz } from "../features/quizzes/api";
import { BarChart, PieChart } from "@mui/x-charts";

const Dashboard: React.FC = () => {

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchAnnouncements(), fetchQuizzes()])
      .then(([announcementsData, quizzesData]) => {
        setAnnouncements(announcementsData);
        setQuizzes(quizzesData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  const recentAnnouncements = announcements.slice(-3).reverse();
  const recentQuizzes = quizzes.slice(-3).reverse();

  const stats = [
    {
      title: "Total Announcements",
      value: announcements.length,
      icon: AnnouncementIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Quizzes",
      value: quizzes.length,
      icon: QuizIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: "2,847",
      icon: PeopleIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Completion Rate",
      value: "94.2%",
      icon: TrendingUpIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      change: "+2.1%",
      changeType: "positive",
    },
  ];

  const quizzesByCourse: Record<string, number> = {};
  quizzes.forEach((q) => {
    quizzesByCourse[q.course] = (quizzesByCourse[q.course] || 0) + 1;
  });
  const quizBarData = Object.entries(quizzesByCourse).map(
    ([course, count]) => ({ course, count })
  );

  const annByRole: Record<string, number> = {};
  announcements.forEach((a) => {
    annByRole[a.role] = (annByRole[a.role] || 0) + 1;
  });
  const annPieData = Object.entries(annByRole).map(([role, value]) => ({
    id: role,
    value,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  // Enhanced color schemes for charts
  const barChartColors = [
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#8B5CF6", // Violet
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#EC4899", // Pink
    "#6366F1", // Indigo
  ];

  const pieChartColors = [
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#8B5CF6", // Violet
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#EC4899", // Pink
    "#6366F1", // Indigo
  ];

  // Enhanced bar chart data with colors
  const enhancedBarData = quizBarData.map((item, index) => ({
    ...item,
    color: barChartColors[index % barChartColors.length],
  }));

  // Enhanced pie chart data with colors
  const enhancedPieData = annPieData.map((item, index) => ({
    ...item,
    color: pieChartColors[index % pieChartColors.length],
  }));

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
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
          <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Dashboard Overview
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin!
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Here's what's happening with your platform today. Monitor performance, track progress, and stay updated.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
          <motion.div
                key={stat.title}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.borderColor} border`}>
                  <stat.icon className={`text-2xl ${stat.color}`} />
                </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Charts Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Enhanced Bar Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Quizzes by Course</h3>
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  <span>Course Distribution</span>
                </div>
              </div>
              
              <div className="h-[250px] md:h-[300px]">
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: enhancedBarData.map((d) => d.course),
                      label: "Course",
                      labelStyle: {
                        fontSize: 10,
                        fontWeight: 600,
                        fill: '#6B7280',
                      },
                      tickLabelStyle: {
                        fontSize: 9,
                        fill: '#9CA3AF',
                      },
                    },
                  ]}
                  yAxis={[
                    {
                      label: "Number of Quizzes",
                      labelStyle: {
                        fontSize: 10,
                        fontWeight: 600,
                        fill: '#6B7280',
                      },
                      tickLabelStyle: {
                        fontSize: 9,
                        fill: '#9CA3AF',
                      },
                    },
                  ]}
                  series={[
                    {
                      data: enhancedBarData.map((d) => d.count),
                      valueFormatter: (value) => `${value} quizzes`,
                    },
                  ]}
                  colors={enhancedBarData.map(item => item.color)}
                  height={250}
                  margin={{ 
                    top: 20, 
                    right: 15, 
                    bottom: 50, 
                    left: 45 
                  }}
                  sx={{
                    '& .MuiChartsAxis-line': {
                      stroke: '#E5E7EB',
                      strokeWidth: 1,
                    },
                    '& .MuiChartsAxis-tick': {
                      stroke: '#E5E7EB',
                      strokeWidth: 1,
                    },
                    '& .MuiChartsAxis-label': {
                      fill: '#6B7280',
                      fontSize: 10,
                      fontWeight: 600,
                    },
                  }}
                />
              </div>
            </div>
            
            {/* Enhanced Pie Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Announcements by Role</h3>
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <span>Role Distribution</span>
                </div>
              </div>
              
              <div className="h-[250px] md:h-[300px]">
                <PieChart
                  series={[
                    {
                      data: enhancedPieData.map((item) => ({
                        id: item.id,
                        value: item.value,
                        label: item.label,
                      })),
                      innerRadius: 40,
                      outerRadius: 80,
                      paddingAngle: 4,
                      cornerRadius: 6,
                      highlightScope: { fade: 'global', highlight: 'item' },
                    },
                  ]}
                  colors={enhancedPieData.map(item => item.color)}
                  height={250}
                  margin={{ 
                    top: 20, 
                    right: 15, 
                    bottom: 20, 
                    left: 15 
                  }}
                  sx={{
                    '& .MuiPieArc-root': {
                      stroke: '#ffffff',
                      strokeWidth: 2,
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bottom Cards Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <ScheduleIcon className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-gray-600 text-sm">Latest updates and activities on your platform</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement._id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium text-sm mb-1">
                        New announcement: {announcement.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {recentQuizzes.map((quiz) => (
                  <div key={quiz._id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium text-sm mb-1">
                        Quiz: {quiz.course} - {quiz.topic}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Due: {new Date(quiz.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {recentAnnouncements.length === 0 && recentQuizzes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ScheduleIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
                </div>
              </div>

            {/* Quick Insights Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <CheckCircleIcon className="text-amber-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Quick Insights</h3>
                  <p className="text-gray-600 text-sm">Important updates and actionable items</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Upcoming Deadlines</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    {quizzes.filter(q => new Date(q.dueDate) > new Date()).length} due soon
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Pending Reviews</span>
                  </div>
                  <span className="text-gray-600 text-sm">3 announcements</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">New Submissions</span>
                  </div>
                  <span className="text-gray-600 text-sm">12 today</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">System Alerts</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    None
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Performance Score</span>
                  </div>
                  <span className="text-gray-600 text-sm">A+ (98/100)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
          </div>
  );
};

export default Dashboard;
