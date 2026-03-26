import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface Effect {
  stat: string;
  value: number;
}

interface EffectNotificationProps {
  effects: Effect[];
  isVisible: boolean;
}

export const EffectNotification = ({ effects, isVisible }: EffectNotificationProps) => {
  const { t } = useLanguage();

  const getStatLabel = (stat: string) => {
    const map: Record<string, keyof ReturnType<typeof t extends (k: infer K) => any ? never : never>> = {};
    switch (stat) {
      case 'economy': return t('economy');
      case 'military': return t('military');
      case 'popularity': return t('popularity');
      case 'diplomacy': return t('diplomacy');
      case 'treasury': return t('treasury');
      default: return stat;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-card border border-border rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-center text-foreground mb-6">
              📊 {t('decision')}
            </h3>
            <div className="space-y-4">
              {effects.map((effect, index) => (
                <motion.div
                  key={effect.stat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg",
                    effect.value > 0 ? "bg-success/10" : effect.value < 0 ? "bg-destructive/10" : "bg-muted/30"
                  )}
                >
                  <span className="text-muted-foreground text-sm">
                    {getStatLabel(effect.stat)}
                  </span>
                  <div className={cn(
                    "flex items-center gap-1 font-bold",
                    effect.value > 0 ? "text-success" : effect.value < 0 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {effect.value > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : effect.value < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <Minus className="w-4 h-4" />
                    )}
                    <span>
                      {effect.value > 0 ? '+' : ''}{effect.value}
                      {effect.stat !== 'treasury' ? '%' : 'B'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
