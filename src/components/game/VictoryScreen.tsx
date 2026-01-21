import { motion } from 'framer-motion';
import { GameState } from '@/types/game';
import { Trophy, Star, Crown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

interface VictoryScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export const VictoryScreen = ({ gameState, onRestart }: VictoryScreenProps) => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const completedConditions = gameState.victoryConditions.filter(c => c.completed);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="bg-gradient-to-br from-primary/20 via-card to-green-500/20 rounded-2xl border-2 border-primary/50 p-8 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/10 rounded-full translate-x-1/2 translate-y-1/2" />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="relative"
        >
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">🎉 {t('victory')} 🎉</h2>
            <p className="text-lg text-primary font-medium mb-2">{gameState.victoryType}</p>
            <p className="text-muted-foreground mb-6">
              {currentLanguage === 'ar' 
                ? `أحسنت يا ${gameState.presidentName}! لقد قدت ${gameState.countryName} إلى المجد!`
                : `Well done ${gameState.presidentName}! You led ${gameState.countryName} to glory!`}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div className="p-3 bg-muted/50 rounded-lg">
              <Crown className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">{t('turn')}</p>
              <p className="text-xl font-bold text-foreground">{gameState.turnCount}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <Star className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'ar' ? 'الإنجازات' : 'Achievements'}
              </p>
              <p className="text-xl font-bold text-foreground">{completedConditions.length}</p>
            </div>
          </motion.div>

          {/* Completed conditions */}
          <div className="space-y-2 mb-6">
            {completedConditions.map((condition, index) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 justify-center text-sm"
              >
                <Star className="w-4 h-4 text-green-500" />
                <span className="text-foreground">{condition.name}</span>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className="w-full gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {t('playAgain')}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
