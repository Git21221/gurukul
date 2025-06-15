import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylistOfBrand } from '../../../redux/api/playlistAPI';
import { Header } from '../../../components/educator/course/Header';
import { StatsSection } from '../../../components/educator/course/StatsSection';
import { Filter, Search } from 'lucide-react';
import { CourseCard } from '../../../components/educator/course/CourseCard';

export const AllCourse = () => {
  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.playlist);
  const { branding, loading, error } = useSelector(
    (state) => state.brandDetails
  );
  const brandColor = branding?.brandColor || '#4F46E5';
  useEffect(() => {
    // Fetch all courses logic here
    console.log('Fetching all courses...');
    dispatch(getAllPlaylistOfBrand({ dispatch, brandId: branding.brandId }));
  }, [dispatch]);
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-50">
      <Header />

      <StatsSection courses={playlists} />

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Courses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our curated collection of courses designed to help you
              master new skills and advance your career
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playlists.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          {/* Empty State for additional courses */}
          {playlists.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600">
                We couldn't find any courses matching your criteria.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {playlists.length > 0 && (
            <div className="text-center mt-12">
              <button
                className="text-white px-8 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{
                  background: `linear-gradient(to right, ${brandColor}, ${brandColor})`,
                }}
              >
                Load More Courses
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-black text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">
        Ready to Start Learning?
      </h3>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
        Join thousands of learners who are already advancing their careers
        with our comprehensive courses
      </p>
      <button
        className="text-white px-8 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg"
        style={{
          background: `linear-gradient(to right, ${brandColor}, ${brandColor})`,
        }}
      >
        Get Started Today
      </button>
    </div>

    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
      <p className="text-gray-500 text-sm">
        © 2025 Learning Platform. All rights reserved.
      </p>
    </div>
  </div>
</footer> */}
    </div>
  );
};
