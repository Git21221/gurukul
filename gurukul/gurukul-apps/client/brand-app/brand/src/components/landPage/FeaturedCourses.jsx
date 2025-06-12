import React from 'react';
import { Clock, Users, Star, Play } from 'lucide-react';
import { useSelector } from 'react-redux';

const FeaturedCourses = () => {
  const { branding } = useSelector((state) => state.brandDetails);

  const courses = [
    {
      id: '1',
      title: 'Complete React Development Bootcamp',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 12450,
      duration: '42 hours',
      price: 89,
      originalPrice: 129,
      image:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Web Development',
      level: 'Intermediate',
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Michael Chen',
      rating: 4.8,
      students: 8920,
      duration: '28 hours',
      price: 79,
      originalPrice: 119,
      image:
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Design',
      level: 'Beginner',
    },
    {
      id: '3',
      title: 'Python for Data Science',
      instructor: 'Dr. Emily Rodriguez',
      rating: 4.9,
      students: 15680,
      duration: '56 hours',
      price: 99,
      originalPrice: 149,
      image:
        'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Data Science',
      level: 'Intermediate',
    },
    {
      id: '4',
      title: 'Digital Marketing Mastery',
      instructor: 'Alex Thompson',
      rating: 4.7,
      students: 6750,
      duration: '35 hours',
      price: 69,
      originalPrice: 99,
      image:
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Marketing',
      level: 'Beginner',
    },
  ];

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our most popular courses taught by industry experts. Start
            your learning journey today.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 group"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: branding.brandColor }}
                  >
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700">
                    {course.level}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: branding.brandColor }}
                  >
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  by {course.instructor}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: branding.brandColor }}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-200 hover:text-white hover:border-opacity-0"
            style={{
              borderColor: branding.brandColor,
              color: branding.brandColor,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = branding.brandColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
