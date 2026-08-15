import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SearchModal } from '../components/Header/SearchModal';
import { AuthModal } from '../components/Header/AuthModal';
import { LanguageModal } from '../components/Footer/LanguageModal';
import { AppProvider, useApp } from '../context/AppContext';

const LayoutInner: React.FC = () => {
  const location = useLocation();
  const { authModal, closeAuth, login, searchOpen, closeSearch, languageOpen, closeLanguage, currentLang, setLang } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={closeAuth}
        onSuccess={login}
      />

      <SearchModal isOpen={searchOpen} onClose={closeSearch} />

      <LanguageModal
        isOpen={languageOpen}
        onClose={closeLanguage}
        currentLang={currentLang}
        onSelectLanguage={setLang}
      />
    </div>
  );
};

export const SiteLayout: React.FC = () => (
  <AppProvider>
    <LayoutInner />
  </AppProvider>
);
