import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameLogic } from '@/hooks/useGameLogic';
import { StartScreen } from '@/components/game/StartScreen';
import { StatsPanel } from '@/components/game/StatsPanel';
import { DecisionCard } from '@/components/game/DecisionCard';
import { EffectNotification } from '@/components/game/EffectNotification';
import { GameOver } from '@/components/game/GameOver';
import { InteractiveMap } from '@/components/game/InteractiveMap';
import { FactionsPanel } from '@/components/game/FactionsPanel';
import { VictoryProgress } from '@/components/game/VictoryProgress';
import { AdvisorsPanel } from '@/components/game/AdvisorsPanel';
import { VictoryScreen } from '@/components/game/VictoryScreen';
import { Crown, Map, Users, Trophy, Building } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    selectRegion,
  } = useGameLogic();

  const [activeTab, setActiveTab] = useState('stats');

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-foreground text-sm md:text-base">محاكي الرئيس</h1>
                <p className="text-xs text-muted-foreground">{gameState.countryName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">السنة</p>
                <p className="font-bold text-primary text-sm">{gameState.year}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">الدور</p>
                <p className="font-bold text-primary text-sm">{gameState.turnCount}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Tabs for different systems */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="stats" className="flex flex-col gap-1 py-2">
                  <Crown className="w-4 h-4" />
                  <span className="text-xs">الإحصائيات</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex flex-col gap-1 py-2">
                  <Map className="w-4 h-4" />
                  <span className="text-xs">الخريطة</span>
                </TabsTrigger>
                <TabsTrigger value="factions" className="flex flex-col gap-1 py-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">الفصائل</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex flex-col gap-1 py-2">
                  <Building className="w-4 h-4" />
                  <span className="text-xs">الإدارة</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="mt-4 space-y-4">
                <StatsPanel gameState={gameState} />
                <VictoryProgress conditions={gameState.victoryConditions} />
              </TabsContent>

              <TabsContent value="map" className="mt-4">
                <InteractiveMap 
                  regions={gameState.regions}
                  selectedRegion={gameState.selectedRegion}
                  onSelectRegion={selectRegion}
                />
              </TabsContent>

              <TabsContent value="factions" className="mt-4">
                <FactionsPanel factions={gameState.factions} />
              </TabsContent>

              <TabsContent value="admin" className="mt-4">
                <AdvisorsPanel advisors={gameState.advisors} />
              </TabsContent>
            </Tabs>
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

      {/* Victory Screen */}
      {gameState.gameWon && (
        <VictoryScreen gameState={gameState} onRestart={restartGame} />
      )}

      {/* Game Over Screen */}
      {gameState.gameOver && !gameState.gameWon && (
        <GameOver gameState={gameState} onRestart={restartGame} />
      )}
    </div>
  );
};

export default Index;
