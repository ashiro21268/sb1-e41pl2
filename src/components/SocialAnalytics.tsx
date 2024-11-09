import React, { useState } from 'react';
import { Facebook, Instagram, Share2, TrendingUp, Users, MessageCircle, BarChart2, Send, AtSign } from 'lucide-react';
import AutoResponse from './AutoResponse';
import CrossPostModal from './CrossPostModal';

export default function SocialAnalytics() {
  const [showCrossPostModal, setShowCrossPostModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const socialMetrics = {
    facebook: { followers: 12453, engagement: 3.2, comments: 856, responses: 234 },
    instagram: { followers: 28941, engagement: 4.8, comments: 1243, responses: 567 },
    tiktok: { followers: 45231, engagement: 6.5, comments: 2891, responses: 789 },
    threads: { followers: 15678, engagement: 5.2, comments: 1567, responses: 432 }
  };

  const recentComments = [
    {
      platform: 'facebook',
      user: 'John Doe',
      comment: 'These headphones look amazing! Are they noise cancelling?',
      time: '2 minutes ago',
      responded: true
    },
    {
      platform: 'instagram',
      user: 'sarah.smith',
      comment: "What is the battery life like?",
      time: '5 minutes ago',
      responded: false
    },
    {
      platform: 'threads',
      user: 'tech_reviewer',
      comment: 'Great design! Available in other colors?',
      time: '10 minutes ago',
      responded: true
    }
  ];

  const engagementData = [65, 45, 75, 55, 85, 70, 90];
  const maxEngagement = Math.max(...engagementData);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Social Media Command Center</h2>
          <p className="mt-2 text-gray-600">Unified social media management and analytics</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setShowCrossPostModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Share2 className="h-5 w-5" />
            Cross-Post Content
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <MessageCircle className="h-5 w-5" />
            Auto-Response Settings
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex gap-8">
            {['overview', 'engagement', 'comments', 'automation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 px-2 text-sm font-medium capitalize ${
                  selectedTab === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(socialMetrics).map(([platform, data]) => (
            <div key={platform} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold capitalize">{platform}</h4>
                {platform === 'facebook' && <Facebook className="h-5 w-5 text-[#1877F2]" />}
                {platform === 'instagram' && <Instagram className="h-5 w-5 text-[#E4405F]" />}
                {platform === 'threads' && <AtSign className="h-5 w-5 text-black" />}
                {platform === 'tiktok' && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Followers</span>
                  </div>
                  <p className="font-semibold">{data.followers.toLocaleString()}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Engagement</span>
                  </div>
                  <p className="font-semibold">{data.engagement}%</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">Comments</span>
                  </div>
                  <p className="font-semibold">{data.comments}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Send className="h-4 w-4" />
                    <span className="text-sm">Responses</span>
                  </div>
                  <p className="font-semibold">{data.responses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Comments & Auto-Responses */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Comments & Auto-Responses</h3>
          <div className="space-y-4">
            {recentComments.map((comment, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                {comment.platform === 'facebook' && <Facebook className="h-5 w-5 text-[#1877F2]" />}
                {comment.platform === 'instagram' && <Instagram className="h-5 w-5 text-[#E4405F]" />}
                {comment.platform === 'threads' && <AtSign className="h-5 w-5 text-black" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-sm text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.comment}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {comment.responded ? (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <Send className="h-4 w-4" /> Auto-responded
                      </span>
                    ) : (
                      <button className="text-sm text-indigo-600 flex items-center gap-1">
                        <Send className="h-4 w-4" /> Send auto-response
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-semibold">Cross-Platform Engagement</h4>
              <p className="text-gray-600">Last 7 days performance</p>
            </div>
            <BarChart2 className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="h-64 flex items-end gap-2">
            {engagementData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-indigo-600 rounded-t-lg transition-all hover:bg-indigo-700"
                  style={{ height: `${(value / maxEngagement) * 100}%` }}
                ></div>
                <span className="text-sm text-gray-600 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Post Modal */}
      {showCrossPostModal && (
        <CrossPostModal onClose={() => setShowCrossPostModal(false)} />
      )}
    </div>
  );
}