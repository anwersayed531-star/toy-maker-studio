import { Decision } from '@/types/game';

export const decisions: Decision[] = [
  {
    id: 'tax_reform',
    title: 'إصلاح الضرائب',
    description: 'وزير المالية يقترح تعديل النظام الضريبي. ما هو قرارك؟',
    category: 'economy',
    choices: [
      {
        id: 'increase_taxes',
        text: 'زيادة الضرائب على الأثرياء',
        effects: { economy: -5, popularity: 10, treasury: 20 }
      },
      {
        id: 'decrease_taxes',
        text: 'تخفيض الضرائب للجميع',
        effects: { economy: 10, popularity: 15, treasury: -25 }
      },
      {
        id: 'keep_taxes',
        text: 'الإبقاء على النظام الحالي',
        effects: { popularity: -5 }
      }
    ]
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
        effects: { military: 15, treasury: -30, popularity: -5 }
      },
      {
        id: 'moderate_increase',
        text: 'زيادة معتدلة بـ 10%',
        effects: { military: 5, treasury: -10 }
      },
      {
        id: 'reject_increase',
        text: 'رفض الطلب',
        effects: { military: -10, treasury: 5, popularity: 5 }
      }
    ]
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
        effects: { diplomacy: 20, military: 10, economy: 5 }
      },
      {
        id: 'negotiate',
        text: 'التفاوض على شروط أفضل',
        effects: { diplomacy: 5, treasury: 10 }
      },
      {
        id: 'reject_alliance',
        text: 'رفض التحالف والحفاظ على الاستقلالية',
        effects: { diplomacy: -10, popularity: 15 }
      }
    ]
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
        effects: { economy: -20, popularity: -10, treasury: -15 }
      },
      {
        id: 'moderate_measures',
        text: 'إجراءات معتدلة مع دعم اقتصادي',
        effects: { economy: -10, treasury: -25, popularity: 5 }
      },
      {
        id: 'minimal_response',
        text: 'الحد الأدنى من القيود',
        effects: { economy: 5, popularity: -15 }
      }
    ]
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
        effects: { economy: 20, popularity: 15, treasury: -50 }
      },
      {
        id: 'phased_project',
        text: 'مشروع على مراحل',
        effects: { economy: 10, popularity: 5, treasury: -20 }
      },
      {
        id: 'postpone',
        text: 'تأجيل المشروع',
        effects: { popularity: -10 }
      }
    ]
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
        effects: { economy: 5, popularity: 10, treasury: -20 }
      },
      {
        id: 'partial_reform',
        text: 'تحديث جزئي',
        effects: { economy: 2, popularity: 5, treasury: -8 }
      },
      {
        id: 'reject_reform',
        text: 'الإبقاء على المناهج الحالية',
        effects: { popularity: -5 }
      }
    ]
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
        effects: { economy: 15, diplomacy: 10, treasury: 15 }
      },
      {
        id: 'negotiate_better',
        text: 'طلب شروط أفضل',
        effects: { economy: 5, diplomacy: -5, treasury: 5 }
      },
      {
        id: 'reject_deal',
        text: 'رفض الاتفاقية',
        effects: { diplomacy: -15, popularity: 5 }
      }
    ]
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
        effects: { popularity: 20, economy: -10, treasury: -15 }
      },
      {
        id: 'dialogue',
        text: 'فتح حوار مع قادة الاحتجاج',
        effects: { popularity: 5, diplomacy: 5 }
      },
      {
        id: 'suppress',
        text: 'فض المظاهرات بالقوة',
        effects: { popularity: -25, military: 5, diplomacy: -15 }
      }
    ]
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
        effects: { military: 10, diplomacy: -20, treasury: -15 }
      },
      {
        id: 'diplomatic_solution',
        text: 'السعي لحل دبلوماسي',
        effects: { diplomacy: 10, popularity: 5 }
      },
      {
        id: 'international_court',
        text: 'اللجوء للمحاكم الدولية',
        effects: { diplomacy: 15, popularity: -5, treasury: -5 }
      }
    ]
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
        effects: { economy: 5, popularity: 10, treasury: -40, diplomacy: 10 }
      },
      {
        id: 'import_energy',
        text: 'استيراد الطاقة من الخارج',
        effects: { economy: -5, treasury: -20, diplomacy: 5 }
      },
      {
        id: 'rationing',
        text: 'تقنين استهلاك الطاقة',
        effects: { economy: -15, popularity: -20, treasury: 10 }
      }
    ]
  }
];

export const getRandomDecision = (usedDecisions: string[]): Decision | null => {
  const availableDecisions = decisions.filter(d => !usedDecisions.includes(d.id));
  if (availableDecisions.length === 0) return null;
  return availableDecisions[Math.floor(Math.random() * availableDecisions.length)];
};
