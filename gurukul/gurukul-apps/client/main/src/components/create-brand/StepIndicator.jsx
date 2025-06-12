import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                ${
                  isCompleted
                    ? 'bg-[var(--gurukul-primary-color)] text-white'
                    : isCurrent
                      ? 'bg-[var(--gurukul-primary-color)] text-white'
                      : 'bg-gray-300 text-gray-600'
                }
                transition-all duration-300
              `}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
            </div>

            {stepNumber < totalSteps && (
              <div
                className={`
                  w-16 h-0.5 mx-2
                  ${stepNumber < currentStep ? 'bg-[var(--gurukul-primary-color)]' : 'bg-gray-300'}
                  transition-all duration-300
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
