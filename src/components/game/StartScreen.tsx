import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Play, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StartScreenProps {
  onStart: (presidentName: string, countryName: string) => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const [presidentName, setPresidentName] = useState('');
  const [countryName, setCountryName] = useState('');

  const handleStart = () => {
    onStart(
      presidentName.trim() || 'الرئيس',
      countryName.trim() || 'الجمهورية'
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 border-2 border-primary/30">
            <Crown className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            محاكي <span className="text-primary">الرئيس</span>
          </h1>
          <p className="text-muted-foreground">
            أدر دولتك واتخذ القرارات المصيرية
          </p>
        </motion.div>

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
            ابدأ الحكم
          </Button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          <p className="mb-2">⚡ اتخذ قرارات حكيمة للحفاظ على توازن الدولة</p>
          <p>⚠️ إذا انخفض أي مؤشر لصفر، ستفقد الحكم!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
