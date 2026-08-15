import React from 'react';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { MegaMenu } from './MegaMenu';
import { ChevronDown, Search, User, LogOut } from 'lucide-react';
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
  const { currentUser, logout, openAuth, openSearch } = useApp();
  const navigate = useNavigate();

  return (
    <div className="relative hidden lg:block bg-[#4D148C]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[96px]">

        {/* Left: Brand Logo & Main Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" onClick={() => setActiveMenu(null)} className="flex items-center group focus:outline-none" aria-label="FedEx Home">
            <img
              src="/images/fedex-logo.png"
              alt="FedEx"
              className="h-10 w-auto group-hover:opacity-90 transition-opacity"
            />
          </Link>

          <nav className="flex items-center" aria-label="Primary Navigation">
            {NAVIGATION_ITEMS.map((item) => {
              const isOpen = activeMenu === item.id;
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => setActiveMenu(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className={`h-[96px] px-4 text-base font-bold flex items-center gap-1.5 transition-colors ${
                      isOpen
                        ? 'text-white bg-white/15 shadow-[inset_0_-4px_0_0_#ffffff]'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF6600]' : 'text-white/70'
                      }`}
                    />
                  </button>
                  <MegaMenu
                    item={item}
                    isOpen={isOpen}
                    onNavigate={(path) => {
                      setActiveMenu(null);
                      navigate(path);
                    }}
                  />
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-1">
          {currentUser ? (
            <div className="flex items-center gap-1">
              <Link
                to="/account"
                className="flex items-center gap-2 bg-white/15 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-white/25 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{currentUser}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuth('login')}
              className="flex items-center gap-1.5 text-sm font-bold text-white hover:underline px-3 py-2"
            >
              <User className="w-4 h-4" /> SIGN UP / LOG IN
            </button>
          )}

          <button
            onClick={openSearch}
            className="p-2 text-white hover:bg-white/15 rounded-full transition-colors"
            aria-label="Search fedex.com"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
