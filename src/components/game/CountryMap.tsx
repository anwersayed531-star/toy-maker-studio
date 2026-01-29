import { motion } from 'framer-motion';
import { Region } from '@/types/game';
import { MapPin, Users, TrendingUp, Heart, AlertTriangle, Sparkles, Flame, Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface CountryMapProps {
  regions: Region[];
  selectedRegion?: string;
  onSelectRegion: (regionId: string) => void;
  activeEvent?: string;
}

// SVG paths for realistic country shape with regions
const regionPaths: Record<string, { path: string; labelX: number; labelY: number }> = {
  north: {
    path: 'M 80 20 L 150 15 L 220 25 L 250 50 L 240 90 L 200 100 L 150 95 L 100 100 L 60 85 L 50 50 Z',
    labelX: 150,
    labelY: 55,
  },
  capital: {
    path: 'M 130 110 L 170 105 L 190 120 L 185 150 L 160 165 L 130 160 L 115 140 L 120 115 Z',
    labelX: 152,
    labelY: 138,
  },
  west: {
    path: 'M 20 90 L 60 85 L 100 100 L 115 140 L 100 180 L 80 220 L 40 210 L 15 170 L 10 120 Z',
    labelX: 60,
    labelY: 155,
  },
  east: {
    path: 'M 200 100 L 240 90 L 280 110 L 290 160 L 275 210 L 240 220 L 210 200 L 190 160 L 190 120 Z',
    labelX: 240,
    labelY: 155,
  },
  coast: {
    path: 'M 10 120 L 15 170 L 40 210 L 80 220 L 100 250 L 80 290 L 40 300 L 10 280 L 5 220 L 5 160 Z',
    labelX: 50,
    labelY: 255,
  },
  south: {
    path: 'M 100 180 L 130 160 L 160 165 L 185 150 L 210 200 L 240 220 L 220 260 L 180 290 L 130 300 L 100 280 L 100 250 L 80 220 Z',
    labelX: 160,
    labelY: 235,
  },
};

const getRegionColor = (region: Region, isSelected: boolean, isHovered: boolean) => {
  const avgStat = (region.economy + region.loyalty + region.development - region.unrest) / 3;
  
  let baseColor: string;
  if (avgStat >= 60) {
    baseColor = 'hsl(142, 76%, 36%)'; // green
  } else if (avgStat >= 40) {
    baseColor = 'hsl(45, 93%, 47%)'; // yellow/gold
  } else {
    baseColor = 'hsl(0, 72%, 51%)'; // red
  }

  if (isSelected) {
    return baseColor;
  }
  if (isHovered) {
    return baseColor;
  }
  
  // Slightly muted version
  if (avgStat >= 60) {
    return 'hsl(142, 50%, 35%)';
  } else if (avgStat >= 40) {
    return 'hsl(45, 70%, 45%)';
  } else {
    return 'hsl(0, 50%, 45%)';
  }
};

export const CountryMap = ({ regions, selectedRegion, onSelectRegion, activeEvent }: CountryMapProps) => {
  const { t } = useLanguage();
  const selected = regions.find(r => r.id === selectedRegion);

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        {t('countryMap')}
        {activeEvent && (
          <span className="flex items-center gap-1 text-sm text-destructive animate-pulse">
            <Flame className="w-4 h-4" />
            {t('emergencyEvent')}
          </span>
        )}
      </h3>
      
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-cyan-900/30 rounded-lg overflow-hidden border border-border/50">
        {/* Ocean effect */}
        <div className="absolute inset-0 opacity-50">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="waves" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 0 25 Q 12.5 20, 25 25 T 50 25" fill="none" stroke="hsl(200, 50%, 30%)" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* Main SVG Map */}
        <svg 
          viewBox="0 0 300 320" 
          className="w-full h-auto relative z-10"
          style={{ minHeight: '300px' }}
        >
          <defs>
            {/* Country shadow */}
            <filter id="countryShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="black" floodOpacity="0.4"/>
            </filter>
            
            {/* Glow for selected region */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Texture pattern */}
            <pattern id="landTexture" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="transparent"/>
              <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.05)"/>
            </pattern>
          </defs>

          {/* Country outline shadow */}
          <g filter="url(#countryShadow)">
            <path
              d="M 80 20 L 150 15 L 220 25 L 250 50 L 280 110 L 290 160 L 275 210 L 240 220 L 220 260 L 180 290 L 130 300 L 100 280 L 80 290 L 40 300 L 10 280 L 5 220 L 5 160 L 10 120 L 20 90 L 50 50 Z"
              fill="hsl(var(--muted))"
              stroke="none"
            />
          </g>

          {/* Regions */}
          {regions.map((region) => {
            const regionPath = regionPaths[region.id];
            if (!regionPath) return null;
            
            const isSelected = selectedRegion === region.id;
            const hasUnrest = region.unrest > 40;
            
            return (
              <g key={region.id}>
                <motion.path
                  d={regionPath.path}
                  fill={getRegionColor(region, isSelected, false)}
                  stroke={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                  strokeWidth={isSelected ? 3 : 1.5}
                  className="cursor-pointer transition-colors"
                  filter={isSelected ? 'url(#glow)' : undefined}
                  onClick={() => onSelectRegion(region.id)}
                  whileHover={{ 
                    scale: 1.02,
                    filter: 'brightness(1.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: regions.indexOf(region) * 0.1 }}
                />
                
                {/* Region texture overlay */}
                <path
                  d={regionPath.path}
                  fill="url(#landTexture)"
                  pointerEvents="none"
                />

                {/* Region label */}
                <text
                  x={regionPath.labelX}
                  y={regionPath.labelY}
                  textAnchor="middle"
                  className="fill-white font-bold text-xs pointer-events-none select-none"
                  style={{ 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)',
                    fontSize: region.id === 'capital' ? '9px' : '11px'
                  }}
                >
                  {region.name}
                </text>

                {/* Unrest indicator */}
                {hasUnrest && (
                  <g className="animate-pulse">
                    <circle
                      cx={regionPath.labelX}
                      cy={regionPath.labelY + 15}
                      r="8"
                      fill="hsl(var(--destructive))"
                      opacity="0.8"
                    />
                    <text
                      x={regionPath.labelX}
                      y={regionPath.labelY + 18}
                      textAnchor="middle"
                      className="fill-white text-xs font-bold"
                      style={{ fontSize: '8px' }}
                    >
                      ⚠
                    </text>
                  </g>
                )}

                {/* Capital star */}
                {region.id === 'capital' && (
                  <g>
                    <circle
                      cx={regionPath.labelX}
                      cy={regionPath.labelY - 15}
                      r="6"
                      fill="hsl(var(--primary))"
                    />
                    <text
                      x={regionPath.labelX}
                      y={regionPath.labelY - 12}
                      textAnchor="middle"
                      className="fill-white"
                      style={{ fontSize: '8px' }}
                    >
                      ★
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Border decorations */}
          <path
            d="M 80 20 L 150 15 L 220 25 L 250 50 L 280 110 L 290 160 L 275 210 L 240 220 L 220 260 L 180 290 L 130 300 L 100 280 L 80 290 L 40 300 L 10 280 L 5 220 L 5 160 L 10 120 L 20 90 L 50 50 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            opacity="0.5"
          />

          {/* Compass */}
          <g transform="translate(270, 30)">
            <circle r="15" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <text y="4" textAnchor="middle" className="fill-primary font-bold" style={{ fontSize: '10px' }}>N</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-600" />
          <span className="text-muted-foreground">{t('stable')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-muted-foreground">{t('moderate')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-muted-foreground">{t('danger')}</span>
        </div>
      </div>

      {/* Selected Region Details */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-muted/50 rounded-lg border border-border/50"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              {selected.id === 'capital' && <Shield className="w-4 h-4 text-primary" />}
              {selected.name}
            </h4>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {selected.population}M {t('population')}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">{t('economy')}:</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success transition-all"
                  style={{ width: `${selected.economy}%` }}
                />
              </div>
              <span className="font-medium text-foreground text-xs">{selected.economy}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{t('loyalty')}:</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${selected.loyalty}%` }}
                />
              </div>
              <span className="font-medium text-foreground text-xs">{selected.loyalty}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-muted-foreground">{t('development')}:</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 transition-all"
                  style={{ width: `${selected.development}%` }}
                />
              </div>
              <span className="font-medium text-foreground text-xs">{selected.development}%</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">{t('unrest')}:</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${selected.unrest > 50 ? 'bg-destructive' : 'bg-warning'}`}
                  style={{ width: `${selected.unrest}%` }}
                />
              </div>
              <span className={`font-medium text-xs ${selected.unrest > 50 ? 'text-destructive' : 'text-foreground'}`}>
                {selected.unrest}%
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {selected.resources.map(resource => (
              <span key={resource} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                {resource === 'oil' && `🛢️ ${t('oil')}`}
                {resource === 'agriculture' && `🌾 ${t('agriculture')}`}
                {resource === 'industry' && `🏭 ${t('industry')}`}
                {resource === 'tourism' && `🏖️ ${t('tourism')}`}
                {resource === 'mining' && `⛏️ ${t('mining')}`}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
