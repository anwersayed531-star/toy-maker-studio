import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameLogic } from '@/hooks/useGameLogic';
import { StartScreen } from '@/components/game/StartScreen';
import { StatsPanel } from '@/components/game/StatsPanel';
import { DecisionCard } from '@/components/game/DecisionCard';
import { EffectNotification } from '@/components/game/EffectNotification';
import { GameOver } from '@/components/game/GameOver';
import { CountryMap } from '@/components/game/CountryMap';
import { FactionsPanel } from '@/components/game/FactionsPanel';
import { VictoryProgress } from '@/components/game/VictoryProgress';
import { AdvisorsPanel } from '@/components/game/AdvisorsPanel';
import { VictoryScreen } from '@/components/game/VictoryScreen';
import { GameHeader } from '@/components/game/GameHeader';
import { RandomEventNotification } from '@/components/game/RandomEventNotification';
import { Map, Users, Trophy, Building, Crown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const {
    gameState,
    currentDecision,
    showEffects,
    lastEffects,
    gameStarted,
    soundEnabled,
    startGame,
    makeChoice,
    restartGame,
    selectRegion,
    handleSaveGame,
    handleLoadGame,
    handleToggleSound,
    hasSavedGame,
    getSaveInfo,
    getStats,
    currentRandomEvent,
    showRandomEventNotification,
  } = useGameLogic();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('stats');

  const onSave = () => {
    const success = handleSaveGame();
    toast({
      title: success ? '✅ تم الحفظ' : '❌ فشل الحفظ',
      description: success ? 'تم حفظ اللعبة بنجاح' : 'حدث خطأ أثناء الحفظ',
      duration: 2000,
    });
  };

  if (!gameStarted) {
    return (
      <StartScreen
        onStart={startGame}
        onLoadGame={handleLoadGame}
        hasSavedGame={hasSavedGame}
        saveInfo={getSaveInfo()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <GameHeader
        gameState={gameState}
        onSave={onSave}
        isSoundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        stats={getStats()}
      />

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
                <CountryMap 
                  regions={gameState.regions}
                  selectedRegion={gameState.selectedRegion}
                  onSelectRegion={selectRegion}
                  activeEvent={currentRandomEvent?.id}
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

      {/* Random Event Notification */}
      <RandomEventNotification event={currentRandomEvent} isVisible={showRandomEventNotification} />

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
