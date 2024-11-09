import React, { useState } from 'react';
import ProductResearch from './ProductResearch';
import MarketingCampaigns from './MarketingCampaigns';
import PricingOptimizer from './PricingOptimizer';
import CustomerJourney from './CustomerJourney';
import SocialContent from './SocialContent';
import InfluencerFinder from './InfluencerFinder';
import SentimentAnalysis from './SentimentAnalysis';
import ROIDashboard from './ROIDashboard';
import PostPurchase from './PostPurchase';
import ABTesting from './ABTesting';

export default function EcomBoostDashboard() {
  const [activeTab, setActiveTab] = useState('research');

  const tabs = [
    { id: 'research', name: 'Product Research', component: ProductResearch },
    { id: 'marketing', name: 'Marketing Campaigns', component: MarketingCampaigns },
    { id: 'pricing', name: 'Pricing Optimizer', component: PricingOptimizer },
    { id: 'customer', name: 'Customer Journey', component: CustomerJourney },
    { id: 'social', name: 'Social Content', component: SocialContent },
    { id: 'influencer', name: 'Influencer Finder', component: InfluencerFinder },
    { id: 'sentiment', name: 'Sentiment Analysis', component: SentimentAnalysis },
    { id: 'roi', name: 'ROI Dashboard', component: ROIDashboard },
    { id: 'postpurchase', name: 'Post-Purchase', component: PostPurchase },
    { id: 'testing', name: 'A/B Testing', component: ABTesting }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProductResearch;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">EcomBoost AI</h1>
        <p className="mt-2 text-xl text-gray-600">Your AI-Powered E-commerce Growth Engine</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Component */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ActiveComponent />
      </div>
    </div>
  );
}