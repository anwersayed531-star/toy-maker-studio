import { motion } from 'framer-motion';
import { useGameLogic } from '@/hooks/useGameLogic';
import { StartScreen } from '@/components/game/StartScreen';
import { StatsPanel } from '@/components/game/StatsPanel';
import { DecisionCard } from '@/components/game/DecisionCard';
import { EffectNotification } from '@/components/game/EffectNotification';
import { GameOver } from '@/components/game/GameOver';
import { Crown } from 'lucide-react';

const Index = () => {
  const {
    gameState,
    currentDecision,
    showEffects,
    lastEffects,
    gameStarted,
    startGame,
    makeChoice,
    restartGame,
  } = useGameLogic();

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">محاكي الرئيس</h1>
                <p className="text-xs text-muted-foreground">{gameState.countryName}</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">الدور</p>
              <p className="font-bold text-primary">{gameState.turnCount}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <StatsPanel gameState={gameState} />
          </div>

          {/* Decision Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentDecision && (
                <DecisionCard
                  decision={currentDecision}
                  onChoice={makeChoice}
                />
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Effect Notification */}
      <EffectNotification effects={lastEffects} isVisible={showEffects} />

      {/* Game Over Screen */}
      {gameState.gameOver && (
        <GameOver gameState={gameState} onRestart={restartGame} />
      )}
    </div>
  );
};

export default Index;
