import { motion, AnimatePresence } from 'framer-motion';
import { RandomEvent } from '@/data/randomEvents';
import { AlertTriangle, Flame, CloudRain, Skull, Swords, Building, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getEventTranslation, getSeverityText } from '@/i18n/eventTranslations';

interface RandomEventNotificationProps {
  event: RandomEvent | null;
  isVisible: boolean;
}

const getEventIcon = (type: RandomEvent['type']) => {
  switch (type) {
    case 'disaster':
      return <CloudRain className="w-8 h-8" />;
    case 'war':
      return <Swords className="w-8 h-8" />;
    case 'epidemic':
      return <Skull className="w-8 h-8" />;
    case 'political':
      return <Building className="w-8 h-8" />;
    case 'economic':
      return <AlertTriangle className="w-8 h-8" />;
    case 'social':
      return <Users className="w-8 h-8" />;
    default:
      return <Flame className="w-8 h-8" />;
  }
};

const getSeverityColor = (severity: RandomEvent['severity']) => {
  switch (severity) {
    case 'critical':
      return 'from-red-900/90 to-red-800/90 border-red-500';
    case 'high':
      return 'from-orange-900/90 to-orange-800/90 border-orange-500';
    case 'medium':
      return 'from-yellow-900/90 to-yellow-800/90 border-yellow-500';
    case 'low':
      return 'from-blue-900/90 to-blue-800/90 border-blue-500';
    default:
      return 'from-gray-900/90 to-gray-800/90 border-gray-500';
  }
};

export const RandomEventNotification = ({ event, isVisible }: RandomEventNotificationProps) => {
  const { currentLanguage } = useLanguage();
  
  if (!event) return null;

  // Get translated event content
  const translatedEvent = getEventTranslation(event.id, currentLanguage);
  const title = translatedEvent?.title || event.title;
  const description = translatedEvent?.description || event.description;
  const severityText = getSeverityText(event.severity, currentLanguage);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
        >
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: [0, -2, 2, -2, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
            className={`bg-gradient-to-br ${getSeverityColor(event.severity)} backdrop-blur-sm 
              rounded-2xl border-2 p-6 shadow-2xl max-w-md text-center`}
          >
            {/* Icon with pulse animation */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex justify-center mb-4 text-white"
            >
              {getEventIcon(event.type)}
            </motion.div>

            {/* Severity badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3
              ${event.severity === 'critical' ? 'bg-red-500 text-white animate-pulse' : 
                event.severity === 'high' ? 'bg-orange-500 text-white' :
                event.severity === 'medium' ? 'bg-yellow-500 text-black' :
                'bg-blue-500 text-white'}`}
            >
              {severityText}
            </div>

            {/* Event title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {title}
            </h2>

            {/* Event description */}
            <p className="text-gray-200 text-sm">
              {description}
            </p>

            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-white/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
