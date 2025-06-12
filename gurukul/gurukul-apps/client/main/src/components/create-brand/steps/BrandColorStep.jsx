import React from 'react';

const BrandColorStep = ({ color, onChange }) => {
  const predefinedColors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Green', value: '#10B981' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Slate', value: '#64748B' },
    { name: 'Gray', value: '#6B7280' },
  ];

  return (
    <div className="space-y-8">
      {/* Color Picker */}
      <div>
        <label
          htmlFor="customColor"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Custom Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            id="customColor"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#3B82F6"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or choose from presets
          </span>
        </div>
      </div>

      {/* Predefined Colors */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Popular Brand Colors
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {predefinedColors.map((colorOption) => (
            <button
              key={colorOption.name}
              onClick={() => onChange(colorOption.value)}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-white font-medium text-sm transition-all duration-200 hover:scale-105
                ${color === colorOption.value ? 'ring-4 ring-gray-400 ring-offset-2' : ''}
              `}
              style={{ backgroundColor: colorOption.value }}
            >
              {colorOption.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Psychology */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          Color Psychology Tips:
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • <strong>Blue:</strong> Trust, reliability, professionalism
          </li>
          <li>
            • <strong>Green:</strong> Growth, nature, sustainability
          </li>
          <li>
            • <strong>Red:</strong> Energy, urgency, passion
          </li>
          <li>
            • <strong>Purple:</strong> Luxury, creativity, wisdom
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BrandColorStep;
