import { motion } from 'framer-motion';
import { VictoryCondition } from '@/types/game';
import { Trophy, TrendingUp, Shield, Globe, Heart, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { getVictoryName } from '@/i18n/entityTranslations';

interface VictoryProgressProps {
  conditions: VictoryCondition[];
}

const getVictoryIcon = (type: VictoryCondition['type']) => {
  switch (type) {
    case 'economic': return TrendingUp;
    case 'military': return Shield;
    case 'diplomatic': return Globe;
    case 'popular': return Heart;
    default: return Trophy;
  }
};

const getProgressPercent = (current: number, target: number) => {
  return Math.min(100, Math.round((current / target) * 100));
};

export const VictoryProgress = ({ conditions }: VictoryProgressProps) => {
  const { t, currentLanguage } = useLanguage();
  const completedCount = conditions.filter(c => c.completed).length;

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          {t('victoryConditions')}
        </h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{conditions.length} {t('completed')}
        </span>
      </div>

      <div className="space-y-3">
        {conditions.map((condition, index) => {
          const Icon = getVictoryIcon(condition.type);
          const progress = getProgressPercent(condition.currentValue, condition.targetValue);
          
          return (
            <motion.div
              key={condition.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border transition-all ${
                condition.completed 
                  ? 'bg-success/10 border-success/50' 
                  : 'bg-muted/30 border-border/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${condition.completed ? 'bg-success/20' : 'bg-primary/20'}`}>
                    {condition.completed ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Icon className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-foreground text-sm">{getVictoryName(condition.id, currentLanguage).name}</span>
                    <p className="text-xs text-muted-foreground">{getVictoryName(condition.id, currentLanguage).description}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${condition.completed ? 'text-success' : 'text-primary'}`}>
                  {condition.currentValue}/{condition.targetValue}
                </span>
              </div>
              
              <Progress 
                value={progress} 
                className={`h-2 ${condition.completed ? '[&>div]:bg-success' : ''}`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
