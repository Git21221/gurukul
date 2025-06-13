import React from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';

const Pricing = () => {
  const { branding } = useSelector((state) => state.brandDetails);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      period: 'month',
      description: 'Perfect for getting started with learning',
      icon: Star,
      features: [
        'Access to 100+ courses',
        'HD video quality',
        'Mobile app access',
        'Basic support',
        'Course certificates',
        '30-day money back guarantee',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      originalPrice: 79,
      period: 'month',
      description: 'Most popular choice for serious learners',
      popular: true,
      icon: Crown,
      features: [
        'Access to 500+ courses',
        '4K video quality',
        'Mobile app access',
        'Priority support',
        'Verified certificates',
        'Downloadable content',
        'Live workshops',
        'Career guidance',
        '60-day money back guarantee',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'Advanced features for teams and businesses',
      icon: Zap,
      features: [
        'Unlimited course access',
        '4K video quality',
        'Multi-device support',
        '24/7 dedicated support',
        'Advanced certificates',
        'Downloadable content',
        'Live workshops & events',
        'Personal mentorship',
        'Team management',
        'Custom learning paths',
        'Advanced analytics',
        '90-day money back guarantee',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start with our free trial, then choose the plan that fits your
            learning goals. Cancel anytime with our money-back guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 ${
                plan.popular ? 'outline-2' : ''
              }`}
              style={plan.popular ? { outlineColor: branding.brandColor } : {}}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  className="absolute top-0 left-0 right-0 text-center py-3 text-white font-semibold text-sm"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${branding.brandColor}20` }}
                  >
                    <plan.icon
                      className="h-8 w-8"
                      style={{ color: branding.brandColor }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>

                  {plan.originalPrice && (
                    <div className="mt-2">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: branding.brandColor }}
                      >
                        Save{' '}
                        {Math.round(
                          ((plan.originalPrice - plan.price) /
                            plan.originalPrice) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check
                        className="h-5 w-5 flex-shrink-0 mt-0.5"
                        style={{ color: branding.brandColor }}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105 hover:text-white ${
                    plan.popular
                      ? 'text-white shadow-lg'
                      : 'border-2 text-gray-700'
                  }`}
                  style={
                    plan.popular
                      ? { backgroundColor: branding.brandColor }
                      : {
                          borderColor: branding.brandColor,
                          color: branding.brandColor,
                        }
                  }
                  onMouseOver={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.backgroundColor =
                        branding.brandColor;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {plan.popular ? 'Start Pro Trial' : 'Start Free Trial'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a free 7-day trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ Money-back guarantee</span>
            <span>✓ 24/7 support</span>
            <span>✓ Instant access</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
