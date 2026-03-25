import { Decision, GameState } from '@/types/game';

// Templates for procedural content generation
interface DecisionTemplate {
  category: Decision['category'];
  titleTemplates: string[];
  descriptionTemplates: string[];
  choiceTemplates: {
    text: string;
    effects: Record<string, number>;
    factionEffects?: { factionId: string; supportChange: number }[];
  }[][];
}

const economicTemplates: DecisionTemplate = {
  category: 'economy',
  titleTemplates: [
    'أزمة في قطاع {sector}',
    'فرصة استثمارية في {sector}',
    'إضراب عمال {sector}',
    'خصخصة شركة {company}',
    'ارتفاع أسعار {commodity}',
    'انهيار صادرات {commodity}',
    'مشروع {project} الوطني',
    'ديون مستحقة لـ{creditor}',
  ],
  descriptionTemplates: [
    'قطاع {sector} يواجه أزمة حادة تهدد آلاف الوظائف. مستشاروك منقسمون حول الحل الأمثل.',
    'مستثمرون أجانب يعرضون ضخ أموال ضخمة في {sector}. لكن الشروط قد تمس السيادة.',
    'عمال {sector} يضربون عن العمل مطالبين بتحسين ظروفهم. الإنتاج متوقف.',
    'أسعار {commodity} ارتفعت بشكل جنوني والشعب يعاني. يجب التدخل سريعاً.',
    'مشروع {project} يحتاج قراراً عاجلاً. التكلفة باهظة لكن الفوائد كبيرة.',
  ],
  choiceTemplates: [
    [
      { text: 'تدخل حكومي قوي وإنفاق ضخم', effects: { economy: 10, treasury: -35, popularity: 10 } },
      { text: 'حل وسط مع إجراءات محدودة', effects: { economy: 5, treasury: -15 } },
      { text: 'ترك الأمر للقطاع الخاص', effects: { economy: -5, popularity: -10, treasury: 5 }, factionEffects: [{ factionId: 'business', supportChange: 15 }] },
    ],
    [
      { text: 'الموافقة وتشجيع الاستثمار', effects: { economy: 15, treasury: 20, popularity: -5 }, factionEffects: [{ factionId: 'business', supportChange: 20 }] },
      { text: 'التفاوض على شروط أفضل', effects: { economy: 5, diplomacy: 5 } },
      { text: 'رفض ودعم الصناعة المحلية', effects: { popularity: 10, economy: -5, treasury: -15 }, factionEffects: [{ factionId: 'labor', supportChange: 15 }] },
    ],
  ],
};

const militaryTemplates: DecisionTemplate = {
  category: 'military',
  titleTemplates: [
    'تهديد أمني على الحدود {border}',
    'تمرد في ثكنة {base}',
    'صفقة أسلحة مع {country}',
    'تدريبات عسكرية مشتركة',
    'اكتشاف خلية إرهابية',
    'فرار جنود من الخدمة',
    'طلب تدخل في نزاع إقليمي',
  ],
  descriptionTemplates: [
    'تقارير مخابراتية تحذر من تهديد على الحدود {border}. الجيش ينتظر أوامرك.',
    'جنود يرفضون الأوامر في ثكنة {base}! الوضع متوتر وقد يتحول لتمرد.',
    'دولة {country} تعرض أسلحة متطورة بأسعار مخفضة. لكن هناك شروط سياسية.',
    'اكتشاف خلية مسلحة تخطط لعمليات. الأجهزة الأمنية تنتظر الضوء الأخضر.',
  ],
  choiceTemplates: [
    [
      { text: 'رد عسكري حازم وسريع', effects: { military: 10, treasury: -20, diplomacy: -10 }, factionEffects: [{ factionId: 'military_faction', supportChange: 15 }] },
      { text: 'تعزيز الدفاعات فقط', effects: { military: 5, treasury: -10 } },
      { text: 'حل دبلوماسي والتهدئة', effects: { diplomacy: 10, military: -5, popularity: -5 } },
    ],
    [
      { text: 'عملية أمنية واسعة', effects: { military: 15, popularity: -10, treasury: -25 }, factionEffects: [{ factionId: 'military_faction', supportChange: 20 }] },
      { text: 'تحقيقات سرية بدون ضجة', effects: { military: 5, treasury: -10 } },
      { text: 'مبادرة حوار واحتواء', effects: { popularity: 10, diplomacy: 5, military: -5 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 10 }] },
    ],
  ],
};

