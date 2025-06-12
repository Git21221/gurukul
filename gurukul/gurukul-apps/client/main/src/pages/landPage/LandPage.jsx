import { useSelector } from 'react-redux';
import {
  BookOpen,
  Users,
  DollarSign,
  Palette,
  Play,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';
import './landpage.css';
import Navbar from '../../components/landPage/Navbar';
import { Link } from 'react-router-dom';

export const LandPage = () => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  console.log('gurukul details:', isAuthenticated, userRole);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--gurukul-primary-text-color)] mb-6 leading-tight">
              Create Your Own
              <span className="gradient-text ">Educational Brand</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your knowledge into a thriving online business. Build
              your personalized learning platform, share video courses, and
              monetize your expertise with complete creative control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link className="cta-button" to={'/founder/create-brand'}>
                Start Building Your Brand
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <button className="demo-button">
                <Play className="w-5 h-5 mr-2 inline" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--gurukul-primary-color)] mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                50,000+
              </div>
              <div className="text-gray-600">Courses Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">$2M+</div>
              <div className="text-gray-600">Creator Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Your Brand
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From course creation to payment processing, we provide all the
              tools you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Branding
              </h3>
              <p className="text-gray-600">
                Design your unique learning platform with custom colors, logos,
                and themes that reflect your brand identity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Play className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Video Hosting
              </h3>
              <p className="text-gray-600">
                Upload and stream HD videos seamlessly with our robust hosting
                infrastructure and adaptive streaming.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Monetization Tools
              </h3>
              <p className="text-gray-600">
                Set your prices, create subscription plans, and accept payments
                globally with integrated payment processing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Student Management
              </h3>
              <p className="text-gray-600">
                Track student progress, manage enrollments, and engage with your
                community through built-in tools.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Get detailed insights into your course performance, student
                engagement, and revenue metrics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security with 99.9% uptime guarantee to keep
                your courses accessible 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Launch Your Brand in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your educational platform up and running in minutes, not
              months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 z-1 relative h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                {/* Connector Line */}
                <div
                  className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200"
                  style={{ transform: 'translateX(-50%)' }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Setup Your Brand
              </h3>
              <p className="text-gray-600">
                Choose your colors, upload your logo, and customize your
                platform to match your unique style and personality.
              </p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-20 z-1 relative h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div
                  className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200"
                  style={{ transform: 'translateX(-50%)' }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Upload Content
              </h3>
              <p className="text-gray-600">
                Add your video courses, create modules, and organize your
                content with our intuitive course builder.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 z-1 relative h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Start Earning
              </h3>
              <p className="text-gray-600">
                Set your prices, launch your courses, and start building your
                educational empire with global reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Educators Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful creators who have built thriving
              educational businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Gurukul transformed my teaching career. I've earned over
                $50,000 in my first year and reached students from 40+
                countries!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Sarah Martinez
                  </div>
                  <div className="text-gray-600 text-sm">
                    Digital Marketing Expert
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The customization options are incredible. My platform looks
                exactly how I envisioned, and my students love the experience."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">RK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Raj Kumar</div>
                  <div className="text-gray-600 text-sm">
                    Programming Instructor
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Finally, a platform that puts creators first. The support team
                is amazing and the features keep getting better!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">AL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Amanda Lee</div>
                  <div className="text-gray-600 text-sm">Language Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--gurukul-primary-color)] to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Educational Empire?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful educators who have transformed their
            knowledge into thriving online businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-[var(--gurukul-primary-color)] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg">
              <Zap className="w-5 h-5 mr-2 inline" />
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[var(--gurukul-primary-color)] transition-all">
              Schedule Demo
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="gurukul-logo uppercase text-3xl">Gurukul</span>
              </div>
              <p className="text-[var(--gurukul-primary-text-color-light)] mb-6">
                Empowering educators to build their own branded learning
                platforms and monetize their expertise.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-6 h-6 text-[var(--gurukul-primary-text-color-light)] hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-[var(--gurukul-primary-text-color-light)]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-[var(--gurukul-primary-text-color-light)]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Creator Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-[var(--gurukul-primary-text-color-light)]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Gurukul. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
