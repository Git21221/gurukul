import React from 'react';
import { Clock, Users, Play } from 'lucide-react';
import { useSelector } from 'react-redux';

const CourseCard = ({ course, onClick }) => {
  const { branding } = useSelector((state) => state.brandDetails);
  const brandColor = branding?.brandColor || '#4A90E2';

  const {
    video_url,
    title = 'Untitled Video',
    level = 'Beginner',
    category = 'General',
    description = 'No description available.',
    duration = '1h',
    lessonsCount = 1,
    instructor = 'Educator',
    progress = 0,
  } = course;

  const thumbnail =
    video_url || 'https://via.placeholder.com/300x180?text=Video+Thumbnail';

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return `border border-[${brandColor}] text-[${brandColor}] bg-[${brandColor}1A]`;
      case 'Intermediate':
        return `border border-[${brandColor}] text-[${brandColor}] bg-[${brandColor}1A]`;
      case 'Advanced':
        return `border border-[${brandColor}] text-[${brandColor}] bg-[${brandColor}1A]`;
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}
          >
            {level}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <Play
              className="h-6 w-6"
              style={{ color: brandColor }}
              fill="currentColor"
            />
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium" style={{ color: brandColor }}>
            {category}
          </span>
        </div>

        <h3
          className="text-lg font-bold text-gray-900 mb-2 transition-colors duration-200"
          onMouseEnter={(e) => (e.currentTarget.style.color = brandColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = '')}
        >
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {lessonsCount} lesson{lessonsCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">
                {instructor
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-700">{instructor}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(to right, ${brandColor})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