const socialTemplates: DecisionTemplate = {
  category: 'social',
  titleTemplates: [
    'أزمة في المستشفيات',
    'احتجاجات المعلمين',
    'فضيحة في وزارة {ministry}',
    'مطالب الشباب بالتوظيف',
    'أزمة مواصلات خانقة',
    'انتشار جرائم في {area}',
    'مطالب بحقوق المرأة',
    'أزمة مياه شرب حادة',
    'أزمة إسكان في {area}',
    'انتشار وباء في {area}',
    'كارثة تعليمية',
    'أزمة صحة نفسية بين الشباب',
    'تلوث بيئي خطير في {area}',
  ],
  descriptionTemplates: [
    'الشعب يعاني والمطالب تتصاعد. عليك اتخاذ قرار يرضي الجميع... أو لا أحد.',
    'أزمة في قطاع حيوي تهدد استقرار البلاد. الحلول متاحة لكن كلها مكلفة.',
    'فضيحة تهز الحكومة والشعب يطالب بالمحاسبة. سمعتك على المحك.',
    'مشكلة اجتماعية متفاقمة تحتاج حلاً جذرياً. لكن كل حل له ثمنه.',
    'تقارير مقلقة عن تدهور الأوضاع المعيشية. الناس ينزلون للشوارع.',
    'أرقام صادمة تكشف حجم المعاناة. المسؤولون يتبادلون الاتهامات.',
  ],
  choiceTemplates: [
    [
      { text: 'استجابة شاملة ومكلفة', effects: { popularity: 15, treasury: -30 } },
      { text: 'إجراءات معتدلة', effects: { popularity: 5, treasury: -10 } },
      { text: 'تجاهل وتأجيل', effects: { popularity: -15, economy: -5 } },
    ],
    [
      { text: 'محاسبة صارمة وإصلاح', effects: { popularity: 20, economy: -5, treasury: -15 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 15 }] },
      { text: 'لجنة تحقيق ووعود', effects: { popularity: -5 } },
      { text: 'التستر والإنكار', effects: { popularity: -25, diplomacy: -10 } },
    ],
    [
      { text: 'خطة طوارئ وإنفاق ضخم', effects: { popularity: 20, treasury: -40, economy: 5 } },
      { text: 'حلول مؤقتة وتسكينية', effects: { popularity: -5, treasury: -10 } },
      { text: 'إلقاء المسؤولية على المحافظين', effects: { popularity: -10 }, factionEffects: [{ factionId: 'military_faction', supportChange: -5 }] },
    ],
  ],
};

const diplomacyTemplates: DecisionTemplate = {
  category: 'diplomacy',
  titleTemplates: [
    'زيارة رئيس دولة {country}',
    'أزمة دبلوماسية مع {country}',
    'مؤتمر دولي حول {topic}',
    'عقوبات دولية جديدة',
    'طلب انضمام لمنظمة {org}',
    'وساطة في نزاع إقليمي',
  ],
  descriptionTemplates: [
    'فرصة دبلوماسية مهمة قد تغير مكانة البلاد على الساحة الدولية.',
    'أزمة في العلاقات الدولية تحتاج معالجة حكيمة. الخطأ قد يكون مكلفاً.',
    'المجتمع الدولي ينتظر موقفك. قرارك سيحدد علاقاتك لسنوات قادمة.',
  ],
  choiceTemplates: [
    [
      { text: 'موقف قوي يعزز السيادة', effects: { diplomacy: -10, popularity: 15, military: 5 }, factionEffects: [{ factionId: 'military_faction', supportChange: 10 }] },
      { text: 'تعاون دبلوماسي كامل', effects: { diplomacy: 15, economy: 5, popularity: -5 } },
      { text: 'حياد وعدم التدخل', effects: { diplomacy: -5, popularity: 5 } },
    ],
  ],
};

const allTemplates = [economicTemplates, militaryTemplates, socialTemplates, diplomacyTemplates];

