import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Play, Landmark, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import gameLogo from '@/assets/game-logo.png';

interface SaveInfo {
  savedAt: string;
  turnCount: number;
  presidentName: string;
}

interface StartScreenProps {
  onStart: (presidentName: string, countryName: string) => void;
  onLoadGame?: () => void;
  hasSavedGame?: boolean;
  saveInfo?: SaveInfo | null;
}

export const StartScreen = ({ onStart, onLoadGame, hasSavedGame, saveInfo }: StartScreenProps) => {
  const [presidentName, setPresidentName] = useState('');
  const [countryName, setCountryName] = useState('');
  const { t, isRTL, currentLanguage } = useLanguage();

  const handleStart = () => {
    const defaultPresident = currentLanguage === 'ar' ? 'الرئيس' : 'President';
    const defaultCountry = currentLanguage === 'ar' ? 'الجمهورية' : 'Republic';
    onStart(
      presidentName.trim() || defaultPresident,
      countryName.trim() || defaultCountry
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(currentLanguage, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
          className="text-center mb-8"
        >
          <motion.img
            src={gameLogo}
            alt={t('appName')}
            className="w-28 h-28 mx-auto mb-4 drop-shadow-2xl"
            whileHover={{ scale: 1.05 }}
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="text-primary">{t('appName')}</span>
          </h1>
        </motion.div>

        {/* Saved Game Banner */}
        {hasSavedGame && saveInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t('loadGame')}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(saveInfo.savedAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{saveInfo.presidentName}</span>
                <span className="mx-2">•</span>
                <span>{t('turn')} {saveInfo.turnCount}</span>
              </div>
              <Button
                onClick={onLoadGame}
                size="sm"
                variant="secondary"
                className="gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                {t('continueGame')}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Crown className="w-4 h-4 text-primary" />
              {t('enterName')}
            </label>
            <Input
              value={presidentName}
              onChange={(e) => setPresidentName(e.target.value)}
              placeholder="..."
              className={isRTL ? 'text-right' : 'text-left'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Landmark className="w-4 h-4 text-primary" />
              {currentLanguage === 'ar' ? 'اسم الدولة' : 'Country Name'}
            </label>
            <Input
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder="..."
              className={isRTL ? 'text-right' : 'text-left'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <Button
            onClick={handleStart}
            size="lg"
            className="w-full text-lg"
          >
            <Play className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('newGame')}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
