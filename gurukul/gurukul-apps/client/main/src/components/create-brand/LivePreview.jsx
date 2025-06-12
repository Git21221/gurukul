import React from 'react';
import {
  Star,
  Heart,
  Zap,
  Shield,
  Crown,
  Gem,
  Menu,
  Search,
  ShoppingCart,
} from 'lucide-react';
// import { BrandData } from './BrandWizard';

const LivePreview = ({ brandData }) => {
  const getIconComponent = (iconName) => {
    const icons = {
      Star,
      Heart,
      Zap,
      Shield,
      Crown,
      Gem,
    };
    return icons[iconName] || Star;
  };

  const renderLogo = () => {
    if (!brandData.logo) {
      return (
        <div
          className="w-8 h-8 rounded bg-current opacity-50"
          style={{ color: brandData.color }}
        />
      );
    }

    if (brandData.logoType === 'upload') {
      return (
        <img
          src={brandData.logo}
          alt="Brand Logo"
          className="w-8 h-8 object-contain"
        />
      );
    } else {
      const IconComponent = getIconComponent(brandData.logo);
      return (
        <IconComponent className="w-8 h-8" style={{ color: brandData.color }} />
      );
    }
  };

  return (
    <div
      className="bg-white border rounded-xl shadow-lg overflow-hidden h-full"
      style={{ borderColor: brandData.color }}
    >
      <div
        className="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b"
        style={{ borderColor: brandData.color }}
      >
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
          {brandData.name
            ? `${brandData.name.toLowerCase().replace(/\s+/g, '')}.com`
            : 'yourwebsite.com'}
        </div>
      </div>

      <div className="h-full">
        {/* Navigation */}
        <nav
          style={{ borderColor: brandData.color }}
          className="bg-white border-b px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {renderLogo()}
              <span
                className="text-xl font-bold"
                style={{ color: brandData.color }}
              >
                {brandData.name || 'Your Brand'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <ShoppingCart className="w-5 h-5 text-gray-400" />
              <Menu className="w-5 h-5 text-gray-400 md:hidden" />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="px-6 py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${brandData.color}20` }}
              >
                {brandData.logoType === 'upload' && brandData.logo ? (
                  <img
                    src={brandData.logo}
                    alt="Brand Logo"
                    className="w-12 h-12 object-contain"
                  />
                ) : brandData.logo ? (
                  React.createElement(getIconComponent(brandData.logo), {
                    className: 'w-12 h-12',
                    style: { color: brandData.color },
                  })
                ) : (
                  <div
                    className="w-12 h-12 rounded bg-current opacity-50"
                    style={{ color: brandData.color }}
                  />
                )}
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to {brandData.name || 'Your Brand'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing products and services tailored just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: brandData.color }}
              >
                Get Started
              </button>
              <button className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 py-8 bg-gray-50">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${brandData.color}20` }}
                >
                  <div
                    className="w-6 h-6 rounded bg-current"
                    style={{ color: brandData.color }}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Feature {i}
                </h3>
                <p className="text-xs text-gray-600">Description text</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
