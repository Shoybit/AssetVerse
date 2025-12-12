import React from "react";

const PackageCard = ({ pkg, onBuy, disabled, isCurrentPlan = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl ${isCurrentPlan ? 'border-2 border-primary shadow-lg' : 'border-gray-200 hover:border-primary/30'}`}>
      {isCurrentPlan && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Current Plan
          </span>
        </div>
      )}
      
      {pkg.isPopular && !isCurrentPlan && (
        <div className="absolute top-0 left-0 right-0">
          <div className="mx-auto w-32 bg-linear-to-r from-primary to-secondary text-center text-xs font-bold uppercase tracking-wide text-white py-1 rounded-b-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className={`p-6 ${isCurrentPlan ? 'bg-linear-to-br from-primary/5 to-transparent' : 'bg-white'}`}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
              {pkg.tagline && (
                <p className="text-sm text-gray-500 mt-1">{pkg.tagline}</p>
              )}
            </div>
            
            <div className="text-right">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                {pkg.billingCycle && (
                  <span className="text-sm text-gray-500 ml-1">/{pkg.billingCycle}</span>
                )}
              </div>
              {pkg.originalPrice && (
                <div className="text-xs text-gray-400 line-through">${pkg.originalPrice}</div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6 space-y-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Key Features:</div>
          {pkg.features?.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600 ml-2">{feature}</span>
            </div>
          ))}
          
          {pkg.features?.length > 4 && (
            <div className="text-xs text-gray-500 pt-2">
              +{pkg.features.length - 4} more features
            </div>
          )}
        </div>

        {/* Employee Limit with Visual Indicator */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Employee Limit</span>
            <span className="text-lg font-bold text-gray-900">{pkg.employeeLimit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-linear-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((pkg.employeeLimit / 100) * 100, 100)}%` }}
            ></div>
          </div>
          {pkg.employeeUsage && (
            <div className="text-xs text-gray-500 mt-2">
              Currently using: {pkg.employeeUsage} employees
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <button
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] ${isCurrentPlan 
              ? 'bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed' 
              : 'bg-linear-to-r from-primary to-secondary text-white hover:shadow-lg'}`}
            onClick={() => onBuy(pkg)}
            disabled={disabled || isCurrentPlan}
          >
            <div className="flex items-center justify-center">
              <span>{isCurrentPlan ? 'Current Plan' : disabled ? 'Processing...' : 'Get Started'}</span>
              {!isCurrentPlan && !disabled && (
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </div>
          </button>
          
          {!isCurrentPlan && (
            <p className="text-xs text-center text-gray-500 mt-3">
              No hidden fees • Cancel anytime • 30-day money-back guarantee
            </p>
          )}
        </div>

        {/* Badges */}
        {pkg.badges && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
            {pkg.badges.map((badge, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageCard;