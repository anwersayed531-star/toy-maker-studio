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
  // New decisions for more content
  {
    id: 'cyber_attack',
    title: 'هجوم سيبراني',
    description: 'هجوم إلكتروني يستهدف البنية التحتية الرقمية للدولة. الأنظمة المصرفية والحكومية معطلة.',
    category: 'military',
    choices: [
      {
        id: 'cyber_defense',
        text: 'تشكيل وحدة دفاع سيبراني متخصصة',
        effects: { military: 10, treasury: -35, economy: -5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 15 },
        ],
      },
      {
        id: 'cyber_retaliation',
        text: 'شن هجوم سيبراني مضاد',
        effects: { military: 5, diplomacy: -20, treasury: -15 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
        ],
      },
      {
        id: 'international_help',
        text: 'طلب مساعدة تقنية دولية',
        effects: { diplomacy: 10, treasury: -10, popularity: -5 },
      },
    ],
  },
  {
    id: 'media_freedom',
    title: 'حرية الإعلام',
    description: 'صحفيون يطالبون بمزيد من الحرية الإعلامية ورفع القيود عن الصحافة.',
    category: 'social',
    choices: [
      {
        id: 'free_press',
        text: 'رفع جميع القيود عن الصحافة',
        effects: { popularity: 15, diplomacy: 15, military: -10 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 25 },
          { factionId: 'military_faction', supportChange: -15 },
        ],
      },
      {
        id: 'partial_freedom',
        text: 'حرية محدودة مع رقابة على الأمن القومي',
        effects: { popularity: 5, diplomacy: 5 },
      },
      {
        id: 'tighten_control',
        text: 'تشديد الرقابة على الإعلام',
        effects: { popularity: -20, diplomacy: -15, military: 10 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: -25 },
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
    ],
  },
  {
    id: 'housing_crisis',
    title: 'أزمة إسكان',
    description: 'ارتفاع أسعار العقارات بشكل جنوني. الشباب لا يستطيعون شراء منازل.',
    category: 'economy',
    choices: [
      {
        id: 'public_housing',
        text: 'بناء مشاريع إسكان حكومية ضخمة',
        effects: { treasury: -45, popularity: 20, economy: -5 },
        factionEffects: [
          { factionId: 'labor', supportChange: 20 },
          { factionId: 'business', supportChange: -10 },
        ],
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: 15, unrest: -10 } },
        ],
      },
      {
        id: 'regulate_market',
        text: 'تنظيم سوق العقارات وتحديد الأسعار',
        effects: { economy: -10, popularity: 10, treasury: -5 },
        factionEffects: [
          { factionId: 'business', supportChange: -20 },
        ],
      },
      {
        id: 'free_market',
        text: 'ترك السوق يحدد الأسعار',
        effects: { economy: 5, popularity: -15 },
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
          { factionId: 'labor', supportChange: -15 },
        ],
      },
    ],
  },
  {
    id: 'space_program',
    title: 'برنامج فضائي',
    description: 'علماء يقترحون إطلاق برنامج فضائي وطني لتعزيز مكانة الدولة.',
    category: 'diplomacy',
    choices: [
      {
        id: 'full_program',
        text: 'إطلاق برنامج فضائي شامل',
        effects: { diplomacy: 20, popularity: 15, treasury: -50, economy: 5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 30 },
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
      {
        id: 'satellite_only',
        text: 'التركيز على الأقمار الصناعية فقط',
        effects: { diplomacy: 10, treasury: -20, military: 5 },
      },
      {
        id: 'cancel_program',
        text: 'إلغاء البرنامج وتوجيه الأموال للتعليم',
        effects: { popularity: 5, treasury: 10 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: -10 },
        ],
      },
    ],
  },
  {
    id: 'drug_epidemic',
    title: 'أزمة مخدرات',
    description: 'انتشار واسع للمخدرات بين الشباب. معدلات الإدمان في ارتفاع خطير.',
    category: 'social',
    choices: [
      {
        id: 'war_on_drugs',
        text: 'حرب شاملة على المخدرات',
        effects: { military: 5, popularity: 10, treasury: -25, diplomacy: -5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
          { factionId: 'religious', supportChange: 15 },
        ],
      },
      {
        id: 'rehabilitation',
        text: 'برامج تأهيل وعلاج المدمنين',
        effects: { popularity: 5, treasury: -20 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 15 },
        ],
      },
      {
        id: 'ignore_problem',
        text: 'تجاهل المشكلة',
        effects: { popularity: -15, economy: -10 },
        regionEffects: [
          { regionId: 'capital', effects: { unrest: 20, loyalty: -10 } },
        ],
      },
    ],
  },
  {
    id: 'immigration_policy',
    title: 'سياسة الهجرة',
    description: 'تزايد أعداد المهاجرين يثير جدلاً واسعاً في المجتمع.',
    category: 'diplomacy',
    choices: [
      {
        id: 'open_immigration',
        text: 'فتح أبواب الهجرة لجذب الكفاءات',
        effects: { economy: 10, diplomacy: 15, popularity: -10 },
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
          { factionId: 'religious', supportChange: -10 },
        ],
      },
      {
        id: 'selective_immigration',
        text: 'هجرة انتقائية للكفاءات فقط',
        effects: { economy: 5, diplomacy: 5 },
      },
      {
        id: 'restrict_immigration',
        text: 'تقييد الهجرة بشكل صارم',
        effects: { diplomacy: -15, popularity: 10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 10 },
        ],
      },
    ],
  },
  {
    id: 'climate_change',
    title: 'تغير المناخ',
    description: 'تقارير علمية تحذر من كوارث مناخية وشيكة. العالم يطالب بإجراءات.',
    category: 'diplomacy',
    choices: [
      {
        id: 'green_revolution',
        text: 'ثورة خضراء شاملة',
        effects: { economy: -10, diplomacy: 20, popularity: 10, treasury: -40 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 25 },
          { factionId: 'business', supportChange: -15 },
        ],
      },
      {
        id: 'gradual_transition',
        text: 'انتقال تدريجي للطاقة النظيفة',
        effects: { diplomacy: 10, treasury: -15 },
      },
      {
        id: 'deny_climate',
        text: 'تجاهل التحذيرات والتركيز على النمو',
        effects: { economy: 10, diplomacy: -20, popularity: -5 },
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
          { factionId: 'intellectuals', supportChange: -20 },
        ],
      },
    ],
  },
  {
    id: 'food_safety',
    title: 'سلامة الغذاء',
    description: 'فضيحة تلوث غذائي تصيب آلاف المواطنين. الشعب يطالب بمحاسبة.',
    category: 'social',
    choices: [
      {
        id: 'strict_regulations',
        text: 'قوانين صارمة لسلامة الغذاء',
        effects: { popularity: 15, economy: -10, treasury: -15 },
        factionEffects: [
          { factionId: 'business', supportChange: -15 },
        ],
      },
      {
        id: 'investigation',
        text: 'تحقيق ومعاقبة المسؤولين',
        effects: { popularity: 10, economy: -5 },
      },
      {
        id: 'downplay',
        text: 'التقليل من خطورة الأمر',
        effects: { popularity: -20, economy: 5 },
      },
    ],
  },
  // === New Decisions - More Content ===
  {
    id: 'water_privatization',
    title: 'خصخصة المياه',
    description: 'شركات أجنبية تعرض شراء حقوق توزيع المياه. الأرباح مغرية لكن الشعب قلق.',
    category: 'economy',
    choices: [
      {
        id: 'full_privatize',
        text: 'بيع حقوق المياه بالكامل',
        effects: { treasury: 50, popularity: -30, economy: 10 },
        factionEffects: [
          { factionId: 'business', supportChange: 25 },
          { factionId: 'labor', supportChange: -25 },
        ],
      },
      {
        id: 'partial_privatize',
        text: 'شراكة بين القطاعين العام والخاص',
        effects: { treasury: 20, popularity: -5, economy: 5 },
      },
      {
        id: 'keep_public',
        text: 'رفض الخصخصة والحفاظ على الملكية العامة',
        effects: { popularity: 15, treasury: -10 },
        factionEffects: [
          { factionId: 'labor', supportChange: 15 },
          { factionId: 'business', supportChange: -10 },
        ],
      },
    ],
  },
  {
    id: 'national_airline',
    title: 'شركة الطيران الوطنية',
    description: 'شركة الطيران الوطنية تعاني من خسائر فادحة وتحتاج لقرار مصيري.',
    category: 'economy',
    choices: [
      {
        id: 'bailout_airline',
        text: 'ضخ أموال حكومية لإنقاذها',
        effects: { treasury: -40, economy: 5, popularity: 5, diplomacy: 5 },
      },
      {
        id: 'sell_airline',
        text: 'بيعها لمستثمر أجنبي',
        effects: { treasury: 30, popularity: -15, diplomacy: 10 },
        factionEffects: [
          { factionId: 'business', supportChange: 10 },
          { factionId: 'labor', supportChange: -20 },
        ],
      },
      {
        id: 'shut_down',
        text: 'إغلاقها نهائياً',
        effects: { treasury: 10, popularity: -20, diplomacy: -10 },
        factionEffects: [
          { factionId: 'labor', supportChange: -15 },
        ],
      },
    ],
  },
  {
    id: 'university_protests',
    title: 'احتجاجات الجامعات',
    description: 'طلاب الجامعات ينظمون اعتصامات ضخمة مطالبين بإصلاح التعليم العالي وتخفيض الرسوم.',
    category: 'social',
    choices: [
      {
        id: 'free_education',
        text: 'إعلان مجانية التعليم الجامعي',
        effects: { popularity: 25, treasury: -35, economy: -5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 30 },
          { factionId: 'labor', supportChange: 10 },
        ],
      },
      {
        id: 'scholarship_program',
        text: 'برنامج منح دراسية للمتفوقين',
        effects: { popularity: 10, treasury: -15 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 10 },
        ],
      },
      {
        id: 'disperse_students',
        text: 'فض الاعتصامات وتهديد الطلاب بالفصل',
        effects: { popularity: -20, military: 5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: -30 },
          { factionId: 'military_faction', supportChange: 5 },
        ],
        regionEffects: [
          { regionId: 'capital', effects: { unrest: 20, loyalty: -15 } },
        ],
      },
    ],
  },
  {
    id: 'arms_deal',
    title: 'صفقة أسلحة',
    description: 'عرض لشراء أسلحة متطورة من قوة عظمى. الصفقة ستعزز الجيش لكنها مكلفة.',
    category: 'military',
    choices: [
      {
        id: 'buy_weapons',
        text: 'شراء الأسلحة بالكامل',
        effects: { military: 25, treasury: -50, diplomacy: -10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 30 },
        ],
      },
      {
        id: 'partial_deal',
        text: 'شراء كمية محدودة مع اتفاقية تصنيع محلي',
        effects: { military: 15, treasury: -25, economy: 5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
          { factionId: 'intellectuals', supportChange: 5 },
        ],
      },
      {
        id: 'reject_deal',
        text: 'رفض الصفقة والاعتماد على التصنيع المحلي',
        effects: { military: -5, popularity: 10, treasury: 5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -10 },
        ],
      },
    ],
  },
  {
    id: 'corruption_in_army',
    title: 'فساد في الجيش',
    description: 'تقارير سرية تكشف عن فساد مالي واسع في المؤسسة العسكرية واختلاس ميزانيات الدفاع.',
    category: 'military',
    choices: [
      {
        id: 'public_trial',
        text: 'محاكمة علنية للضباط الفاسدين',
        effects: { popularity: 20, military: -15, diplomacy: 5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -25 },
          { factionId: 'intellectuals', supportChange: 20 },
        ],
      },
      {
        id: 'internal_reform',
        text: 'إصلاحات داخلية هادئة',
        effects: { military: 5, popularity: -5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: -5 },
        ],
      },
      {
        id: 'ignore_corruption',
        text: 'غض الطرف للحفاظ على ولاء الجيش',
        effects: { popularity: -15, military: 10 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
          { factionId: 'intellectuals', supportChange: -15 },
        ],
      },
    ],
  },
  {
    id: 'religious_extremism',
    title: 'تطرف ديني',
    description: 'جماعات متطرفة تنتشر في المدن وتستقطب الشباب. الأجهزة الأمنية تحذر من خطر متصاعد.',
    category: 'social',
    choices: [
      {
        id: 'security_approach',
        text: 'حملة أمنية لملاحقة المتطرفين',
        effects: { military: 10, popularity: -10, diplomacy: -5 },
        factionEffects: [
          { factionId: 'military_faction', supportChange: 15 },
          { factionId: 'religious', supportChange: -20 },
        ],
      },
      {
        id: 'dialogue_approach',
        text: 'حوار وبرامج إعادة تأهيل',
        effects: { popularity: 10, treasury: -20 },
        factionEffects: [
          { factionId: 'religious', supportChange: 10 },
          { factionId: 'intellectuals', supportChange: 15 },
        ],
      },
      {
        id: 'education_approach',
        text: 'إصلاح المناهج التعليمية ودعم الفكر المعتدل',
        effects: { treasury: -15, diplomacy: 10, popularity: 5 },
        factionEffects: [
          { factionId: 'intellectuals', supportChange: 20 },
          { factionId: 'religious', supportChange: -5 },
        ],
      },
    ],
  },
  {
    id: 'mineral_discovery',
    title: 'اكتشاف معادن نادرة',
    description: 'علماء جيولوجيا يكتشفون احتياطيات ضخمة من معادن نادرة في منطقة الغرب!',
    category: 'economy',
    regionId: 'west',
    choices: [
      {
        id: 'state_mining',
        text: 'تأميم المناجم واستثمار حكومي',
        effects: { economy: 15, treasury: -30, popularity: 10 },
        regionEffects: [
          { regionId: 'west', effects: { economy: 25, development: 20, loyalty: 15 } },
        ],
        factionEffects: [
          { factionId: 'labor', supportChange: 15 },
        ],
      },
      {
        id: 'foreign_partnership',
        text: 'شراكة مع شركات أجنبية',
        effects: { economy: 10, treasury: 20, diplomacy: 10 },
        regionEffects: [
          { regionId: 'west', effects: { economy: 15, development: 10 } },
        ],
        factionEffects: [
          { factionId: 'business', supportChange: 20 },
        ],
      },
      {
        id: 'auction_rights',
        text: 'بيع حقوق التنقيب في مزاد علني',
        effects: { treasury: 40, popularity: -10 },
        regionEffects: [
          { regionId: 'west', effects: { economy: 10, loyalty: -10 } },
        ],
      },
    ],
  },
  {
    id: 'east_drought',
    title: 'جفاف في الشرق',
    description: 'موسم جفاف قاسي يضرب منطقة الشرق. المزارعون يتضورون جوعاً والمحاصيل تحتضر.',
    category: 'regional',
    regionId: 'east',
    choices: [
      {
        id: 'emergency_aid',
        text: 'مساعدات طوارئ ومشاريع ري عاجلة',
        effects: { treasury: -30, popularity: 15 },
        regionEffects: [
          { regionId: 'east', effects: { loyalty: 20, unrest: -15, economy: 5 } },
        ],
      },
      {
        id: 'relocate_farmers',
        text: 'نقل المزارعين لمناطق أخرى',
        effects: { treasury: -15, popularity: -5 },
        regionEffects: [
          { regionId: 'east', effects: { loyalty: -10, unrest: 10 } },
          { regionId: 'north', effects: { unrest: 5 } },
        ],
      },
      {
        id: 'minimal_aid',
        text: 'مساعدات رمزية فقط',
        effects: { popularity: -10 },
        regionEffects: [
          { regionId: 'east', effects: { loyalty: -25, unrest: 30 } },
        ],
      },
    ],
  },
  {
    id: 'capital_metro',
    title: 'مترو العاصمة',
    description: 'مشروع مترو أنفاق ضخم للعاصمة. سيحل أزمة المرور لكنه مكلف جداً.',
    category: 'economy',
    regionId: 'capital',
    choices: [
      {
        id: 'full_metro',
        text: 'بناء شبكة مترو كاملة',
        effects: { treasury: -60, economy: 15, popularity: 20 },
        regionEffects: [
          { regionId: 'capital', effects: { development: 25, economy: 20, loyalty: 15 } },
        ],
        factionEffects: [
          { factionId: 'business', supportChange: 10 },
        ],
      },
      {
        id: 'bus_system',
        text: 'نظام حافلات سريعة بدلاً من المترو',
        effects: { treasury: -20, economy: 5, popularity: 10 },
        regionEffects: [
          { regionId: 'capital', effects: { development: 10, economy: 5 } },
        ],
      },
      {
        id: 'cancel_project',
        text: 'تأجيل المشروع لعدم توفر الميزانية',
        effects: { popularity: -10 },
        regionEffects: [
          { regionId: 'capital', effects: { loyalty: -5, unrest: 10 } },
        ],
      },
    ],
  },
  {
    id: 'national_sport',
    title: 'استضافة بطولة رياضية',
    description: 'فرصة لاستضافة بطولة رياضية دولية. ستعزز سمعة الدولة لكنها تحتاج استثمارات ضخمة.',
    category: 'diplomacy',
    choices: [
      {
        id: 'host_event',
        text: 'استضافة البطولة ببذخ',
        effects: { diplomacy: 20, popularity: 20, treasury: -55, economy: 10 },
        factionEffects: [
          { factionId: 'business', supportChange: 15 },
        ],
        regionEffects: [
          { regionId: 'capital', effects: { development: 15, economy: 10 } },
        ],
      },
      {
        id: 'modest_hosting',
        text: 'استضافة متواضعة مع تقليل التكاليف',
        effects: { diplomacy: 10, popularity: 5, treasury: -20 },
      },
      {
        id: 'decline_hosting',
        text: 'الاعتذار عن الاستضافة',
        effects: { diplomacy: -10, popularity: -5, treasury: 5 },
      },
    ],
  },
];

export const getRandomDecision = (usedDecisions: string[]): Decision | null => {
  const availableDecisions = decisions.filter(d => !usedDecisions.includes(d.id));
  if (availableDecisions.length === 0) return null;
  return availableDecisions[Math.floor(Math.random() * availableDecisions.length)];
};
