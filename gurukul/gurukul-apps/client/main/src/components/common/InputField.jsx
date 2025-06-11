import React from 'react';

export const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div className="space-y-3">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-6 py-7 rounded-full border text-gray-700 text-base placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[var(--gurukul-primary-color)] transition-all duration-200
          ${error ? 'border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-500' : 'border-gray-200 hover:border-gray-300'}
        `}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold">
            !
          </span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
