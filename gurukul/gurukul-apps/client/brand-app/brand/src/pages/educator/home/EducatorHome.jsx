import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Video,
  Users,
  TrendingUp,
  Search,
  Filter,
  Upload,
  Eye,
  MoreHorizontal,
  Star,
  Clock,
} from 'lucide-react';

export const EducatorHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [courses] = useState([
    {
      id: '1',
      name: 'React Fundamentals',
      description:
        'Master the basics of React development with hands-on projects and real-world examples',
      thumbnail:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
      videos: [
        {
          id: 'v1',
          title: 'Introduction to React',
          description: 'Learn the basics of React components',
          duration: '15:30',
          views: 1250,
          uploadDate: '2024-01-15',
          thumbnail:
            'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300',
          videoUrl: '',
        },
      ],
      students: 248,
      rating: 4.8,
      duration: '8h 30m',
      lastUpdated: '2 days ago',
      status: 'published',
      created_by_educator: 'educator123',
    },
    {
      id: '2',
      name: 'Advanced JavaScript',
      description:
        'Deep dive into modern JavaScript concepts and best practices',
      thumbnail:
        'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
      videos: [],
      students: 156,
      rating: 4.9,
      duration: '6h 15m',
      lastUpdated: '1 week ago',
      status: 'published',
      created_by_educator: 'educator123',
    },
    {
      id: '3',
      name: 'Node.js Backend Development',
      description:
        'Build scalable backend applications with Node.js and Express',
      thumbnail:
        'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=500',
      videos: [
        {
          id: 'v2',
          title: 'Setting up Express Server',
          description: 'Learn how to create a basic Express server',
          duration: '12:45',
          views: 890,
          uploadDate: '2024-01-10',
          thumbnail:
            'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
          videoUrl: '',
        },
        {
          id: 'v3',
          title: 'Database Integration',
          description: 'Connect your Node.js app to MongoDB',
          duration: '18:20',
          views: 756,
          uploadDate: '2024-01-08',
          thumbnail:
            'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300',
          videoUrl: '',
        },
      ],
      students: 189,
      rating: 4.7,
      duration: '12h 45m',
      lastUpdated: '5 days ago',
      status: 'published',
      created_by_educator: 'educator123',
    },
  ]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCourse = () => {
    navigate('/educator/upload-video');
  };

  const handleManageCourse = (courseId) => {
    navigate(`/upload?courseId=${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">EduHub</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateCourse}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Course</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Educator!
          </h2>
          <p className="text-gray-600">
            Manage your courses and track your teaching progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600">
                +12% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((acc, course) => acc + course.students, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600">
                +8% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Videos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce(
                    (acc, course) => acc + course.videos.length,
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600">
                +15% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600">
                +0.2 from last month
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <button
                    onClick={() => handleManageCourse(course.id)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-sm transition-all duration-200"
                    title="Upload Video"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleManageCourse(course.id)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-sm transition-all duration-200"
                    title="View Course"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Video className="w-4 h-4 mr-1" />
                      {course.videos.length} videos
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                Ready to create your next course?
              </h3>
              <p className="text-blue-100">
                Share your knowledge and help students learn new skills
              </p>
            </div>
            <button
              onClick={handleCreateCourse}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Course</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
