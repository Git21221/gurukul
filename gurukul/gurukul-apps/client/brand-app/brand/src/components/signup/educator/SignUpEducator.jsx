import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  School,
  BookOpen,
  Users,
  Eye,
  EyeOff,
  Check,
  Loader2,
  AlertCircle,
  Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReferral,
  verifyReferralToken,
} from '../../../redux/api/founderAPI';
import { registerEducator } from '../../../redux/api/educatorAPI';

export const SignUpEducator = () => {
  const { branding } = useSelector((state) => state.brandDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    subjects: '',
    experience: '',
    agreeToTerms: false,
  });
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  console.log('SignUpEducator params:', token);
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-700 mb-3">
            Missing Token
          </h2>
          <p className="text-gray-600 mb-6">
            No invitation token was provided. Please use the invitation link
            sent to your email.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-700">
              <strong>Looking for your invitation?</strong> Check your email for
              the signup link.
            </p>
          </div>
          <button className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            Request New Invitation
          </button>
        </div>
      </div>
    );
  }
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const data = {
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };
    dispatch(registerEducator({ dispatch, data, token })).then((res) => {
      if (res.payload.statusCode < 400) {
        navigate('/login');
      }
    });
  };

  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    dispatch(
      verifyReferralToken({ dispatch, token, brandId: branding.brandId })
    ).then((res) => {
      console.log(res);
      if (res.payload.statusCode < 400) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
    });
  }, [token]);

  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Validating Access
          </h2>
          <p className="text-gray-600 mb-4">
            Please wait while we verify your invitation token...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full animate-pulse"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Your invitation token is invalid or has expired. Please contact the
            founder for assistance.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">
              <strong>Need help?</strong> Reach out to our team for a new
              invitation link.
            </p>
          </div>
          <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Contact Support
          </button>
        </div>
      </div>
    );
  }
  function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).padStart(2, '0');
    const GG = G.toString(16).padStart(2, '0');
    const BB = B.toString(16).padStart(2, '0');

    return `#${RR}${GG}${BB}`;
  }

  return (
    <main className="flex-1 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br rounded-2xl mb-6"
            style={{ background: branding?.brandColor }}
          >
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Teaching Community
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Empower the next generation of learners
          </p>
          <p className="text-gray-500 max-w-md mx-auto">
            Connect with fellow educators, share resources, and access
            cutting-edge teaching tools to enhance your classroom experience.
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User
                  className="w-5 h-5 mr-2"
                  style={{ color: branding.brandColor }}
                />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `1px solid #d1d5db`,
                      outline: 'none',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.2s ease',
                      '--brand-focus': branding.brandColor,
                    }}
                    className="branded-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `1px solid #d1d5db`,
                      outline: 'none',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.2s ease',
                      '--brand-focus': branding.brandColor,
                    }}
                    className="branded-input"
                  />
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mail
                  className="w-5 h-5 mr-2"
                  style={{ color: branding.brandColor }}
                />
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `1px solid #d1d5db`,
                      outline: 'none',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.2s ease',
                      '--brand-focus': branding.brandColor,
                    }}
                    className="branded-input"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: `1px solid #d1d5db`,
                          outline: 'none',
                          backgroundColor: '#f9fafb',
                          transition: 'all 0.2s ease',
                          '--brand-focus': branding.brandColor,
                        }}
                        className="branded-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: `1px solid #d1d5db`,
                          outline: 'none',
                          backgroundColor: '#f9fafb',
                          transition: 'all 0.2s ease',
                          '--brand-focus': branding.brandColor,
                        }}
                        className="branded-input"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <School
                  className="w-5 h-5 mr-2"
                  style={{ color: branding.brandColor }}
                />
                Professional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    School/Institution
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder="Enter your school or institution"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `1px solid #d1d5db`,
                      outline: 'none',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.2s ease',
                      '--brand-focus': branding.brandColor,
                    }}
                    className="branded-input"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="subjects"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject Areas
                    </label>
                    <input
                      type="text"
                      id="subjects"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleInputChange}
                      placeholder="e.g., Mathematics, Science"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid #d1d5db`,
                        outline: 'none',
                        backgroundColor: '#f9fafb',
                        transition: 'all 0.2s ease',
                        '--brand-focus': branding.brandColor,
                      }}
                      className="branded-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid #d1d5db`,
                        outline: 'none',
                        backgroundColor: '#f9fafb',
                        transition: 'all 0.2s ease',
                        '--brand-focus': branding.brandColor,
                      }}
                      className="branded-input"
                    >
                      <option value="">Select experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-20">11-20 years</option>
                      <option value="20+">20+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    accentColor: branding.brandColor,
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    boxShadow: '0 0 0 2px transparent',
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = `0 0 0 2px ${branding.brandColor}`)
                  }
                  onBlur={(e) =>
                    (e.target.style.boxShadow = '0 0 0 2px transparent')
                  }
                />
              </div>
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <button
                  type="button"
                  style={{
                    color: branding.brandColor,
                    textDecoration: 'underline',
                  }}
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  style={{
                    color: branding.brandColor,
                    textDecoration: 'underline',
                  }}
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: branding.brandColor,
                color: 'white',
                fontWeight: '600',
                padding: '16px 24px',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                transform: 'scale(1)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                // Darken the color a bit for hover
                e.target.style.backgroundColor = shadeColor(
                  branding.brandColor,
                  -10
                );
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = branding.brandColor;
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 2px ${branding.brandColor}, 0 0 0 4px white`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow =
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
            >
              Create Educator Account
            </button>
          </form>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Rich Resources</h3>
            <p className="text-sm text-gray-600">
              Access thousands of lesson plans, activities, and teaching
              materials.
            </p>
          </div>
          <div className="text-center p-6 bg-white/50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-sm text-gray-600">
              Connect with educators worldwide and share best practices.
            </p>
          </div>
          <div className="text-center p-6 bg-white/50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Assessment Tools
            </h3>
            <p className="text-sm text-gray-600">
              Create and manage assessments with advanced analytics.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
