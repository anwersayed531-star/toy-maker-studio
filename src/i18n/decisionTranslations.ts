import { LanguageCode } from './translations';

export interface DecisionTranslation {
  title: string;
  description: string;
  choices: { [choiceId: string]: string };
}

export interface DecisionTranslations {
  [decisionId: string]: DecisionTranslation;
}

// Arabic translations (default)
const arDecisions: DecisionTranslations = {
  // Economic Decisions
  tax_reform: {
    title: 'إصلاح الضرائب',
    description: 'وزير المالية يقترح تعديل النظام الضريبي. ما هو قرارك؟',
    choices: {
      increase_taxes: 'زيادة الضرائب على الأثرياء',
      decrease_taxes: 'تخفيض الضرائب للجميع',
      keep_taxes: 'الإبقاء على النظام الحالي',
    },
  },
  business_protest: {
    title: 'احتجاج رجال الأعمال',
    description: 'رجال الأعمال يهددون بنقل استثماراتهم للخارج بسبب الضرائب المرتفعة!',
    choices: {
      negotiate: 'التفاوض على حوافز',
      stand_firm: 'الثبات على الموقف',
    },
  },
  military_budget: {
    title: 'ميزانية الجيش',
    description: 'قادة الجيش يطالبون بزيادة الميزانية العسكرية.',
    choices: {
      increase_military: 'زيادة الميزانية العسكرية بـ 30%',
      moderate_increase: 'زيادة معتدلة بـ 10%',
      reject_increase: 'رفض الطلب',
    },
  },
  military_discontent: {
    title: 'تذمر في صفوف الجيش',
    description: 'تقارير عن استياء متزايد بين ضباط الجيش بسبب قرارك السابق.',
    choices: {
      meet_officers: 'الاجتماع بالقادة العسكريين',
      ignore: 'تجاهل الأمر',
    },
  },
  foreign_alliance: {
    title: 'تحالف دولي',
    description: 'دولة عظمى تعرض عليك تحالفاً استراتيجياً.',
    choices: {
      accept_alliance: 'قبول التحالف',
      negotiate: 'التفاوض على شروط أفضل',
      reject_alliance: 'رفض التحالف والحفاظ على الاستقلالية',
    },
  },
  alliance_request: {
    title: 'طلب الحليف',
    description: 'الحليف الجديد يطلب منك السماح بإنشاء قاعدة عسكرية على أراضيك.',
    choices: {
      accept_base: 'الموافقة على القاعدة',
      refuse_base: 'رفض الطلب',
    },
  },
  healthcare_crisis: {
    title: 'أزمة صحية',
    description: 'تفشي وباء يهدد البلاد. كيف ستتعامل مع الأزمة؟',
    choices: {
      strict_lockdown: 'إغلاق صارم وحجر صحي',
      moderate_measures: 'إجراءات معتدلة مع دعم اقتصادي',
      minimal_response: 'الحد الأدنى من القيود',
    },
  },
  infrastructure: {
    title: 'مشروع البنية التحتية',
    description: 'فرصة لبناء شبكة طرق ومواصلات حديثة.',
    choices: {
      mega_project: 'مشروع ضخم يشمل كل البلاد',
      phased_project: 'مشروع على مراحل',
      postpone: 'تأجيل المشروع',
    },
  },
  education_reform: {
    title: 'إصلاح التعليم',
    description: 'وزير التعليم يقدم خطة لتحديث المناهج.',
    choices: {
      full_reform: 'إصلاح شامل للمناهج',
      partial_reform: 'تحديث جزئي',
      reject_reform: 'الإبقاء على المناهج الحالية',
    },
  },
  trade_deal: {
    title: 'اتفاقية تجارية',
    description: 'دولة مجاورة تعرض اتفاقية تجارة حرة.',
    choices: {
      accept_deal: 'توقيع الاتفاقية',
      negotiate_better: 'طلب شروط أفضل',
      reject_deal: 'رفض الاتفاقية',
    },
  },
  protest: {
    title: 'احتجاجات شعبية',
    description: 'مظاهرات كبيرة في العاصمة تطالب بإصلاحات.',
    choices: {
      meet_demands: 'الاستجابة لمطالب المتظاهرين',
      dialogue: 'فتح حوار مع قادة الاحتجاج',
      suppress: 'فض المظاهرات بالقوة',
    },
  },
  international_criticism: {
    title: 'انتقادات دولية',
    description: 'منظمات حقوق الإنسان تدين قمع المتظاهرين وتطالب بتحقيق.',
    choices: {
      apologize: 'الاعتذار والتحقيق',
      defend: 'الدفاع عن الإجراءات',
    },
  },
  border_dispute: {
    title: 'نزاع حدودي',
    description: 'توتر على الحدود مع دولة مجاورة.',
    choices: {
      military_response: 'حشد القوات على الحدود',
      diplomatic_solution: 'السعي لحل دبلوماسي',
      international_court: 'اللجوء للمحاكم الدولية',
    },
  },
  energy_crisis: {
    title: 'أزمة طاقة',
    description: 'نقص حاد في إمدادات الطاقة يهدد الاقتصاد.',
    choices: {
      renewable: 'الاستثمار في الطاقة المتجددة',
      import_energy: 'استيراد الطاقة من الخارج',
      rationing: 'تقنين استهلاك الطاقة',
    },
  },
  south_development: {
    title: 'تنمية الجنوب',
    description: 'منطقة الجنوب تطالب باهتمام أكبر بالتنمية.',
    choices: {
      major_investment: 'استثمار ضخم في التنمية',
      gradual_development: 'خطة تنمية تدريجية',
      ignore_demands: 'تجاهل المطالب',
    },
  },
  south_unrest: {
    title: 'اضطرابات في الجنوب',
    description: 'تصاعد الاحتجاجات في الجنوب بسبب الإهمال التنموي.',
    choices: {
      send_troops: 'إرسال قوات لحفظ الأمن',
      negotiate_now: 'بدء مفاوضات عاجلة',
    },
  },
  north_separatism: {
    title: 'حركة انفصالية',
    description: 'ظهور حركة انفصالية في الشمال تطالب بالحكم الذاتي.',
    choices: {
      grant_autonomy: 'منح حكم ذاتي موسع',
      limited_concessions: 'تقديم تنازلات محدودة',
      crackdown: 'قمع الحركة بالقوة',
    },
  },
  coast_tourism: {
    title: 'مشروع سياحي',
    description: 'فرصة لتطوير السياحة في منطقة الساحل.',
    choices: {
      mega_resort: 'بناء منتجع سياحي ضخم',
      eco_tourism: 'سياحة بيئية مستدامة',
      reject_project: 'إلغاء المشروع',
    },
  },
  religious_influence: {
    title: 'دور المؤسسة الدينية',
    description: 'المؤسسة الدينية تطالب بدور أكبر في صنع القرار.',
    choices: {
      increase_role: 'زيادة دورهم في الحكومة',
      maintain_separation: 'الحفاظ على الفصل الحالي',
      secularize: 'تقليص الدور الديني',
    },
  },
  labor_strike: {
    title: 'إضراب عمالي',
    description: 'نقابات العمال تنظم إضراباً شاملاً للمطالبة برفع الأجور.',
    choices: {
      raise_wages: 'رفع الحد الأدنى للأجور',
      partial_raise: 'زيادة محدودة مع وعود مستقبلية',
      break_strike: 'كسر الإضراب بالقوة',
    },
  },
  // New decisions
  cyber_attack: {
    title: 'هجوم سيبراني',
    description: 'هجوم إلكتروني يستهدف البنية التحتية الرقمية للدولة.',
    choices: { cyber_defense: 'تشكيل وحدة دفاع سيبراني', cyber_retaliation: 'شن هجوم مضاد', international_help: 'طلب مساعدة دولية' },
  },
  media_freedom: {
    title: 'حرية الإعلام',
    description: 'صحفيون يطالبون بمزيد من الحرية الإعلامية.',
    choices: { free_press: 'رفع جميع القيود', partial_freedom: 'حرية محدودة', tighten_control: 'تشديد الرقابة' },
  },
  housing_crisis: {
    title: 'أزمة إسكان',
    description: 'ارتفاع أسعار العقارات. الشباب لا يستطيعون شراء منازل.',
    choices: { public_housing: 'بناء إسكان حكومي', regulate_market: 'تنظيم السوق', free_market: 'ترك السوق حراً' },
  },
  space_program: {
    title: 'برنامج فضائي',
    description: 'علماء يقترحون إطلاق برنامج فضائي وطني.',
    choices: { full_program: 'برنامج فضائي شامل', satellite_only: 'أقمار صناعية فقط', cancel_program: 'إلغاء البرنامج' },
  },
  drug_epidemic: {
    title: 'أزمة مخدرات',
    description: 'انتشار واسع للمخدرات بين الشباب.',
    choices: { war_on_drugs: 'حرب على المخدرات', rehabilitation: 'برامج تأهيل', ignore_problem: 'تجاهل المشكلة' },
  },
  immigration_policy: {
    title: 'سياسة الهجرة',
    description: 'تزايد أعداد المهاجرين يثير جدلاً واسعاً.',
    choices: { open_immigration: 'فتح الهجرة', selective_immigration: 'هجرة انتقائية', restrict_immigration: 'تقييد الهجرة' },
  },
  climate_change: {
    title: 'تغير المناخ',
    description: 'تقارير علمية تحذر من كوارث مناخية.',
    choices: { green_revolution: 'ثورة خضراء شاملة', gradual_transition: 'انتقال تدريجي', deny_climate: 'تجاهل التحذيرات' },
  },
  food_safety: {
    title: 'سلامة الغذاء',
    description: 'فضيحة تلوث غذائي تصيب آلاف المواطنين.',
    choices: { strict_regulations: 'قوانين صارمة', investigation: 'تحقيق ومعاقبة', downplay: 'التقليل من الخطورة' },
  },
};

