import { motion } from 'framer-motion';
import { SupportFaction } from '@/types/game';
import { Shield, Briefcase, BookOpen, Users, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FactionsPanelProps {
  factions: SupportFaction[];
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

export const FactionsPanel = ({ factions }: FactionsPanelProps) => {
  const averageSupport = Math.round(
    factions.reduce((sum, f) => sum + f.support, 0) / factions.length
  );

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          نظام المساندة
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">المتوسط:</span>
          <span className={`font-bold ${averageSupport >= 50 ? 'text-success' : 'text-destructive'}`}>
            {averageSupport}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {factions.map((faction, index) => {
          const Icon = getFactionIcon(faction.type);
          
          return (
            <motion.div
              key={faction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-muted/30 rounded-lg border border-border/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${getSupportColor(faction.support)} bg-opacity-20`}>
                    <Icon className={`w-4 h-4 ${faction.support >= 50 ? 'text-success' : 'text-destructive'}`} />
                  </div>
                  <span className="font-medium text-foreground text-sm">{faction.name}</span>
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
                <Progress 
                  value={faction.support} 
                  className="h-1.5 flex-1"
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  نفوذ: {faction.influence}%
                </span>
              </div>

              {faction.demands && (
                <p className="text-xs text-warning mt-2">💬 {faction.demands}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
