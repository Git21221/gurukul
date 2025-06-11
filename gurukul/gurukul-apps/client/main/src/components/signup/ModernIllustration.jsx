import React from 'react';
import { Users, BookOpen, Award, Star, Target, Zap } from 'lucide-react';

export const ModernIllustration = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#e6f0fb] via-[#f0f6fd] to-[#f5f9ff] rounded-3xl p-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-[#d0e4fa] rounded-full opacity-50 animate-pulse"></div>
      <div
        className="absolute bottom-4 left-4 w-16 h-16 bg-[#cce7ff] rounded-full opacity-50 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/2 left-8 w-12 h-12 bg-[#b0d8ff] rounded-full opacity-50 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Main illustration content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Hero icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#3b92c5] p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-[#3b92c5] to-[#06a89b] p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-green-400 rounded-full p-1">
              <Target className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-[#06a89b] to-[#059669] p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-400 rounded-full p-1">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-gray-800 leading-tight">
            Join the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#059669]">
              {' '}
              Learning
            </span>
          </h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Connect with thousands of learners and educators. Build your
            knowledge, share your expertise, and grow together in our vibrant
            community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl font-bold text-[#4A90E2] mb-2">10K+</div>
              <div className="text-sm text-gray-600 font-medium">
                Active Students
              </div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl font-bold text-[#3b92c5] mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">
                Expert Courses
              </div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl font-bold text-[#059669] mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">
                Top Instructors
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="pt-8">
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-medium">4.9/5 from 2,000+ reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};
