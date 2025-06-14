import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/uiSlice';
import { BurgerMenu } from '@gurukul/shared-client';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { branding } = useSelector((state) => state.brandDetails);
  const { isAuthenticated } = useSelector((state) => state.auth); // check auth
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [src, setSrc] = useState('/brand_logo.svg');

  const handleError = () => {
    if (src.endsWith('.svg')) setSrc('/brand_logo.png');
    else if (src.endsWith('.png')) setSrc('/brand_logo.jpg');
    else setSrc('/brand_logo.jpeg');
  };

  return (
    <header
      className="fixed bg-white shadow-sm top-0 z-50 w-full"
      style={{ boxShadow: `0 0 4px ${branding.brandColor}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${branding.brandColor}20` }}
            >
              <img
                src={src}
                alt="Brand Logo"
                className="h-6 w-6"
                style={{ color: branding.brandColor }}
                onError={handleError}
              />
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: branding.brandColor }}
            >
              {branding.brandName}
            </span>
          </div>

          {/* Desktop Navigation (only on home page) */}
          {isHome && (
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
                href="#testimonial"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Testimonial
              </a>
            </nav>
          )}

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isHome ? (
              isAuthenticated ? (
                <button className="text-gray-700 hover:text-gray-900">
                  Profile
                </button>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </Link>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <button
                  className="px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden">
            {isHome ? (
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            ) : (
              <div className="p-2">
                {isAuthenticated ? (
                  <button className="text-gray-700 hover:text-gray-900">
                    Profile
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {isHome ? (
              <div className="flex flex-col space-y-4">
                <a
                  href="#courses"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Courses
                </a>
                <a
                  href="#educators"
                  className="text-gray-700 hover:text-gray-900"
                >
                  For Educators
                </a>
                <a
                  href="#testimonial"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Testimonial
                </a>
                <div
                  className="flex flex-col space-y-2 pt-4 border-t"
                  style={{ borderColor: branding.brandColor }}
                >
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
            ) : (
              <div className="flex flex-col space-y-2">
                {isAuthenticated ? (
                  <button className="text-left text-gray-700 hover:text-gray-900">
                    Profile
                  </button>
                ) : (
                  <button className="text-left text-gray-700 hover:text-gray-900">
                    Sign In
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
