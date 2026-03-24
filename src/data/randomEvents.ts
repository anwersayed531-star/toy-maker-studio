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
  // New random events
  {
    id: 'nuclear_meltdown',
    title: '☢️ تسرب نووي',
    description: 'تسرب إشعاعي من محطة الطاقة النووية! المنطقة المحيطة في خطر شديد.',
    category: 'social',
    probability: 4,
    minTurn: 8,
    cooldown: 25,
    severity: 'critical',
    type: 'disaster',
    choices: [
      {
        id: 'full_evacuation',
        text: 'إجلاء شامل وإغلاق المحطة',
        effects: { treasury: -50, economy: -20, popularity: 10 },
        regionEffects: [
          { regionId: 'east', effects: { economy: -25, loyalty: 15, unrest: -5 } },
        ],
      },
      {
        id: 'contain_leak',
        text: 'محاولة احتواء التسرب',
        effects: { treasury: -25, popularity: -10 },
        regionEffects: [
          { regionId: 'east', effects: { unrest: 30, loyalty: -20 } },
        ],
      },
      {
        id: 'cover_up_nuclear',
        text: 'إخفاء الأمر عن الشعب',
        effects: { popularity: -5, diplomacy: -25 },
        regionEffects: [
          { regionId: 'east', effects: { unrest: 20 } },
        ],
      },
    ],
  },
  {
    id: 'assassination_attempt',
    title: '🎯 محاولة اغتيال',
    description: 'محاولة اغتيال فاشلة تستهدفك شخصياً! حراسك أحبطوا المحاولة.',
    category: 'military',
    probability: 3,
    minTurn: 12,
    cooldown: 30,
    severity: 'critical',
    type: 'political',
    choices: [
      {
        id: 'martial_law',
        text: 'إعلان الأحكام العرفية',
        effects: { military: 20, popularity: -25, diplomacy: -20, treasury: -20 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 25 },
          { factionId: 'intellectuals', supportChange: -25 },
        ],
      },
      {
        id: 'calm_investigation',
        text: 'تحقيق هادئ ومحاكمة المتورطين',
        effects: { popularity: 15, diplomacy: 10 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 15 },
        ],
      },
      {
        id: 'forgive',
        text: 'العفو والمصالحة الوطنية',
        effects: { popularity: 20, military: -15, diplomacy: 15 },
        factionEffects: [
          { factionId: 'religious', supportChange: 20 },
          { factionId: 'military_faction', supportChange: -20 },
        ],
      },
    ],
  },
  {
    id: 'hyperinflation',
    title: '💸 تضخم مفرط',
    description: 'أسعار السلع تتضاعف يومياً! العملة المحلية تفقد قيمتها بسرعة مرعبة.',
    category: 'economy',
    probability: 5,
    minTurn: 7,
    cooldown: 20,
    severity: 'critical',
    type: 'economic',
    choices: [
      {
        id: 'currency_reform',
        text: 'إصلاح العملة وتغيير النظام النقدي',
        effects: { economy: 10, treasury: -30, popularity: -10 },
        factionEffects: [
          { factionId: 'business', supportChange: -10 },
        ],
      },
      {
        id: 'price_controls',
        text: 'تحديد أسعار السلع الأساسية',
        effects: { popularity: 10, economy: -15, treasury: -15 },
        factionEffects: [
          { factionId: 'business', supportChange: -20 },
          { factionId: 'labor', supportChange: 15 },
        ],
      },
      {
        id: 'imf_help',
        text: 'طلب مساعدة صندوق النقد الدولي',
        effects: { diplomacy: 5, economy: 5, popularity: -20, treasury: 20 },
      },
    ],
  },
  {
    id: 'ethnic_tensions',
    title: '⚡ توترات عرقية',
    description: 'اشتباكات عنيفة بين مجموعات عرقية مختلفة تهدد استقرار البلاد!',
    category: 'social',
    probability: 6,
    minTurn: 6,
    cooldown: 18,
    severity: 'high',
    type: 'social',
    choices: [
      {
        id: 'deploy_troops',
        text: 'نشر الجيش لفرض النظام',
        effects: { military: -5, popularity: -15, diplomacy: -10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 10 },
        ],
        regionEffects: [
          { regionId: 'north', effects: { unrest: 25, loyalty: -20 } },
        ],
      },
      {
        id: 'reconciliation',
        text: 'مبادرة مصالحة وطنية',
        effects: { popularity: 10, treasury: -20, diplomacy: 10 },
        factionEffects: [
          { factionId: 'religious', supportChange: 15 },
        ],
      },
      {
        id: 'autonomy_offer',
        text: 'منح حكم ذاتي للمناطق المتضررة',
        effects: { popularity: -5, diplomacy: 5 },
        regionEffects: [
          { regionId: 'north', effects: { loyalty: 20, unrest: -15 } },
        ],
      },
    ],
  },
  {
    id: 'tech_revolution',
    title: '🤖 ثورة تكنولوجية',
    description: 'ابتكار تقني محلي يجذب اهتمام العالم! فرصة ذهبية للنمو.',
    category: 'economy',
    probability: 8,
    minTurn: 5,
    cooldown: 15,
    severity: 'low',
    type: 'economic',
    choices: [
      {
        id: 'tech_investment',
        text: 'استثمار حكومي ضخم في التكنولوجيا',
        effects: { economy: 15, treasury: -35, diplomacy: 10 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 25 },
          { factionId: 'business', supportChange: 15 },
        ],
      },
      {
        id: 'private_sector',
        text: 'دعم القطاع الخاص للاستثمار',
        effects: { economy: 10, treasury: -10 },
        factionEffects: [
          { factionId: 'business', supportChange: 20 },
        ],
      },
      {
        id: 'sell_tech',
        text: 'بيع التقنية لدولة أجنبية',
        effects: { treasury: 40, diplomacy: -10, popularity: -15 },
      },
    ],
  },
  // === New Random Events ===
  {
    id: 'volcanic_eruption',
    title: '🌋 ثوران بركاني',
    description: 'بركان خامد يستيقظ فجأة! الرماد البركاني يغطي مناطق واسعة والسكان في خطر.',
    category: 'social',
    probability: 4,
    minTurn: 7,
    cooldown: 25,
    severity: 'critical',
    type: 'disaster',
    choices: [
      {
        id: 'mass_evacuation',
        text: 'إجلاء شامل للمناطق المهددة',
        effects: { treasury: -45, popularity: 15, military: -5 },
        regionEffects: [
          { regionId: 'west', effects: { economy: -20, loyalty: 20, unrest: -10 } },
        ],
      },
      {
        id: 'partial_evacuation',
        text: 'إجلاء المناطق القريبة فقط',
        effects: { treasury: -15, popularity: -5 },
        regionEffects: [
          { regionId: 'west', effects: { economy: -10, unrest: 15 } },
        ],
      },
      {
        id: 'monitor_situation',
        text: 'مراقبة الوضع وعدم التصرف',
        effects: { popularity: -20 },
        regionEffects: [
          { regionId: 'west', effects: { loyalty: -25, unrest: 30 } },
        ],
      },
    ],
  },
  {
    id: 'foreign_spy',
    title: '🕵️ شبكة تجسس أجنبية',
    description: 'المخابرات تكتشف شبكة تجسس أجنبية تعمل في قلب الحكومة! معلومات حساسة تسربت.',
    category: 'military',
    probability: 4,
    minTurn: 10,
    cooldown: 20,
    severity: 'high',
    type: 'political',
    choices: [
      {
        id: 'expose_publicly',
        text: 'فضح الشبكة علنياً وطرد دبلوماسيين',
        effects: { diplomacy: -25, popularity: 15, military: 10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 20 },
        ],
      },
      {
        id: 'quiet_arrest',
        text: 'اعتقال هادئ وتبادل جواسيس',
        effects: { diplomacy: 5, military: 5 },
      },
      {
        id: 'use_as_double_agents',
        text: 'تحويلهم لعملاء مزدوجين',
        effects: { military: 15, diplomacy: -5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
    ],
  },
  {
    id: 'bank_run',
    title: '🏦 هروب من البنوك',
    description: 'شائعات عن إفلاس البنوك تدفع المواطنين لسحب أموالهم بشكل جماعي! النظام المصرفي على وشك الانهيار.',
    category: 'economy',
    probability: 5,
    minTurn: 6,
    cooldown: 18,
    severity: 'critical',
    type: 'economic',
    choices: [
      {
        id: 'guarantee_deposits',
        text: 'ضمان حكومي لجميع الودائع',
        effects: { treasury: -40, economy: 10, popularity: 10 },
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
        ],
      },
      {
        id: 'limit_withdrawals',
        text: 'تحديد سقف للسحب اليومي',
        effects: { economy: -10, popularity: -20, treasury: -5 },
        factionEffects: [
          { factionId: 'labor', supportChange: -15 },
        ],
      },
      {
        id: 'close_banks',
        text: 'إغلاق البنوك مؤقتاً لمنع الانهيار',
        effects: { economy: -20, popularity: -25, treasury: 5 },
        regionEffects: [
          { regionId: 'capital', effects: { unrest: 25 } },
        ],
      },
    ],
  },
  {
    id: 'pandemic_wave2',
    title: '🦠 موجة وبائية ثانية',
    description: 'موجة جديدة أشد فتكاً من الوباء تجتاح البلاد! المستشفيات ممتلئة بالكامل.',
    category: 'social',
    probability: 5,
    minTurn: 8,
    cooldown: 20,
    severity: 'critical',
    type: 'epidemic',
    choices: [
      {
        id: 'full_lockdown2',
        text: 'إغلاق تام وحظر تجوال',
        effects: { economy: -30, popularity: -20, treasury: -25 },
        regionEffects: [
          { regionId: 'capital', effects: { economy: -25, unrest: 35 } },
        ],
      },
      {
        id: 'vaccination_drive',
        text: 'حملة تطعيم مكثفة',
        effects: { treasury: -35, popularity: 15, diplomacy: 5 },
      },
      {
        id: 'ignore_wave',
        text: 'تجاهل الموجة والاعتماد على المناعة',
        effects: { popularity: -30, economy: 5, diplomacy: -15 },
      },
    ],
  },
  {
    id: 'gold_discovery',
    title: '💎 اكتشاف منجم ذهب',
    description: 'اكتشاف احتياطي ذهب ضخم! فرصة ذهبية لإنعاش الاقتصاد.',
    category: 'economy',
    probability: 6,
    minTurn: 4,
    cooldown: 25,
    severity: 'low',
    type: 'economic',
    choices: [
      {
        id: 'nationalize_mine',
        text: 'تأميم المنجم لصالح الدولة',
        effects: { treasury: 40, economy: 15, popularity: 10 },
        factionEffects: [
          { factionId: 'labor', supportChange: 15 },
          { factionId: 'business', supportChange: -10 },
        ],
        regionEffects: [
          { regionId: 'south', effects: { economy: 20, development: 15 } },
        ],
      },
      {
        id: 'private_contract',
        text: 'منح عقد تنقيب لشركة خاصة',
        effects: { treasury: 25, economy: 10 },
        factionEffects: [
          { factionId: 'business', supportChange: 20 },
        ],
      },
      {
        id: 'international_bidding',
        text: 'مناقصة دولية لأعلى سعر',
        effects: { treasury: 50, diplomacy: 5, popularity: -10 },
      },
    ],
  },
  // === أحداث عشوائية جديدة ===
  {
    id: 'meteor_strike',
    title: '☄️ سقوط نيزك',
    description: 'نيزك صغير يسقط قرب منطقة مأهولة! حالة ذعر شاملة والسكان يفرون.',
    category: 'social',
    probability: 3,
    minTurn: 10,
    cooldown: 30,
    severity: 'critical',
    type: 'disaster',
    choices: [
      { id: 'full_evac', text: 'إجلاء عاجل وتشكيل فريق علمي', effects: { treasury: -35, popularity: 15, military: -5 }, regionEffects: [{ regionId: 'east', effects: { unrest: -10, loyalty: 15 } }] },
      { id: 'study_only', text: 'إرسال علماء فقط لدراسة الموقع', effects: { treasury: -10, popularity: -10 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 15 }] },
      { id: 'exploit_panic', text: 'استغلال الذعر لتعزيز السلطة', effects: { military: 10, popularity: -20, diplomacy: -10 } },
    ],
  },
  {
    id: 'chemical_leak',
    title: '⚗️ تسرب كيميائي',
    description: 'انفجار في مصنع كيماويات يطلق غازات سامة! المنطقة الصناعية في خطر.',
    category: 'social',
    probability: 7,
    minTurn: 5,
    cooldown: 15,
    severity: 'high',
    type: 'disaster',
    choices: [
      { id: 'evacuate_zone', text: 'إخلاء المنطقة وتعويض السكان', effects: { treasury: -30, popularity: 10, economy: -10 }, regionEffects: [{ regionId: 'capital', effects: { unrest: 10, loyalty: 10 } }] },
      { id: 'contain_quietly', text: 'احتواء التسرب بسرية', effects: { popularity: -5, economy: -5 }, regionEffects: [{ regionId: 'capital', effects: { unrest: 20 } }] },
      { id: 'shutdown_factory', text: 'إغلاق جميع المصانع المماثلة', effects: { economy: -20, popularity: 5, treasury: -15 }, factionEffects: [{ factionId: 'business', supportChange: -25 }] },
    ],
  },
  {
    id: 'military_defection',
    title: '🏃‍♂️ انشقاق عسكري',
    description: 'جنرال كبير ينشق مع كتيبته ويفر لدولة معادية! أسرار عسكرية في خطر.',
    category: 'military',
    probability: 4,
    minTurn: 8,
    cooldown: 25,
    severity: 'critical',
    type: 'political',
    choices: [
      { id: 'hunt_defector', text: 'ملاحقة المنشق بكل الوسائل', effects: { military: -10, diplomacy: -20, treasury: -20 }, factionEffects: [{ factionId: 'military_faction', supportChange: 10 }] },
      { id: 'change_codes', text: 'تغيير كل الرموز والخطط العسكرية', effects: { military: -5, treasury: -15 } },
      { id: 'propaganda', text: 'حملة دعائية تصوره كخائن', effects: { popularity: 10, military: -5 } },
    ],
  },
  {
    id: 'sandstorm',
    title: '🌪️ عاصفة رملية عاتية',
    description: 'عاصفة رملية تاريخية تشل الحركة لأيام! المطارات مغلقة والمحاصيل مدمرة.',
    category: 'social',
    probability: 10,
    minTurn: 3,
    cooldown: 10,
    severity: 'medium',
    type: 'disaster',
    choices: [
      { id: 'emergency_shelters', text: 'فتح ملاجئ طوارئ ومساعدات عاجلة', effects: { treasury: -20, popularity: 10 }, regionEffects: [{ regionId: 'south', effects: { loyalty: 10 } }, { regionId: 'west', effects: { loyalty: 10 } }] },
      { id: 'wait_storm', text: 'انتظار انتهاء العاصفة', effects: { popularity: -10, economy: -10 } },
    ],
  },
  {
    id: 'cyberwar',
    title: '💻 حرب سيبرانية شاملة',
    description: 'هجوم سيبراني منسق يعطل الكهرباء والمياه والاتصالات في كل البلاد!',
    category: 'military',
    probability: 4,
    minTurn: 10,
    cooldown: 20,
    severity: 'critical',
    type: 'war',
    choices: [
      { id: 'cyber_army', text: 'تشكيل جيش إلكتروني للرد', effects: { military: 10, treasury: -35, economy: -10 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 15 }, { factionId: 'military_faction', supportChange: 10 }] },
      { id: 'ask_allies', text: 'طلب مساعدة الحلفاء التقنية', effects: { diplomacy: 10, treasury: -10, military: -5 } },
      { id: 'manual_systems', text: 'العودة للأنظمة اليدوية مؤقتاً', effects: { economy: -20, popularity: -15 } },
    ],
  },
  {
    id: 'mass_migration',
    title: '🚶 هجرة جماعية داخلية',
    description: 'ملايين يهاجرون من الريف للمدن! العاصمة مكتظة والخدمات منهارة.',
    category: 'social',
    probability: 8,
    minTurn: 5,
    cooldown: 15,
    severity: 'medium',
    type: 'social',
    choices: [
      { id: 'develop_rural', text: 'مشاريع تنمية ريفية عاجلة', effects: { treasury: -35, economy: 5, popularity: 10 }, regionEffects: [{ regionId: 'south', effects: { development: 15, loyalty: 15 } }, { regionId: 'east', effects: { development: 10 } }] },
      { id: 'expand_cities', text: 'توسيع المدن وبناء ضواحي جديدة', effects: { treasury: -25, economy: 5 }, regionEffects: [{ regionId: 'capital', effects: { development: 10, unrest: 10 } }] },
      { id: 'restrict_movement', text: 'تقييد حركة السكان بتصاريح', effects: { popularity: -25, diplomacy: -15 }, factionEffects: [{ factionId: 'intellectuals', supportChange: -20 }] },
    ],
  },
  {
    id: 'diplomatic_incident',
    title: '🚨 حادثة دبلوماسية',
    description: 'سفيرك في دولة كبرى يتورط في فضيحة! العلاقات الثنائية في خطر.',
    category: 'diplomacy',
    probability: 7,
    minTurn: 4,
    cooldown: 12,
    severity: 'medium',
    type: 'political',
    choices: [
      { id: 'recall_ambassador', text: 'استدعاء السفير فوراً واعتذار رسمي', effects: { diplomacy: 10, popularity: -5 } },
      { id: 'defend_ambassador', text: 'الدفاع عن السفير ورفض الاتهامات', effects: { diplomacy: -20, popularity: 5 } },
      { id: 'expel_their_ambassador', text: 'طرد سفيرهم رداً بالمثل', effects: { diplomacy: -25, popularity: 15, military: 5 }, factionEffects: [{ factionId: 'military_faction', supportChange: 10 }] },
    ],
  },
  {
    id: 'food_poisoning_mass',
    title: '🤢 تسمم غذائي جماعي',
    description: 'آلاف الحالات من التسمم الغذائي بسبب منتجات فاسدة! المستشفيات ممتلئة.',
    category: 'social',
    probability: 9,
    minTurn: 3,
    cooldown: 10,
    severity: 'medium',
    type: 'epidemic',
    choices: [
      { id: 'recall_products', text: 'سحب جميع المنتجات ومحاكمة الشركة', effects: { economy: -10, popularity: 15, treasury: -10 }, factionEffects: [{ factionId: 'business', supportChange: -15 }] },
      { id: 'free_treatment', text: 'علاج مجاني وتعويضات للمتضررين', effects: { treasury: -25, popularity: 10 } },
      { id: 'downplay_crisis', text: 'التقليل من حجم الأزمة', effects: { popularity: -20, diplomacy: -5 } },
    ],
  },
  {
    id: 'election_violence',
    title: '🗳️ عنف انتخابي',
    description: 'أعمال عنف وشغب واسعة مع اقتراب الانتخابات! المعارضة تتهم الحكومة.',
    category: 'social',
    probability: 6,
    minTurn: 7,
    cooldown: 18,
    severity: 'high',
    type: 'political',
    choices: [
      { id: 'postpone_elections', text: 'تأجيل الانتخابات لحين استقرار الأوضاع', effects: { popularity: -20, diplomacy: -15, military: 5 }, factionEffects: [{ factionId: 'military_faction', supportChange: 10 }] },
      { id: 'deploy_security', text: 'نشر الأمن بكثافة وإجراء الانتخابات', effects: { military: -5, treasury: -15, popularity: 5 } },
      { id: 'invite_observers', text: 'دعوة مراقبين دوليين', effects: { diplomacy: 15, popularity: 10, treasury: -5 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 15 }] },
    ],
  },
  {
    id: 'economic_boom',
    title: '📈 طفرة اقتصادية مفاجئة',
    description: 'ارتفاع مفاجئ في أسعار صادراتك الرئيسية! فرصة ذهبية لتعزيز الاقتصاد.',
    category: 'economy',
    probability: 7,
    minTurn: 5,
    cooldown: 20,
    severity: 'low',
    type: 'economic',
    choices: [
      { id: 'invest_surplus', text: 'استثمار الفائض في البنية التحتية', effects: { treasury: 20, economy: 15, popularity: 10 } },
      { id: 'save_reserves', text: 'ادخار الفائض في صندوق سيادي', effects: { treasury: 40, economy: 5 } },
      { id: 'distribute_wealth', text: 'توزيع الأرباح على المواطنين', effects: { treasury: -10, popularity: 25 }, factionEffects: [{ factionId: 'labor', supportChange: 20 }] },
    ],
  },
];

export interface ActiveEventCooldown {
  eventId: string;
  turnsRemaining: number;
}

export const getRandomEvent = (
  turnCount: number,
  cooldowns: ActiveEventCooldown[],
  crisisBonus: number = 0
): RandomEvent | null => {
  const availableEvents = randomEvents.filter(event => {
    if (turnCount < event.minTurn) return false;
    
    const cooldown = cooldowns.find(c => c.eventId === event.id);
    if (cooldown && cooldown.turnsRemaining > 0) return false;
    
    return true;
  });

  if (availableEvents.length === 0) return null;

  // Check probability for each event (with crisis bonus)
  for (const event of availableEvents) {
    const roll = Math.random() * 100;
    if (roll < event.probability + crisisBonus) {
      return event;
    }
  }

  return null;
};
