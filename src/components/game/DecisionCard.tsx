import { motion } from 'framer-motion';
import { Decision, Choice } from '@/types/game';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, Globe, Landmark, Handshake, Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface DecisionCardProps {
  decision: Decision;
  onChoice: (choice: Choice) => void;
}

export const DecisionCard = ({ decision, onChoice }: DecisionCardProps) => {
  const { t } = useLanguage();

  const getCategoryIcon = () => {
    switch (decision.category) {
      case 'economy':
        return <TrendingUp className="w-6 h-6" />;
      case 'military':
        return <Shield className="w-6 h-6" />;
      case 'diplomacy':
        return <Handshake className="w-6 h-6" />;
      case 'social':
        return <Heart className="w-6 h-6" />;
      default:
        return <Landmark className="w-6 h-6" />;
    }
  };

  const getCategoryLabel = () => {
    switch (decision.category) {
      case 'economy':
        return t('economicDecision');
      case 'military':
        return t('militaryDecision');
      case 'diplomacy':
        return t('diplomaticDecision');
      case 'social':
        return t('socialDecision');
      default:
        return t('decision');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="bg-secondary/50 p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {getCategoryIcon()}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{getCategoryLabel()}</p>
            <h3 className="text-lg font-bold text-foreground">{decision.title}</h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-foreground text-center mb-6 leading-relaxed">
          {decision.description}
        </p>

        {/* Choices */}
        <div className="space-y-3">
          {decision.choices.map((choice, index) => (
            <motion.div
              key={choice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full py-6 text-right justify-start hover:bg-primary/10 hover:border-primary transition-all"
                onClick={() => onChoice(choice)}
              >
                <span className="text-primary ml-3 font-bold">{index + 1}.</span>
                <span>{choice.text}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
