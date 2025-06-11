import React from 'react';

export const Button = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = `
    px-6 py-3 
    rounded-full 
    text-base 
    lowercase 
    font-normal 
    transition-all 
    duration-200 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    active:scale-95 
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-[#4A90E2] 
      text-white 
      hover:opacity-90 
      focus:ring-[#4A90E2]
    `,
    secondary: `
      bg-white 
      border 
      border-gray-300 
      text-gray-700 
      hover:bg-gray-100 
      focus:ring-gray-400
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
