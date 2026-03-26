import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SupportFaction } from '@/types/game';
import { Shield, Briefcase, BookOpen, Users, GraduationCap, TrendingUp, TrendingDown, Handshake, AlertTriangle, Coins } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getFactionName } from '@/i18n/entityTranslations';

interface FactionsPanelProps {
  factions: SupportFaction[];
  onFactionAction?: (factionId: string, action: 'ally' | 'bribe' | 'threaten') => void;
}

const getFactionIcon = (type: SupportFaction['type']) => {
  switch (type) {
    case 'military': return Shield;
    case 'business': return Briefcase;
    case 'religious': return BookOpen;
    case 'labor': return Users;
    case 'intellectuals': return GraduationCap;
    default: return Users;
  }
};

const getSupportColor = (support: number) => {
  if (support >= 70) return 'bg-success';
  if (support >= 50) return 'bg-primary';
  if (support >= 30) return 'bg-warning';
  return 'bg-destructive';
};

export const FactionsPanel = ({ factions, onFactionAction }: FactionsPanelProps) => {
  const { t, currentLanguage } = useLanguage();
  const [expandedFaction, setExpandedFaction] = useState<string | null>(null);
  
  const averageSupport = Math.round(
    factions.reduce((sum, f) => sum + f.support, 0) / factions.length
  );

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {t('supportSystem')}
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{t('average')}:</span>
          <span className={`font-bold ${averageSupport >= 50 ? 'text-success' : 'text-destructive'}`}>
            {averageSupport}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {factions.map((faction, index) => {
          const Icon = getFactionIcon(faction.type);
          const isExpanded = expandedFaction === faction.id;
          
          return (
            <motion.div
              key={faction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="p-3 bg-muted/30 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedFaction(isExpanded ? null : faction.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${getSupportColor(faction.support)} bg-opacity-20`}>
                      <Icon className={`w-4 h-4 ${faction.support >= 50 ? 'text-success' : 'text-destructive'}`} />
                    </div>
                    <span className="font-medium text-foreground text-sm">{getFactionName(faction.id, currentLanguage)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {faction.support >= 50 ? (
                      <TrendingUp className="w-3 h-3 text-success" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className={`text-sm font-bold ${faction.support >= 50 ? 'text-success' : 'text-destructive'}`}>
                      {faction.support}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Progress value={faction.support} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {t('influence')}: {faction.influence}%
                  </span>
                </div>

                {faction.demands && (
                  <p className="text-xs text-warning mt-2">💬 {faction.demands}</p>
                )}
              </div>
              
              {/* Expanded Actions */}
              <AnimatePresence>
                {isExpanded && onFactionAction && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 px-3 py-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs gap-1 border-success/30 text-success hover:bg-success/10"
                        onClick={(e) => { e.stopPropagation(); onFactionAction(faction.id, 'ally'); }}
                      >
                        <Handshake className="w-3 h-3" />
                        تحالف
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                        onClick={(e) => { e.stopPropagation(); onFactionAction(faction.id, 'bribe'); }}
                      >
                        <Coins className="w-3 h-3" />
                        رشوة
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs gap-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                        onClick={(e) => { e.stopPropagation(); onFactionAction(faction.id, 'threaten'); }}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        تهديد
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
