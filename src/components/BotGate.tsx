import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface BotGateProps {
  children: React.ReactNode;
}

export const BotGate: React.FC<BotGateProps> = ({ children }) => {
  const [unlocked, setUnlocked] = useState(true); // default to true to prevent flicker, then check
  const [isHuman, setIsHuman] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check if the user already passed the gate in this session
    const isUnlocked = sessionStorage.getItem('site_unlocked') === 'true';
    setUnlocked(isUnlocked);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isHuman) {
      sessionStorage.setItem('site_unlocked', 'true');
      setUnlocked(true);
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  // The gate screen shown to bots and new visitors
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <Globe className="w-12 h-12 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Please select your preferred language and verify you are human to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex items-center">
              <input
                id="human-check"
                type="checkbox"
                checked={isHuman}
                onChange={(e) => setIsHuman(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="human-check" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                I am human
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isHuman}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white transition-colors ${
              isHuman 
                ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
