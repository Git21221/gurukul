import React from 'react';
import { BookOpen, Users, Video } from 'lucide-react';
import { useSelector } from 'react-redux';

export const Header = () => {
  const { branding } = useSelector((state) => state.brandDetails);
  const brandColor = branding?.brandColor || '#4A90E2';
  const [src, setSrc] = React.useState('/brand_logo' + '.' + branding.ext);

  return (
    <header
      className="text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${brandColor}, ${brandColor}CC, ${brandColor}AA)`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Decorative Gradient Circles */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-64 h-64 opacity-10 rounded-full -translate-x-32 -translate-y-32"
          style={{ backgroundColor: brandColor }}
        ></div>
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full translate-x-48 -translate-y-48"
          style={{ backgroundColor: brandColor }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-80 h-80 opacity-10 rounded-full -translate-x-40 translate-y-40"
          style={{ backgroundColor: brandColor }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white bg-opacity-10 rounded-full backdrop-blur-sm">
              <img
                src={src}
                className="w-12 h-12"
                style={{ color: brandColor }}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Learning Platform
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white text-opacity-90">
            Discover amazing courses and expand your knowledge with our
            comprehensive video learning platform
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-white text-opacity-90">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span className="text-sm font-medium">High Quality Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Expert Instructors</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Comprehensive Courses</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
