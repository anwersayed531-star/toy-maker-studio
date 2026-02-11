import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageCode } from '@/i18n/translations';

const languageFlags: Record<string, string> = {
  ar: '🇸🇦', en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹', pt: '🇧🇷', ru: '🇷🇺',
  zh: '🇨🇳', ja: '🇯🇵', ko: '🇰🇷', hi: '🇮🇳', bn: '🇧🇩', tr: '🇹🇷', vi: '🇻🇳', th: '🇹🇭',
  id: '🇮🇩', ms: '🇲🇾', fa: '🇮🇷', ur: '🇵🇰', pl: '🇵🇱', uk: '🇺🇦', nl: '🇳🇱', sv: '🇸🇪',
  no: '🇳🇴', da: '🇩🇰', fi: '🇫🇮', el: '🇬🇷', he: '🇮🇱', cs: '🇨🇿', ro: '🇷🇴', hu: '🇭🇺',
  sk: '🇸🇰', bg: '🇧🇬', hr: '🇭🇷', sr: '🇷🇸', sl: '🇸🇮', lt: '🇱🇹', lv: '🇱🇻', et: '🇪🇪',
  sw: '🇰🇪', am: '🇪🇹', tl: '🇵🇭',
};

// Popular languages shown first
const popularLanguages: LanguageCode[] = ['ar', 'en', 'es', 'fr', 'de', 'ru', 'zh', 'ja', 'ko', 'tr', 'pt', 'hi'];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { t, currentLanguage, changeLanguage, languageNames, availableLanguages, isRTL } = useLanguage();

  const sortedLanguages = useMemo(() => {
    // Put popular languages first, then the rest alphabetically
    const popular = popularLanguages.filter(l => availableLanguages.includes(l));
    const others = availableLanguages.filter(l => !popularLanguages.includes(l));
    return [...popular, ...others];
  }, [availableLanguages]);

  const filteredLanguages = useMemo(() => {
    if (!search.trim()) return sortedLanguages;
    const q = search.toLowerCase();
    return sortedLanguages.filter(lang =>
      languageNames[lang].toLowerCase().includes(q) || lang.includes(q)
    );
  }, [search, sortedLanguages, languageNames]);

  const handleLanguageChange = useCallback((lang: LanguageCode) => {
    changeLanguage(lang);
    setIsOpen(false);
    setSearch('');
  }, [changeLanguage]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2 rounded-full px-4 py-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all shadow-sm"
      >
        <span className="text-lg">{languageFlags[currentLanguage] || '🌐'}</span>
        <span className="text-sm font-semibold">{languageNames[currentLanguage]}</span>
        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => { setIsOpen(false); setSearch(''); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, type: 'spring', damping: 25 }}
              className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  {t('selectLanguage')}
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => { setIsOpen(false); setSearch(''); }}
                  className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="px-5 py-3 border-b border-border/50">
                <div className="relative">
                  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={currentLanguage === 'ar' ? 'ابحث عن لغة...' : 'Search language...'}
                    className={`${isRTL ? 'pr-10' : 'pl-10'} h-10 rounded-xl bg-muted/50 border-0 focus-visible:ring-primary/30`}
                    autoFocus
                  />
                </div>
              </div>

              {/* Current Language */}
              <div className="px-5 pt-3">
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                  {currentLanguage === 'ar' ? 'اللغة الحالية' : 'Current'}
                </p>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 mb-3">
                  <span className="text-2xl">{languageFlags[currentLanguage] || '🌐'}</span>
                  <span className="font-semibold text-foreground">{languageNames[currentLanguage]}</span>
                  <Check className="w-5 h-5 text-primary ml-auto" />
                </div>
              </div>

              {/* Languages Grid */}
              <ScrollArea className="max-h-[45vh]">
                <div className="px-5 pb-2">
                  <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'جميع اللغات' : 'All Languages'}
                    <span className="text-primary ml-1">({filteredLanguages.length})</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 px-5 pb-5">
                  {filteredLanguages.map((lang) => {
                    const isActive = currentLanguage === lang;
                    return (
                      <motion.button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-start
                          ${isActive
                            ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30'
                            : 'bg-muted/30 hover:bg-muted text-foreground hover:shadow-sm active:scale-[0.97]'
                          }`}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="text-lg flex-shrink-0">{languageFlags[lang] || '🌐'}</span>
                        <span className="truncate text-xs">{languageNames[lang]}</span>
                        {isActive && <Check className="w-3.5 h-3.5 flex-shrink-0 ml-auto" />}
                      </motion.button>
                    );
                  })}
                </div>
                {filteredLanguages.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm pb-6">
                    {currentLanguage === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                  </p>
                )}
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