const sectors = ['النفط', 'الزراعة', 'الصناعة', 'التعدين', 'البناء', 'الاتصالات', 'السياحة', 'الصيد'];
const companies = ['الطيران الوطنية', 'الاتصالات', 'البتروكيماويات', 'الحديد والصلب', 'الأسمنت'];
const commodities = ['الخبز', 'الوقود', 'الأدوية', 'الإسمنت', 'الحديد', 'الأرز', 'السكر', 'الغاز'];
const projects = ['سد مائي', 'مدينة جديدة', 'ميناء بحري', 'مطار دولي', 'سكة حديد'];
const borders = ['الشمالية', 'الجنوبية', 'الشرقية', 'الغربية'];
const bases = ['الشمالية', 'المركزية', 'الجنوبية', 'الساحلية'];
const countries = ['كبرى', 'مجاورة', 'صديقة', 'معادية'];
const ministries = ['التعليم', 'الصحة', 'النقل', 'الإسكان'];
const areas = ['العاصمة', 'الأحياء الشعبية', 'المدن الكبرى'];
const topics = ['المناخ', 'التجارة', 'الأمن', 'حقوق الإنسان'];
const orgs = ['دولية', 'إقليمية', 'اقتصادية'];
const creditors = ['صندوق النقد الدولي', 'بنوك أجنبية', 'دول خليجية'];

function fillTemplate(template: string): string {
  return template
    .replace('{sector}', sectors[Math.floor(Math.random() * sectors.length)])
    .replace('{company}', companies[Math.floor(Math.random() * companies.length)])
    .replace('{commodity}', commodities[Math.floor(Math.random() * commodities.length)])
    .replace('{project}', projects[Math.floor(Math.random() * projects.length)])
    .replace('{border}', borders[Math.floor(Math.random() * borders.length)])
    .replace('{base}', bases[Math.floor(Math.random() * bases.length)])
    .replace('{country}', countries[Math.floor(Math.random() * countries.length)])
    .replace('{ministry}', ministries[Math.floor(Math.random() * ministries.length)])
    .replace('{area}', areas[Math.floor(Math.random() * areas.length)])
    .replace('{topic}', topics[Math.floor(Math.random() * topics.length)])
    .replace('{org}', orgs[Math.floor(Math.random() * orgs.length)])
    .replace('{creditor}', creditors[Math.floor(Math.random() * creditors.length)]);
}

function getContextualCategory(state: GameState): Decision['category'] {
  // Bias toward areas that are struggling
  const weights: { category: Decision['category']; weight: number }[] = [
    { category: 'economy', weight: state.economy < 30 ? 40 : 20 },
    { category: 'military', weight: state.military < 30 ? 35 : 15 },
    { category: 'social', weight: state.popularity < 30 ? 35 : 20 },
    { category: 'diplomacy', weight: state.diplomacy < 30 ? 30 : 15 },
  ];

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let roll = Math.random() * totalWeight;
  
  for (const w of weights) {
    roll -= w.weight;
    if (roll <= 0) return w.category;
  }
  return 'social';
}

let generatedCount = 0;

export function generateDecision(state: GameState): Decision {
  generatedCount++;
  const category = getContextualCategory(state);
  
  const matchingTemplates = allTemplates.filter(t => t.category === category);
  const template = matchingTemplates[Math.floor(Math.random() * matchingTemplates.length)];
  
  const title = fillTemplate(template.titleTemplates[Math.floor(Math.random() * template.titleTemplates.length)]);
  const description = fillTemplate(template.descriptionTemplates[Math.floor(Math.random() * template.descriptionTemplates.length)]);
  const choiceSet = template.choiceTemplates[Math.floor(Math.random() * template.choiceTemplates.length)];

  // Scale effects based on difficulty
  const diffMultiplier = state.difficulty === 'hard' ? 1.3 : state.difficulty === 'easy' ? 0.7 : 1;
  
  const choices = choiceSet.map((c, i) => {
    const scaledEffects: Record<string, number> = {};
    Object.entries(c.effects).forEach(([key, val]) => {
      scaledEffects[key] = Math.round(val * (val < 0 ? diffMultiplier : 1));
    });
    
    return {
      id: `gen_choice_${generatedCount}_${i}`,
      text: c.text,
      effects: scaledEffects,
      factionEffects: c.factionEffects,
    };
  });

  return {
    id: `generated_${generatedCount}_${Date.now()}`,
    title,
    description,
    category,
    choices,
  };
}
