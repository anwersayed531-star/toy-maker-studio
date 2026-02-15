export interface Region {
  id: string;
  name: string;
  population: number; // in millions
  economy: number; // 0-100
  loyalty: number; // 0-100
  development: number; // 0-100
  unrest: number; // 0-100
  governor?: string;
  resources: ('oil' | 'agriculture' | 'industry' | 'tourism' | 'mining')[];
}

export interface Advisor {
  id: string;
  name: string;
  role: 'economic' | 'military' | 'diplomatic' | 'internal';
  loyalty: number; // 0-100
  competence: number; // 0-100
  opinion?: string;
}

export interface SupportFaction {
  id: string;
  name: string;
  type: 'military' | 'business' | 'religious' | 'labor' | 'intellectuals';
  support: number; // 0-100
  influence: number; // 0-100
  demands?: string;
}

export interface VictoryCondition {
  id: string;
  name: string;
  description: string;
  type: 'economic' | 'military' | 'diplomatic' | 'popular';
  targetValue: number;
  currentValue: number;
  completed: boolean;
}

export interface FollowUpEvent {
  id: string;
  triggeredBy: string; // decision id that triggered this
  choiceId: string; // which choice triggered it
  turnsUntilTrigger: number;
  triggered: boolean;
  decision: Decision;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface GameState {
  countryName: string;
  presidentName: string;
  difficulty: DifficultyLevel;
  year: number;
  month: number;
  
  // Core stats (0-100)
  economy: number;
  military: number;
  popularity: number;
  diplomacy: number;
  
  // Resources
  treasury: number; // in billions
  population: number; // in millions
  
  // Regions
  regions: Region[];
  selectedRegion?: string;
  
  // Advisors
  advisors: Advisor[];
  
  // Support Factions
  factions: SupportFaction[];
  
  // Victory
  victoryConditions: VictoryCondition[];
  gameWon: boolean;
  victoryType?: string;
  
  // Follow-up events
  pendingEvents: FollowUpEvent[];
  
  // Random events
  eventCooldowns: { eventId: string; turnsRemaining: number }[];
  lastRandomEvent?: string;
  
  // Game status
  gameOver: boolean;
  gameOverReason?: string;
  turnCount: number;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  category: 'economy' | 'military' | 'diplomacy' | 'social' | 'regional';
  regionId?: string; // for region-specific decisions
  choices: Choice[];
  followUpEvents?: {
    choiceId: string;
    delay: number;
    event: Omit<Decision, 'followUpEvents'>;
  }[];
}

export interface Choice {
  id: string;
  text: string;
  effects: Partial<Pick<GameState, 'economy' | 'military' | 'popularity' | 'diplomacy' | 'treasury'>>;
  regionEffects?: {
    regionId: string;
    effects: Partial<Pick<Region, 'economy' | 'loyalty' | 'development' | 'unrest'>>;
  }[];
  factionEffects?: {
    factionId: string;
    supportChange: number;
  }[];
}

export interface NewsEvent {
  id: string;
  headline: string;
  description: string;
  impact: string;
}

const initialRegions: Region[] = [
  { id: 'capital', name: 'العاصمة', population: 8, economy: 70, loyalty: 60, development: 80, unrest: 20, resources: ['industry', 'tourism'] },
  { id: 'north', name: 'الشمال', population: 5, economy: 50, loyalty: 70, development: 50, unrest: 15, resources: ['agriculture', 'industry'] },
  { id: 'south', name: 'الجنوب', population: 4, economy: 40, loyalty: 50, development: 35, unrest: 30, resources: ['oil', 'mining'] },
  { id: 'east', name: 'الشرق', population: 3, economy: 55, loyalty: 65, development: 45, unrest: 20, resources: ['agriculture', 'tourism'] },
  { id: 'west', name: 'الغرب', population: 4, economy: 45, loyalty: 55, development: 40, unrest: 25, resources: ['mining', 'agriculture'] },
  { id: 'coast', name: 'الساحل', population: 6, economy: 65, loyalty: 60, development: 60, unrest: 15, resources: ['tourism', 'industry'] },
];

const initialAdvisors: Advisor[] = [
  { id: 'economic', name: 'وزير المالية', role: 'economic', loyalty: 70, competence: 60 },
  { id: 'military', name: 'وزير الدفاع', role: 'military', loyalty: 80, competence: 70 },
  { id: 'diplomatic', name: 'وزير الخارجية', role: 'diplomatic', loyalty: 65, competence: 75 },
  { id: 'internal', name: 'وزير الداخلية', role: 'internal', loyalty: 75, competence: 65 },
];

const initialFactions: SupportFaction[] = [
  { id: 'military_faction', name: 'المؤسسة العسكرية', type: 'military', support: 60, influence: 80 },
  { id: 'business', name: 'رجال الأعمال', type: 'business', support: 50, influence: 70 },
  { id: 'religious', name: 'المؤسسة الدينية', type: 'religious', support: 55, influence: 60 },
  { id: 'labor', name: 'نقابات العمال', type: 'labor', support: 45, influence: 50 },
  { id: 'intellectuals', name: 'المثقفون والأكاديميون', type: 'intellectuals', support: 40, influence: 40 },
];

const initialVictoryConditions: VictoryCondition[] = [
  { id: 'economic_victory', name: 'الازدهار الاقتصادي', description: 'وصول الاقتصاد إلى 90+', type: 'economic', targetValue: 90, currentValue: 45, completed: false },
  { id: 'military_victory', name: 'القوة العسكرية', description: 'وصول القوة العسكرية إلى 90+', type: 'military', targetValue: 90, currentValue: 45, completed: false },
  { id: 'diplomatic_victory', name: 'الهيمنة الدبلوماسية', description: 'وصول الدبلوماسية إلى 90+', type: 'diplomatic', targetValue: 90, currentValue: 45, completed: false },
  { id: 'popular_victory', name: 'الزعيم المحبوب', description: 'وصول الشعبية إلى 95+', type: 'popular', targetValue: 95, currentValue: 50, completed: false },
];

export const initialGameState: GameState = {
  countryName: 'الجمهورية',
  presidentName: 'الرئيس',
  difficulty: 'medium',
  year: 2024,
  month: 1,
  economy: 45,
  military: 45,
  popularity: 50,
  diplomacy: 45,
  treasury: 80,
  population: 50,
  regions: initialRegions,
  advisors: initialAdvisors,
  factions: initialFactions,
  victoryConditions: initialVictoryConditions,
  gameWon: false,
  pendingEvents: [],
  eventCooldowns: [],
  gameOver: false,
  turnCount: 0,
};
