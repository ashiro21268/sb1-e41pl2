import React, { useState } from 'react';
import { MessageSquare, Save } from 'lucide-react';

export default function AutoResponse() {
  const [responses, setResponses] = useState({
    facebook: {
      enabled: true,
      template: "Thanks for your interest! Check out more details here: {link}"
    },
    instagram: {
      enabled: true,
      template: "Hi! Thanks for commenting! I've sent you a DM with more information."
    },
    threads: {
      enabled: true,
      template: "Thanks for engaging! Here's more info: {link}"
    },
    tiktok: {
      enabled: true,
      template: "Thanks for your comment! Check your DMs for more details!"
    }
  });

  const handleToggle = (platform: string) => {
    setResponses(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof typeof prev],
        enabled: !prev[platform as keyof typeof prev].enabled
      }
    }));
  };

  const handleTemplateChange = (platform: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof typeof prev],
        template: value
      }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Auto-Response Settings</h3>
      </div>

      <div className="space-y-6">
        {Object.entries(responses).map(([platform, settings]) => (
          <div key={platform} className="border-b border-gray-100 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium capitalize">{platform}</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={() => handleToggle(platform)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <textarea
              value={settings.template}
              onChange={(e) => handleTemplateChange(platform, e.target.value)}
              disabled={!settings.enabled}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="Enter response template..."
            />
          </div>
        ))}
      </div>

      <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        <Save className="h-4 w-4" />
        Save Settings
      </button>
    </div>
  );
}