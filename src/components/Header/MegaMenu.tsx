import React, { useState } from 'react';
import { NavItem } from '../../data/navigation';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onNavigate: (path: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen, onNavigate }) => {
  const [trackingInput, setTrackingInput] = useState('');

  if (!isOpen) return null;

  const submitTracking = (e: React.FormEvent) => {
    e.preventDefault();
    const num = trackingInput.trim();
    if (num) onNavigate(`/tracking?number=${encodeURIComponent(num)}`);
  };

  return (
    <div
      className="absolute left-0 top-full w-[300px] z-50 animate-fadeIn"
      role="region"
      aria-label={`${item.label} Menu`}
    >
      <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden border border-gray-200 border-t-2 border-t-[#FF6600]">
        {item.id === 'tracking' && (
          <form onSubmit={submitTracking} className="p-4 border-b border-gray-100 bg-gray-50">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">
              Tracking ID
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Tracking ID"
                className="flex-1 h-10 px-3 text-sm border-2 border-gray-300 rounded-md focus:border-[#4D148C] outline-none font-medium bg-white"
              />
              <button
                type="submit"
                className="px-4 h-10 bg-[#FF6600] hover:bg-[#E05500] text-white font-black text-[11px] tracking-wider rounded-md transition-colors shrink-0"
              >
                TRACK
              </button>
            </div>
          </form>
        )}

        <ul className="py-2">
          {item.links.map((link, idx) => (
            <li key={idx} className={link.featured ? 'border-t border-gray-100 mt-1' : ''}>
              <button
                onClick={() => onNavigate(link.href)}
                className={`group w-full flex items-center justify-between text-left px-5 transition-colors ${
                  link.featured
                    ? 'py-3.5 text-[11px] font-black uppercase tracking-wide text-[#007ab7] hover:bg-blue-50/60'
                    : 'py-3 text-sm font-medium text-gray-800 hover:bg-purple-50/60 hover:text-[#4D148C]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-all ${
                  link.featured
                    ? 'text-[#007ab7] opacity-100'
                    : 'text-[#FF6600] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                }`} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
