import { motion } from 'framer-motion';
import { BookOpen, User, Crown, Shield, Heart, Swords } from 'lucide-react';
import { Character, StoryChapter } from '@/types/game';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface StoryPanelProps {
  chapters: StoryChapter[];
  currentChapter: number;
  characters: Character[];
}

const statusColors: Record<string, string> = {
  alive: 'text-success',
  imprisoned: 'text-destructive',
  exiled: 'text-warning',
  dead: 'text-muted-foreground',
};

export const StoryPanel = ({ chapters, currentChapter, characters }: StoryPanelProps) => {
  const { currentLanguage } = useLanguage();
  
  const statusLabels: Record<string, string> = {
    alive: currentLanguage === 'ar' ? 'حي' : 'Alive',
    imprisoned: currentLanguage === 'ar' ? 'مسجون' : 'Imprisoned',
    exiled: currentLanguage === 'ar' ? 'منفي' : 'Exiled',
    dead: currentLanguage === 'ar' ? 'ميت' : 'Dead',
  };

  const relationTypeLabels: Record<string, { label: string; color: string; icon: typeof Heart }> = {
    ally: { label: currentLanguage === 'ar' ? 'حليف' : 'Ally', color: 'text-success', icon: Heart },
    rival: { label: currentLanguage === 'ar' ? 'عدو' : 'Rival', color: 'text-destructive', icon: Swords },
    neutral: { label: currentLanguage === 'ar' ? 'محايد' : 'Neutral', color: 'text-muted-foreground', icon: Shield },
  };

  const getCharacterById = (id: string) => characters.find(c => c.id === id);

  return (
    <div className="space-y-4">
      {/* Current Chapter */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">
            {currentLanguage === 'ar' ? 'القصة' : 'Story'}
          </h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {currentChapter + 1}/{chapters.length}
          </span>
        </div>
        
        {chapters[currentChapter] && (
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border border-primary/30 rounded-lg p-3"
          >
            <h4 className="font-semibold text-primary text-sm mb-1">
              {chapters[currentChapter].title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {chapters[currentChapter].description}
            </p>
          </motion.div>
        )}

        {/* Chapter Progress */}
        <div className="flex gap-1 mt-3">
          {chapters.map((ch, i) => (
            <div
              key={ch.id}
              className={cn(
                'h-2 flex-1 rounded-full transition-colors',
                i < currentChapter ? 'bg-primary' :
                i === currentChapter ? 'bg-primary/60 animate-pulse' :
                'bg-muted'
              )}
            />
          ))}
        </div>
      </div>

      {/* Characters with Relations */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">
            {currentLanguage === 'ar' ? 'الشخصيات' : 'Characters'}
          </h3>
        </div>
        
        <div className="space-y-2 max-h-[350px] overflow-y-auto">
          {characters.map((char) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'p-2.5 rounded-lg border transition-colors',
                char.status === 'alive' ? 'bg-muted/30 border-border' :
                char.status === 'imprisoned' ? 'bg-destructive/10 border-destructive/30' :
                char.status === 'exiled' ? 'bg-warning/10 border-warning/30' :
                'bg-muted/10 border-muted/30 opacity-50'
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{char.portraitEmoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-foreground truncate">
                      {char.name.split(' - ')[0]}
                    </span>
                    <span className={cn('text-[10px]', statusColors[char.status])}>
                      ({statusLabels[char.status]})
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{char.role}</span>
                </div>
              </div>
              
              {char.status === 'alive' && (
                <>
                  <div className="flex gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-primary" />
                      <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            'h-full rounded-full transition-all',
                            char.loyalty > 60 ? 'bg-primary' : char.loyalty > 30 ? 'bg-warning' : 'bg-destructive'
                          )}
                          style={{ width: `${char.loyalty}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{char.loyalty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-accent" />
                      <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${char.skill}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{char.skill}</span>
                    </div>
                  </div>
                  
                  {/* Relations */}
                  {char.relations && char.relations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {char.relations.map(rel => {
                        const target = getCharacterById(rel.targetId);
                        if (!target) return null;
                        const config = relationTypeLabels[rel.type];
                        return (
                          <span
                            key={rel.targetId}
                            className={cn(
                              'text-[9px] px-1.5 py-0.5 rounded-full border',
                              rel.type === 'ally' ? 'bg-success/10 border-success/20 text-success' :
                              rel.type === 'rival' ? 'bg-destructive/10 border-destructive/20 text-destructive' :
                              'bg-muted border-border text-muted-foreground'
                            )}
                          >
                            {rel.type === 'ally' ? '🤝' : rel.type === 'rival' ? '⚔️' : '🤷'} {target.portraitEmoji} {target.name.split(' - ')[0]?.split(' ').pop()}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
