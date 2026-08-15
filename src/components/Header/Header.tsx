import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';

export const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      <TopBar />
      <DesktopNavigation
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <MobileNavigation
        isOpen={mobileOpen}
        setIsOpen={setMobileOpen}
      />
    </header>
  );
};