// English translations
const enDecisions: DecisionTranslations = {
  tax_reform: {
    title: 'Tax Reform',
    description: 'The Finance Minister proposes modifying the tax system. What is your decision?',
    choices: {
      increase_taxes: 'Increase taxes on the wealthy',
      decrease_taxes: 'Reduce taxes for everyone',
      keep_taxes: 'Keep the current system',
    },
  },
  business_protest: {
    title: 'Business Protest',
    description: 'Businessmen threaten to move their investments abroad due to high taxes!',
    choices: {
      negotiate: 'Negotiate incentives',
      stand_firm: 'Stand firm',
    },
  },
  military_budget: {
    title: 'Military Budget',
    description: 'Army leaders demand an increase in the military budget.',
    choices: {
      increase_military: 'Increase military budget by 30%',
      moderate_increase: 'Moderate increase of 10%',
      reject_increase: 'Reject the request',
    },
  },
  military_discontent: {
    title: 'Military Discontent',
    description: 'Reports of growing dissatisfaction among army officers due to your previous decision.',
    choices: {
      meet_officers: 'Meet with military leaders',
      ignore: 'Ignore the matter',
    },
  },
  foreign_alliance: {
    title: 'International Alliance',
    description: 'A superpower offers you a strategic alliance.',
    choices: {
      accept_alliance: 'Accept the alliance',
      negotiate: 'Negotiate better terms',
      reject_alliance: 'Reject and maintain independence',
    },
  },
  alliance_request: {
    title: 'Ally Request',
    description: 'The new ally asks you to allow the establishment of a military base on your territory.',
    choices: {
      accept_base: 'Approve the base',
      refuse_base: 'Refuse the request',
    },
  },
  healthcare_crisis: {
    title: 'Healthcare Crisis',
    description: 'An epidemic outbreak threatens the country. How will you handle the crisis?',
    choices: {
      strict_lockdown: 'Strict lockdown and quarantine',
      moderate_measures: 'Moderate measures with economic support',
      minimal_response: 'Minimum restrictions',
    },
  },
  infrastructure: {
    title: 'Infrastructure Project',
    description: 'An opportunity to build a modern road and transportation network.',
    choices: {
      mega_project: 'Mega project covering the entire country',
      phased_project: 'Phased project',
      postpone: 'Postpone the project',
    },
  },
  education_reform: {
    title: 'Education Reform',
    description: 'The Education Minister presents a plan to modernize curricula.',
    choices: {
      full_reform: 'Comprehensive curriculum reform',
      partial_reform: 'Partial update',
      reject_reform: 'Keep current curricula',
    },
  },
  trade_deal: {
    title: 'Trade Agreement',
    description: 'A neighboring country offers a free trade agreement.',
    choices: {
      accept_deal: 'Sign the agreement',
      negotiate_better: 'Request better terms',
      reject_deal: 'Reject the agreement',
    },
  },
  protest: {
    title: 'Public Protests',
    description: 'Large demonstrations in the capital demanding reforms.',
    choices: {
      meet_demands: 'Respond to protesters\' demands',
      dialogue: 'Open dialogue with protest leaders',
      suppress: 'Disperse protests by force',
    },
  },
  international_criticism: {
    title: 'International Criticism',
    description: 'Human rights organizations condemn the suppression and demand an investigation.',
    choices: {
      apologize: 'Apologize and investigate',
      defend: 'Defend the actions',
    },
  },
  border_dispute: {
    title: 'Border Dispute',
    description: 'Tension at the border with a neighboring country.',
    choices: {
      military_response: 'Mobilize forces at the border',
      diplomatic_solution: 'Seek a diplomatic solution',
      international_court: 'Appeal to international courts',
    },
  },
  energy_crisis: {
    title: 'Energy Crisis',
    description: 'Severe shortage of energy supplies threatens the economy.',
    choices: {
      renewable: 'Invest in renewable energy',
      import_energy: 'Import energy from abroad',
      rationing: 'Ration energy consumption',
    },
  },
  south_development: {
    title: 'Southern Development',
    description: 'The southern region demands more attention to development.',
    choices: {
      major_investment: 'Major investment in development',
      gradual_development: 'Gradual development plan',
      ignore_demands: 'Ignore the demands',
    },
  },
  south_unrest: {
    title: 'Southern Unrest',
    description: 'Escalating protests in the south due to development neglect.',
    choices: {
      send_troops: 'Send security forces',
      negotiate_now: 'Begin urgent negotiations',
    },
  },
  north_separatism: {
    title: 'Separatist Movement',
    description: 'A separatist movement emerges in the north demanding autonomy.',
    choices: {
      grant_autonomy: 'Grant expanded autonomy',
      limited_concessions: 'Offer limited concessions',
      crackdown: 'Suppress the movement by force',
    },
  },
  coast_tourism: {
    title: 'Tourism Project',
    description: 'An opportunity to develop tourism in the coastal region.',
    choices: {
      mega_resort: 'Build a mega resort',
      eco_tourism: 'Sustainable eco-tourism',
      reject_project: 'Cancel the project',
    },
  },
  religious_influence: {
    title: 'Religious Institution Role',
    description: 'The religious institution demands a greater role in decision-making.',
    choices: {
      increase_role: 'Increase their role in government',
      maintain_separation: 'Maintain current separation',
      secularize: 'Reduce religious role',
    },
  },
  labor_strike: {
    title: 'Labor Strike',
    description: 'Labor unions organize a comprehensive strike demanding wage increases.',
    choices: {
      raise_wages: 'Raise minimum wage',
      partial_raise: 'Limited increase with future promises',
      break_strike: 'Break the strike by force',
    },
  },
  // New decisions
  cyber_attack: {
    title: 'Cyber Attack',
    description: 'A cyber attack targets the national digital infrastructure. Banking and government systems are down.',
    choices: { cyber_defense: 'Form specialized cyber defense unit', cyber_retaliation: 'Launch counter-attack', international_help: 'Request international tech help' },
  },
  media_freedom: {
    title: 'Media Freedom',
    description: 'Journalists demand more press freedom and lifting restrictions.',
    choices: { free_press: 'Lift all press restrictions', partial_freedom: 'Limited freedom with security oversight', tighten_control: 'Tighten media control' },
  },
  housing_crisis: {
    title: 'Housing Crisis',
    description: 'Real estate prices skyrocketing. Youth cannot afford homes.',
    choices: { public_housing: 'Build massive public housing', regulate_market: 'Regulate the real estate market', free_market: 'Let the free market decide' },
  },
  space_program: {
    title: 'Space Program',
    description: 'Scientists propose launching a national space program.',
    choices: { full_program: 'Full space program', satellite_only: 'Satellites only', cancel_program: 'Cancel and fund education' },
  },
  drug_epidemic: {
    title: 'Drug Epidemic',
    description: 'Widespread drug abuse among youth. Addiction rates at alarming levels.',
    choices: { war_on_drugs: 'All-out war on drugs', rehabilitation: 'Rehabilitation programs', ignore_problem: 'Ignore the problem' },
  },
  immigration_policy: {
    title: 'Immigration Policy',
    description: 'Rising immigration sparks heated debate across society.',
    choices: { open_immigration: 'Open immigration for talent', selective_immigration: 'Selective skilled immigration', restrict_immigration: 'Strict immigration restrictions' },
  },
  climate_change: {
    title: 'Climate Change',
    description: 'Scientific reports warn of imminent climate disasters.',
    choices: { green_revolution: 'Comprehensive green revolution', gradual_transition: 'Gradual clean energy transition', deny_climate: 'Ignore warnings, focus on growth' },
  },
  food_safety: {
    title: 'Food Safety',
    description: 'Food contamination scandal affects thousands of citizens.',
    choices: { strict_regulations: 'Strict food safety laws', investigation: 'Investigate and punish', downplay: 'Downplay the severity' },
  },
};

