import React from 'react';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { MegaMenu } from './MegaMenu';
import { ChevronDown, Search, User, Globe, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

interface DesktopNavigationProps {
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activeMenu,
  setActiveMenu
}) => {
  const { currentUser, logout, openAuth, openSearch, openLanguage } = useApp();
  const navigate = useNavigate();
  const activeItem = NAVIGATION_ITEMS.find(item => item.id === activeMenu);

  return (
    <div className="relative bg-white border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
        
        {/* Left: Brand Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" onClick={() => setActiveMenu(null)} className="flex items-center group focus:outline-none" aria-label="FedEx Home">
            <div className="font-black text-3xl sm:text-4xl tracking-tighter flex items-center leading-none">
              <span className="text-[#4D148C]">Fed</span>
              <span className="text-[#FF6600]">Ex</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
            {NAVIGATION_ITEMS.map((item) => {
              const isOpen = activeMenu === item.id;
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => setActiveMenu(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className={`px-3 py-2 text-sm font-bold flex items-center gap-1 rounded transition-colors ${
                      isOpen
                        ? 'text-[#4D148C] bg-purple-50'
                        : 'text-gray-800 hover:text-[#4D148C] hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF6600]' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Utility Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          
          <button
            onClick={openLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-[#4D148C] hover:bg-gray-100 rounded transition-colors"
          >
            <Globe className="w-4 h-4 text-[#4D148C]" />
            <span>US - English</span>
          </button>

          <button
            onClick={openSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-[#4D148C] hover:bg-gray-100 rounded transition-colors"
            aria-label="Search fedex.com"
          >
            <Search className="w-4 h-4 text-[#4D148C]" />
            <span>Search</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-gray-300">
              <Link
                to="/account"
                className="flex items-center gap-2 bg-purple-50 text-[#4D148C] px-3 py-1.5 rounded text-xs font-bold hover:bg-purple-100 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{currentUser}</span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-gray-300">
              <button
                onClick={() => openAuth('login')}
                className="flex items-center gap-1.5 text-xs font-bold text-[#4D148C] hover:underline px-2 py-1.5"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
              <Link
                to="/account?mode=signup"
                className="px-3.5 py-1.5 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-xs rounded transition-colors shadow-xs"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {activeItem && (
        <MegaMenu
          item={activeItem}
          isOpen={true}
          onClose={() => setActiveMenu(null)}
          onNavigate={(path) => {
            setActiveMenu(null);
            navigate(path);
          }}
        />
      )}
    </div>
  );
};
