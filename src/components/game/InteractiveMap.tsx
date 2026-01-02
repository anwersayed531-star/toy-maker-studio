import { motion } from 'framer-motion';
import { Region } from '@/types/game';
import { MapPin, Users, TrendingUp, Heart, AlertTriangle } from 'lucide-react';

interface InteractiveMapProps {
  regions: Region[];
  selectedRegion?: string;
  onSelectRegion: (regionId: string) => void;
}

const regionPositions: Record<string, { x: number; y: number; width: number; height: number }> = {
  capital: { x: 45, y: 40, width: 15, height: 15 },
  north: { x: 35, y: 10, width: 35, height: 25 },
  south: { x: 30, y: 70, width: 40, height: 25 },
  east: { x: 70, y: 35, width: 25, height: 30 },
  west: { x: 5, y: 35, width: 25, height: 30 },
  coast: { x: 15, y: 65, width: 15, height: 30 },
};

const getRegionColor = (region: Region) => {
  const avgStat = (region.economy + region.loyalty + region.development - region.unrest) / 3;
  if (avgStat >= 60) return 'hsl(var(--success))';
  if (avgStat >= 40) return 'hsl(var(--warning))';
  return 'hsl(var(--destructive))';
};

export const InteractiveMap = ({ regions, selectedRegion, onSelectRegion }: InteractiveMapProps) => {
  const selected = regions.find(r => r.id === selectedRegion);

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        خريطة المناطق
      </h3>
      
      {/* Map Container */}
      <div className="relative bg-muted/30 rounded-lg aspect-[4/3] overflow-hidden border border-border/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Regions */}
        {regions.map((region) => {
          const pos = regionPositions[region.id];
          const isSelected = selectedRegion === region.id;
          
          return (
            <motion.button
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className={`absolute rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center text-xs font-medium
                ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-card z-10' : 'hover:scale-105'}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${pos.width}%`,
                height: `${pos.height}%`,
                backgroundColor: getRegionColor(region),
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-white font-bold text-shadow drop-shadow-lg">
                {region.name}
              </span>
              {region.unrest > 40 && (
                <AlertTriangle className="w-3 h-3 text-white mt-1 animate-pulse" />
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
          className="mt-4 p-4 bg-muted/50 rounded-lg border border-border/50"
        >
          <h4 className="font-bold text-foreground mb-3">{selected.name}</h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">السكان:</span>
              <span className="font-medium text-foreground">{selected.population}M</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">الاقتصاد:</span>
              <span className="font-medium text-foreground">{selected.economy}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">الولاء:</span>
              <span className="font-medium text-foreground">{selected.loyalty}%</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">الاضطرابات:</span>
              <span className={`font-medium ${selected.unrest > 50 ? 'text-destructive' : 'text-foreground'}`}>
                {selected.unrest}%
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {selected.resources.map(resource => (
              <span key={resource} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                {resource === 'oil' && 'نفط'}
                {resource === 'agriculture' && 'زراعة'}
                {resource === 'industry' && 'صناعة'}
                {resource === 'tourism' && 'سياحة'}
                {resource === 'mining' && 'تعدين'}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
