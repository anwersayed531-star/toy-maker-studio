export interface Region {
  id: string;
  name: string;
  population: number;
  economy: number;
  loyalty: number;
  development: number;
  unrest: number;
  governor?: string;
  resources: ('oil' | 'agriculture' | 'industry' | 'tourism' | 'mining')[];
}

export interface Advisor {
  id: string;
  name: string;
  role: 'economic' | 'military' | 'diplomatic' | 'internal';
  loyalty: number;
  competence: number;
  opinion?: string;
}

export interface SupportFaction {
  id: string;
  name: string;
  type: 'military' | 'business' | 'religious' | 'labor' | 'intellectuals';
  support: number;
  influence: number;
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
  triggeredBy: string;
  choiceId: string;
  turnsUntilTrigger: number;
  triggered: boolean;
  decision: Decision;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type CharacterStatus = 'alive' | 'imprisoned' | 'exiled' | 'dead';

export interface Character {
  id: string;
  name: string;
  role: string;
  loyalty: number; // 0-100
  skill: number; // 0-100
  status: CharacterStatus;
  description: string;
  portraitEmoji: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  description: string;
  unlockCondition: {
    type: 'turn' | 'stat' | 'event';
    value: number;
    stat?: string;
  };
  completed: boolean;
  decisions?: string[]; // decision IDs linked to this chapter
}

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
  treasury: number;
  population: number;
  
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
  
  // Story & Characters
  characters: Character[];
  storyChapters: StoryChapter[];
  currentChapter: number;
  
  // Crisis animation
  activeCrisis?: {
    type: 'earthquake' | 'war' | 'coup' | 'epidemic' | 'economic' | 'fire';
    severity: 'medium' | 'high' | 'critical';
    id: string; // unique id to prevent re-triggering
  };
  
  // Turn Goals
  turnGoal?: TurnGoal;
  turnGoalCompleted?: boolean;
  
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
  regionId?: string;
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

const initialCharacters: Character[] = [
  { id: 'vice_president', name: 'نائب الرئيس - عادل المنصور', role: 'نائب الرئيس', loyalty: 65, skill: 70, status: 'alive', description: 'سياسي محنك يطمح للرئاسة سراً', portraitEmoji: '🎩' },
  { id: 'intelligence_chief', name: 'رئيس المخابرات - اللواء سالم', role: 'رئيس المخابرات', loyalty: 75, skill: 85, status: 'alive', description: 'يعرف أسرار الجميع ولا يثق بأحد', portraitEmoji: '🕶️' },
  { id: 'opposition_leader', name: 'قائد المعارضة - كمال الدين', role: 'زعيم المعارضة', loyalty: 15, skill: 80, status: 'alive', description: 'خطيب مفوّه يحرك الشارع بكلماته', portraitEmoji: '📢' },
  { id: 'tycoon', name: 'رجل الأعمال - حسن الثري', role: 'رجل أعمال', loyalty: 50, skill: 90, status: 'alive', description: 'يملك نصف اقتصاد البلاد ويريد النصف الآخر', portraitEmoji: '💰' },
  { id: 'tribal_chief', name: 'الشيخ عبدالله - زعيم القبائل', role: 'زعيم قبلي', loyalty: 55, skill: 60, status: 'alive', description: 'يتحكم في الجنوب ويمسك بتوازن القبائل', portraitEmoji: '⚔️' },
  { id: 'nuclear_scientist', name: 'د. ليلى العلمية', role: 'عالمة نووية', loyalty: 80, skill: 95, status: 'alive', description: 'عبقرية في الفيزياء النووية وحلم البرنامج النووي', portraitEmoji: '🔬' },
  { id: 'journalist', name: 'الصحفي - يوسف الحقيقة', role: 'صحفي شهير', loyalty: 30, skill: 75, status: 'alive', description: 'يكشف الفساد ولا يخشى أحداً', portraitEmoji: '📰' },
  { id: 'general', name: 'الجنرال - طارق الحديد', role: 'قائد الجيش', loyalty: 70, skill: 85, status: 'alive', description: 'بطل حرب سابق يحظى بولاء الجنود', portraitEmoji: '🎖️' },
];

const initialStoryChapters: StoryChapter[] = [
  { id: 'ch1', title: 'الفصل الأول: بداية الحكم', description: 'وصلت للسلطة في ظروف غامضة. الجميع يراقبك والتحديات تتراكم. أثبت أنك تستحق هذا المنصب.', unlockCondition: { type: 'turn', value: 0 }, completed: false },
  { id: 'ch2', title: 'الفصل الثاني: اختبار الولاء', description: 'بعد أشهر من الحكم، تظهر الخيانات. من يقف معك ومن يتآمر عليك؟ عليك أن تكتشف قبل فوات الأوان.', unlockCondition: { type: 'turn', value: 8 }, completed: false },
  { id: 'ch3', title: 'الفصل الثالث: عاصفة الأزمات', description: 'أزمات متتالية تضرب البلاد. الاقتصاد يترنح والشعب غاضب. هل تستطيع إنقاذ الموقف؟', unlockCondition: { type: 'turn', value: 18 }, completed: false },
  { id: 'ch4', title: 'الفصل الرابع: صراع القوى', description: 'الفصائل تتصارع والجيش يتحرك. نائب الرئيس يخطط والمعارضة تشتد. من سيسقط أولاً؟', unlockCondition: { type: 'turn', value: 30 }, completed: false },
  { id: 'ch5', title: 'الفصل الخامس: لحظة الحقيقة', description: 'كل قراراتك السابقة تقودك لهذه اللحظة. هل ستُكتب كبطل أم كطاغية في التاريخ؟', unlockCondition: { type: 'turn', value: 45 }, completed: false },
  { id: 'ch6', title: 'الفصل السادس: الحرب الكبرى', description: 'تهديد خارجي يلوح في الأفق. عليك توحيد البلاد أو مواجهة الدمار.', unlockCondition: { type: 'turn', value: 60 }, completed: false },
  { id: 'ch7', title: 'الفصل السابع: إرث الرئيس', description: 'بعد سنوات من الحكم، ما الإرث الذي ستتركه؟ التاريخ يحكم عليك الآن.', unlockCondition: { type: 'turn', value: 80 }, completed: false },
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
  characters: initialCharacters,
  storyChapters: initialStoryChapters,
  currentChapter: 0,
  gameWon: false,
  pendingEvents: [],
  eventCooldowns: [],
  gameOver: false,
  turnCount: 0,
};
