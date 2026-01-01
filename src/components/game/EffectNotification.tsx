import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Effect {
  stat: string;
  value: number;
}

interface EffectNotificationProps {
  effects: Effect[];
  isVisible: boolean;
}

const statLabels: Record<string, string> = {
  economy: 'الاقتصاد',
  military: 'الجيش',
  popularity: 'الشعبية',
  diplomacy: 'الدبلوماسية',
  treasury: 'الخزينة',
};

export const EffectNotification = ({ effects, isVisible }: EffectNotificationProps) => {
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
            className="bg-card border border-border rounded-xl p-8 max-w-sm w-full mx-4"
          >
            <h3 className="text-xl font-bold text-center text-foreground mb-6">
              نتائج القرار
            </h3>
            <div className="space-y-4">
              {effects.map((effect, index) => (
                <motion.div
                  key={effect.stat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">
                    {statLabels[effect.stat] || effect.stat}
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
                      {effect.stat !== 'treasury' ? '%' : ' مليار'}
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
