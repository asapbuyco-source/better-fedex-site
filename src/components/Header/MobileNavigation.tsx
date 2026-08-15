import React, { useState } from 'react';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { Menu, X, ChevronDown, Search, User, Globe, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  setIsOpen
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('shipping');
  const { currentUser, logout, openSearch, openLanguage } = useApp();
  const navigate = useNavigate();

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const goTo = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="lg:hidden bg-[#4D148C] border-b border-[#330066] sticky top-0 z-40 shadow-xs">
      <div className="px-4 flex items-center justify-between h-[80px]">
        
        <Link to="/" className="flex items-center">
          <img
            src="/images/fedex-logo.png"
            alt="FedEx"
            className="h-9 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="p-2 text-white hover:bg-white/15 rounded-full"
            aria-label="Open Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => goTo(currentUser ? '/account' : '/account?mode=login')}
            className="p-2 text-white hover:bg-white/15 rounded-full"
            aria-label="Sign In"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-white/15 rounded-md ml-1"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-[80px] bottom-0 bg-white z-50 overflow-y-auto flex flex-col justify-between border-t border-gray-200 animate-fadeIn">
          <div className="p-4 space-y-4">
            
            {currentUser ? (
              <div className="bg-purple-50 p-3.5 rounded-lg border border-purple-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-purple-700 font-bold uppercase">Welcome back</div>
                  <div className="text-sm font-bold text-[#4D148C]">{currentUser}</div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-red-600 hover:underline px-2 py-1 bg-white rounded border border-purple-200"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => goTo('/account?mode=login')}
                  className="py-2.5 px-3 border border-[#4D148C] text-[#4D148C] font-bold text-xs rounded text-center hover:bg-purple-50"
                >
                  Log In
                </button>
                <button
                  onClick={() => goTo('/account?mode=signup')}
                  className="py-2.5 px-3 bg-[#FF6600] text-white font-bold text-xs rounded text-center hover:bg-[#E05500]"
                >
                  Sign Up & Save 40%
                </button>
              </div>
            )}

            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {NAVIGATION_ITEMS.map((item) => {
                const isExpanded = expandedSection === item.id;
                return (
                  <div key={item.id} className="py-2">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full py-2.5 flex items-center justify-between text-left text-base font-bold text-gray-800"
                    >
                      <span className="text-[#333333]">{item.label}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#FF6600] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 py-2 bg-gray-50/70 rounded-lg my-1 p-3 space-y-1">
                        {item.links.map((link, lIdx) => (
                          <button
                            key={lIdx}
                            onClick={() => goTo(link.href)}
                            className={`w-full text-left py-1.5 flex items-center justify-between ${
                              link.featured
                                ? 'text-[11px] font-black uppercase text-[#007ab7] border-t border-gray-200 pt-2.5'
                                : 'text-xs font-semibold text-gray-700 hover:text-[#4D148C]'
                            }`}
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => { setIsOpen(false); openLanguage(); }}
              className="w-full py-3 px-3 bg-gray-100 rounded-lg flex items-center justify-between text-xs font-bold text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#4D148C]" /> Country / Language
              </span>
              <span className="text-[#0068A8]">US - English</span>
            </button>
          </div>

          <div className="p-4 bg-[#4D148C] text-white text-center text-xs font-medium">
            FedEx Mobile App Available on iOS & Android
          </div>
        </div>
      )}
    </div>
  );
};
