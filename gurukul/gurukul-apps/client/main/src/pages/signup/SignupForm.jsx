import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { FormStep } from '../../components/signup/FormStep';
import { InputField } from '../../components/common/InputField';
import { ModernIllustration } from '../../components/signup/ModernIllustration';
import { Stepper } from '../../components/signup/Stepper';
import './signupForm.css';

const steps = [
  { id: 1, title: 'Name' },
  { id: 2, title: 'Email' },
  { id: 3, title: 'Password' },
];

export const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        }
        break;

      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;

      case 3:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert(
        '🎉 Welcome to GURUKUL! Your account has been created successfully.'
      );
      setIsSubmitting(false);
    }, 2000);
  };

  const getStepDirection = (stepId) => {
    if (stepId === currentStep) return 'center';
    return stepId < currentStep ? 'left' : 'right';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex">
      {/* Left Sidebar - Stepper */}
      <div className="w-80 bg-white shadow-xl p-8 flex flex-col border-r border-gray-100">
        <div className="mb-16">
          <h1 className="brand-title">Gurukul</h1>
          <p className="text-gray-500 text-sm mt-2">
            Create your teaching journey
          </p>
        </div>

        <div className="flex-1 relative">
          <Stepper currentStep={currentStep} steps={steps} />
        </div>

        {/* Footer info */}
        <div className="mt-8 text-xs text-gray-400 space-y-1">
          <p>
            Step {currentStep} of {steps.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[var(--gurukul-primary-color)] to-[#059669] h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Form Section */}
        <div className="w-1/2 p-16 flex items-center">
          <div className="w-full max-w-lg mx-auto relative h-[500px]">
            {/* Step 1: Name */}
            <FormStep
              title="Welcome to GURUKUL"
              subtitle="Let's start your career with us. Create your own website and focus on teaching. We handle the rest."
              isActive={currentStep === 1}
              direction={getStepDirection(1)}
            >
              <InputField
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={(value) => updateFormData('fullName', value)}
                placeholder="Enter your full name"
                error={errors.fullName}
                required
              />

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleNext}
                  icon="next"
                  disabled={!formData.fullName.trim()}
                  className="px-8 py-4 text-lg"
                >
                  Next
                </Button>
              </div>
            </FormStep>

            {/* Step 2: Email */}
            <FormStep
              title="Your Email Address"
              subtitle="We'll use this to send you important updates about your courses and student progress."
              isActive={currentStep === 2}
              direction={getStepDirection(2)}
            >
              <InputField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => updateFormData('email', value)}
                placeholder="Enter your email address"
                error={errors.email}
                required
              />

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  icon="back"
                  className="px-8 py-4"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  icon="next"
                  disabled={!formData.email.trim()}
                  className="px-8 py-4 text-lg"
                >
                  Next
                </Button>
              </div>
            </FormStep>

            {/* Step 3: Password */}
            <FormStep
              title="Secure Your Account"
              subtitle="Create a strong password to protect your account and keep your teaching materials safe."
              isActive={currentStep === 3}
              direction={getStepDirection(3)}
            >
              <div className="space-y-6">
                <InputField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(value) => updateFormData('password', value)}
                  placeholder="Create a strong password"
                  error={errors.password}
                  required
                />

                <InputField
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(value) => updateFormData('confirmPassword', value)}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                  required
                />
              </div>

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  icon="back"
                  className="px-8 py-4"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={
                    !formData.password ||
                    !formData.confirmPassword ||
                    isSubmitting
                  }
                  className="px-8 py-4 text-lg min-w-[180px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </FormStep>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="w-1/2 p-16 flex items-center">
          <div className="w-full h-full">
            <ModernIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};
