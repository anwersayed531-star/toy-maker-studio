import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface CrisisAnimationProps {
  crisis: {
    type: 'earthquake' | 'war' | 'coup' | 'epidemic' | 'economic' | 'fire';
    severity: 'medium' | 'high' | 'critical';
    id: string;
  } | undefined;
}

export const CrisisAnimation = ({ crisis }: CrisisAnimationProps) => {
  const [show, setShow] = useState(false);
  const lastCrisisId = useRef<string | null>(null);

  useEffect(() => {
    if (crisis && crisis.id !== lastCrisisId.current) {
      lastCrisisId.current = crisis.id;
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [crisis]);

  if (!crisis || !show) return null;

  const getOverlayConfig = () => {
    switch (crisis.type) {
      case 'earthquake':
        return { bg: 'bg-amber-900/40', emoji: '🌍', text: 'زلزال!', shake: true, particles: ['💥', '🏚️', '🪨'] };
      case 'war':
        return { bg: 'bg-red-900/50', emoji: '⚔️', text: 'حرب!', shake: false, particles: ['💥', '🔥', '💣'] };
      case 'coup':
        return { bg: 'bg-gray-900/70', emoji: '🎖️', text: 'انقلاب!', shake: false, particles: ['⚡', '🔫', '🚨'] };
      case 'epidemic':
        return { bg: 'bg-green-900/40', emoji: '🦠', text: 'وباء!', shake: false, particles: ['🦠', '😷', '💉'] };
      case 'economic':
        return { bg: 'bg-orange-900/40', emoji: '📉', text: 'انهيار اقتصادي!', shake: false, particles: ['💸', '📉', '🏦'] };
      case 'fire':
        return { bg: 'bg-red-800/40', emoji: '🔥', text: 'حريق!', shake: false, particles: ['🔥', '🔥', '💨'] };
      default:
        return { bg: 'bg-red-900/30', emoji: '⚠️', text: 'أزمة!', shake: false, particles: ['⚡'] };
    }
  };

  const config = getOverlayConfig();

  return (
    <AnimatePresence>
      <motion.div
        key={crisis.id}
        className={`fixed inset-0 z-[100] pointer-events-none ${config.bg}`}
        initial={{ opacity: 0 }}
        animate={config.shake ? {
          opacity: [0, 0.8, 0.6, 0.8, 0.6, 0.4, 0],
          x: [0, -10, 10, -15, 15, -5, 5, 0],
          y: [0, 5, -5, 8, -8, 3, -3, 0],
        } : {
          opacity: [0, 0.7, 0.5, 0.7, 0],
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: [0, 2, 1.5, 2, 0], rotate: [0, 10, -10, 5, 0] }}
          transition={{ duration: 2.5 }}
        >
          <span className="text-8xl filter drop-shadow-2xl">{config.emoji}</span>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: [0, 1, 1, 0], y: [30, 0, 0, -20] }}
          transition={{ duration: 2.5, times: [0, 0.2, 0.7, 1] }}
        >
          <span className="text-4xl font-black text-white drop-shadow-lg tracking-wider">
            {config.text}
          </span>
        </motion.div>

        {config.particles.map((particle, i) => (
          Array.from({ length: 4 }).map((_, j) => (
            <motion.span
              key={`${crisis.id}-${i}-${j}`}
              className="absolute text-3xl"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, Math.random() * 360],
                y: [0, -50 - Math.random() * 100],
                x: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 2,
                delay: 0.2 + i * 0.15 + j * 0.1,
                ease: 'easeOut',
              }}
            >
              {particle}
            </motion.span>
          ))
        ))}

        {crisis.severity === 'critical' && (
          <motion.div
            className="absolute inset-0 border-4 border-red-500 rounded-none"
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 1.5, repeat: 1 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
