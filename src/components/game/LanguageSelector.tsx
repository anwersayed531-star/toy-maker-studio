import { useState, useMemo } from 'react';
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

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { t, currentLanguage, changeLanguage, languageNames, availableLanguages, isRTL } = useLanguage();

  const filteredLanguages = useMemo(() => {
    if (!search.trim()) return availableLanguages;
    const q = search.toLowerCase();
    return availableLanguages.filter(lang =>
      languageNames[lang].toLowerCase().includes(q) || lang.includes(q)
    );
  }, [search, availableLanguages, languageNames]);

  const handleLanguageChange = (lang: LanguageCode) => {
    changeLanguage(lang);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2 rounded-full px-3 border-primary/30 hover:border-primary/60 transition-colors"
      >
        <span className="text-base">{languageFlags[currentLanguage] || '🌐'}</span>
        <span className="text-xs font-medium">{languageNames[currentLanguage]}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => { setIsOpen(false); setSearch(''); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  {t('selectLanguage')}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => { setIsOpen(false); setSearch(''); }}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="px-4 pt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 h-9 rounded-lg"
                    autoFocus
                  />
                </div>
              </div>

              {/* Languages Grid */}
              <ScrollArea className="max-h-[55vh]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4">
                  {filteredLanguages.map((lang) => {
                    const isActive = currentLanguage === lang;
                    return (
                      <motion.button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-start
                          ${isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted/40 hover:bg-muted text-foreground border border-border/50 hover:border-border'
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg flex-shrink-0">{languageFlags[lang] || '🌐'}</span>
                        <span className="truncate">{languageNames[lang]}</span>
                        {isActive && <Check className="w-4 h-4 flex-shrink-0 ml-auto" />}
                      </motion.button>
                    );
                  })}
                </div>
                {filteredLanguages.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm pb-4">No results</p>
                )}
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
