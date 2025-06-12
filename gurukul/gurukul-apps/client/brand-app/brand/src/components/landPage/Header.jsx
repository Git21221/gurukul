import React from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { branding } = useSelector((state) => state.brandDetails);

  return (
    <header
      className="bg-white shadow-sm sticky top-0 z-50"
      style={{ boxShadow: `0 0 4px ${branding.brandColor}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${branding.brandColor}20` }}
            >
              <BookOpen 
                className="h-6 w-6" 
                style={{ color: branding.brandColor }} 
              />
            </div> */}
            <span
              className="text-xl font-bold"
              style={{ color: branding.brandColor }}
            >
              {branding.brandName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#courses"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Courses
            </a>
            <a
              href="#educators"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              For Educators
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Sign In
            </button>
            <button
              className="px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105"
              style={{ backgroundColor: branding.brandColor }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#courses" className="text-gray-700 hover:text-gray-900">
                Courses
              </a>
              <a
                href="#educators"
                className="text-gray-700 hover:text-gray-900"
              >
                For Educators
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900">
                Pricing
              </a>
              <a href="#about" className="text-gray-700 hover:text-gray-900">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <button className="text-left text-gray-700 hover:text-gray-900">
                  Sign In
                </button>
                <button
                  className="px-6 py-2 rounded-lg text-white font-medium text-left"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
