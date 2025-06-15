import React from 'react';
import { Play, Star, Users, Award } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { branding } = useSelector((state) => state.brandDetails);
  const { userRole } = useSelector((state) => state.auth);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current"
                    style={{ color: branding.brandColor }}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                Trusted by 50K+ students
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master New Skills with{' '}
              <span className="relative" style={{ color: branding.brandColor }}>
                {branding.brandName}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C20 3 40 1 60 3C80 5 100 7 120 5C140 3 160 1 180 4C185 5 190 6 195 7"
                    stroke={branding.brandColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-30"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of learners advancing their careers with our
              expert-led courses. Learn at your own pace, get certified, and
              unlock new opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {userRole === 'founder' ? (
                <Link
                  to="/founder/home"
                  className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Get Started
                </Link>
              ) : userRole === 'educator' ? (
                <Link
                  to="/educator/home"
                  className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Start Teaching Today
                </Link>
              ) : (
                <Link
                  to="/user/home"
                  className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Start Learning Today
                </Link>
              )}
              <button className="px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold text-lg transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users
                    className="h-6 w-6 mr-2"
                    style={{ color: branding.brandColor }}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award
                    className="h-6 w-6 mr-2"
                    style={{ color: branding.brandColor }}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star
                    className="h-6 w-6 mr-2"
                    style={{ color: branding.brandColor }}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Video Placeholder */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${branding.brandColor}20 0%, ${branding.brandColor}10 100%)`,
                }}
              >
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer transition-transform duration-200 hover:scale-110"
                    style={{ backgroundColor: branding.brandColor }}
                  >
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <p className="text-gray-600 font-medium">Watch Our Story</p>
                </div>
              </div>

              {/* Floating Course Cards */}
              <div className="absolute top-0 right-0 bg-white rounded-bl-lg shadow-lg p-4 max-w-xs hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${branding.brandColor}20` }}
                  >
                    <Award
                      className="h-6 w-6"
                      style={{ color: branding.brandColor }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">React Mastery</p>
                    <p className="text-sm text-gray-600">95% Complete</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 bg-white rounded-tr-lg shadow-lg p-4 max-w-xs hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${branding.brandColor}20` }}
                  >
                    <Users
                      className="h-6 w-6"
                      style={{ color: branding.brandColor }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      +2,450 students
                    </p>
                    <p className="text-sm text-gray-600">joined this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
