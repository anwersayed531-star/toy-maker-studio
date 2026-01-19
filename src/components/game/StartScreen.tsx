import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Play, Landmark, RotateCcw, Clock, Volume2, Save, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gameLogo from '@/assets/game-logo.png';

interface SaveInfo {
  savedAt: string;
  turnCount: number;
  presidentName: string;
}

interface StartScreenProps {
  onStart: (presidentName: string, countryName: string) => void;
  onLoadGame?: () => void;
  hasSavedGame?: boolean;
  saveInfo?: SaveInfo | null;
}

export const StartScreen = ({ onStart, onLoadGame, hasSavedGame, saveInfo }: StartScreenProps) => {
  const [presidentName, setPresidentName] = useState('');
  const [countryName, setCountryName] = useState('');

  const handleStart = () => {
    onStart(
      presidentName.trim() || 'الرئيس',
      countryName.trim() || 'الجمهورية'
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
          className="text-center mb-8"
        >
          <motion.img
            src={gameLogo}
            alt="محاكي الرئيس"
            className="w-28 h-28 mx-auto mb-4 drop-shadow-2xl"
            whileHover={{ scale: 1.05 }}
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            محاكي <span className="text-primary">الرئيس</span>
          </h1>
          <p className="text-muted-foreground">
            أدر دولتك واتخذ القرارات المصيرية
          </p>
        </motion.div>

        {/* Saved Game Banner */}
        {hasSavedGame && saveInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">لديك لعبة محفوظة</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(saveInfo.savedAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{saveInfo.presidentName}</span>
                <span className="mx-2">•</span>
                <span>الدور {saveInfo.turnCount}</span>
              </div>
              <Button
                onClick={onLoadGame}
                size="sm"
                variant="secondary"
                className="gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                استكمال
              </Button>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Crown className="w-4 h-4 text-primary" />
              اسم الرئيس
            </label>
            <Input
              value={presidentName}
              onChange={(e) => setPresidentName(e.target.value)}
              placeholder="أدخل اسمك..."
              className="text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Landmark className="w-4 h-4 text-primary" />
              اسم الدولة
            </label>
            <Input
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder="أدخل اسم دولتك..."
              className="text-right"
              dir="rtl"
            />
          </div>

          <Button
            onClick={handleStart}
            size="lg"
            className="w-full text-lg"
          >
            <Play className="w-5 h-5 ml-2" />
            لعبة جديدة
          </Button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-sm text-muted-foreground space-y-2"
        >
          <p>⚡ اتخذ قرارات حكيمة للحفاظ على توازن الدولة</p>
          <p>🏆 حقق شروط النصر للفوز باللعبة</p>
          <p>⚠️ إذا انخفض أي مؤشر لصفر، ستفقد الحكم!</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/70 mt-4">
            <div className="flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              <span>تأثيرات صوتية</span>
            </div>
            <div className="flex items-center gap-1">
              <Save className="w-3 h-3" />
              <span>حفظ تلقائي</span>
            </div>
            <div className="flex items-center gap-1">
              <Bell className="w-3 h-3" />
              <span>تذكير كل 15 ساعة</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
