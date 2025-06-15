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
  Copy,
  MessageCircle,
  MessageSquare,
  Check,
  Sparkles,
  Loader2,
  Bell,
  Settings,
  ChevronDown,
  ArrowUpRight,
  BarChart3,
  PieChart,
  Globe,
  Clock,
  Zap,
  Shield,
  Download,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createReferral } from '../../../redux/api/founderAPI';

export const FounderHome = () => {
  const [showAddEducator, setShowAddEducator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

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
      thumbnail:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
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
      thumbnail:
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300',
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
      thumbnail:
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'new_educator',
      message: 'Dr. Sarah Johnson joined the platform',
      time: '2 hours ago',
      icon: UserPlus,
    },
    {
      id: 2,
      type: 'course_published',
      message: 'React Bootcamp was published',
      time: '4 hours ago',
      icon: BookOpen,
    },
    {
      id: 3,
      type: 'revenue',
      message: 'New payment of $299 received',
      time: '6 hours ago',
      icon: DollarSign,
    },
    {
      id: 4,
      type: 'review',
      message: 'UI/UX Course received 5-star review',
      time: '8 hours ago',
      icon: Star,
    },
  ];

  const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current"
          style={{ color }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
              <div
                className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  change > 0
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 mr-1 ${change < 0 ? 'rotate-180' : ''}`}
                />
                {Math.abs(change)}%
              </div>
            </div>
          </div>
          <div
            className="p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">vs last month</span>
          <div className="flex items-center space-x-1">
            <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(change * 2, 100)}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
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
        if (res.payload.statusCode < 400) {
          dummyReferralId = res.payload.data.token;
        }
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
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 border border-gray-100">
          <div className="relative p-8 pb-6">
            <div
              className="absolute top-0 left-0 w-full h-32 rounded-t-3xl opacity-10"
              style={{
                background: `linear-gradient(135deg, ${brandColor}40, ${brandColor}20)`,
              }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="p-4 rounded-2xl shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: `${brandColor}20`,
                    border: `2px solid ${brandColor}30`,
                  }}
                >
                  <Sparkles className="h-6 w-6" style={{ color: brandColor }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Invite Educator
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Share exclusive platform access
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-200 group"
              >
                <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:rotate-90 transition-all duration-200" />
              </button>
            </div>
          </div>

          <div className="px-8 pb-8">
            {!referralLink ? (
              <div className="text-center">
                <div className="mb-8">
                  <div
                    className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ backgroundColor: `${brandColor}15` }}
                  >
                    <LinkIcon
                      className="h-10 w-10"
                      style={{ color: brandColor }}
                    />
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Generate a unique referral link to invite educators to join
                    your platform. They'll get instant access upon registration.
                  </p>
                </div>

                <button
                  onClick={generateReferralLink}
                  disabled={isGenerating}
                  className="w-full px-8 py-4 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  style={{ backgroundColor: brandColor }}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center">
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-3" />
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
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-8 rounded-3xl border border-gray-200 shadow-inner">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-3 bg-green-100 rounded-2xl shadow-sm">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">
                        Link Generated Successfully!
                      </h3>
                      <p className="text-gray-600">
                        Share this link with educators to invite them
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <LinkIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 break-all font-mono bg-gray-50 px-4 py-3 rounded-xl border">
                          {referralLink}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="w-full mt-6 px-6 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl font-semibold transition-all duration-200 hover:shadow-md group flex items-center justify-center"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-green-600">
                          Copied to Clipboard!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 text-gray-500 mr-3 group-hover:text-gray-700" />
                        <span className="text-gray-700">Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                    <span>Share Invitation</span>
                    <div className="ml-4 h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {shareOptions.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <a
                          key={option.name}
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${option.color} text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center group relative overflow-hidden`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <Icon className="h-5 w-5 mr-4 relative z-10" />
                          <span className="relative z-10">
                            Share via {option.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>

                  <div
                    className="mt-8 p-6 rounded-2xl border"
                    style={{
                      backgroundColor: `${brandColor}10`,
                      borderColor: `${brandColor}30`,
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className="p-2 rounded-xl"
                        style={{ backgroundColor: `${brandColor}20` }}
                      >
                        <Sparkles
                          className="h-5 w-5"
                          style={{ color: brandColor }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-semibold mb-2"
                          style={{ color: brandColor }}
                        >
                          Pro Tip
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: `${brandColor}CC` }}
                        >
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    EduFounder
                  </h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium shadow-sm hover:border-gray-300 transition-all duration-200"
                style={{
                  focusRingColor: `${branding.brandColor}33`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = branding.brandColor;
                  e.target.style.boxShadow = `0 0 0 3px ${branding.brandColor}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>

              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>

              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </button>

              <button
                onClick={() => setShowAddEducator(true)}
                className="flex items-center space-x-2 px-6 py-2.5 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: branding.brandColor }}
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite Educator</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Founder! 👋
              </h2>
              <p className="text-gray-600">
                Here's what's happening with your education platform today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

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
            title="Active Courses"
            value={dashboardStats.totalCourses}
            change={dashboardStats.monthlyGrowth.courses}
            icon={BookOpen}
            color="#F59E0B"
          />
          <StatCard
            title="Educators"
            value={dashboardStats.totalEducators}
            change={dashboardStats.monthlyGrowth.educators}
            icon={Users}
            color="#8B5CF6"
          />
          <StatCard
            title="Total Students"
            value={dashboardStats.totalUsers.toLocaleString()}
            change={dashboardStats.monthlyGrowth.users}
            icon={Target}
            color={branding.brandColor}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3
                    className="h-6 w-6 mr-3"
                    style={{ color: branding.brandColor }}
                  />
                  Revenue Analytics
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Monthly revenue breakdown and trends
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1.5 text-xs font-medium text-white rounded-lg"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Revenue
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 rounded-lg">
                  Users
                </button>
              </div>
            </div>
            <div className="h-80 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-2xl flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Revenue Chart</p>
                <p className="text-gray-400 text-sm">
                  Interactive analytics coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="h-6 w-6 mr-3 text-green-600" />
                Recent Activity
              </h3>
              <button
                className="text-sm font-medium hover:opacity-80 transition-opacity duration-200"
                style={{ color: branding.brandColor }}
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Award className="h-6 w-6 mr-3 text-yellow-600" />
                Top Performing Courses
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Your most successful courses this month
              </p>
            </div>
            <button
              className="text-sm font-medium flex items-center hover:opacity-80 transition-opacity duration-200"
              style={{ color: branding.brandColor }}
            >
              View All Courses
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topCourses.map((course, index) => (
              <div
                key={course.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                    />
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: branding.brandColor }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                      {course.title}
                    </h4>
                    <p className="text-gray-600 text-xs mb-2">
                      by {course.educator}
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs font-medium text-gray-600">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {course.students} students
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">
                      ${course.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

        {/* Educators Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Users className="h-6 w-6 mr-3 text-purple-600" />
                Platform Educators
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Manage and track your educator community
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search educators..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-opacity-20 focus:border-transparent focus:bg-white transition-all duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = branding.brandColor;
                    e.target.style.boxShadow = `0 0 0 3px ${branding.brandColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 text-sm font-medium">
                  Filter
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEducators.map((educator) => (
              <div
                key={educator.id}
                className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={educator.avatar}
                        alt={educator.name}
                        className="w-14 h-14 rounded-2xl object-cover shadow-sm border-2 border-white"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          educator.status === 'active'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {educator.name}
                      </h4>
                      <p className="text-gray-600 text-xs font-medium">
                        {educator.specialization}
                      </p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">
                        {educator.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Students</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {educator.students.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Revenue</span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${educator.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 group/btn">
                    <Eye className="h-4 w-4 mx-auto text-gray-600 group-hover/btn:text-gray-800" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 group/btn">
                    <Mail className="h-4 w-4 mx-auto text-gray-600 group-hover/btn:text-gray-800" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 group/btn">
                    <Edit className="h-4 w-4 mx-auto text-gray-600 group-hover/btn:text-gray-800" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
