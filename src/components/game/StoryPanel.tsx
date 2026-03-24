import { motion } from 'framer-motion';
import { BookOpen, User, Crown, Shield, AlertTriangle } from 'lucide-react';
import { Character, StoryChapter } from '@/types/game';
import { cn } from '@/lib/utils';

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

const statusLabels: Record<string, string> = {
  alive: 'حي',
  imprisoned: 'مسجون',
  exiled: 'منفي',
  dead: 'ميت',
};

export const StoryPanel = ({ chapters, currentChapter, characters }: StoryPanelProps) => {
  return (
    <div className="space-y-4">
      {/* Current Chapter */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">القصة</h3>
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
                'h-1.5 flex-1 rounded-full transition-colors',
                i < currentChapter ? 'bg-primary' :
                i === currentChapter ? 'bg-primary/60 animate-pulse' :
                'bg-muted'
              )}
            />
          ))}
        </div>
      </div>

      {/* Characters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">الشخصيات</h3>
        </div>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {characters.map((char) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'p-2 rounded-lg border transition-colors',
                char.status === 'alive' ? 'bg-muted/30 border-border' :
                char.status === 'imprisoned' ? 'bg-destructive/10 border-destructive/30' :
                char.status === 'exiled' ? 'bg-warning/10 border-warning/30' :
                'bg-muted/10 border-muted/30 opacity-50'
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{char.portraitEmoji}</span>
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
                <div className="flex gap-2 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Crown className="w-3 h-3 text-primary" />
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${char.loyalty}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{char.loyalty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-accent" />
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${char.skill}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{char.skill}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
