import { motion } from 'framer-motion';
import { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Crown, RotateCcw, Trophy, Skull } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface GameOverProps {
  gameState: GameState;
  onRestart: () => void;
}

export const GameOver = ({ gameState, onRestart }: GameOverProps) => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const isVictory = !gameState.gameOverReason;
  const score = Math.round(
    (gameState.economy + gameState.military + gameState.popularity + gameState.diplomacy) / 4
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-background/95 backdrop-blur-md"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
            isVictory ? 'bg-primary/20' : 'bg-destructive/20'
          }`}
        >
          {isVictory ? (
            <Trophy className="w-10 h-10 text-primary" />
          ) : (
            <Skull className="w-10 h-10 text-destructive" />
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isVictory 
            ? (currentLanguage === 'ar' ? 'تهانينا!' : 'Congratulations!') 
            : t('gameOver')}
        </h2>

        <p className="text-muted-foreground mb-6">
          {gameState.gameOverReason || (currentLanguage === 'ar' 
            ? `حكمت البلاد لمدة ${gameState.turnCount} دور بنجاح!`
            : `You ruled for ${gameState.turnCount} turns successfully!`)}
        </p>

        {/* Score */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">
            {currentLanguage === 'ar' ? 'النتيجة النهائية' : 'Final Score'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-3xl font-bold text-primary">{score}</span>
            <span className="text-muted-foreground">
              {currentLanguage === 'ar' ? 'نقطة' : 'pts'}
            </span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div className="bg-secondary/30 rounded-lg p-3">
            <p className="text-muted-foreground">{t('economy')}</p>
            <p className="font-bold text-foreground">{Math.round(gameState.economy)}%</p>
          </div>
          <div className="bg-secondary/30 rounded-lg p-3">
            <p className="text-muted-foreground">{t('military')}</p>
            <p className="font-bold text-foreground">{Math.round(gameState.military)}%</p>
          </div>
          <div className="bg-secondary/30 rounded-lg p-3">
            <p className="text-muted-foreground">{t('popularity')}</p>
            <p className="font-bold text-foreground">{Math.round(gameState.popularity)}%</p>
          </div>
          <div className="bg-secondary/30 rounded-lg p-3">
            <p className="text-muted-foreground">{t('diplomacy')}</p>
            <p className="font-bold text-foreground">{Math.round(gameState.diplomacy)}%</p>
          </div>
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          className="w-full"
        >
          <RotateCcw className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('playAgain')}
        </Button>
      </motion.div>
    </motion.div>
  );
};
