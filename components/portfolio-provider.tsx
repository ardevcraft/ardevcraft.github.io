'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/lib/types';

type Theme = 'light' | 'dark';

interface PortfolioContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('portfolio-locale');
    if (savedLocale === 'en' || savedLocale === 'bn') {
      setLocaleState(savedLocale);
    }

    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : prefersDark
        ? 'dark'
        : 'light';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem('portfolio-locale', nextLocale);
    document.documentElement.lang = nextLocale === 'bn' ? 'bn' : 'en';
  };

  const toggleLocale = () => setLocale(locale === 'en' ? 'bn' : 'en');

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('portfolio-theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, theme, toggleTheme }),
    [locale, theme],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used inside PortfolioProvider');
  }
  return context;
}
