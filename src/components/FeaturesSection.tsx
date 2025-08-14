import React from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupWorkIcon from "@mui/icons-material/GroupWork";

const features = [
  {
    icon: <CampaignIcon className="text-white text-3xl" />,
    title: "Instant Announcements",
    desc: "Share updates with your team or class in real time, keeping everyone in the loop instantly.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    stats: "10x faster",
    benefits: ["Real-time updates", "Smart notifications", "Multi-channel delivery"],
    color: "blue"
  },
  {
    icon: <QuizIcon className="text-white text-3xl" />,
    title: "Interactive Quizzes",
    desc: "Engage users with fun, effective quizzes that make learning enjoyable and measurable.",
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
    stats: "95% engagement",
    benefits: ["Adaptive learning", "Instant feedback", "Progress tracking"],
    color: "indigo"
  },
  {
    icon: <GroupWorkIcon className="text-white text-3xl" />,
    title: "Seamless Collaboration",
    desc: "Work together from anywhere, anytime, with tools designed for easy teamwork and communication.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    stats: "24/7 access",
    benefits: ["Team workspaces", "File sharing", "Communication tools"],
    color: "purple"
  },
];

const comparisonData = [
  {
    feature: "Real-time Updates",
    anyware: "✓ Instant",
    competitor: "✗ Delayed",
    advantage: "10x faster"
  },
  {
    feature: "User Engagement",
    anyware: "✓ 95%",
    competitor: "✗ 60%",
    advantage: "35% higher"
  },
  {
    feature: "Uptime Guarantee",
    anyware: "✓ 99.9%",
    competitor: "✗ 99.5%",
    advantage: "More reliable"
  },
  {
    feature: "Support Response",
    anyware: "✓ < 2 hours",
    competitor: "✗ 24+ hours",
    advantage: "12x faster"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Succeed
            </span>
        </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Our platform combines cutting-edge technology with intuitive design to deliver 
            an exceptional learning and collaboration experience.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              {feature.icon}
                  </div>
                  <div className={`text-sm font-bold text-${feature.color}-600 bg-${feature.color}-100 px-3 py-1 rounded-full`}>
                    {feature.stats}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                {feature.title}
              </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-6">
                {feature.desc}
              </p>
                
                {/* Benefits List */}
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      <div className={`w-2 h-2 bg-${feature.color}-500 rounded-full mr-3 flex-shrink-0`}></div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Anyware Over Competitors?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we stack up against the competition with our superior features and performance.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-4 bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
              <div className="font-bold text-gray-900 text-lg">Feature</div>
              <div className="font-bold text-blue-600 text-lg text-center">Anyware</div>
              <div className="font-bold text-gray-600 text-lg text-center">Competitors</div>
              <div className="font-bold text-green-600 text-lg text-center">Advantage</div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div key={index} className={`grid grid-cols-4 p-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-300`}>
                <div className="font-semibold text-gray-900">{row.feature}</div>
                <div className="text-center text-green-600 font-semibold">{row.anyware}</div>
                <div className="text-center text-red-600 font-semibold">{row.competitor}</div>
                <div className="text-center text-blue-600 font-semibold">{row.advantage}</div>
            </div>
          ))}
        </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
