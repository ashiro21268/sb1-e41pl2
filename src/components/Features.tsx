import React from 'react';
import { Search, ShoppingCart, BarChart3, Truck, Globe2, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-indigo-600" />,
      title: "Product Research",
      description: "Find winning products with our AI-powered research tools and market analysis"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-indigo-600" />,
      title: "One-Click Import",
      description: "Import products from multiple suppliers with a single click"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
      title: "Price Optimization",
      description: "Automatically adjust prices based on market conditions and competition"
    },
    {
      icon: <Truck className="h-8 w-8 text-indigo-600" />,
      title: "Auto Fulfillment",
      description: "Automatically process and fulfill orders across all your stores"
    },
    {
      icon: <Globe2 className="h-8 w-8 text-indigo-600" />,
      title: "Multi-Channel",
      description: "Sell on multiple marketplaces from a single dashboard"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Inventory Sync",
      description: "Real-time inventory synchronization across all platforms"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Powerful Features</h2>
          <p className="mt-4 text-xl text-gray-600">Everything you need to run a successful dropshipping business</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}