const esDecisions: DecisionTranslations = {
  tax_reform: {
    title: 'Reforma Fiscal',
    description: 'El Ministro de Finanzas propone modificar el sistema tributario. ¿Cuál es tu decisión?',
    choices: {
      increase_taxes: 'Aumentar impuestos a los ricos',
      decrease_taxes: 'Reducir impuestos para todos',
      keep_taxes: 'Mantener el sistema actual',
    },
  },
  business_protest: {
    title: 'Protesta Empresarial',
    description: '¡Los empresarios amenazan con trasladar sus inversiones al extranjero debido a los altos impuestos!',
    choices: {
      negotiate: 'Negociar incentivos',
      stand_firm: 'Mantenerse firme',
    },
  },
  military_budget: {
    title: 'Presupuesto Militar',
    description: 'Los líderes del ejército exigen un aumento del presupuesto militar.',
    choices: {
      increase_military: 'Aumentar presupuesto militar 30%',
      moderate_increase: 'Aumento moderado del 10%',
      reject_increase: 'Rechazar la solicitud',
    },
  },
  military_discontent: {
    title: 'Descontento Militar',
    description: 'Informes de creciente insatisfacción entre los oficiales del ejército.',
    choices: {
      meet_officers: 'Reunirse con líderes militares',
      ignore: 'Ignorar el asunto',
    },
  },
  foreign_alliance: {
    title: 'Alianza Internacional',
    description: 'Una superpotencia te ofrece una alianza estratégica.',
    choices: {
      accept_alliance: 'Aceptar la alianza',
      negotiate: 'Negociar mejores términos',
      reject_alliance: 'Rechazar y mantener independencia',
    },
  },
  alliance_request: {
    title: 'Solicitud del Aliado',
    description: 'El nuevo aliado solicita establecer una base militar en tu territorio.',
    choices: {
      accept_base: 'Aprobar la base',
      refuse_base: 'Rechazar la solicitud',
    },
  },
  healthcare_crisis: {
    title: 'Crisis Sanitaria',
    description: 'Un brote epidémico amenaza al país. ¿Cómo manejarás la crisis?',
    choices: {
      strict_lockdown: 'Confinamiento estricto y cuarentena',
      moderate_measures: 'Medidas moderadas con apoyo económico',
      minimal_response: 'Restricciones mínimas',
    },
  },
  infrastructure: {
    title: 'Proyecto de Infraestructura',
    description: 'Oportunidad de construir una red moderna de carreteras y transporte.',
    choices: {
      mega_project: 'Megaproyecto en todo el país',
      phased_project: 'Proyecto por fases',
      postpone: 'Posponer el proyecto',
    },
  },
  education_reform: {
    title: 'Reforma Educativa',
    description: 'El Ministro de Educación presenta un plan para modernizar los currículos.',
    choices: {
      full_reform: 'Reforma curricular integral',
      partial_reform: 'Actualización parcial',
      reject_reform: 'Mantener currículos actuales',
    },
  },
  trade_deal: {
    title: 'Acuerdo Comercial',
    description: 'Un país vecino ofrece un acuerdo de libre comercio.',
    choices: {
      accept_deal: 'Firmar el acuerdo',
      negotiate_better: 'Solicitar mejores términos',
      reject_deal: 'Rechazar el acuerdo',
    },
  },
  protest: {
    title: 'Protestas Públicas',
    description: 'Grandes manifestaciones en la capital exigiendo reformas.',
    choices: {
      meet_demands: 'Responder a las demandas',
      dialogue: 'Abrir diálogo con líderes',
      suppress: 'Dispersar por la fuerza',
    },
  },
  international_criticism: {
    title: 'Crítica Internacional',
    description: 'Organizaciones de derechos humanos condenan la represión.',
    choices: {
      apologize: 'Disculparse e investigar',
      defend: 'Defender las acciones',
    },
  },
  border_dispute: {
    title: 'Disputa Fronteriza',
    description: 'Tensión en la frontera con un país vecino.',
    choices: {
      military_response: 'Movilizar fuerzas en la frontera',
      diplomatic_solution: 'Buscar solución diplomática',
      international_court: 'Apelar a tribunales internacionales',
    },
  },
  energy_crisis: {
    title: 'Crisis Energética',
    description: 'Escasez severa de suministros energéticos amenaza la economía.',
    choices: {
      renewable: 'Invertir en energía renovable',
      import_energy: 'Importar energía del exterior',
      rationing: 'Racionar el consumo de energía',
    },
  },
  south_development: {
    title: 'Desarrollo del Sur',
    description: 'La región sur demanda más atención al desarrollo.',
    choices: {
      major_investment: 'Inversión mayor en desarrollo',
      gradual_development: 'Plan de desarrollo gradual',
      ignore_demands: 'Ignorar las demandas',
    },
  },
  south_unrest: {
    title: 'Disturbios en el Sur',
    description: 'Protestas crecientes en el sur por abandono del desarrollo.',
    choices: {
      send_troops: 'Enviar fuerzas de seguridad',
      negotiate_now: 'Iniciar negociaciones urgentes',
    },
  },
  north_separatism: {
    title: 'Movimiento Separatista',
    description: 'Surge un movimiento separatista en el norte exigiendo autonomía.',
    choices: {
      grant_autonomy: 'Conceder autonomía ampliada',
      limited_concessions: 'Ofrecer concesiones limitadas',
      crackdown: 'Reprimir el movimiento por la fuerza',
    },
  },
  coast_tourism: {
    title: 'Proyecto Turístico',
    description: 'Oportunidad de desarrollar el turismo en la región costera.',
    choices: {
      mega_resort: 'Construir mega resort',
      eco_tourism: 'Ecoturismo sostenible',
      reject_project: 'Cancelar el proyecto',
    },
  },
  religious_influence: {
    title: 'Rol de la Institución Religiosa',
    description: 'La institución religiosa demanda mayor rol en las decisiones.',
    choices: {
      increase_role: 'Aumentar su rol en el gobierno',
      maintain_separation: 'Mantener separación actual',
      secularize: 'Reducir el rol religioso',
    },
  },
  labor_strike: {
    title: 'Huelga Laboral',
    description: 'Los sindicatos organizan una huelga general exigiendo aumentos salariales.',
    choices: {
      raise_wages: 'Aumentar el salario mínimo',
      partial_raise: 'Aumento limitado con promesas futuras',
      break_strike: 'Romper la huelga por la fuerza',
    },
  },
};

