import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Crown,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/api/userAPI';
import { loginEducator } from '../../redux/api/educatorAPI';
import { loginFounder } from '../../redux/api/founderAPI';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onBack }) => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { branding } = useSelector((state) => state.brandDetails);
  const [src, setSrc] = useState('/brand_logo' + '.' + branding?.ext);
  const roles = [
    {
      id: 'user',
      name: 'Student',
      description: 'Learn from expert-led courses',
      icon: User,
      color: '#10B981',
    },
    {
      id: 'educator',
      name: 'Educator',
      description: 'Teach and share your knowledge',
      icon: GraduationCap,
      color: '#F59E0B',
    },
    {
      id: 'founder',
      name: 'Founder',
      description: 'Manage platform and content',
      icon: Crown,
      color: '#8B5CF6',
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Login attempt:', {
        email,
        password,
        role: selectedRole,
      });
      const data = {
        email,
        password,
      };
      selectedRole === 'user'
        ? dispatch(
            loginUser({ dispatch, data, brandId: branding.brandId })
          ).then((res) => {
            if (res.payload.statusCode > 399) {
              setError(res.payload.message || 'Login failed');
            } else {
              navigate('/');
            }
          })
        : selectedRole === 'educator'
          ? dispatch(
              loginEducator({ dispatch, data, brandId: branding.brandId })
            ).then((res) => {
              if (res.payload.statusCode > 399) {
                setError(res.payload.message || 'Login failed');
              } else {
                navigate('/');
              }
            })
          : dispatch(
              loginFounder({ dispatch, data, brandId: branding.brandId })
            ).then((res) => {
              if (res.payload.statusCode > 399) {
                setError(res.payload.message || 'Login failed');
              } else {
                navigate('/');
              }
            });
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRoleData = roles.find((role) => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${branding.brandColor}20` }}
              >
                <img
                  src={src}
                  alt="Brand Logo"
                  className="h-8 w-8"
                  style={{ color: branding.brandColor }}
                />
              </div>
              <span
                className="text-2xl font-bold"
                style={{ color: branding.brandColor }}
              >
                {branding.brandName}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    selectedRole === role.id
                      ? 'border-current shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={
                    selectedRole === role.id
                      ? {
                          borderColor: role.color,
                          backgroundColor: `${role.color}10`,
                        }
                      : {}
                  }
                >
                  <role.icon
                    className="h-6 w-6 mx-auto mb-2"
                    style={{
                      color: selectedRole === role.id ? role.color : '#6B7280',
                    }}
                  />
                  <div className="text-xs font-medium text-gray-900">
                    {role.name}
                  </div>
                </button>
              ))}
            </div>
            {selectedRoleData && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                {selectedRoleData.description}
              </p>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-opacity-20 focus:border-transparent transition-all duration-200"
                style={{
                  focusRingColor: `${branding.brandColor}33`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = branding.brandColor;
                  e.target.style.boxShadow = `0 0 0 3px ${branding.brandColor}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-opacity-20 focus:border-transparent transition-all duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = branding.brandColor;
                    e.target.style.boxShadow = `0 0 0 3px ${branding.brandColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 focus:ring-2 focus:ring-opacity-20"
                  style={{
                    accentColor: branding.brandColor,
                  }}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: branding.brandColor }}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              style={{
                backgroundColor: selectedRoleData?.color || branding.brandColor,
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                `Sign in as ${selectedRoleData?.name}`
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          {selectedRole === 'user' ? (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold transition-colors duration-200 hover:underline"
                  style={{ color: branding.brandColor }}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          ) : null}

          {/* Social Login */}
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>
              
              <button className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
