import { useState, useCallback, useEffect } from 'react';
import { translations, languageNames, rtlLanguages, LanguageCode, Translation } from '@/i18n/translations';

const LANGUAGE_KEY = 'president_simulator_language';

// Detect device language
const detectDeviceLanguage = (): LanguageCode => {
  try {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase() as LanguageCode;
    
    // Check if we support this language
    if (translations[langCode]) {
      return langCode;
    }
    
    // Fallback to English
    return 'en';
  } catch {
    return 'en';
  }
};

// Get saved language or detect from device
const getInitialLanguage = (): LanguageCode => {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && translations[saved as LanguageCode]) {
      return saved as LanguageCode;
    }
    return detectDeviceLanguage();
  } catch {
    return 'en';
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(getInitialLanguage);

  // Update document direction for RTL languages
  useEffect(() => {
    const isRTL = rtlLanguages.includes(currentLanguage);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  }, []);

  const t = useCallback((key: keyof Translation): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  }, [currentLanguage]);

  const isRTL = rtlLanguages.includes(currentLanguage);

  return {
    currentLanguage,
    changeLanguage,
    t,
    isRTL,
    languageNames,
    availableLanguages: Object.keys(translations) as LanguageCode[],
  };
};
