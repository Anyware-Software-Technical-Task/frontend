import React from "react";

const testimonials = [
  {
    name: "Sarah Lee",
    role: "Senior Product Manager",
    company: "TechCorp Inc.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Anyware Exams transformed our team's productivity and communication. The seamless integration of announcements and quizzes has made our learning initiatives incredibly effective.",
    rating: 5,
  },
  {
    name: "James Smith",
    role: "Education Director",
    company: "Learning Academy",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The interactive quizzes are engaging and easy to use. Our students love the experience, and we've seen significant improvements in retention rates.",
    rating: 5,
  },
  {
    name: "Ava Patel",
    role: "Team Lead",
    company: "Innovation Labs",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The announcement system keeps everyone perfectly synchronized. Communication has never been easier, and the platform's reliability is outstanding.",
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Users Say
            </span>
        </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who have transformed their learning and 
            collaboration experience with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-gray-200 group-hover:text-blue-200 transition-colors duration-300">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                loading="lazy"
              />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-blue-600 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">4.9/5</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
