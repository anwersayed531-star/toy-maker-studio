import { motion } from 'framer-motion';
import { Advisor } from '@/types/game';
import { User, DollarSign, Shield, Globe, Building, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { getAdvisorName } from '@/i18n/entityTranslations';

interface AdvisorsPanelProps {
  advisors: Advisor[];
}

const getAdvisorIcon = (role: Advisor['role']) => {
  switch (role) {
    case 'economic': return DollarSign;
    case 'military': return Shield;
    case 'diplomatic': return Globe;
    case 'internal': return Building;
    default: return User;
  }
};

export const AdvisorsPanel = ({ advisors }: AdvisorsPanelProps) => {
  const { t, currentLanguage } = useLanguage();

  const getRoleLabel = (role: Advisor['role']) => {
    switch (role) {
      case 'economic': return t('economicAdvisor');
      case 'military': return t('militaryAdvisor');
      case 'diplomatic': return t('diplomaticAdvisor');
      case 'internal': return t('internalAdvisor');
      default: return '';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        {t('adminSystem')}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {advisors.map((advisor, index) => {
          const Icon = getAdvisorIcon(advisor.role);
          
          return (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-muted/30 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{getAdvisorName(advisor.id, currentLanguage)}</p>
                  <p className="text-xs text-muted-foreground">{getRoleLabel(advisor.role)}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{t('loyalty')}</span>
                    <span className={advisor.loyalty >= 50 ? 'text-success' : 'text-destructive'}>
                      {advisor.loyalty}%
                    </span>
                  </div>
                  <Progress value={advisor.loyalty} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{t('competence')}</span>
                    <span className="text-primary">{advisor.competence}%</span>
                  </div>
                  <Progress value={advisor.competence} className="h-1" />
                </div>
              </div>

              {advisor.opinion && (
                <div className="mt-2 flex items-start gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{advisor.opinion}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
