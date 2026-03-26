import { motion } from 'framer-motion';
import { Region } from '@/types/game';
import { MapPin, Users, TrendingUp, Heart, AlertTriangle, Hammer, Wheat, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getRegionName } from '@/i18n/entityTranslations';

interface InteractiveMapProps {
  regions: Region[];
  selectedRegion?: string;
  onSelectRegion: (regionId: string) => void;
}

const regionPositions: Record<string, { x: number; y: number; width: number; height: number }> = {
  capital: { x: 38, y: 35, width: 20, height: 18 },
  north: { x: 28, y: 5, width: 40, height: 28 },
  south: { x: 25, y: 65, width: 45, height: 30 },
  east: { x: 65, y: 30, width: 30, height: 35 },
  west: { x: 2, y: 30, width: 28, height: 35 },
  coast: { x: 5, y: 68, width: 20, height: 28 },
};

const getRegionColor = (region: Region) => {
  const score = (region.economy + region.loyalty + region.development) / 3 - region.unrest * 0.5;
  if (score >= 50) return 'from-emerald-500/70 to-emerald-700/70';
  if (score >= 30) return 'from-amber-500/70 to-amber-700/70';
  return 'from-red-500/70 to-red-700/70';
};

const getRegionBorderColor = (region: Region) => {
  if (region.unrest > 50) return 'border-red-500';
  if (region.unrest > 30) return 'border-amber-500';
  return 'border-emerald-500/50';
};

const resourceIcons: Record<string, string> = {
  oil: '🛢️',
  agriculture: '🌾',
  industry: '🏭',
  tourism: '🏖️',
  mining: '⛏️',
};

const buildingIcons: Record<string, string> = {
  factory: '🏭',
  hospital: '🏥',
  military_base: '🏰',
  university: '🎓',
  power_plant: '⚡',
  farm: '🌾',
};

export const InteractiveMap = ({ regions, selectedRegion, onSelectRegion }: InteractiveMapProps) => {
  const { t, currentLanguage } = useLanguage();
  const selected = regions.find(r => r.id === selectedRegion);

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        {t('countryMap')}
      </h3>
      
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg aspect-[4/3] overflow-hidden border border-border/50">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
          <line x1="48" y1="44" x2="48" y2="19" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
          <line x1="48" y1="53" x2="47" y2="80" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
          <line x1="58" y1="44" x2="80" y2="47" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
          <line x1="38" y1="44" x2="16" y2="47" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
          <line x1="15" y1="65" x2="15" y2="82" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
        </svg>

        {regions.map((region) => {
          const pos = regionPositions[region.id];
          const isSelected = selectedRegion === region.id;
          
          return (
            <motion.button
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className={`absolute rounded-lg bg-gradient-to-br ${getRegionColor(region)} border-2 ${getRegionBorderColor(region)}
                transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5
                ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-card z-10 shadow-lg shadow-primary/20' : 'hover:scale-105 hover:shadow-md'}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${pos.width}%`,
                height: `${pos.height}%`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-white font-bold text-[10px] sm:text-xs drop-shadow-lg leading-tight">
                {getRegionName(region.id, currentLanguage)}
              </span>
              <div className="flex items-center gap-0.5">
                {region.resources.slice(0, 2).map(r => (
                  <span key={r} className="text-[8px] sm:text-[10px]">{resourceIcons[r]}</span>
                ))}
              </div>
              {region.buildings.length > 0 && (
                <div className="flex items-center gap-0.5">
                  {region.buildings.slice(0, 2).map(b => (
                    <span key={b.id} className="text-[7px]">{buildingIcons[b.type]}</span>
                  ))}
                </div>
              )}
              {region.unrest > 40 && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertTriangle className="w-3 h-3 text-white drop-shadow" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Region Details */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-foreground text-lg">{getRegionName(selected.id, currentLanguage)}</h4>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {selected.population}M {t('population')}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <StatRow icon={<TrendingUp className="w-3.5 h-3.5 text-emerald-500" />} label={t('economy')} value={selected.economy} color="bg-emerald-500" />
            <StatRow icon={<Heart className="w-3.5 h-3.5 text-primary" />} label={t('loyalty')} value={selected.loyalty} color="bg-primary" />
            <StatRow icon={<Hammer className="w-3.5 h-3.5 text-blue-400" />} label={t('development')} value={selected.development} color="bg-blue-400" />
            <StatRow icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-500" />} label={t('unrest')} value={selected.unrest} color={selected.unrest > 50 ? 'bg-destructive' : 'bg-amber-500'} danger={selected.unrest > 50} />
            <StatRow icon={<Wheat className="w-3.5 h-3.5 text-green-400" />} label="🌾" value={selected.food} color="bg-green-400" />
            <StatRow icon={<Zap className="w-3.5 h-3.5 text-yellow-400" />} label="⚡" value={selected.energy} color="bg-yellow-400" />
          </div>

          {selected.buildings.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selected.buildings.map(b => (
                <span key={b.id} className="px-2 py-1 bg-accent/15 text-accent text-xs rounded-full border border-accent/20">
                  {buildingIcons[b.type]} Lv.{b.level}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {selected.resources.map(resource => (
              <span key={resource} className="px-2 py-1 bg-primary/15 text-primary text-xs rounded-full border border-primary/20">
                {resourceIcons[resource]} {resource === 'oil' ? t('oil') : resource === 'agriculture' ? t('agriculture') : resource === 'industry' ? t('industry') : resource === 'tourism' ? t('tourism') : t('mining')}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const StatRow = ({ icon, label, value, color, danger }: { icon: React.ReactNode; label: string; value: number; color: string; danger?: boolean }) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="text-xs text-muted-foreground w-8 truncate">{label}</span>
    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
    <span className={`text-[10px] font-bold ${danger ? 'text-destructive' : 'text-foreground'}`}>{value}</span>
  </div>
);