// French translations
const frDecisions: DecisionTranslations = {
  tax_reform: {
    title: 'Réforme Fiscale',
    description: 'Le Ministre des Finances propose de modifier le système fiscal. Quelle est votre décision?',
    choices: {
      increase_taxes: 'Augmenter les impôts des riches',
      decrease_taxes: 'Réduire les impôts pour tous',
      keep_taxes: 'Garder le système actuel',
    },
  },
  business_protest: {
    title: 'Protestation des Entreprises',
    description: 'Les hommes d\'affaires menacent de délocaliser leurs investissements!',
    choices: {
      negotiate: 'Négocier des incitations',
      stand_firm: 'Rester ferme',
    },
  },
  military_budget: {
    title: 'Budget Militaire',
    description: 'Les dirigeants de l\'armée exigent une augmentation du budget militaire.',
    choices: {
      increase_military: 'Augmenter le budget de 30%',
      moderate_increase: 'Augmentation modérée de 10%',
      reject_increase: 'Rejeter la demande',
    },
  },
  military_discontent: {
    title: 'Mécontentement Militaire',
    description: 'Rapports de mécontentement croissant parmi les officiers.',
    choices: {
      meet_officers: 'Rencontrer les dirigeants',
      ignore: 'Ignorer l\'affaire',
    },
  },
  foreign_alliance: {
    title: 'Alliance Internationale',
    description: 'Une superpuissance vous propose une alliance stratégique.',
    choices: {
      accept_alliance: 'Accepter l\'alliance',
      negotiate: 'Négocier de meilleures conditions',
      reject_alliance: 'Refuser et maintenir l\'indépendance',
    },
  },
  alliance_request: {
    title: 'Demande de l\'Allié',
    description: 'Le nouvel allié demande l\'établissement d\'une base militaire.',
    choices: {
      accept_base: 'Approuver la base',
      refuse_base: 'Refuser la demande',
    },
  },
  healthcare_crisis: {
    title: 'Crise Sanitaire',
    description: 'Une épidémie menace le pays. Comment gérerez-vous la crise?',
    choices: {
      strict_lockdown: 'Confinement strict et quarantaine',
      moderate_measures: 'Mesures modérées avec soutien économique',
      minimal_response: 'Restrictions minimales',
    },
  },
  infrastructure: {
    title: 'Projet d\'Infrastructure',
    description: 'Opportunité de construire un réseau moderne de routes et transports.',
    choices: {
      mega_project: 'Mégaprojet couvrant tout le pays',
      phased_project: 'Projet par phases',
      postpone: 'Reporter le projet',
    },
  },
  education_reform: {
    title: 'Réforme Éducative',
    description: 'Le Ministre de l\'Éducation présente un plan de modernisation.',
    choices: {
      full_reform: 'Réforme complète des programmes',
      partial_reform: 'Mise à jour partielle',
      reject_reform: 'Garder les programmes actuels',
    },
  },
  trade_deal: {
    title: 'Accord Commercial',
    description: 'Un pays voisin propose un accord de libre-échange.',
    choices: {
      accept_deal: 'Signer l\'accord',
      negotiate_better: 'Demander de meilleures conditions',
      reject_deal: 'Rejeter l\'accord',
    },
  },
  protest: {
    title: 'Manifestations Publiques',
    description: 'Grandes manifestations dans la capitale exigeant des réformes.',
    choices: {
      meet_demands: 'Répondre aux demandes',
      dialogue: 'Ouvrir le dialogue avec les leaders',
      suppress: 'Disperser par la force',
    },
  },
  international_criticism: {
    title: 'Critique Internationale',
    description: 'Les organisations des droits de l\'homme condamnent la répression.',
    choices: {
      apologize: 'S\'excuser et enquêter',
      defend: 'Défendre les actions',
    },
  },
  border_dispute: {
    title: 'Conflit Frontalier',
    description: 'Tension à la frontière avec un pays voisin.',
    choices: {
      military_response: 'Mobiliser les forces',
      diplomatic_solution: 'Chercher une solution diplomatique',
      international_court: 'Faire appel aux tribunaux',
    },
  },
  energy_crisis: {
    title: 'Crise Énergétique',
    description: 'Pénurie grave d\'approvisionnement énergétique menace l\'économie.',
    choices: {
      renewable: 'Investir dans les énergies renouvelables',
      import_energy: 'Importer de l\'énergie',
      rationing: 'Rationner la consommation',
    },
  },
  south_development: {
    title: 'Développement du Sud',
    description: 'La région sud demande plus d\'attention au développement.',
    choices: {
      major_investment: 'Investissement majeur',
      gradual_development: 'Plan de développement progressif',
      ignore_demands: 'Ignorer les demandes',
    },
  },
  south_unrest: {
    title: 'Troubles au Sud',
    description: 'Protestations croissantes au sud par négligence du développement.',
    choices: {
      send_troops: 'Envoyer les forces de sécurité',
      negotiate_now: 'Commencer des négociations urgentes',
    },
  },
  north_separatism: {
    title: 'Mouvement Séparatiste',
    description: 'Un mouvement séparatiste émerge au nord demandant l\'autonomie.',
    choices: {
      grant_autonomy: 'Accorder une autonomie élargie',
      limited_concessions: 'Offrir des concessions limitées',
      crackdown: 'Réprimer le mouvement par la force',
    },
  },
  coast_tourism: {
    title: 'Projet Touristique',
    description: 'Opportunité de développer le tourisme dans la région côtière.',
    choices: {
      mega_resort: 'Construire un méga resort',
      eco_tourism: 'Écotourisme durable',
      reject_project: 'Annuler le projet',
    },
  },
  religious_influence: {
    title: 'Rôle de l\'Institution Religieuse',
    description: 'L\'institution religieuse exige un plus grand rôle dans les décisions.',
    choices: {
      increase_role: 'Augmenter leur rôle',
      maintain_separation: 'Maintenir la séparation actuelle',
      secularize: 'Réduire le rôle religieux',
    },
  },
  labor_strike: {
    title: 'Grève du Travail',
    description: 'Les syndicats organisent une grève générale pour des augmentations.',
    choices: {
      raise_wages: 'Augmenter le salaire minimum',
      partial_raise: 'Augmentation limitée avec promesses',
      break_strike: 'Briser la grève par la force',
    },
  },
};

