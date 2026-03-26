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
import { CrisisAnimation } from '@/components/game/CrisisAnimation';
import { StoryPanel } from '@/components/game/StoryPanel';
import { MiniStatBar } from '@/components/game/MiniStatBar';
import { Map, Users, Trophy, Building, Crown, BookOpen, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DifficultyLevel } from '@/types/game';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/hooks/useSettings';
import { useLanguage } from '@/hooks/useLanguage';

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
    handleFactionAction,
    hasSavedGame,
    getSaveInfo,
    getStats,
    currentRandomEvent,
    showRandomEventNotification,
  } = useGameLogic();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('stats');
  const { settings, updateNotificationsEnabled } = useSettings();
  const { t, currentLanguage, changeLanguage, isRTL } = useLanguage();
  
  const onSave = () => {
    const success = handleSaveGame();
    toast({
      title: success ? `✅ ${t('save')}` : `❌ ${t('cancel')}`,
      description: success ? t('dataDeleted').replace('تم حذف', 'تم حفظ') : '',
      duration: 2000,
    });
  };

  const handleClearData = () => {
    localStorage.clear();
    toast({
      title: `🗑️ ${t('dataDeleted')}`,
      description: t('deleteDataWarning'),
      duration: 2000,
    });
    restartGame();
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
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <GameHeader
        gameState={gameState}
        onSave={onSave}
        isSoundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        stats={getStats()}
        notificationsEnabled={settings.notificationsEnabled}
        onToggleNotifications={() => updateNotificationsEnabled(!settings.notificationsEnabled)}
        currentLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
        onClearData={handleClearData}
      />

      {/* Mini Stat Bar */}
      <MiniStatBar gameState={gameState} />

      {/* Turn Goal Banner */}
      {gameState.turnGoal && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 pt-2"
        >
          <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 flex items-center gap-3">
            <Target className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-primary">🎯 {currentLanguage === 'ar' ? 'هدف الدور' : 'Turn Goal'}: </span>
              <span className="text-sm text-foreground">{gameState.turnGoal.description}</span>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
              {gameState.turnGoal.turnsRemaining} {currentLanguage === 'ar' ? 'أدوار' : 'turns'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Turn Goal Result */}
      {gameState.turnGoalCompleted !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto px-4 pt-2"
        >
          <div className={`rounded-lg px-4 py-2 text-center text-sm font-medium ${
            gameState.turnGoalCompleted 
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600' 
              : 'bg-destructive/10 border border-destructive/30 text-destructive'
          }`}>
            {gameState.turnGoalCompleted 
              ? (currentLanguage === 'ar' ? '✅ أحسنت! حققت الهدف وحصلت على مكافأة!' : '✅ Well done! Goal achieved - reward granted!')
              : (currentLanguage === 'ar' ? '❌ فشلت في تحقيق الهدف. هناك عواقب...' : '❌ Goal failed. There are consequences...')}
          </div>
        </motion.div>
      )}

      {/* Main Content - Mobile: Decision first, then tabs */}
      <main className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Decision Area - Shows first on mobile */}
          <div className="lg:col-span-2 order-first lg:order-last">
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

          {/* Left Panel - Tabs */}
          <div className="lg:col-span-1 space-y-4 order-last lg:order-first">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-auto">
                <TabsTrigger value="stats" className="flex flex-col gap-1 py-2">
                  <Crown className="w-4 h-4" />
                  <span className="text-[10px]">{t('tabStats')}</span>
                </TabsTrigger>
                <TabsTrigger value="story" className="flex flex-col gap-1 py-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[10px]">{currentLanguage === 'ar' ? 'القصة' : 'Story'}</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex flex-col gap-1 py-2">
                  <Map className="w-4 h-4" />
                  <span className="text-[10px]">{t('tabMap')}</span>
                </TabsTrigger>
                <TabsTrigger value="factions" className="flex flex-col gap-1 py-2">
                  <Users className="w-4 h-4" />
                  <span className="text-[10px]">{t('tabFactions')}</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex flex-col gap-1 py-2">
                  <Building className="w-4 h-4" />
                  <span className="text-[10px]">{t('tabAdmin')}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="mt-3 space-y-3">
                <StatsPanel gameState={gameState} />
                <VictoryProgress conditions={gameState.victoryConditions} />
              </TabsContent>

              <TabsContent value="story" className="mt-3">
                <StoryPanel
                  chapters={gameState.storyChapters}
                  currentChapter={gameState.currentChapter}
                  characters={gameState.characters}
                />
              </TabsContent>

              <TabsContent value="map" className="mt-3">
                <CountryMap 
                  regions={gameState.regions}
                  selectedRegion={gameState.selectedRegion}
                  onSelectRegion={selectRegion}
                  activeEvent={currentRandomEvent?.id}
                />
              </TabsContent>

              <TabsContent value="factions" className="mt-3">
                <FactionsPanel 
                  factions={gameState.factions}
                  onFactionAction={handleFactionAction}
                />
              </TabsContent>

              <TabsContent value="admin" className="mt-3">
                <AdvisorsPanel advisors={gameState.advisors} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <CrisisAnimation crisis={gameState.activeCrisis} />
      <EffectNotification effects={lastEffects} isVisible={showEffects} />
      <RandomEventNotification event={currentRandomEvent} isVisible={showRandomEventNotification} />
      {gameState.gameWon && <VictoryScreen gameState={gameState} onRestart={restartGame} />}
      {gameState.gameOver && !gameState.gameWon && <GameOver gameState={gameState} onRestart={restartGame} />}
    </div>
  );
};

export default Index;
