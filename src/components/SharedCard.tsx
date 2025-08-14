import React from "react";
import { motion } from "framer-motion";
import {
  Announcement as AnnouncementIcon,
  Quiz as QuizIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Psychology as BrainIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";

interface SharedCardProps {
  type: "announcement" | "quiz";
  title: string;
  content?: string;
  author?: string;
  role?: string;
  course?: string;
  topic?: string;
  dueDate?: string;
  options?: string[];
  createdAt?: string;
  onClick?: () => void;
  buttonText?: string;
}

const SharedCard: React.FC<SharedCardProps> = ({
  type,
  title,
  content,
  author,
  role,
  course,
  topic,
  dueDate,
  options,
  createdAt,
  onClick,
  buttonText,
}) => {
  const getRoleColor = (role: string) => {
    const colors = {
      math: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500",
      physics: "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500",
      management: "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500",
      events: "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500",
      other: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-500",
    };
    return colors[role as keyof typeof colors] || colors.other;
  };

  const getRoleGradient = (role: string) => {
    const gradients = {
      math: "from-blue-50 via-blue-100/50 to-blue-50",
      physics: "from-purple-50 via-purple-100/50 to-purple-50",
      management: "from-green-50 via-green-100/50 to-green-50",
      events: "from-orange-50 via-orange-100/50 to-orange-50",
      other: "from-gray-50 via-gray-100/50 to-gray-50",
    };
    return gradients[role as keyof typeof gradients] || gradients.other;
  };

  // Enhanced topic colors for quizzes
  const getTopicColor = (topic: string) => {
    const topicColors = {
      algebra: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-500",
      calculus: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-500",
      geometry: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500",
      statistics: "bg-gradient-to-r from-violet-500 to-purple-600 text-white border-violet-500",
      mechanics: "bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-500",
      thermodynamics: "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-500",
      marketing: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500",
      finance: "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-500",
      leadership: "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500",
      strategy: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-500",
      other: "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500",
    };
    return topicColors[topic?.toLowerCase() as keyof typeof topicColors] || topicColors.other;
  };

  // Enhanced topic gradients for quiz cards
  const getTopicGradient = (topic: string) => {
    const topicGradients = {
      algebra: "from-indigo-50 via-indigo-100/50 to-purple-50",
      calculus: "from-blue-50 via-blue-100/50 to-cyan-50",
      geometry: "from-emerald-50 via-emerald-100/50 to-teal-50",
      statistics: "from-violet-50 via-violet-100/50 to-purple-50",
      mechanics: "from-orange-50 via-orange-100/50 to-red-50",
      thermodynamics: "from-rose-50 via-rose-100/50 to-pink-50",
      marketing: "from-green-50 via-green-100/50 to-emerald-50",
      finance: "from-amber-50 via-amber-100/50 to-orange-50",
      leadership: "from-sky-50 via-sky-100/50 to-blue-50",
      strategy: "from-purple-50 via-purple-100/50 to-indigo-50",
      other: "from-gray-50 via-gray-100/50 to-slate-50",
    };
    return topicGradients[topic?.toLowerCase() as keyof typeof topicGradients] || topicGradients.other;
  };



  const getTypeIcon = () => {
    return type === "announcement" ? (
      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
        <AnnouncementIcon className="text-2xl" />
      </div>
    ) : (
      <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
        <QuizIcon className="text-2xl" />
      </div>
    );
  };

  const getTypeGradient = () => {
    return type === "announcement"
      ? "from-blue-50 via-blue-100/30 to-blue-50"
      : "from-purple-50 via-purple-100/30 to-indigo-50";
  };

  // Enhanced quiz-specific gradients
  const getQuizGradient = () => {
    return "from-purple-50 via-purple-100/20 via-indigo-100/20 to-indigo-50";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };



  // Get difficulty level based on question count
  const getDifficultyLevel = (questionCount: number) => {
    if (questionCount <= 5) return { level: "Easy", color: "from-green-500 to-emerald-500", bgColor: "bg-green-100", textColor: "text-green-700" };
    if (questionCount <= 10) return { level: "Medium", color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-100", textColor: "text-yellow-700" };
    return { level: "Hard", color: "from-red-500 to-rose-500", bgColor: "bg-red-100", textColor: "text-red-700" };
  };

  const difficulty = options ? getDifficultyLevel(options.length) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        group relative bg-white rounded-2xl shadow-lg border border-gray-100/50
        hover:shadow-2xl transition-all duration-500 overflow-hidden
        cursor-pointer backdrop-blur-sm
        ${type === "quiz" ? "hover:shadow-purple-500/15 hover:shadow-indigo-500/15" : "hover:shadow-blue-500/10"}
      `}
      onClick={onClick}
    >
      {/* Enhanced Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${type === "quiz" ? getQuizGradient() : "from-gray-50/50 to-white"} opacity-60`} />
      
      {/* Enhanced Top Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${type === "quiz" ? getTopicGradient(topic || "other") : getRoleGradient(role || "other")}`} />
      
      {/* Enhanced Floating Elements for Quizzes */}
      {type === "quiz" && (
        <>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          </div>
        </>
      )}
      
      {/* Enhanced Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${type === "quiz" ? getQuizGradient() : getTypeGradient()} opacity-0 group-hover:opacity-100 transition-all duration-500`}
      />

      {/* Content */}
      <div className="relative p-6">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
              {getTypeIcon()}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 leading-tight mb-2">
                {type === "announcement" ? title : `${course} Quiz`}
              </h3>
              {type === "quiz" && (
                <p className="text-sm text-gray-600 leading-relaxed">{title}</p>
              )}
            </div>
          </div>

          {/* Enhanced Badge with topic-specific colors for quizzes */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`
              text-xs px-4 py-2 rounded-full border font-semibold shadow-sm
              ${type === "quiz" ? getTopicColor(topic || "other") : getRoleColor(role || "other")}
              transition-all duration-300 group-hover:shadow-md
          `}
          >
            {type === "announcement"
              ? (role || "Other").charAt(0).toUpperCase() +
                (role || "Other").slice(1)
              : topic}
          </motion.span>
        </div>

        {/* Enhanced Content Section */}
        {type === "announcement" && content && (
          <div className="mb-6">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-800 transition-colors duration-300">
            {content}
          </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full" />
              <span className="text-xs text-gray-500 font-medium">Announcement</span>
            </div>
          </div>
        )}

        {/* Enhanced Quiz Section */}
        {type === "quiz" && options && (
          <div className="space-y-4 mb-6">
            {/* Difficulty Badge */}
            {difficulty && (
              <div className="flex items-center gap-2 mb-3">
                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${difficulty.color} text-white shadow-sm`}>
                  {difficulty.level}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <BrainIcon fontSize="small" />
                  <span>Intelligence Test</span>
                </div>
              </div>
            )}
            
            {/* Enhanced Quiz Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
                  <TimerIcon fontSize="small" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{options.length * 3} min</p>
                  <p className="text-xs text-gray-600">Estimated Time</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                  <SchoolIcon fontSize="small" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{options.length}</p>
                  <p className="text-xs text-gray-600">Questions</p>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
              <div className="p-2 bg-gray-200 rounded-lg">
                <SchoolIcon fontSize="small" className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">{course}</p>
                <p className="text-xs text-gray-600">Course</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100/50">
          <div className="flex items-center gap-4 text-sm">
            {type === "announcement" && author && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                  <PersonIcon fontSize="small" className="text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium">{author}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                <CalendarIcon fontSize="small" className="text-gray-600" />
              </div>
              <span className="text-gray-700 font-medium">
                {type === "announcement"
                  ? formatDate(createdAt || "")
                  : `Due: ${formatDate(dueDate || "")}`}
              </span>
            </div>
          </div>

          {/* Enhanced Action Button for Quiz */}
          {type === "quiz" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-6 py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 
                text-white text-sm font-semibold rounded-xl 
                hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 
                transition-all duration-300 shadow-lg hover:shadow-xl
                hover:shadow-purple-500/30 hover:shadow-indigo-500/30
                flex items-center gap-2
              "
            >
              <PlayArrowIcon fontSize="small" />
              {buttonText || "Start Quiz"}
            </motion.button>
          )}
        </div>

        {/* Enhanced Bottom Decoration */}
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>

      {/* Enhanced Border Effect */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent ${type === "quiz" ? "group-hover:border-purple-200/50 group-hover:border-indigo-200/50" : "group-hover:border-blue-200/50"} transition-all duration-500 pointer-events-none`} />
      
      {/* Enhanced Corner Accent */}
      <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] ${type === "quiz" ? "border-t-purple-100" : "border-t-blue-100"} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
    </motion.div>
  );
};

export default SharedCard;
