import React from 'react';

const BrandNameStep = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        {/* <label
          htmlFor="brandName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Brand Name
        </label> */}
        <input
          type="text"
          id="brandName"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your brand name..."
          className="w-full px-6 py-7 rounded-full border text-gray-700 text-base placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[var(--gurukul-primary-color)] transition-all duration-200 border-gray-200 hover:border-gray-300"
          autoFocus
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Tips for choosing a great brand name:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep it short and memorable</li>
          <li>• Make it easy to pronounce and spell</li>
          <li>• Ensure it reflects your brand values</li>
          <li>• Check if the domain is available</li>
        </ul>
      </div>
    </div>
  );
};

export default BrandNameStep;
