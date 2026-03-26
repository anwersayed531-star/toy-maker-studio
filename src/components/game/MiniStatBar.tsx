import { TrendingUp, Shield, Users, Globe, Wheat, Zap } from 'lucide-react';
import { GameState } from '@/types/game';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

interface MiniStatBarProps {
  gameState: GameState;
}

export const MiniStatBar = ({ gameState }: MiniStatBarProps) => {
  const { t } = useLanguage();

  const stats = [
    { key: 'economy', value: gameState.economy, icon: TrendingUp, color: 'text-emerald-400' },
    { key: 'military', value: gameState.military, icon: Shield, color: 'text-blue-400' },
    { key: 'popularity', value: gameState.popularity, icon: Users, color: 'text-amber-400' },
    { key: 'diplomacy', value: gameState.diplomacy, icon: Globe, color: 'text-purple-400' },
    { key: 'food', value: gameState.food, icon: Wheat, color: 'text-green-400', label: '🌾' },
    { key: 'energy', value: gameState.energy, icon: Zap, color: 'text-yellow-400', label: '⚡' },
  ];

  return (
    <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-[57px] z-30">
      <div className="container mx-auto px-2 py-1.5">
        <div className="flex items-center justify-between gap-1">
          {stats.map(stat => {
            const Icon = stat.icon;
            const isLow = stat.value < 25;
            const isCritical = stat.value < 15;
            return (
              <div
                key={stat.key}
                className={cn(
                  'flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs transition-colors',
                  isCritical && 'bg-destructive/20 animate-pulse',
                  isLow && !isCritical && 'bg-warning/10'
                )}
              >
                <Icon className={cn('w-3 h-3', stat.color)} />
                <span className={cn(
                  'font-bold text-[11px]',
                  isCritical ? 'text-destructive' : isLow ? 'text-warning' : 'text-foreground'
                )}>
                  {stat.value}
                </span>
              </div>
            );
          })}
          <div className="flex items-center gap-1 px-1.5 py-0.5 text-xs">
            <span className="text-primary font-bold text-[11px]">${gameState.treasury}B</span>
          </div>
        </div>
      </div>
    </div>
  );
};
