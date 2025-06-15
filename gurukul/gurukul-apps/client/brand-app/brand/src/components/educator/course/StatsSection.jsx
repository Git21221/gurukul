import React from 'react';
import { BookOpen, Video, Eye, Clock } from 'lucide-react';

export const StatsSection = ({ courses }) => {
  const totalCourses = courses.length;
  const totalVideos = courses.reduce(
    (sum, course) => sum + course.videos.length,
    0
  );
  const totalViews = courses.reduce(
    (sum, course) =>
      sum +
      course.videos.reduce(
        (videoSum, video) => videoSum + video.total_views,
        0
      ),
    0
  );

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: totalCourses.toLocaleString(),
      gradient: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
    },
    {
      icon: Video,
      label: 'Video Lessons',
      value: totalVideos.toLocaleString(),
      gradient: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      gradient: 'from-green-500 to-green-600',
      text: 'text-green-600',
    },
    {
      icon: Clock,
      label: 'Hours of Content',
      value: ((totalVideos * 45) / 60).toFixed(0),
      gradient: 'from-orange-500 to-orange-600',
      text: 'text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Platform Statistics
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the impact of our learning platform through these key
            metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl shadow-lg bg-gradient-to-br ${stat.gradient}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${stat.text}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
