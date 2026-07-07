'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, type Locale } from './i18n';

type TranslationValues = (typeof translations)[Locale];

interface LocaleContextType {
  locale: Locale;
  t: TranslationValues;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev: Locale) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}
