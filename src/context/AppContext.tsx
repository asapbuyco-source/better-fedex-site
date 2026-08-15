import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, AuthUser } from '../services/authService';

export type AuthMode = 'login' | 'signup';

interface AppContextValue {
  currentUser: string | null;
  currentEmail: string | null;
  login: (userName: string, email?: string) => void;
  logout: () => void;
  openAuth: (mode: AuthMode) => void;
  openSearch: () => void;
  openLanguage: () => void;
  authModal: { isOpen: boolean; mode: AuthMode };
  closeAuth: () => void;
  searchOpen: boolean;
  closeSearch: () => void;
  languageOpen: boolean;
  closeLanguage: () => void;
  currentLang: string;
  setLang: (lang: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem('fedex_user');
    } catch {
      return null;
    }
  });
  const [currentEmail, setCurrentEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('fedex_user_email');
    } catch {
      return null;
    }
  });
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: AuthMode }>({ isOpen: false, mode: 'login' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setLangState] = useState<string>(() => {
    try {
      return localStorage.getItem('fedex_lang') || 'US - English';
    } catch {
      return 'US - English';
    }
  });

  // Restore Firebase Auth session on load
  useEffect(() => {
    authService.restore().then((user: AuthUser | null) => {
      if (user) {
        setCurrentUser(user.displayName);
        setCurrentEmail(user.email);
        try {
          localStorage.setItem('fedex_user', user.displayName);
          localStorage.setItem('fedex_user_email', user.email);
        } catch { /* ignore */ }
      }
    });
  }, []);

  useEffect(() => {
    document.title = 'FedEx | Tracking, Shipping, and Locations | United States';
  }, []);

  const login = (userName: string, email?: string) => {
    setCurrentUser(userName);
    setCurrentEmail(email ?? null);
    try {
      localStorage.setItem('fedex_user', userName);
      if (email) localStorage.setItem('fedex_user_email', email);
      else localStorage.removeItem('fedex_user_email');
    } catch { /* ignore */ }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentEmail(null);
    try {
      localStorage.removeItem('fedex_user');
      localStorage.removeItem('fedex_user_email');
      localStorage.removeItem('fedex_user_name');
    } catch { /* ignore */ }
    void authService.signOut();
  };

  const setLang = (lang: string) => {
    setLangState(lang);
    try { localStorage.setItem('fedex_lang', lang); } catch { /* ignore */ }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentEmail,
        login,
        logout,
        openAuth: (mode) => setAuthModal({ isOpen: true, mode }),
        authModal,
        closeAuth: () => setAuthModal((m) => ({ ...m, isOpen: false })),
        openSearch: () => setSearchOpen(true),
        searchOpen,
        closeSearch: () => setSearchOpen(false),
        openLanguage: () => setLanguageOpen(true),
        languageOpen,
        closeLanguage: () => setLanguageOpen(false),
        currentLang,
        setLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
