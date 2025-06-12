import React, { useRef } from 'react';
import { Upload, Star, Heart, Zap, Shield, Crown, Gem } from 'lucide-react';

const BrandLogoStep = ({ logo, logoType, onLogoChange }) => {
  const fileInputRef = useRef(null);

  const iconOptions = [
    { icon: Star, name: 'Star' },
    { icon: Heart, name: 'Heart' },
    { icon: Zap, name: 'Lightning' },
    { icon: Shield, name: 'Shield' },
    { icon: Crown, name: 'Crown' },
    { icon: Gem, name: 'Gem' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        onLogoChange(result, 'upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconSelect = (iconName) => {
    onLogoChange(iconName, 'icon');
  };

  return (
    <div className="space-y-8">
      {/* Upload Option */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Custom Logo
        </h3>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Click to upload your logo</p>
          <p className="text-sm text-gray-500">PNG, JPG, SVG up to 5MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or choose an icon</span>
        </div>
      </div>

      {/* Icon Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Select an Icon
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {iconOptions.map(({ icon: Icon, name }) => (
            <button
              key={name}
              onClick={() => handleIconSelect(name)}
              className={`
                p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-all duration-200
                ${
                  logo === name && logoType === 'icon'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <Icon className="w-8 h-8" />
              <span className="text-sm font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogoStep;
