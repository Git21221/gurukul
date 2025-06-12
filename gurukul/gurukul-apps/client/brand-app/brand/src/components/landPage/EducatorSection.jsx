import React from 'react';
import {
  Upload,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { useSelector } from 'react-redux';

const EducatorSection = () => {
  const { branding } = useSelector((state) => state.brandDetails);

  const benefits = [
    {
      icon: Upload,
      title: 'Easy Course Creation',
      description:
        'Upload your content with our intuitive course builder. Add videos, quizzes, and assignments effortlessly.',
    },
    {
      icon: DollarSign,
      title: 'Earn Revenue',
      description:
        'Set your own prices and earn up to 80% revenue share. Multiple payment options for global reach.',
    },
    {
      icon: Users,
      title: 'Reach Global Audience',
      description:
        'Connect with learners worldwide. Our platform supports multiple languages and currencies.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description:
        'Track your course performance with detailed analytics. Understand your students better.',
    },
  ];

  const features = [
    'Professional video hosting',
    'Student engagement tools',
    'Automated certificates',
    'Marketing support',
    'Mobile app access',
    '24/7 instructor support',
  ];

  return (
    <section id="educators" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6">
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: branding.brandColor }}
              >
                For Educators
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Share Your Knowledge,{' '}
              <span style={{ color: branding.brandColor }}>
                Build Your Empire
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of successful instructors who are making a living
              teaching what they love. Turn your expertise into a thriving
              online business.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${branding.brandColor}20` }}
                  >
                    <benefit.icon
                      className="h-6 w-6"
                      style={{ color: branding.brandColor }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105"
              style={{ backgroundColor: branding.brandColor }}
            >
              Start Teaching Today
            </button>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${branding.brandColor}20` }}
                >
                  <TrendingUp
                    className="h-8 w-8"
                    style={{ color: branding.brandColor }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Everything You Need
                </h3>
                <p className="text-gray-600">
                  All the tools to create and sell your courses
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle
                      className="h-5 w-5 flex-shrink-0"
                      style={{ color: branding.brandColor }}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      $2.5M+
                    </div>
                    <div className="text-sm text-gray-600">
                      Paid to instructors
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">15K+</div>
                    <div className="text-sm text-gray-600">
                      Active instructors
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Success Card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden lg:block">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${branding.brandColor}20` }}
                >
                  <DollarSign
                    className="h-6 w-6"
                    style={{ color: branding.brandColor }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">$12,450</p>
                  <p className="text-sm text-gray-600">earned this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducatorSection;
