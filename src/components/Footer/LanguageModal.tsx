import React from 'react';
import { X, Globe, Check } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
  onSelectLanguage: (lang: string) => void;
}

const REGIONS = [
  {
    continent: 'NORTH AMERICA',
    countries: [
      { name: 'United States', langs: ['US - English', 'US - Español'] },
      { name: 'Canada', langs: ['CA - English', 'CA - Français'] },
      { name: 'Mexico', langs: ['MX - Español'] }
    ]
  },
  {
    continent: 'EUROPE',
    countries: [
      { name: 'United Kingdom', langs: ['UK - English'] },
      { name: 'Germany', langs: ['DE - Deutsch', 'DE - English'] },
      { name: 'France', langs: ['FR - Français'] },
      { name: 'Spain', langs: ['ES - Español'] }
    ]
  },
  {
    continent: 'ASIA PACIFIC',
    countries: [
      { name: 'Japan', langs: ['JP - 日本語', 'JP - English'] },
      { name: 'China', langs: ['CN - 简体中文', 'CN - English'] },
      { name: 'Australia', langs: ['AU - English'] }
    ]
  }
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLanguage
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden z-10 border border-gray-200 max-h-[85vh] flex flex-col">
        
        <div className="bg-[#4D148C] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Globe className="w-5 h-5 text-[#FF6600]" /> Select Country / Language
          </div>
          <button onClick={onClose} className="p-1 text-purple-200 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {REGIONS.map((reg, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-200">
                {reg.continent}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reg.countries.map((c, cIdx) => (
                  <div key={cIdx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="font-bold text-xs text-gray-900 mb-1.5">{c.name}</div>
                    <div className="space-y-1">
                      {c.langs.map((l, lIdx) => {
                        const isSelected = currentLang === l;
                        return (
                          <button
                            key={lIdx}
                            onClick={() => {
                              onSelectLanguage(l);
                              onClose();
                            }}
                            className={`w-full py-1 px-2 text-xs font-medium rounded flex items-center justify-between text-left transition-colors ${
                              isSelected
                                ? 'bg-[#4D148C] text-white font-bold'
                                : 'hover:bg-purple-100 text-gray-700'
                            }`}
                          >
                            <span>{l}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6600]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
