import { Decision } from '@/types/game';

// Story-linked decisions that appear during specific chapters
export const storyDecisions: Decision[] = [
  // Chapter 1 decisions
  {
    id: 'story_first_speech',
    title: 'الخطاب الأول للأمة',
    description: 'حان وقت أول خطاب رسمي لك كرئيس. العالم يشاهد وكلماتك ستحدد مسار حكمك. ماذا ستقول؟',
    category: 'social',
    choices: [
      { id: 'unity_speech', text: 'خطاب وحدة وطنية ومصالحة', effects: { popularity: 20, diplomacy: 10 }, factionEffects: [{ factionId: 'religious', supportChange: 10 }, { factionId: 'intellectuals', supportChange: 10 }] },
      { id: 'reform_speech', text: 'وعود جريئة بإصلاحات شاملة', effects: { popularity: 15, economy: 5 }, factionEffects: [{ factionId: 'labor', supportChange: 15 }, { factionId: 'business', supportChange: -10 }] },
      { id: 'strength_speech', text: 'خطاب قوة وهيبة الدولة', effects: { military: 10, popularity: 5, diplomacy: -5 }, factionEffects: [{ factionId: 'military_faction', supportChange: 15 }] },
    ],
  },
  {
    id: 'story_cabinet_formation',
    title: 'تشكيل الحكومة الأولى',
    description: 'عليك اختيار فريقك الحكومي. هل تختار الكفاءات أم الموالين أم توازن بين القوى؟',
    category: 'social',
    choices: [
      { id: 'technocrat_cabinet', text: 'حكومة تكنوقراط من الخبراء', effects: { economy: 10, diplomacy: 10, popularity: -5 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 25 }, { factionId: 'military_faction', supportChange: -10 }] },
      { id: 'loyal_cabinet', text: 'حكومة من الموالين والمقربين', effects: { military: 5, popularity: -10 }, factionEffects: [{ factionId: 'military_faction', supportChange: 15 }] },
      { id: 'balanced_cabinet', text: 'حكومة توازن بين كل الفصائل', effects: { popularity: 10, diplomacy: 5 } },
    ],
  },
  // Chapter 2 decisions
  {
    id: 'story_vice_president_plot',
    title: 'مؤامرة نائب الرئيس',
    description: 'رئيس المخابرات يكشف أن نائب الرئيس عادل المنصور يتواصل سراً مع قادة عسكريين! ماذا تفعل؟',
    category: 'military',
    choices: [
      { id: 'confront_vp', text: 'مواجهة نائب الرئيس مباشرة', effects: { popularity: 5, military: -5 }, factionEffects: [{ factionId: 'military_faction', supportChange: -10 }] },
      { id: 'spy_on_vp', text: 'مراقبته سراً وجمع الأدلة', effects: { military: 5, treasury: -10 } },
      { id: 'fire_vp', text: 'إقالته فوراً وتعيين بديل', effects: { popularity: -10, military: -10, diplomacy: 5 }, factionEffects: [{ factionId: 'military_faction', supportChange: -15 }] },
      { id: 'promote_vp', text: 'ترقيته لمنصب شرفي بلا صلاحيات', effects: { popularity: 5 } },
    ],
  },
  {
    id: 'story_journalist_expose',
    title: 'تحقيق صحفي خطير',
    description: 'الصحفي يوسف الحقيقة ينشر تحقيقاً يكشف فساد مقربين منك! الفضيحة تنتشر كالنار.',
    category: 'social',
    choices: [
      { id: 'support_journalist', text: 'دعم الصحفي ومحاسبة الفاسدين', effects: { popularity: 20, economy: -5 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 25 }, { factionId: 'business', supportChange: -15 }] },
      { id: 'silence_journalist', text: 'الضغط على الصحفي للتراجع', effects: { popularity: -20, diplomacy: -10 }, factionEffects: [{ factionId: 'intellectuals', supportChange: -25 }] },
      { id: 'partial_action', text: 'تشكيل لجنة تحقيق صورية', effects: { popularity: -5 } },
    ],
  },
  // Chapter 3 decisions
  {
    id: 'story_economic_crash',
    title: 'الانهيار الاقتصادي الكبير',
    description: 'الاقتصاد ينهار! البطالة تصل 40% والشعب جائع. رجل الأعمال حسن الثري يعرض صفقة: إنقاذ الاقتصاد مقابل نفوذ سياسي.',
    category: 'economy',
    choices: [
      { id: 'accept_tycoon_deal', text: 'قبول صفقة حسن الثري', effects: { economy: 20, treasury: 40, popularity: -15 }, factionEffects: [{ factionId: 'business', supportChange: 30 }, { factionId: 'labor', supportChange: -20 }] },
      { id: 'reject_and_austerity', text: 'رفض الصفقة وتطبيق تقشف قاسي', effects: { economy: -5, treasury: 10, popularity: -25 }, factionEffects: [{ factionId: 'labor', supportChange: -15 }] },
      { id: 'nationalize_assets', text: 'تأميم شركات حسن الثري', effects: { economy: 10, treasury: 30, popularity: 10, diplomacy: -20 }, factionEffects: [{ factionId: 'business', supportChange: -30 }, { factionId: 'labor', supportChange: 20 }] },
    ],
  },
  // Chapter 4 decisions
  {
    id: 'story_general_ultimatum',
    title: 'إنذار الجنرال',
    description: 'الجنرال طارق الحديد يقدم إنذاراً: إما إقالة وزير الدفاع أو "الجيش سيتخذ الإجراءات اللازمة". تهديد مبطن بانقلاب!',
    category: 'military',
    choices: [
      { id: 'submit_general', text: 'الرضوخ وإقالة وزير الدفاع', effects: { military: 10, popularity: -15 }, factionEffects: [{ factionId: 'military_faction', supportChange: 20 }] },
      { id: 'arrest_general', text: 'اعتقال الجنرال بتهمة التمرد', effects: { military: -20, popularity: 10, diplomacy: -5 }, factionEffects: [{ factionId: 'military_faction', supportChange: -30 }, { factionId: 'intellectuals', supportChange: 15 }] },
      { id: 'negotiate_general', text: 'التفاوض على تسوية ترضي الطرفين', effects: { military: 5, popularity: -5, treasury: -15 } },
      { id: 'exile_general', text: 'تعيينه سفيراً في بلد بعيد (نفي مقنّع)', effects: { military: -5, diplomacy: 5 }, factionEffects: [{ factionId: 'military_faction', supportChange: -15 }] },
    ],
  },
  // Chapter 5 decisions
  {
    id: 'story_tribal_uprising',
    title: 'انتفاضة الشيخ عبدالله',
    description: 'الشيخ عبدالله يعلن العصيان المدني في الجنوب ويطالب بالحكم الذاتي! قبائل أخرى تنضم إليه.',
    category: 'regional',
    regionId: 'south',
    choices: [
      { id: 'military_crush', text: 'سحق التمرد عسكرياً بلا رحمة', effects: { military: -10, popularity: -20, diplomacy: -15, treasury: -25 }, regionEffects: [{ regionId: 'south', effects: { unrest: 30, loyalty: -30 } }], factionEffects: [{ factionId: 'military_faction', supportChange: 15 }] },
      { id: 'grant_autonomy', text: 'منح الحكم الذاتي كما يطالبون', effects: { popularity: -5, diplomacy: 10 }, regionEffects: [{ regionId: 'south', effects: { unrest: -25, loyalty: 25 } }], factionEffects: [{ factionId: 'military_faction', supportChange: -20 }] },
      { id: 'kidnap_sheikh', text: 'اختطاف الشيخ سراً وإجباره على التراجع', effects: { military: 5, popularity: -10, diplomacy: -20 }, regionEffects: [{ regionId: 'south', effects: { unrest: 15, loyalty: -10 } }] },
    ],
  },
  // Chapter 6 decisions
  {
    id: 'story_foreign_invasion',
    title: 'الغزو الأجنبي',
    description: 'قوات دولة مجاورة تعبر الحدود! هذا ليس مناوشة بل غزو حقيقي. ملايين الأرواح على المحك.',
    category: 'military',
    choices: [
      { id: 'total_war', text: 'إعلان الحرب الشاملة والتعبئة العامة', effects: { military: 25, popularity: 20, treasury: -60, economy: -25, diplomacy: -10 }, factionEffects: [{ factionId: 'military_faction', supportChange: 30 }] },
      { id: 'guerrilla_war', text: 'حرب عصابات ومقاومة شعبية', effects: { military: 10, popularity: 15, treasury: -20, economy: -15 }, factionEffects: [{ factionId: 'labor', supportChange: 15 }] },
      { id: 'surrender_negotiate', text: 'طلب وقف إطلاق النار والتفاوض', effects: { diplomacy: 10, military: -20, popularity: -30 }, factionEffects: [{ factionId: 'military_faction', supportChange: -25 }] },
      { id: 'nuclear_threat', text: 'تهديد باستخدام أسلحة الدمار الشامل', effects: { diplomacy: -30, military: 15, popularity: -10 } },
    ],
  },
  // Chapter 7 decisions
  {
    id: 'story_legacy_choice',
    title: 'اختيار الإرث',
    description: 'بعد سنوات من الحكم، حان وقت تحديد مستقبل البلاد. ما الإرث الذي تريد تركه؟',
    category: 'social',
    choices: [
      { id: 'democracy', text: 'التحول الديمقراطي وانتخابات حرة', effects: { popularity: 25, diplomacy: 25, military: -15 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 30 }, { factionId: 'military_faction', supportChange: -20 }] },
      { id: 'dynasty', text: 'توريث الحكم لابنك/ابنتك', effects: { popularity: -20, military: 10, diplomacy: -15 }, factionEffects: [{ factionId: 'military_faction', supportChange: 10 }] },
      { id: 'eternal_president', text: 'تعديل الدستور للبقاء للأبد', effects: { popularity: -30, military: 15, diplomacy: -25 }, factionEffects: [{ factionId: 'intellectuals', supportChange: -30 }, { factionId: 'military_faction', supportChange: 15 }] },
      { id: 'golden_age', text: 'مشروع نهضة شاملة قبل الرحيل', effects: { economy: 15, popularity: 15, treasury: -40, diplomacy: 10 }, factionEffects: [{ factionId: 'intellectuals', supportChange: 20 }, { factionId: 'labor', supportChange: 15 }] },
    ],
  },
];

export const getStoryDecision = (chapterIndex: number, usedDecisions: string[]): Decision | null => {
  const chapterDecisions: Record<number, string[]> = {
    0: ['story_first_speech', 'story_cabinet_formation'],
    1: ['story_vice_president_plot', 'story_journalist_expose'],
    2: ['story_economic_crash'],
    3: ['story_general_ultimatum'],
    4: ['story_tribal_uprising'],
    5: ['story_foreign_invasion'],
    6: ['story_legacy_choice'],
  };

  const ids = chapterDecisions[chapterIndex] || [];
  for (const id of ids) {
    if (!usedDecisions.includes(id)) {
      return storyDecisions.find(d => d.id === id) || null;
    }
  }
  return null;
};
