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
import {
  Copy,
  MessageCircle,
  MessageSquare,
  Check,
  Sparkles,
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

  const AddEducatorModal = ({ isOpen, onClose, brandColor }) => {
    const [referralLink, setReferralLink] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const dispatch = useDispatch();
    const data = {};
    let dummyReferralId = '';
    const generateReferralLink = () => {
      setIsGenerating(true);
      dispatch(
        createReferral({ dispatch, data, brandId: branding.brandId })
      ).then((res) => {
        res.payload.statusCode < 400
          ? (dummyReferralId = res.payload.data.token)
          : null;
        const link = `${window.location.origin}/signup/educator?token=${dummyReferralId}`;
        setReferralLink(link);
        setIsGenerating(false);
      });
    };

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };
    const shareOptions = [
      {
        name: 'WhatsApp',
        icon: MessageCircle,
        color: 'bg-green-500 hover:bg-green-600',
        url: `https://wa.me/?text=${encodeURIComponent(`Join our education platform! Sign up with this exclusive link: ${referralLink}`)}`,
      },
      {
        name: 'Email',
        icon: Mail,
        color: 'bg-blue-600 hover:bg-blue-700',
        url: `mailto:?subject=Join%20Our%20Education%20Platform&body=Hi!%0A%0AI'd%20like%20to%20invite%20you%20to%20join%20our%20education%20platform.%20Sign%20up%20with%20this%20exclusive%20link:%0A%0A${encodeURIComponent(referralLink)}%0A%0ALooking%20forward%20to%20having%20you%20on%20board!`,
      },
      {
        name: 'SMS',
        icon: MessageSquare,
        color: 'bg-purple-600 hover:bg-purple-700',
        url: `sms:?body=🎓%20Join%20our%20education%20platform:%20${encodeURIComponent(referralLink)}`,
      },
    ];
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="relative p-8 pb-6">
            <div
              className="absolute top-0 left-0 w-full h-24 rounded-t-3xl opacity-5"
              style={{ backgroundColor: brandColor }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="p-3 rounded-2xl shadow-lg"
                  style={{ backgroundColor: `${brandColor}15` }}
                >
                  <Sparkles className="h-6 w-6" style={{ color: brandColor }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Invite Educator
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Share access to our platform
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
              >
                <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {!referralLink ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-4">
                    <LinkIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Generate a unique referral link to invite educators to join
                    your platform. They'll get instant access upon registration.
                  </p>
                </div>

                <button
                  onClick={generateReferralLink}
                  disabled={isGenerating}
                  className="w-full px-8 py-4 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  style={{ backgroundColor: brandColor }}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center">
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3" />
                        Generating Link...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Referral Link
                      </>
                    )}
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Generated Link Display */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Link Generated Successfully!
                      </h3>
                      <p className="text-sm text-gray-600">
                        Share this link with educators to invite them
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 break-all font-mono bg-gray-50 px-3 py-2 rounded-lg">
                          {referralLink}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={copyToClipboard}
                    className="w-full mt-4 px-4 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-all duration-200 hover:shadow-sm group flex items-center justify-center"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-600">
                          Copied to Clipboard!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-gray-500 mr-2 group-hover:text-gray-700" />
                        <span className="text-gray-700">Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sharing Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span>Share Invitation</span>
                    <div className="ml-2 h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {shareOptions.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <a
                          key={option.name}
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${option.color} text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group relative overflow-hidden`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <Icon className="h-5 w-5 mr-3 relative z-10" />
                          <span className="relative z-10">
                            Share via {option.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 bg-blue-100 rounded-lg">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-800 font-medium mb-1">
                          Pro Tip
                        </p>
                        <p className="text-sm text-blue-700">
                          This link is unique and trackable. You'll be notified
                          when someone signs up using your invitation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
      {showAddEducator && (
        <AddEducatorModal
          isOpen={showAddEducator}
          onClose={() => setShowAddEducator(false)}
          brandColor={branding.brandColor}
        />
      )}
    </div>
  );
};
