import React, { useContext } from 'react';
import { Play, Eye, Calendar, Video } from 'lucide-react';
import { useSelector } from 'react-redux';

export const CourseCard = ({ course }) => {
  const { branding } = useSelector((state) => state.brandDetails);
  const brandColor = branding?.brandColor || '#4A90E2';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalViews = course.videos.reduce(
    (sum, video) => sum + video.total_views,
    0
  );

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      style={{ borderColor: brandColor }}
    >
      {/* Course Header */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${brandColor}, ${brandColor})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 capitalize">{course.name}</h3>
          <p className="text-white text-sm opacity-90 capitalize">
            {course.description}
          </p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-5 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Course Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Video className="w-4 h-4" style={{ color: brandColor }} />
              <span>
                {course.videos.length} video
                {course.videos.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4 text-green-500" />
              <span>{totalViews} views</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(course.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Play className="w-4 h-4 mr-2" style={{ color: brandColor }} />
          Course Content
        </h4>
        <div className="space-y-3">
          {course.videos.map((video, index) => (
            <div
              key={video._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer group/video hover:bg-opacity-70"
              style={{ backgroundColor: '#f9fafb' }}
            >
              <div className="flex items-center space-x-3 flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: brandColor, opacity: 0.1 }}
                >
                  <Play className="w-4 h-4" style={{ color: brandColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate capitalize">
                    {video.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(video.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Eye className="w-3 h-3" />
                <span>{video.total_views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Footer */}
      <div className="px-6 pb-6">
        <button
          className="w-full text-white py-3 px-4 rounded-lg font-medium transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
          style={{
            background: `linear-gradient(to right, ${brandColor}, ${brandColor})`,
          }}
        >
          Start Learning
        </button>
      </div>
    </div>
  );
};
