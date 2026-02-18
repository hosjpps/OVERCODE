'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'ru' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: <T extends Record<string, unknown>>(obj: T, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  toggleLang: () => {},
  t: () => '',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
  }, []);

  const t = useCallback(
    <T extends Record<string, unknown>>(obj: T, field: string): string => {
      if (lang === 'en') {
        const enKey = `${field}En`;
        if (enKey in obj && typeof obj[enKey] === 'string') return obj[enKey] as string;
      }
      return (obj[field] as string) ?? '';
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
