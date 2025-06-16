import React, { useEffect } from 'react';
import { Search, BookOpen, TrendingUp, Clock, Award } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylistOfBrand } from '../../../redux/api/playlistAPI';
import CourseCard from './CourseCard';

export const Dashboard = ({ onCourseClick }) => {
  const { playlists, loading } = useSelector((state) => state.playlist);
  const { branding } = useSelector((state) => state.brandDetails);
  const dispatch = useDispatch();

  const brandColor = branding?.brandColor || '#4A90E2';

  useEffect(() => {
    if (branding?.brandId) {
      dispatch(getAllPlaylistOfBrand({ dispatch, brandId: branding.brandId }));
    }
  }, [dispatch, branding?.brandId]);

  const courses = playlists;
  const totalCourses = courses?.length;
  const completedCourses = courses?.filter(
    (course) => course.progress === 100
  ).length;
  const inProgressCourses = courses?.filter(
    (course) => course.progress > 0 && course.progress < 100
  )?.length;
  const totalHours = courses?.reduce((acc, course) => {
    const hours = parseFloat(course?.duration?.split('h')[0]);
    return acc + (isNaN(hours) ? 0 : hours);
  }, 0);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
              <p className="text-gray-600 mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none w-full md:w-80 transition-all duration-200"
                onFocus={(e) => {
                  e.target.style.borderColor = brandColor;
                  e.target.style.boxShadow = `0 0 0 3px ${brandColor}33`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={totalCourses}
            icon={<BookOpen className="h-6 w-6" />}
            bgColor={`${brandColor}20`}
            iconColor={brandColor}
          />
          <StatCard
            title="In Progress"
            value={inProgressCourses}
            icon={<TrendingUp className="h-6 w-6 text-yellow-600" />}
            bgColor="#FEF3C7"
          />
          <StatCard
            title="Completed"
            value={completedCourses}
            icon={<Award className="h-6 w-6 text-green-600" />}
            bgColor="#DCFCE7"
          />
          <StatCard
            title="Total Hours"
            value={`${totalHours?.toFixed(1)}h`}
            icon={<Clock className="h-6 w-6 text-purple-600" />}
            bgColor="#EDE9FE"
          />
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-xl p-6 mb-8 text-white"
          style={{ background: `linear-gradient(to right, ${brandColor})` }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">
                Ready to continue learning?
              </h2>
              <p className="text-white/90">
                Pick up where you left off or explore new courses
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-white px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                style={{ color: brandColor }}
              >
                Continue Learning
              </button>
              <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Browse All
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Course Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <div className="flex gap-2">
              {['All', 'In Progress', 'Completed'].map((label) => (
                <button
                  key={label}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    color: label === 'All' ? brandColor : 'inherit',
                    backgroundColor:
                      label === 'All' ? `${brandColor}10` : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = brandColor;
                    e.currentTarget.style.backgroundColor = `${brandColor}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      label === 'All' ? brandColor : '';
                    e.currentTarget.style.backgroundColor =
                      label === 'All' ? `${brandColor}10` : '';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses?.map((course) => (
              <CourseCard
                key={course?._id}
                course={course}
                onClick={() => onCourseClick(course)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 📦 Stat Card Component
const StatCard = ({ title, value, icon, bgColor, iconColor }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 rounded-xl" style={{ backgroundColor: bgColor }}>
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
    </div>
  </div>
);
