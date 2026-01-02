import { Decision } from '@/types/game';

export const decisions: Decision[] = [
  // Economic Decisions
  {
    id: 'tax_reform',
    title: 'إصلاح الضرائب',
    description: 'وزير المالية يقترح تعديل النظام الضريبي. ما هو قرارك؟',
    category: 'economy',
    choices: [
      {
        id: 'increase_taxes',
        text: 'زيادة الضرائب على الأثرياء',
        effects: { economy: -5, popularity: 10, treasury: 20 },
        factionEffects: [
          { factionId: 'business', supportChange: -15 },
          { factionId: 'labor', supportChange: 10 },
        ],
      },
      {
        id: 'decrease_taxes',
        text: 'تخفيض الضرائب للجميع',
        effects: { economy: 10, popularity: 15, treasury: -25 },
        factionEffects: [
          { factionId: 'business', supportChange: 20 },
        ],
      },
      {
        id: 'keep_taxes',
        text: 'الإبقاء على النظام الحالي',
        effects: { popularity: -5 },
      },
    ],
    followUpEvents: [
      {
        choiceId: 'increase_taxes',
        delay: 3,
        event: {
          id: 'business_protest',
          title: 'احتجاج رجال الأعمال',
          description: 'رجال الأعمال يهددون بنقل استثماراتهم للخارج بسبب الضرائب المرتفعة!',
          category: 'economy',
          choices: [
            { id: 'negotiate', text: 'التفاوض على حوافز', effects: { treasury: -10, economy: 5 } },
            { id: 'stand_firm', text: 'الثبات على الموقف', effects: { popularity: 5, economy: -10 } },
          ],
        },
      },
    ],
  },
  {
    id: 'military_budget',
    title: 'ميزانية الجيش',
    description: 'قادة الجيش يطالبون بزيادة الميزانية العسكرية.',
    category: 'military',
    choices: [
      {
        id: 'increase_military',
        text: 'زيادة الميزانية العسكرية بـ 30%',
        effects: { military: 15, treasury: -30, popularity: -5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 20 },
        ],
      },
      {
        id: 'moderate_increase',
        text: 'زيادة معتدلة بـ 10%',
        effects: { military: 5, treasury: -10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 5 },
        ],
      },
      {
        id: 'reject_increase',
        text: 'رفض الطلب',
        effects: { military: -10, treasury: 5, popularity: 5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -15 },
        ],
      },
    ],
    followUpEvents: [
      {
        choiceId: 'reject_increase',
        delay: 2,
        event: {
          id: 'military_discontent',
          title: 'تذمر في صفوف الجيش',
          description: 'تقارير عن استياء متزايد بين ضباط الجيش بسبب قرارك السابق.',
          category: 'military',
          choices: [
            { id: 'meet_officers', text: 'الاجتماع بالقادة العسكريين', effects: { military: 5 } },
            { id: 'ignore', text: 'تجاهل الأمر', effects: { military: -5 } },
          ],
        },
      },
    ],
  },
  {
    id: 'foreign_alliance',
    title: 'تحالف دولي',
    description: 'دولة عظمى تعرض عليك تحالفاً استراتيجياً.',
    category: 'diplomacy',
    choices: [
      {
        id: 'accept_alliance',
        text: 'قبول التحالف',
        effects: { diplomacy: 20, military: 10, economy: 5 },
      },
      {
        id: 'negotiate',
        text: 'التفاوض على شروط أفضل',
        effects: { diplomacy: 5, treasury: 10 },
      },
      {
        id: 'reject_alliance',
        text: 'رفض التحالف والحفاظ على الاستقلالية',
        effects: { diplomacy: -10, popularity: 15 },
        factionEffects: [
          { factionId: 'religious', supportChange: 10 },
        ],
      },
    ],
    followUpEvents: [
      {
        choiceId: 'accept_alliance',
        delay: 4,
        event: {
          id: 'alliance_request',
          title: 'طلب الحليف',
          description: 'الحليف الجديد يطلب منك السماح بإنشاء قاعدة عسكرية على أراضيك.',
          category: 'diplomacy',
          choices: [
            { id: 'accept_base', text: 'الموافقة على القاعدة', effects: { diplomacy: 10, military: 5, popularity: -15 } },
            { id: 'refuse_base', text: 'رفض الطلب', effects: { diplomacy: -10, popularity: 10 } },
          ],
        },
      },
    ],
  },
  {
    id: 'healthcare_crisis',
    title: 'أزمة صحية',
    description: 'تفشي وباء يهدد البلاد. كيف ستتعامل مع الأزمة؟',
    category: 'social',
    choices: [
      {
        id: 'strict_lockdown',
        text: 'إغلاق صارم وحجر صحي',
        effects: { economy: -20, popularity: -10, treasury: -15 },
        regionEffects: [
          { regionId: 'capital', effects: { economy: -15, unrest: 20 } },
        ],
      },
      {
        id: 'moderate_measures',
        text: 'إجراءات معتدلة مع دعم اقتصادي',
        effects: { economy: -10, treasury: -25, popularity: 5 },
      },
      {
        id: 'minimal_response',
        text: 'الحد الأدنى من القيود',
        effects: { economy: 5, popularity: -15 },
      },
    ],
  },
  {
    id: 'infrastructure',
    title: 'مشروع البنية التحتية',
    description: 'فرصة لبناء شبكة طرق ومواصلات حديثة.',
    category: 'economy',
    choices: [
      {
        id: 'mega_project',
        text: 'مشروع ضخم يشمل كل البلاد',
        effects: { economy: 20, popularity: 15, treasury: -50 },
        regionEffects: [
          { regionId: 'south', effects: { development: 20, economy: 15 } },
          { regionId: 'east', effects: { development: 15, economy: 10 } },
        ],
      },
      {
        id: 'phased_project',
        text: 'مشروع على مراحل',
        effects: { economy: 10, popularity: 5, treasury: -20 },
      },
      {
        id: 'postpone',
        text: 'تأجيل المشروع',
        effects: { popularity: -10 },
      },
    ],
  },
  {
    id: 'education_reform',
    title: 'إصلاح التعليم',
    description: 'وزير التعليم يقدم خطة لتحديث المناهج.',
    category: 'social',
    choices: [
      {
        id: 'full_reform',
        text: 'إصلاح شامل للمناهج',
        effects: { economy: 5, popularity: 10, treasury: -20 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 20 },
          { factionId: 'religious', supportChange: -10 },
        ],
      },
      {
        id: 'partial_reform',
        text: 'تحديث جزئي',
        effects: { economy: 2, popularity: 5, treasury: -8 },
      },
      {
        id: 'reject_reform',
        text: 'الإبقاء على المناهج الحالية',
        effects: { popularity: -5 },
        factionEffects: [
          { factionId: 'religious', supportChange: 10 },
        ],
      },
    ],
  },
  {
    id: 'trade_deal',
    title: 'اتفاقية تجارية',
    description: 'دولة مجاورة تعرض اتفاقية تجارة حرة.',
    category: 'economy',
    choices: [
      {
        id: 'accept_deal',
        text: 'توقيع الاتفاقية',
        effects: { economy: 15, diplomacy: 10, treasury: 15 },
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
        ],
      },
      {
        id: 'negotiate_better',
        text: 'طلب شروط أفضل',
        effects: { economy: 5, diplomacy: -5, treasury: 5 },
      },
      {
        id: 'reject_deal',
        text: 'رفض الاتفاقية',
        effects: { diplomacy: -15, popularity: 5 },
        factionEffects: [
          { factionId: 'labor', supportChange: 10 },
        ],
      },
    ],
  },
  {
    id: 'protest',
    title: 'احتجاجات شعبية',
    description: 'مظاهرات كبيرة في العاصمة تطالب بإصلاحات.',
    category: 'social',
    choices: [
      {
        id: 'meet_demands',
        text: 'الاستجابة لمطالب المتظاهرين',
        effects: { popularity: 20, economy: -10, treasury: -15 },
        factionEffects: [
          { factionId: 'labor', supportChange: 15 },
        ],
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: 15, unrest: -20 } },
        ],
      },
      {
        id: 'dialogue',
        text: 'فتح حوار مع قادة الاحتجاج',
        effects: { popularity: 5, diplomacy: 5 },
      },
      {
        id: 'suppress',
        text: 'فض المظاهرات بالقوة',
        effects: { popularity: -25, military: 5, diplomacy: -15 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 10 },
          { factionId: 'intellectuals', supportChange: -20 },
        ],
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: -20, unrest: 30 } },
        ],
      },
    ],
    followUpEvents: [
      {
        choiceId: 'suppress',
        delay: 2,
        event: {
          id: 'international_criticism',
          title: 'انتقادات دولية',
          description: 'منظمات حقوق الإنسان تدين قمع المتظاهرين وتطالب بتحقيق.',
          category: 'diplomacy',
          choices: [
            { id: 'apologize', text: 'الاعتذار والتحقيق', effects: { diplomacy: 5, popularity: 10, military: -5 } },
            { id: 'defend', text: 'الدفاع عن الإجراءات', effects: { diplomacy: -10, military: 5 } },
          ],
        },
      },
    ],
  },
  {
    id: 'border_dispute',
    title: 'نزاع حدودي',
    description: 'توتر على الحدود مع دولة مجاورة.',
    category: 'military',
    choices: [
      {
        id: 'military_response',
        text: 'حشد القوات على الحدود',
        effects: { military: 10, diplomacy: -20, treasury: -15 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
        ],
      },
      {
        id: 'diplomatic_solution',
        text: 'السعي لحل دبلوماسي',
        effects: { diplomacy: 10, popularity: 5 },
      },
      {
        id: 'international_court',
        text: 'اللجوء للمحاكم الدولية',
        effects: { diplomacy: 15, popularity: -5, treasury: -5 },
      },
    ],
  },
  {
    id: 'energy_crisis',
    title: 'أزمة طاقة',
    description: 'نقص حاد في إمدادات الطاقة يهدد الاقتصاد.',
    category: 'economy',
    choices: [
      {
        id: 'renewable',
        text: 'الاستثمار في الطاقة المتجددة',
        effects: { economy: 5, popularity: 10, treasury: -40, diplomacy: 10 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 15 },
        ],
      },
      {
        id: 'import_energy',
        text: 'استيراد الطاقة من الخارج',
        effects: { economy: -5, treasury: -20, diplomacy: 5 },
      },
      {
        id: 'rationing',
        text: 'تقنين استهلاك الطاقة',
        effects: { economy: -15, popularity: -20, treasury: 10 },
        regionEffects: [
          { regionId: 'capital', effects: { unrest: 15 } },
          { regionId: 'coast', effects: { unrest: 10 } },
        ],
      },
    ],
  },
  // Regional Decisions
  {
    id: 'south_development',
    title: 'تنمية الجنوب',
    description: 'منطقة الجنوب تطالب باهتمام أكبر بالتنمية.',
    category: 'regional',
    regionId: 'south',
    choices: [
      {
        id: 'major_investment',
        text: 'استثمار ضخم في التنمية',
        effects: { treasury: -30, popularity: 10 },
        regionEffects: [
          { regionId: 'south', effects: { development: 25, loyalty: 20, economy: 15, unrest: -15 } },
        ],
      },
      {
        id: 'gradual_development',
        text: 'خطة تنمية تدريجية',
        effects: { treasury: -15, popularity: 5 },
        regionEffects: [
          { regionId: 'south', effects: { development: 10, loyalty: 10 } },
        ],
      },
      {
        id: 'ignore_demands',
        text: 'تجاهل المطالب',
        effects: { popularity: -10 },
        regionEffects: [
          { regionId: 'south', effects: { loyalty: -15, unrest: 20 } },
        ],
      },
    ],
    followUpEvents: [
      {
        choiceId: 'ignore_demands',
        delay: 3,
        event: {
          id: 'south_unrest',
          title: 'اضطرابات في الجنوب',
          description: 'تصاعد الاحتجاجات في الجنوب بسبب الإهمال التنموي.',
          category: 'regional',
          choices: [
            { id: 'send_troops', text: 'إرسال قوات لحفظ الأمن', effects: { military: -5, popularity: -10 } },
            { id: 'negotiate_now', text: 'بدء مفاوضات عاجلة', effects: { treasury: -20, popularity: 5 } },
          ],
        },
      },
    ],
  },
  {
    id: 'north_separatism',
    title: 'حركة انفصالية',
    description: 'ظهور حركة انفصالية في الشمال تطالب بالحكم الذاتي.',
    category: 'regional',
    regionId: 'north',
    choices: [
      {
        id: 'grant_autonomy',
        text: 'منح حكم ذاتي موسع',
        effects: { diplomacy: 5, popularity: -5 },
        regionEffects: [
          { regionId: 'north', effects: { loyalty: 25, unrest: -20 } },
        ],
        factionEffects: [
          { factionId: 'military_faction', supportChange: -10 },
        ],
      },
      {
        id: 'limited_concessions',
        text: 'تقديم تنازلات محدودة',
        effects: { popularity: 5 },
        regionEffects: [
          { regionId: 'north', effects: { loyalty: 10, unrest: -5 } },
        ],
      },
      {
        id: 'crackdown',
        text: 'قمع الحركة بالقوة',
        effects: { military: 5, diplomacy: -15, popularity: -10 },
        regionEffects: [
          { regionId: 'north', effects: { loyalty: -30, unrest: 35 } },
        ],
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
        ],
      },
    ],
  },
  {
    id: 'coast_tourism',
    title: 'مشروع سياحي',
    description: 'فرصة لتطوير السياحة في منطقة الساحل.',
    category: 'regional',
    regionId: 'coast',
    choices: [
      {
        id: 'mega_resort',
        text: 'بناء منتجع سياحي ضخم',
        effects: { treasury: -40, economy: 10 },
        regionEffects: [
          { regionId: 'coast', effects: { economy: 25, development: 20 } },
        ],
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
        ],
      },
      {
        id: 'eco_tourism',
        text: 'سياحة بيئية مستدامة',
        effects: { treasury: -15, diplomacy: 5 },
        regionEffects: [
          { regionId: 'coast', effects: { economy: 10, development: 10, loyalty: 10 } },
        ],
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 10 },
        ],
      },
      {
        id: 'reject_project',
        text: 'إلغاء المشروع',
        effects: { popularity: -5 },
        regionEffects: [
          { regionId: 'coast', effects: { loyalty: -10 } },
        ],
      },
    ],
  },
  {
    id: 'religious_influence',
    title: 'دور المؤسسة الدينية',
    description: 'المؤسسة الدينية تطالب بدور أكبر في صنع القرار.',
    category: 'social',
    choices: [
      {
        id: 'increase_role',
        text: 'زيادة دورهم في الحكومة',
        effects: { popularity: 5 },
        factionEffects: [
          { factionId: 'religious', supportChange: 25 },
          { factionId: 'intellectuals', supportChange: -15 },
        ],
      },
      {
        id: 'maintain_separation',
        text: 'الحفاظ على الفصل الحالي',
        effects: { diplomacy: 5 },
        factionEffects: [
          { factionId: 'religious', supportChange: -5 },
          { factionId: 'intellectuals', supportChange: 10 },
        ],
      },
      {
        id: 'secularize',
        text: 'تقليص الدور الديني',
        effects: { diplomacy: 10, popularity: -10 },
        factionEffects: [
          { factionId: 'religious', supportChange: -25 },
          { factionId: 'intellectuals', supportChange: 20 },
        ],
      },
    ],
  },
  {
    id: 'labor_strike',
    title: 'إضراب عمالي',
    description: 'نقابات العمال تنظم إضراباً شاملاً للمطالبة برفع الأجور.',
    category: 'economy',
    choices: [
      {
        id: 'raise_wages',
        text: 'رفع الحد الأدنى للأجور',
        effects: { economy: -10, popularity: 15, treasury: -20 },
        factionEffects: [
          { factionId: 'labor', supportChange: 25 },
          { factionId: 'business', supportChange: -15 },
        ],
      },
      {
        id: 'partial_raise',
        text: 'زيادة محدودة مع وعود مستقبلية',
        effects: { economy: -5, popularity: 5, treasury: -10 },
        factionEffects: [
          { factionId: 'labor', supportChange: 5 },
        ],
      },
      {
        id: 'break_strike',
        text: 'كسر الإضراب بالقوة',
        effects: { economy: 5, popularity: -20, military: 5 },
        factionEffects: [
          { factionId: 'labor', supportChange: -30 },
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
    ],
  },
];

export const getRandomDecision = (usedDecisions: string[]): Decision | null => {
  const availableDecisions = decisions.filter(d => !usedDecisions.includes(d.id));
  if (availableDecisions.length === 0) return null;
  return availableDecisions[Math.floor(Math.random() * availableDecisions.length)];
};
