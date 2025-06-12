import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginFounder } from '../../redux/api/founderAPI';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log('clicked');

    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      dispatch(
        loginFounder({
          dispatch,
          data: formData,
        })
      ).then((res) => {
        navigate('/');
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gurukul-secondary-color-light)] via-blue-50 to-[#eafff8] flex items-center justify-center p-4">
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-100/30 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-24 h-24 bg-purple-100/30 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: '4s' }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-pink-100/50 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1
                className="text-3xl mb-2"
                style={{
                  color: 'var(--gurukul-primary-color)',
                  fontFamily: 'Bruno Ace',
                }}
              >
                GURUKUL
              </h1>
              <p className="text-gray-600">
                Welcome back to your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 text-gray-800 ${
                      errors.email
                        ? 'border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-500'
                        : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                      !
                    </span>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 text-gray-800 ${
                      errors.password
                        ? 'border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-500'
                        : 'border-gray-200 bg-white/50 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                      !
                    </span>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: 'var(--gurukul-primary-color)' }}
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm font-semibold transition-colors duration-200 hover:underline"
                  style={{ color: 'var(--gurukul-primary-color)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      'var(--gurukul-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'var(--gurukul-primary-color)';
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={!formData.email || !formData.password || isSubmitting}
                className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--gurukul-primary-color)',
                  '--tw-ring-color': 'var(--gurukul-primary-light)',
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  className="font-semibold transition-colors duration-200 hover:underline"
                  style={{ color: 'var(--gurukul-primary-color)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      'var(--gurukul-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'var(--gurukul-primary-color)';
                  }}
                  onClick={() => (window.location.href = '/signup/founder')}
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 GURUKUL. Empowering educators worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};
