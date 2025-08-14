import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-24 xl:px-32 pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0"></div>
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-center lg:text-left">

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Anyware Exams
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
          Empowering your learning journey with modern tools, instant
          announcements, and interactive quizzes—all in one place.
        </p>
        
        <div className="flex flex-row gap-4 mb-8">
        <Link
          to="/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Get Started
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        </Link>
          
          <button className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learn More
          </button>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Enterprise Ready</span>
          </div>
        </div>
      </div>
      
      {/* Illustration */}
      <div className="relative z-10 flex-1 flex items-center justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-6 opacity-20 blur-xl"></div>
          <img
            src="/dd51d280-86cc-4cf3-b2d7-c1f2e50a17b7.png"
          alt="Learning Illustration"
            className="relative w-full max-w-[400px] h-[400px] sm:max-w-[500px] sm:h-[500px] lg:max-w-[600px] lg:h-[600px] drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
