import { Decision } from '@/types/game';

export interface RandomEvent extends Decision {
  probability: number; // 0-100 chance per turn
  minTurn: number; // minimum turn before event can trigger
  cooldown: number; // turns before same event can happen again
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'disaster' | 'war' | 'epidemic' | 'political' | 'economic' | 'social';
}

export const randomEvents: RandomEvent[] = [
  // Natural Disasters
  {
    id: 'earthquake',
    title: '🌍 زلزال مدمر',
    description: 'زلزال قوي يضرب المنطقة الجنوبية! آلاف المباني تضررت والضحايا في تزايد.',
    category: 'social',
    probability: 8,
    minTurn: 3,
    cooldown: 10,
    severity: 'critical',
    type: 'disaster',
    choices: [
      {
        id: 'full_response',
        text: 'إعلان حالة الطوارئ وتخصيص ميزانية ضخمة',
        effects: { treasury: -40, popularity: 15, economy: -10 },
        regionEffects: [
          { regionId: 'south', effects: { unrest: -15, loyalty: 20 } },
        ],
      },
      {
        id: 'moderate_response',
        text: 'إرسال فرق الإنقاذ مع مساعدات محدودة',
        effects: { treasury: -15, popularity: 5 },
        regionEffects: [
          { regionId: 'south', effects: { unrest: 10, loyalty: 5 } },
        ],
      },
      {
        id: 'request_international_aid',
        text: 'طلب مساعدات دولية',
        effects: { diplomacy: 5, popularity: -5, treasury: -5 },
        regionEffects: [
          { regionId: 'south', effects: { unrest: 15 } },
        ],
      },
    ],
  },
  {
    id: 'flood',
    title: '🌊 فيضانات كارثية',
    description: 'أمطار غزيرة تسبب فيضانات في منطقة الساحل! المحاصيل دُمرت وآلاف السكان نزحوا.',
    category: 'social',
    probability: 10,
    minTurn: 2,
    cooldown: 8,
    severity: 'high',
    type: 'disaster',
    choices: [
      {
        id: 'evacuate_all',
        text: 'إجلاء شامل وبناء مخيمات مؤقتة',
        effects: { treasury: -25, popularity: 10, military: -5 },
        regionEffects: [
          { regionId: 'coast', effects: { economy: -20, loyalty: 15, unrest: -10 } },
        ],
      },
      {
        id: 'local_response',
        text: 'الاعتماد على الجهود المحلية',
        effects: { treasury: -5, popularity: -10 },
        regionEffects: [
          { regionId: 'coast', effects: { economy: -15, loyalty: -15, unrest: 20 } },
        ],
      },
    ],
  },
  {
    id: 'drought',
    title: '☀️ موجة جفاف شديدة',
    description: 'جفاف حاد يضرب المناطق الزراعية! المحاصيل تموت والمزارعون يعانون.',
    category: 'economy',
    probability: 12,
    minTurn: 4,
    cooldown: 12,
    severity: 'high',
    type: 'disaster',
    choices: [
      {
        id: 'emergency_irrigation',
        text: 'مشروع ري طوارئ ودعم المزارعين',
        effects: { treasury: -35, economy: 5, popularity: 10 },
        regionEffects: [
          { regionId: 'north', effects: { economy: 10, loyalty: 10 } },
          { regionId: 'east', effects: { economy: 10, loyalty: 10 } },
        ],
        factionEffects: [
          { factionId: 'labor', supportChange: 15 },
        ],
      },
      {
        id: 'import_food',
        text: 'استيراد الغذاء من الخارج',
        effects: { treasury: -20, diplomacy: 5, economy: -10 },
      },
      {
        id: 'ration_water',
        text: 'تقنين المياه والاعتماد على المخزون',
        effects: { popularity: -20, treasury: 5 },
        regionEffects: [
          { regionId: 'north', effects: { unrest: 25, loyalty: -15 } },
        ],
      },
    ],
  },

  // Wars and Conflicts
  {
    id: 'border_attack',
    title: '⚔️ هجوم على الحدود',
    description: 'قوات مسلحة مجهولة تهاجم نقطة حدودية! سقوط ضحايا من الجيش.',
    category: 'military',
    probability: 6,
    minTurn: 5,
    cooldown: 15,
    severity: 'critical',
    type: 'war',
    choices: [
      {
        id: 'counter_attack',
        text: 'شن هجوم مضاد فوري',
        effects: { military: 10, diplomacy: -20, treasury: -30, popularity: 15 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 25 },
        ],
      },
      {
        id: 'defensive_stance',
        text: 'تعزيز الدفاعات وطلب تفسير',
        effects: { military: 5, diplomacy: 5, treasury: -15 },
      },
      {
        id: 'seek_ceasefire',
        text: 'السعي لوقف إطلاق نار',
        effects: { diplomacy: 15, military: -10, popularity: -10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -15 },
        ],
      },
    ],
  },
  {
    id: 'terrorist_attack',
    title: '💥 هجوم إرهابي',
    description: 'تفجير في العاصمة يخلف ضحايا مدنيين! الرعب يجتاح البلاد.',
    category: 'military',
    probability: 5,
    minTurn: 6,
    cooldown: 20,
    severity: 'critical',
    type: 'war',
    choices: [
      {
        id: 'security_crackdown',
        text: 'حملة أمنية واسعة واعتقالات',
        effects: { military: 15, popularity: -15, diplomacy: -10 },
        regionEffects: [
          { regionId: 'capital', effects: { unrest: 25, loyalty: -10 } },
        ],
        factionEffects: [
          { factionId: 'military_faction', supportChange: 20 },
          { factionId: 'intellectuals', supportChange: -20 },
        ],
      },
      {
        id: 'balanced_response',
        text: 'تحقيقات مع احترام الحريات',
        effects: { military: 5, popularity: 10, diplomacy: 10 },
      },
      {
        id: 'national_unity',
        text: 'خطاب وحدة وطنية ومساعدة الضحايا',
        effects: { popularity: 20, treasury: -15 },
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: 15, unrest: -10 } },
        ],
      },
    ],
  },
  {
    id: 'civil_war_threat',
    title: '🔥 تهديد بحرب أهلية',
    description: 'تصاعد التوترات بين الفصائل ينذر بحرب أهلية! المسلحون يتجمعون.',
    category: 'military',
    probability: 3,
    minTurn: 10,
    cooldown: 25,
    severity: 'critical',
    type: 'war',
    choices: [
      {
        id: 'military_solution',
        text: 'سحق المسلحين بالقوة',
        effects: { military: 20, popularity: -30, diplomacy: -25, treasury: -40 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 30 },
        ],
      },
      {
        id: 'peace_talks',
        text: 'مفاوضات سلام عاجلة',
        effects: { diplomacy: 15, popularity: 10, military: -10 },
      },
      {
        id: 'power_sharing',
        text: 'عرض مشاركة السلطة',
        effects: { popularity: -5, diplomacy: 20, military: -5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -15 },
        ],
      },
    ],
  },

  // Epidemics
  {
    id: 'disease_outbreak',
    title: '🦠 تفشي وباء',
    description: 'مرض معدٍ ينتشر بسرعة! المستشفيات تمتلئ والذعر يسود.',
    category: 'social',
    probability: 7,
    minTurn: 4,
    cooldown: 15,
    severity: 'high',
    type: 'epidemic',
    choices: [
      {
        id: 'total_lockdown',
        text: 'إغلاق تام وحجر صحي',
        effects: { economy: -25, popularity: -15, treasury: -20 },
        regionEffects: [
          { regionId: 'capital', effects: { economy: -20, unrest: 30 } },
        ],
      },
      {
        id: 'targeted_measures',
        text: 'إجراءات مستهدفة في بؤر التفشي',
        effects: { economy: -10, popularity: 5, treasury: -10 },
      },
      {
        id: 'herd_immunity',
        text: 'الاعتماد على المناعة الطبيعية',
        effects: { economy: 5, popularity: -25, diplomacy: -10 },
      },
    ],
  },
  {
    id: 'water_contamination',
    title: '☠️ تلوث المياه',
    description: 'اكتشاف تلوث خطير في مصادر المياه! حالات تسمم في ازدياد.',
    category: 'social',
    probability: 8,
    minTurn: 3,
    cooldown: 12,
    severity: 'medium',
    type: 'epidemic',
    choices: [
      {
        id: 'emergency_water',
        text: 'توزيع مياه معبأة على الجميع',
        effects: { treasury: -25, popularity: 15 },
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: 10 } },
        ],
      },
      {
        id: 'fix_infrastructure',
        text: 'إصلاح شبكة المياه بشكل عاجل',
        effects: { treasury: -40, economy: 5, popularity: 10 },
      },
      {
        id: 'blame_others',
        text: 'تحميل المسؤولية للإدارات المحلية',
        effects: { popularity: -10 },
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: -20, unrest: 15 } },
        ],
      },
    ],
  },

  // Political Events
  {
    id: 'coup_attempt',
    title: '🎖️ محاولة انقلاب',
    description: 'ضباط في الجيش يخططون لانقلاب! المخابرات كشفت المؤامرة.',
    category: 'military',
    probability: 4,
    minTurn: 8,
    cooldown: 30,
    severity: 'critical',
    type: 'political',
    choices: [
      {
        id: 'purge_military',
        text: 'تطهير الجيش واعتقال المتورطين',
        effects: { military: -20, popularity: 10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -30 },
        ],
      },
      {
        id: 'quiet_removal',
        text: 'إقالة هادئة للمتورطين',
        effects: { military: -5, diplomacy: 5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -10 },
        ],
      },
      {
        id: 'negotiate_conspirators',
        text: 'التفاوض مع المتآمرين',
        effects: { popularity: -15, military: 10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
        ],
      },
    ],
  },
  {
    id: 'corruption_scandal',
    title: '💰 فضيحة فساد',
    description: 'وسائل الإعلام تكشف فضيحة فساد كبرى تطال مسؤولين كبار!',
    category: 'social',
    probability: 10,
    minTurn: 2,
    cooldown: 10,
    severity: 'medium',
    type: 'political',
    choices: [
      {
        id: 'full_investigation',
        text: 'تحقيق شامل ومحاكمة المتورطين',
        effects: { popularity: 20, economy: -5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 20 },
          { factionId: 'business', supportChange: -15 },
        ],
      },
      {
        id: 'limited_action',
        text: 'إجراءات محدودة وتشكيل لجنة',
        effects: { popularity: -5 },
      },
      {
        id: 'cover_up',
        text: 'التستر على الفضيحة',
        effects: { popularity: -25, diplomacy: -10 },
        factionEffects: [
          { factionId: 'business', supportChange: 10 },
        ],
      },
    ],
  },

  // Economic Events
  {
    id: 'stock_market_crash',
    title: '📉 انهيار البورصة',
    description: 'سوق الأسهم ينهار! الشركات تفلس والبطالة ترتفع.',
    category: 'economy',
    probability: 6,
    minTurn: 5,
    cooldown: 15,
    severity: 'high',
    type: 'economic',
    choices: [
      {
        id: 'bailout',
        text: 'إنقاذ الشركات الكبرى بأموال الدولة',
        effects: { treasury: -50, economy: 15, popularity: -15 },
        factionEffects: [
          { factionId: 'business', supportChange: 25 },
          { factionId: 'labor', supportChange: -20 },
        ],
      },
      {
        id: 'stimulus',
        text: 'حزمة تحفيز للمواطنين والشركات الصغيرة',
        effects: { treasury: -30, economy: 5, popularity: 15 },
        factionEffects: [
          { factionId: 'labor', supportChange: 15 },
        ],
      },
      {
        id: 'let_market',
        text: 'ترك السوق يصحح نفسه',
        effects: { economy: -15, popularity: -10 },
      },
    ],
  },
  {
    id: 'oil_crisis',
    title: '🛢️ أزمة نفطية',
    description: 'أسعار النفط تنهار عالمياً! إيرادات الدولة تتراجع بشدة.',
    category: 'economy',
    probability: 8,
    minTurn: 3,
    cooldown: 12,
    severity: 'high',
    type: 'economic',
    choices: [
      {
        id: 'diversify_economy',
        text: 'خطة تنويع اقتصادي عاجلة',
        effects: { treasury: -25, economy: 10, diplomacy: 5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 15 },
        ],
      },
      {
        id: 'cut_spending',
        text: 'تقشف وخفض الإنفاق الحكومي',
        effects: { treasury: 10, popularity: -20, economy: -10 },
        factionEffects: [
          { factionId: 'labor', supportChange: -15 },
        ],
      },
      {
        id: 'borrow_money',
        text: 'الاقتراض من صناديق دولية',
        effects: { treasury: 30, diplomacy: -10, economy: -5 },
      },
    ],
  },

  // Social Events
  {
    id: 'mass_strike',
    title: '🪧 إضراب عام',
    description: 'العمال يعلنون إضراباً عاماً! المرافق الحيوية تتوقف.',
    category: 'social',
    probability: 9,
    minTurn: 4,
    cooldown: 10,
    severity: 'medium',
    type: 'social',
    choices: [
      {
        id: 'meet_demands',
        text: 'الاستجابة لمطالب العمال',
        effects: { treasury: -20, popularity: 15, economy: -5 },
        factionEffects: [
          { factionId: 'labor', supportChange: 25 },
          { factionId: 'business', supportChange: -15 },
        ],
      },
      {
        id: 'negotiate',
        text: 'التفاوض على حل وسط',
        effects: { popularity: 5 },
        factionEffects: [
          { factionId: 'labor', supportChange: 5 },
        ],
      },
      {
        id: 'break_strike',
        text: 'فض الإضراب بالقوة',
        effects: { popularity: -25, military: 5, diplomacy: -15 },
        factionEffects: [
          { factionId: 'labor', supportChange: -30 },
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
    ],
  },
  {
    id: 'refugee_crisis',
    title: '🏃 أزمة لاجئين',
    description: 'آلاف اللاجئين يتدفقون عبر الحدود هرباً من صراع في دولة مجاورة!',
    category: 'diplomacy',
    probability: 7,
    minTurn: 5,
    cooldown: 15,
    severity: 'medium',
    type: 'social',
    choices: [
      {
        id: 'open_borders',
        text: 'فتح الحدود وإنشاء مخيمات',
        effects: { treasury: -30, diplomacy: 20, popularity: -10 },
        factionEffects: [
          { factionId: 'religious', supportChange: 15 },
        ],
      },
      {
        id: 'limited_entry',
        text: 'قبول عدد محدود فقط',
        effects: { treasury: -10, diplomacy: 5 },
      },
      {
        id: 'close_borders',
        text: 'إغلاق الحدود تماماً',
        effects: { diplomacy: -20, popularity: 10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
    ],
  },
];

export interface ActiveEventCooldown {
  eventId: string;
  turnsRemaining: number;
}

export const getRandomEvent = (
  turnCount: number,
  cooldowns: ActiveEventCooldown[]
): RandomEvent | null => {
  const availableEvents = randomEvents.filter(event => {
    if (turnCount < event.minTurn) return false;
    
    const cooldown = cooldowns.find(c => c.eventId === event.id);
    if (cooldown && cooldown.turnsRemaining > 0) return false;
    
    return true;
  });

  if (availableEvents.length === 0) return null;

  // Check probability for each event
  for (const event of availableEvents) {
    const roll = Math.random() * 100;
    if (roll < event.probability) {
      return event;
    }
  }

  return null;
};
