import React, { useState } from 'react';
import { TrendingUp, Search, BarChart2, ShoppingBag } from 'lucide-react';

export default function ProductResearch() {
  const [trendingProducts] = useState([
    {
      name: 'Smart Water Bottle',
      trend: 'up',
      growth: '+45%',
      category: 'Health & Fitness',
      competition: 'Medium',
      potential: 'High'
    },
    {
      name: 'Eco-Friendly Lunch Box',
      trend: 'up',
      growth: '+38%',
      category: 'Home & Kitchen',
      competition: 'Low',
      potential: 'High'
    },
    {
      name: 'LED Plant Grow Light',
      trend: 'up',
      growth: '+52%',
      category: 'Garden & Plants',
      competition: 'Medium',
      potential: 'Very High'
    }
  ]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products or niches..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Analyze Market
        </button>
      </div>

      {/* Trending Products */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Trending Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingProducts.map((product, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {product.growth}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Competition:</span>
                  <span className="font-medium">{product.competition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Potential:</span>
                  <span className="font-medium">{product.potential}</span>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                View Analysis
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="h-6 w-6 text-indigo-600" />
            <h3 className="font-semibold">Market Growth</h3>
          </div>
          <p className="text-3xl font-bold text-indigo-600">+42%</p>
          <p className="text-sm text-gray-600 mt-2">Average growth rate in selected niches</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold">Sales Potential</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">$12.4K</p>
          <p className="text-sm text-gray-600 mt-2">Estimated monthly revenue per product</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold">Trend Score</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">8.5/10</p>
          <p className="text-sm text-gray-600 mt-2">Average trend strength indicator</p>
        </div>
      </div>
    </div>
  );
}