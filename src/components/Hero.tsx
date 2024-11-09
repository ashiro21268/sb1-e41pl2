import React from 'react';
import { ArrowRight, Rocket, Bot, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl lg:text-7xl">
            Automate Your
            <span className="text-indigo-600"> Dropshipping Empire</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Scale your business with powerful automation tools. Source products, manage inventory, and fulfill orders automatically across multiple marketplaces.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 flex items-center gap-2">
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </button>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50">
              Watch Demo
            </button>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Rocket className="h-10 w-10 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Quick Setup</h3>
              <p className="mt-2 text-gray-600">Get started in minutes with our intuitive onboarding process</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Bot className="h-10 w-10 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Full Automation</h3>
              <p className="mt-2 text-gray-600">Let our AI handle product sourcing and order fulfillment</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <TrendingUp className="h-10 w-10 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Scale Fast</h3>
              <p className="mt-2 text-gray-600">Grow your business with powerful analytics and insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}