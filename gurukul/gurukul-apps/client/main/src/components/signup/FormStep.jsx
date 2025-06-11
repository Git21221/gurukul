import React, { ReactNode } from 'react';

export const FormStep = ({
  title,
  subtitle,
  children,
  isActive,
  direction,
}) => {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
        isActive
          ? 'translate-x-0 opacity-100'
          : direction === 'left'
            ? '-translate-x-full opacity-0'
            : direction === 'right'
              ? 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-0'
      }`}
    >
      <div className="h-full flex flex-col justify-center">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title.split(' ').map((word, index) =>
              word === 'GURUKUL' ? (
                <span
                  key={index}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gurukul-primary-color)] to-[var(--gurukul-primary-color)]"
                >
                  {word}
                </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
};