// Create default translations for other languages (fallback to English)
const createDecisionTranslation = (overrides: Partial<DecisionTranslations>): DecisionTranslations => ({
  ...enDecisions,
  ...overrides,
});

export const decisionTranslations: Record<LanguageCode, DecisionTranslations> = {
  ar: arDecisions,
  en: enDecisions,
  es: esDecisions,
  fr: frDecisions,
  de: createDecisionTranslation({}),
  it: createDecisionTranslation({}),
  pt: createDecisionTranslation({}),
  ru: createDecisionTranslation({}),
  zh: createDecisionTranslation({}),
  ja: createDecisionTranslation({}),
  ko: createDecisionTranslation({}),
  hi: createDecisionTranslation({}),
  bn: createDecisionTranslation({}),
  tr: createDecisionTranslation({}),
  vi: createDecisionTranslation({}),
  th: createDecisionTranslation({}),
  id: createDecisionTranslation({}),
  ms: createDecisionTranslation({}),
  fa: createDecisionTranslation({}),
  ur: createDecisionTranslation({}),
  pl: createDecisionTranslation({}),
  uk: createDecisionTranslation({}),
  nl: createDecisionTranslation({}),
  sv: createDecisionTranslation({}),
  no: createDecisionTranslation({}),
  da: createDecisionTranslation({}),
  fi: createDecisionTranslation({}),
  el: createDecisionTranslation({}),
  he: createDecisionTranslation({}),
  cs: createDecisionTranslation({}),
  ro: createDecisionTranslation({}),
  hu: createDecisionTranslation({}),
  sk: createDecisionTranslation({}),
  bg: createDecisionTranslation({}),
  hr: createDecisionTranslation({}),
  sr: createDecisionTranslation({}),
  sl: createDecisionTranslation({}),
  lt: createDecisionTranslation({}),
  lv: createDecisionTranslation({}),
  et: createDecisionTranslation({}),
  sw: createDecisionTranslation({}),
  am: createDecisionTranslation({}),
  tl: createDecisionTranslation({}),
};

export const getDecisionTranslation = (
  decisionId: string,
  language: LanguageCode
): DecisionTranslation | undefined => {
  return decisionTranslations[language]?.[decisionId] || decisionTranslations.en[decisionId];
};
