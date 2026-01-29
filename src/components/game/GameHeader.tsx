import { useState } from 'react';
import { motion } from 'framer-motion';
import { GameState } from '@/types/game';
import { Save, Volume2, VolumeX, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SettingsScreen } from './SettingsScreen';
import { useLanguage } from '@/hooks/useLanguage';
import gameLogo from '@/assets/game-logo.png';

interface GameStats {
  totalGames: number;
  victories: number;
  defeats: number;
  longestGame: number;
  highestEconomy: number;
  highestMilitary: number;
  highestPopularity: number;
  highestDiplomacy: number;
}

interface GameHeaderProps {
  gameState: GameState;
  onSave: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  stats: GameStats;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onClearData: () => void;
}

export const GameHeader = ({
  gameState,
  onSave,
  isSoundEnabled,
  onToggleSound,
  stats,
  notificationsEnabled,
  onToggleNotifications,
  currentLanguage,
  onLanguageChange,
  onClearData,
}: GameHeaderProps) => {
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { t, isRTL } = useLanguage();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <motion.img
              src={gameLogo}
              alt={t('appName')}
              className="w-10 h-10 rounded-lg"
              whileHover={{ scale: 1.05 }}
            />
            <div>
              <h1 className="font-bold text-foreground text-sm md:text-base">{t('appName')}</h1>
              <p className="text-xs text-muted-foreground">{gameState.countryName}</p>
            </div>
          </div>

          {/* Game Info */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-center hidden sm:block">
              <p className="text-xs text-muted-foreground">{t('year')}</p>
              <p className="font-bold text-primary text-sm">{gameState.year}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t('turn')}</p>
              <p className="font-bold text-primary text-sm">{gameState.turnCount}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSound}
                className="h-8 w-8"
              >
                {isSoundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onSave}
                className="h-8 w-8"
              >
                <Save className="w-4 h-4" />
              </Button>

              <Dialog open={showStats} onOpenChange={setShowStats}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm" dir={isRTL ? 'rtl' : 'ltr'}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      {t('statistics')}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-foreground">{stats.totalGames}</p>
                      <p className="text-xs text-muted-foreground">{t('totalGames')}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-500">{stats.victories}</p>
                      <p className="text-xs text-muted-foreground">{t('victories')}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-destructive">{stats.defeats}</p>
                      <p className="text-xs text-muted-foreground">{t('defeats')}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">{stats.longestGame}</p>
                      <p className="text-xs text-muted-foreground">{t('longestGame')}</p>
                    </div>
                    <div className="col-span-2 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-2">
                        {t('highestStats')}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('economy')}:</span>
                          <span className="font-bold">{stats.highestEconomy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('military')}:</span>
                          <span className="font-bold">{stats.highestMilitary}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('popularity')}:</span>
                          <span className="font-bold">{stats.highestPopularity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('diplomacy')}:</span>
                          <span className="font-bold">{stats.highestDiplomacy}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-0 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
                  <SettingsScreen
                    isSoundEnabled={isSoundEnabled}
                    onToggleSound={onToggleSound}
                    notificationsEnabled={notificationsEnabled}
                    onToggleNotifications={onToggleNotifications}
                    currentLanguage={currentLanguage}
                    onLanguageChange={onLanguageChange}
                    onClearData={() => {
                      onClearData();
                      setShowSettings(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
