import React from 'react';
import { Check } from 'lucide-react';

export const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="relative">
      <div className="space-y-12">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          // Common gradient style
          const gradientStyle = {
            backgroundImage:
              'linear-gradient(to right, var(--gurukul-primary-color), var(--gurukul-primary-color))',
          };

          const verticalGradientStyle = {
            backgroundImage:
              'linear-gradient(to bottom, var(--gurukul-primary-color), var(--gurukul-primary-color))',
          };

          return (
            <div key={step.id} className="relative flex items-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[23px] top-[50px] w-0.5 h-12 transition-all duration-500"
                  style={
                    isCompleted
                      ? verticalGradientStyle
                      : { backgroundColor: '#E5E7EB' }
                  }
                />
              )}

              {/* Step circle */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-3 transition-all duration-500 transform ${
                  isCompleted || isActive
                    ? 'text-white scale-110 shadow-lg'
                    : 'bg-white border-[var(--gurukul-primary-color)] text-[var(--gurukul-primary-color)] hover:border-[var(--gurukul-primary-color)]'
                }`}
                style={
                  isCompleted || isActive
                    ? {
                        ...gradientStyle,
                        borderColor: 'var(--gurukul-primary-color)',
                      }
                    : {}
                }
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 animate-bounce" />
                ) : (
                  <span className="text-lg font-bold">{step.id}</span>
                )}
              </div>

              {/* Step title */}
              <div className="ml-6">
                <h3
                  className={`text-lg font-semibold transition-all duration-300 ${
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </h3>
                {isActive && (
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: 'var(--gurukul-primary-color)' }}
                  >
                    Current step
                  </p>
                )}
                {isCompleted && (
                  <p className="text-sm font-medium mt-1 text-green-600">
                    Completed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
