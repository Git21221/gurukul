import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BrandColorStep from '../../components/create-brand/steps/BrandColorStep';
import BrandLogoStep from '../../components/create-brand/steps/BrandLogoStep';
import BrandNameStep from '../../components/create-brand/steps/BrandNameStep';
import LivePreview from '../../components/create-brand/LivePreview';
import StepIndicator from '../../components/create-brand/StepIndicator';
import { getSvgStringFromIconName } from '../../utils/iconToSvg';
import { useDispatch, useSelector } from 'react-redux';
import BrandSuccessModal from '../../components/create-brand/BrandSuccessModal';
import { createBrand } from '../../redux/api/brandAPI';

const CreateBrand = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [brandData, setBrandData] = useState({
    name: '',
    logo: null,
    logoType: 'icon',
    color: '#4A90E2',
  });
  const { founder } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { brand_url } = useSelector((state) => state.brand);

  const totalSteps = 3;

  const updateBrandData = (updates) => {
    setBrandData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return brandData.name.trim().length > 0;
      case 2:
        return brandData.logo !== null;
      case 3:
        return brandData.color !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BrandNameStep
            value={brandData.name}
            onChange={(name) => updateBrandData({ name })}
          />
        );
      case 2:
        return (
          <BrandLogoStep
            logo={brandData.logo}
            logoType={brandData.logoType}
            onLogoChange={(logo, logoType) =>
              updateBrandData({ logo, logoType })
            }
          />
        );
      case 3:
        return (
          <BrandColorStep
            color={brandData.color}
            onChange={(color) => updateBrandData({ color })}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "What's Your Brand Name?";
      case 2:
        return 'Choose Your Brand Logo';
      case 3:
        return 'Pick Your Brand Color';
      default:
        return '';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Enter a memorable name for your brand';
      case 2:
        return 'Select a unique logo for your website';
      case 3:
        return 'Choose a color that represents your brand';
      default:
        return '';
    }
  };

  const handleComplete = () => {
    if (brandData.logoType === 'icon') {
      const svgString = getSvgStringFromIconName(
        brandData.logo,
        brandData.color
      );
      const base64 = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
      const data = {
        name: brandData.name,
        logo: base64,
        color: brandData.color,
        founderName: founder.fullName.split(' ')[0].toLowerCase(),
      };
      console.log('Brand Data:', data);
      dispatch(createBrand({ dispatch, data })).then(() => {
        setModalOpen(true);
      });
    } else {
      const data = {
        name: brandData.name,
        logo: brandData.logo,
        color: brandData.color,
        founderName: founder.fullName.split(' ')[0].toLowerCase(),
      };
      console.log('Brand Data:', data);
      // dispatch(createBrand({ dispatch, data })).then(() => {
      //   setModalOpen(true);
      // });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandSuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        brandUrl={brand_url}
      />
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="gurukul-logo text-3xl text-gray-900 uppercase">
            Gurukul
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Live Preview */}
          <div className="order-2 lg:order-1">
            <LivePreview brandData={brandData} />
          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2 flex flex-col">
            <div className="p-8 flex-1">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {getStepTitle()}
                </h1>
                <p className="text-gray-600">{getStepSubtitle()}</p>
              </div>

              <div className="flex-1">{renderStep()}</div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>

                <div className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>

                <button
                  onClick={
                    currentStep === totalSteps ? handleComplete : nextStep
                  }
                  disabled={!canProceed()}
                  className="flex items-center px-6 py-3 rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium bg-[#4A90E2] text-white hover:opacity-90 focus:ring-[#4A90E2]"
                >
                  {currentStep === totalSteps ? 'Complete' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
