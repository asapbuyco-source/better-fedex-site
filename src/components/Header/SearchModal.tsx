import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, ArrowRight, Package, MapPin, Calculator, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Tracking status',
  'FedEx Office locations',
  'Shipping rates & dimensions',
  'Delivery Manager sign up',
  'Fuel surcharge rate',
  'Schedule a pickup',
  'International customs documentation'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const quickTools: { icon: React.ReactNode; title: string; desc: string; path: string; bg: string }[] = [
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Track a Package',
      desc: 'Get status & delivery updates',
      path: '/tracking',
      bg: 'bg-purple-100 text-[#4D148C]'
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: 'Rate & Transit Estimator',
      desc: 'Calculate shipping costs & options',
      path: '/shipping/rates',
      bg: 'bg-orange-100 text-[#FF6600]'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Find Nearby Dropoff',
      desc: 'Locations, Walgreens, Drop Boxes',
      path: '/locations',
      bg: 'bg-blue-100 text-[#0068A8]'
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Customer Help Center',
      desc: 'Claims, refunds & FAQs',
      path: '/support',
      bg: 'bg-emerald-100 text-emerald-700'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-10">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center gap-3 bg-[#FAFAFA]">
          <Search className="w-6 h-6 text-[#4D148C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) go(`/tracking?number=${encodeURIComponent(query.trim())}`); }}
            placeholder="Search fedex.com for tracking, locations, services, or support..."
            className="w-full text-lg md:text-xl font-medium text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-500 hover:text-[#4D148C] uppercase tracking-wider px-2 py-1 border border-gray-300 rounded hover:border-[#4D148C]"
          >
            ESC
          </button>
        </div>

        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
          {query.trim().length === 0 ? (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {POPULAR_SEARCHES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="text-sm bg-gray-100 hover:bg-[#4D148C] hover:text-white text-gray-700 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5 opacity-60" />
                    {item}
                  </button>
                ))}
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Navigation Tools</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickTools.map((tool) => (
                  <button
                    key={tool.title}
                    onClick={() => go(tool.path)}
                    className="p-3 rounded-lg border border-gray-200 hover:border-[#FF6600] hover:bg-orange-50/50 flex items-center gap-3 text-left transition-all"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tool.bg}`}>
                      {tool.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{tool.title}</div>
                      <div className="text-xs text-gray-500">{tool.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Matching Results for "{query}"
              </p>
              
              <div className="divide-y divide-gray-100">
                <button
                  onClick={() => go(`/tracking?number=${encodeURIComponent(query.trim())}`)}
                  className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-purple-50 rounded transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-[#4D148C]" />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm group-hover:text-[#4D148C]">
                        Track shipment or order matching "{query}"
                      </span>
                      <p className="text-xs text-gray-500">FedEx Tracking Portal</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6600]" />
                </button>

                <button
                  onClick={() => go(`/locations?q=${encodeURIComponent(query.trim())}`)}
                  className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-purple-50 rounded transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#4D148C]" />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm group-hover:text-[#4D148C]">
                        Find FedEx Office location near "{query}"
                      </span>
                      <p className="text-xs text-gray-500">FedEx Location Finder</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#FF6600]" />
                </button>

                <button
                  onClick={() => go('/shipping/rates')}
                  className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-purple-50 rounded transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="w-4 h-4 text-[#4D148C]" />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm group-hover:text-[#4D148C]">
                        Calculate rates & transit options for "{query}"
                      </span>
                      <p className="text-xs text-gray-500">Shipping Rate Calculator</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6600]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
