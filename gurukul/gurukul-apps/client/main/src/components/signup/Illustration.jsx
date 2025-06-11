import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';

export const Illustration = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
      <div className="flex space-x-4 mb-8">
        <div
          className="bg-blue-500 p-4 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        >
          <Users className="w-8 h-8 text-white" />
        </div>
        <div
          className="bg-indigo-500 p-4 rounded-full animate-bounce"
          style={{ animationDelay: '200ms' }}
        >
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div
          className="bg-purple-500 p-4 rounded-full animate-bounce"
          style={{ animationDelay: '400ms' }}
        >
          <Award className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Join Our Community</h3>
        <p className="text-gray-600 max-w-sm">
          Connect with thousands of learners and educators. Build your
          knowledge, share your expertise, and grow together.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">10K+</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">500+</div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-gray-600">Instructors</div>
          </div>
        </div>
      </div>
    </div>
  );
};
