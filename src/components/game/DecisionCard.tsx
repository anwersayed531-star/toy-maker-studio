import { motion } from 'framer-motion';
import { Decision, Choice } from '@/types/game';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, Globe, Landmark, Handshake, Heart, ArrowUp, ArrowDown, AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getDecisionTranslation } from '@/i18n/decisionTranslations';
import { cn } from '@/lib/utils';

interface DecisionCardProps {
  decision: Decision;
  onChoice: (choice: Choice) => void;
}

const categoryEmoji: Record<string, string> = {
  economy: '💰',
  military: '⚔️',
  diplomacy: '🤝',
  social: '👥',
  regional: '🗺️',
};

export const DecisionCard = ({ decision, onChoice }: DecisionCardProps) => {
  const { t, currentLanguage } = useLanguage();
  
  const translatedDecision = getDecisionTranslation(decision.id, currentLanguage);
  const title = translatedDecision?.title || decision.title;
  const description = translatedDecision?.description || decision.description;
  
  const getChoiceText = (choice: Choice) => {
    return translatedDecision?.choices?.[choice.id] || choice.text;
  };

  const getCategoryIcon = () => {
    switch (decision.category) {
      case 'economy': return <TrendingUp className="w-5 h-5" />;
      case 'military': return <Shield className="w-5 h-5" />;
      case 'diplomacy': return <Handshake className="w-5 h-5" />;
      case 'social': return <Heart className="w-5 h-5" />;
      default: return <Landmark className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = () => {
    switch (decision.category) {
      case 'economy': return t('economicDecision');
      case 'military': return t('militaryDecision');
      case 'diplomacy': return t('diplomaticDecision');
      case 'social': return t('socialDecision');
      default: return t('decision');
    }
  };

  const getChoiceHint = (choice: Choice) => {
    if (choice.hint) return choice.hint;
    const values = Object.values(choice.effects).filter(v => v !== undefined) as number[];
    const positives = values.filter(v => v > 0).length;
    const negatives = values.filter(v => v < 0).length;
    if (positives > 0 && negatives === 0) return 'positive';
    if (negatives > 0 && positives === 0) return 'negative';
    if (positives > 0 && negatives > 0) return 'mixed';
    return 'neutral';
  };

  const hintConfig = {
    positive: { icon: ArrowUp, color: 'text-success', bg: 'bg-success/10 border-success/20', label: '📈' },
    negative: { icon: ArrowDown, color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/20', label: '📉' },
    mixed: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/20', label: '⚖️' },
    risky: { icon: Sparkles, color: 'text-accent', bg: 'bg-accent/10 border-accent/20', label: '🎲' },
    neutral: { icon: null, color: 'text-muted-foreground', bg: '', label: '' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-lg"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/80 to-secondary/40 p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15 text-primary border border-primary/20">
            {getCategoryIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{categoryEmoji[decision.category] || '📋'}</span>
              <p className="text-xs text-muted-foreground">{getCategoryLabel()}</p>
            </div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-5">
        <p className="text-foreground text-center mb-6 leading-relaxed text-sm">
          {description}
        </p>

        {/* Choices */}
        <div className="space-y-2.5">
          {decision.choices.map((choice, index) => {
            const hint = getChoiceHint(choice);
            const config = hintConfig[hint];
            
            return (
              <motion.div
                key={choice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "w-full py-5 text-right justify-start hover:bg-primary/10 hover:border-primary transition-all relative group",
                    config.bg && `border ${config.bg}`
                  )}
                  onClick={() => onChoice(choice)}
                >
                  <span className="text-primary ml-2 font-bold text-lg">{index + 1}.</span>
                  <span className="flex-1 text-sm">{getChoiceText(choice)}</span>
                  {config.label && (
                    <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                      {config.label}
                    </span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
