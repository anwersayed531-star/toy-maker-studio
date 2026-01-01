import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export const StatBar = ({ label, value, icon, color = 'default' }: StatBarProps) => {
  const getBarColor = () => {
    if (value >= 70) return 'bg-success';
    if (value >= 40) return 'bg-warning';
    return 'bg-destructive';
  };

  const getTextColor = () => {
    if (value >= 70) return 'text-success';
    if (value >= 40) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className={cn("text-sm font-bold", getTextColor())}>{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getBarColor())}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
