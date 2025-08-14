import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Quiz as QuizIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { fetchQuizzes } from "../features/quizzes/api";
import type { Quiz } from "../features/quizzes/api";
import SharedCard from "../components/SharedCard";

const Quizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  useEffect(() => {
    fetchQuizzes()
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load quizzes.");
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Filter quizzes based on search, topic, and course
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === "all" || quiz.topic === selectedTopic;
    const matchesCourse = selectedCourse === "all" || quiz.course === selectedCourse;
    return matchesSearch && matchesTopic && matchesCourse;
  });

  // Get unique topics and courses for filters
  const uniqueTopics = Array.from(new Set(quizzes.map(q => q.topic)));
  const uniqueCourses = Array.from(new Set(quizzes.map(q => q.course)));

  // Get statistics
  const getQuizStats = () => {
    const totalQuizzes = quizzes.length;
    const activeQuizzes = quizzes.filter(q => new Date(q.dueDate) > new Date()).length;
    const completedQuizzes = quizzes.filter(q => new Date(q.dueDate) <= new Date()).length;
    const totalQuestions = quizzes.reduce((acc, q) => acc + (q.options?.length || 0), 0);
    const averageTime = totalQuestions * 3; // Assuming 3 minutes per question

    return { totalQuizzes, activeQuizzes, completedQuizzes, totalQuestions, averageTime };
  };

  const stats = getQuizStats();

  // Get topic and course statistics
  const getTopicStats = () => {
    return uniqueTopics.reduce((acc, topic) => {
      acc[topic] = quizzes.filter(q => q.topic === topic).length;
      return acc;
    }, {} as Record<string, number>);
  };

  const getCourseStats = () => {
    return uniqueCourses.reduce((acc, course) => {
      acc[course] = quizzes.filter(q => q.course === course).length;
      return acc;
    }, {} as Record<string, number>);
  };

  const topicStats = getTopicStats();
  const courseStats = getCourseStats();

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading quizzes...</p>
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-xs md:text-sm font-medium mb-3 md:mb-4">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2 animate-pulse"></span>
              Quiz Center
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Test Your Knowledge with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Interactive Quizzes
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Challenge yourself with our comprehensive quizzes, track your progress, and enhance your learning experience.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <QuizIcon className="text-purple-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stats.totalQuizzes}</p>
              <p className="text-xs md:text-sm text-gray-600">Total Quizzes</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircleIcon className="text-green-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stats.activeQuizzes}</p>
              <p className="text-xs md:text-sm text-gray-600">Active Quizzes</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AssignmentIcon className="text-blue-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stats.totalQuestions}</p>
              <p className="text-xs md:text-sm text-gray-600">Total Questions</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TimerIcon className="text-orange-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{Math.round(stats.averageTime / 60)}h</p>
              <p className="text-xs md:text-sm text-gray-600">Total Time</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 text-center col-span-2 md:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <StarIcon className="text-indigo-600 text-xl md:text-2xl" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stats.completedQuizzes}</p>
              <p className="text-xs md:text-sm text-gray-600">Completed</p>
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
                    placeholder="Search quizzes, courses, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="all">All Courses</option>
                  {uniqueCourses.map((course) => (
                    <option key={course} value={course}>
                      {course.charAt(0).toUpperCase() + course.slice(1)} ({courseStats[course]})
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="all">All Topics</option>
                  {uniqueTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic.charAt(0).toUpperCase() + topic.slice(1)} ({topicStats[topic]})
                    </option>
                  ))}
                </select>
                
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                  <AddIcon />
                  <span className="hidden sm:inline">Create Quiz</span>
                  <span className="sm:hidden">Create</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Distribution Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Topic Distribution */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FilterIcon className="text-purple-600" />
                Topic Distribution
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {uniqueTopics.map((topic) => (
                  <div key={topic} className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                    <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{topicStats[topic]}</div>
                    <div className="text-xs md:text-sm text-gray-600 capitalize">{topic}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Course Distribution */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <SchoolIcon className="text-blue-600" />
                Course Distribution
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {uniqueCourses.map((course) => (
                  <div key={course} className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                    <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{courseStats[course]}</div>
                    <div className="text-xs md:text-sm text-gray-600 capitalize">{course}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quizzes Grid */}
          <motion.div variants={itemVariants}>
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QuizIcon className="text-gray-400 text-4xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No quizzes found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedTopic !== "all" || selectedCourse !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "There are no quizzes yet. Be the first to create one!"
                  }
                </p>
                {!searchTerm && selectedTopic === "all" && selectedCourse === "all" && (
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                    Create First Quiz
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz._id}
                    variants={itemVariants}
                    className="group"
                  >
            <SharedCard
              type="quiz"
                      title={quiz.question}
                      course={quiz.course}
                      topic={quiz.topic}
                      dueDate={quiz.dueDate}
                      options={quiz.options}
              onClick={() => {
                        console.log("Quiz clicked:", quiz.question);
              }}
              buttonText="Start Quiz"
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

export default Quizzes;
