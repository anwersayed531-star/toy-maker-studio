import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageCode } from '@/i18n/translations';

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, currentLanguage, changeLanguage, languageNames, availableLanguages, isRTL } = useLanguage();

  const handleLanguageChange = (lang: LanguageCode) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs">{languageNames[currentLanguage]}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {t('selectLanguage')}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="max-h-[60vh]">
                <div className="grid grid-cols-2 gap-2 p-4">
                  {availableLanguages.map((lang) => (
                    <Button
                      key={lang}
                      variant={currentLanguage === lang ? 'default' : 'outline'}
                      className="justify-start gap-2 h-10 text-sm"
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {currentLanguage === lang && <Check className="h-4 w-4" />}
                      <span>{languageNames[lang]}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
