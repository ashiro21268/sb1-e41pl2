import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "29",
      features: [
        "500 Products",
        "2 Store Connections",
        "Basic Automation",
        "Email Support",
        "Market Research Tools",
        "Order Tracking"
      ]
    },
    {
      name: "Professional",
      price: "79",
      popular: true,
      features: [
        "2,500 Products",
        "5 Store Connections",
        "Advanced Automation",
        "Priority Support",
        "Advanced Analytics",
        "Price Optimization",
        "Bulk Processing"
      ]
    },
    {
      name: "Enterprise",
      price: "199",
      features: [
        "Unlimited Products",
        "Unlimited Stores",
        "Custom Automation",
        "24/7 Support",
        "Custom Analytics",
        "API Access",
        "Dedicated Manager"
      ]
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-xl text-gray-600">Choose the perfect plan for your business</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-indigo-600' : ''}`}>
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-indigo-600 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-3 px-4 rounded-lg font-semibold ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}