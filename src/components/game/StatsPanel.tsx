import { motion } from 'framer-motion';
import { TrendingUp, Shield, Users, Globe, Wallet, UserCircle } from 'lucide-react';
import { GameState } from '@/types/game';
import { StatBar } from './StatBar';
import { useLanguage } from '@/hooks/useLanguage';

interface StatsPanelProps {
  gameState: GameState;
}

export const StatsPanel = ({ gameState }: StatsPanelProps) => {
  const { t, currentLanguage } = useLanguage();

  const getMonthName = (month: number) => {
    const date = new Date(2024, month - 1, 1);
    return date.toLocaleDateString(currentLanguage, { month: 'long' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-xl border border-border p-6 space-y-6"
    >
      {/* Header */}
      <div className="text-center border-b border-border pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <UserCircle className="w-8 h-8 text-primary" />
          <h2 className="text-xl font-bold text-foreground">{gameState.presidentName}</h2>
        </div>
        <p className="text-muted-foreground text-sm">{gameState.countryName}</p>
        <p className="text-primary text-sm mt-1">
          {getMonthName(gameState.month)} {gameState.year}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <StatBar
          label={t('economy')}
          value={gameState.economy}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatBar
          label={t('military')}
          value={gameState.military}
          icon={<Shield className="w-4 h-4" />}
        />
        <StatBar
          label={t('popularity')}
          value={gameState.popularity}
          icon={<Users className="w-4 h-4" />}
        />
        <StatBar
          label={t('diplomacy')}
          value={gameState.diplomacy}
          icon={<Globe className="w-4 h-4" />}
        />
      </div>

      {/* Resources */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t('treasury')}</span>
          </div>
          <span className="text-sm font-bold text-foreground">
            {gameState.treasury}B $
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {currentLanguage === 'ar' ? 'السكان' : 'Population'}
            </span>
          </div>
          <span className="text-sm font-bold text-foreground">
            {gameState.population}M
          </span>
        </div>
      </div>

      {/* Turn counter */}
      <div className="text-center text-xs text-muted-foreground">
        {t('turn')}: {gameState.turnCount}
      </div>
    </motion.div>
  );
};
