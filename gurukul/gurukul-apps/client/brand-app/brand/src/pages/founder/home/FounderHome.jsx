import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Star,
  Calendar,
  Award,
  Target,
  Activity,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  X,
  LinkIcon,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createReferral } from '../../../redux/api/founderAPI';

export const FounderHome = () => {
  const [showAddEducator, setShowAddEducator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { branding } = useSelector((state) => state.brandDetails);

  // Mock data - replace with actual API calls
  const dashboardStats = {
    totalRevenue: 125430,
    totalCourses: 247,
    totalEducators: 45,
    totalUsers: 12450,
    monthlyGrowth: {
      revenue: 12.5,
      courses: 8.3,
      educators: 15.2,
      users: 22.1,
    },
  };

  const recentEducators = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Web Development',
      courses: 8,
      students: 1250,
      revenue: 15420,
      rating: 4.9,
      joinDate: '2024-01-15',
      status: 'active',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Data Science',
      courses: 12,
      students: 2100,
      revenue: 28750,
      rating: 4.8,
      joinDate: '2023-11-20',
      status: 'active',
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      specialization: 'UI/UX Design',
      courses: 6,
      students: 890,
      revenue: 12300,
      rating: 4.7,
      joinDate: '2024-02-10',
      status: 'pending',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  const topCourses = [
    {
      id: '1',
      title: 'Complete React Development Bootcamp',
      educator: 'Dr. Sarah Johnson',
      students: 1250,
      revenue: 15420,
      rating: 4.9,
      status: 'published',
      category: 'Web Development',
    },
    {
      id: '2',
      title: 'Python for Data Science',
      educator: 'Michael Chen',
      students: 2100,
      revenue: 28750,
      rating: 4.8,
      status: 'published',
      category: 'Data Science',
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      educator: 'Emily Rodriguez',
      students: 890,
      revenue: 12300,
      rating: 4.7,
      status: 'review',
      category: 'Design',
    },
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">
              +{change}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-8 w-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const AddEducatorModal = () => {
    const [referralLink, setReferralLink] = useState('');
    const dispatch = useDispatch();
    const data = {};
    let dummyReferralId = '';
    const generateReferralLink = () => {
      dispatch(
        createReferral({ dispatch, data, brandId: branding.brandId })
      ).then((res) => {
        res.payload.statusCode < 400
          ? (dummyReferralId = res.payload.data.token)
          : null;
        const link = `${window.location.origin}/register/signup?ref=${dummyReferralId}`;
        setReferralLink(link);
      });
    };

    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundColor: `${branding.brandColor}10`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Invite Educator
              </h2>
              <button
                onClick={() => setShowAddEducator(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {!referralLink ? (
                <button
                  onClick={generateReferralLink}
                  className="w-full px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Generate Referral Link
                </button>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <LinkIcon className="h-5 w-5 text-gray-500" />
                    <a
                      href={referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all underline"
                    >
                      {referralLink}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className={`transition-all duration-300 mx-auto`}>
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-18 rounded-lg z-30">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Founder Dashboard
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Manage your platform and track performance
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-20 focus:border-transparent"
                  style={{
                    focusRingColor: `${branding.brandColor}33`,
                  }}
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <button
                  onClick={() => setShowAddEducator(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="hidden sm:block">Add Educator</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="py-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
              change={dashboardStats.monthlyGrowth.revenue}
              icon={DollarSign}
              color="#10B981"
            />
            <StatCard
              title="Total Courses"
              value={dashboardStats.totalCourses}
              change={dashboardStats.monthlyGrowth.courses}
              icon={BookOpen}
              color="#F59E0B"
            />
            <StatCard
              title="Total Educators"
              value={dashboardStats.totalEducators}
              change={dashboardStats.monthlyGrowth.educators}
              icon={Users}
              color="#8B5CF6"
            />
            <StatCard
              title="Total Users"
              value={dashboardStats.totalUsers.toLocaleString()}
              change={dashboardStats.monthlyGrowth.users}
              icon={Target}
              color={branding.brandColor}
            />
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue Trend
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Revenue chart will be displayed here
                  </p>
                </div>
              </div>
            </div>

            {/* Top Performing Courses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Performing Courses
              </h3>
              <div className="space-y-4">
                {topCourses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        by {course.educator}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {course.students} students
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${course.revenue.toLocaleString()}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : course.status === 'review'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Educators */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Educators
              </h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search educators..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-20 focus:border-transparent"
                    onFocus={(e) => {
                      e.target.style.borderColor = branding.brandColor;
                      e.target.style.boxShadow = `0 0 0 3px ${branding.brandColor}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D1D5DB';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Filter</span>
                </button>
              </div>
            </div>

            {/* Educators Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentEducators.map((educator) => (
                <div
                  key={educator.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={educator.avatar}
                      alt={educator.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          educator.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : educator.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {educator.status}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {educator.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {educator.specialization}
                    </p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {educator.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="truncate">{educator.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{educator.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {educator.courses}
                      </div>
                      <div className="text-xs text-gray-600">Courses</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {educator.students}
                      </div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        ${educator.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <Eye className="h-4 w-4 mx-auto" />
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <Edit className="h-4 w-4 mx-auto" />
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200">
                      <Trash2 className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Educator Modal */}
      {showAddEducator && <AddEducatorModal />}
    </div>
  );
};
