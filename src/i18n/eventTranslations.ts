import { LanguageCode } from './translations';

export interface EventTranslation {
  title: string;
  description: string;
  choices: { [choiceId: string]: string };
  severityText?: string;
}

export interface EventTranslations {
  [eventId: string]: EventTranslation;
}

// Arabic translations (default)
const arEvents: EventTranslations = {
  // Natural Disasters
  earthquake: {
    title: '🌍 زلزال مدمر',
    description: 'زلزال قوي يضرب المنطقة الجنوبية! آلاف المباني تضررت والضحايا في تزايد.',
    choices: {
      full_response: 'إعلان حالة الطوارئ وتخصيص ميزانية ضخمة',
      moderate_response: 'إرسال فرق الإنقاذ مع مساعدات محدودة',
      request_international_aid: 'طلب مساعدات دولية',
    },
  },
  flood: {
    title: '🌊 فيضانات كارثية',
    description: 'أمطار غزيرة تسبب فيضانات في منطقة الساحل! المحاصيل دُمرت وآلاف السكان نزحوا.',
    choices: {
      evacuate_all: 'إجلاء شامل وبناء مخيمات مؤقتة',
      local_response: 'الاعتماد على الجهود المحلية',
    },
  },
  drought: {
    title: '☀️ موجة جفاف شديدة',
    description: 'جفاف حاد يضرب المناطق الزراعية! المحاصيل تموت والمزارعون يعانون.',
    choices: {
      emergency_irrigation: 'مشروع ري طوارئ ودعم المزارعين',
      import_food: 'استيراد الغذاء من الخارج',
      ration_water: 'تقنين المياه والاعتماد على المخزون',
    },
  },

  // Wars and Conflicts
  border_attack: {
    title: '⚔️ هجوم على الحدود',
    description: 'قوات مسلحة مجهولة تهاجم نقطة حدودية! سقوط ضحايا من الجيش.',
    choices: {
      counter_attack: 'شن هجوم مضاد فوري',
      defensive_stance: 'تعزيز الدفاعات وطلب تفسير',
      seek_ceasefire: 'السعي لوقف إطلاق نار',
    },
  },
  terrorist_attack: {
    title: '💥 هجوم إرهابي',
    description: 'تفجير في العاصمة يخلف ضحايا مدنيين! الرعب يجتاح البلاد.',
    choices: {
      security_crackdown: 'حملة أمنية واسعة واعتقالات',
      balanced_response: 'تحقيقات مع احترام الحريات',
      national_unity: 'خطاب وحدة وطنية ومساعدة الضحايا',
    },
  },
  civil_war_threat: {
    title: '🔥 تهديد بحرب أهلية',
    description: 'تصاعد التوترات بين الفصائل ينذر بحرب أهلية! المسلحون يتجمعون.',
    choices: {
      military_solution: 'سحق المسلحين بالقوة',
      peace_talks: 'مفاوضات سلام عاجلة',
      power_sharing: 'عرض مشاركة السلطة',
    },
  },

  // Epidemics
  disease_outbreak: {
    title: '🦠 تفشي وباء',
    description: 'مرض معدٍ ينتشر بسرعة! المستشفيات تمتلئ والذعر يسود.',
    choices: {
      total_lockdown: 'إغلاق تام وحجر صحي',
      targeted_measures: 'إجراءات مستهدفة في بؤر التفشي',
      herd_immunity: 'الاعتماد على المناعة الطبيعية',
    },
  },
  water_contamination: {
    title: '☠️ تلوث المياه',
    description: 'اكتشاف تلوث خطير في مصادر المياه! حالات تسمم في ازدياد.',
    choices: {
      emergency_water: 'توزيع مياه معبأة على الجميع',
      fix_infrastructure: 'إصلاح شبكة المياه بشكل عاجل',
      blame_others: 'تحميل المسؤولية للإدارات المحلية',
    },
  },

  // Political Events
  coup_attempt: {
    title: '🎖️ محاولة انقلاب',
    description: 'ضباط في الجيش يخططون لانقلاب! المخابرات كشفت المؤامرة.',
    choices: {
      purge_military: 'تطهير الجيش واعتقال المتورطين',
      quiet_removal: 'إقالة هادئة للمتورطين',
      negotiate_conspirators: 'التفاوض مع المتآمرين',
    },
  },
  corruption_scandal: {
    title: '💰 فضيحة فساد',
    description: 'وسائل الإعلام تكشف فضيحة فساد كبرى تطال مسؤولين كبار!',
    choices: {
      full_investigation: 'تحقيق شامل ومحاكمة المتورطين',
      limited_action: 'إجراءات محدودة وتشكيل لجنة',
      cover_up: 'التستر على الفضيحة',
    },
  },

  // Economic Events
  stock_market_crash: {
    title: '📉 انهيار البورصة',
    description: 'سوق الأسهم ينهار! الشركات تفلس والبطالة ترتفع.',
    choices: {
      bailout: 'إنقاذ الشركات الكبرى بأموال الدولة',
      stimulus: 'حزمة تحفيز للمواطنين والشركات الصغيرة',
      let_market: 'ترك السوق يصحح نفسه',
    },
  },
  oil_crisis: {
    title: '🛢️ أزمة نفطية',
    description: 'أسعار النفط تنهار عالمياً! إيرادات الدولة تتراجع بشدة.',
    choices: {
      diversify_economy: 'خطة تنويع اقتصادي عاجلة',
      cut_spending: 'تقشف وخفض الإنفاق الحكومي',
      borrow_money: 'الاقتراض من صناديق دولية',
    },
  },

  // Social Events
  mass_strike: {
    title: '🪧 إضراب عام',
    description: 'العمال يعلنون إضراباً عاماً! المرافق الحيوية تتوقف.',
    choices: {
      meet_demands: 'الاستجابة لمطالب العمال',
      negotiate: 'التفاوض على حل وسط',
      break_strike: 'فض الإضراب بالقوة',
    },
  },
  refugee_crisis: {
    title: '🏃 أزمة لاجئين',
    description: 'آلاف اللاجئين يتدفقون عبر الحدود هرباً من صراع في دولة مجاورة!',
    choices: {
      open_borders: 'فتح الحدود وإنشاء مخيمات',
      limited_entry: 'قبول عدد محدود فقط',
      close_borders: 'إغلاق الحدود تماماً',
    },
  },
};

// English translations
const enEvents: EventTranslations = {
  earthquake: {
    title: '🌍 Devastating Earthquake',
    description: 'A powerful earthquake strikes the southern region! Thousands of buildings damaged and casualties rising.',
    choices: {
      full_response: 'Declare emergency and allocate massive budget',
      moderate_response: 'Send rescue teams with limited aid',
      request_international_aid: 'Request international assistance',
    },
  },
  flood: {
    title: '🌊 Catastrophic Floods',
    description: 'Heavy rains cause flooding in the coastal region! Crops destroyed and thousands displaced.',
    choices: {
      evacuate_all: 'Full evacuation and temporary camps',
      local_response: 'Rely on local efforts',
    },
  },
  drought: {
    title: '☀️ Severe Drought',
    description: 'Severe drought hits agricultural areas! Crops dying and farmers suffering.',
    choices: {
      emergency_irrigation: 'Emergency irrigation project and farmer support',
      import_food: 'Import food from abroad',
      ration_water: 'Ration water and rely on reserves',
    },
  },
  border_attack: {
    title: '⚔️ Border Attack',
    description: 'Unknown armed forces attack a border post! Army casualties reported.',
    choices: {
      counter_attack: 'Launch immediate counter-attack',
      defensive_stance: 'Strengthen defenses and demand explanation',
      seek_ceasefire: 'Seek a ceasefire',
    },
  },
  terrorist_attack: {
    title: '💥 Terrorist Attack',
    description: 'Explosion in the capital leaves civilian casualties! Terror grips the nation.',
    choices: {
      security_crackdown: 'Extensive security campaign and arrests',
      balanced_response: 'Investigations while respecting freedoms',
      national_unity: 'National unity speech and victim assistance',
    },
  },
  civil_war_threat: {
    title: '🔥 Civil War Threat',
    description: 'Escalating tensions between factions threaten civil war! Armed groups gathering.',
    choices: {
      military_solution: 'Crush the armed groups by force',
      peace_talks: 'Urgent peace negotiations',
      power_sharing: 'Offer power sharing',
    },
  },
  disease_outbreak: {
    title: '🦠 Disease Outbreak',
    description: 'An infectious disease spreads rapidly! Hospitals overwhelmed and panic ensues.',
    choices: {
      total_lockdown: 'Total lockdown and quarantine',
      targeted_measures: 'Targeted measures in outbreak hotspots',
      herd_immunity: 'Rely on natural immunity',
    },
  },
  water_contamination: {
    title: '☠️ Water Contamination',
    description: 'Serious contamination discovered in water sources! Poisoning cases increasing.',
    choices: {
      emergency_water: 'Distribute bottled water to everyone',
      fix_infrastructure: 'Urgently repair water network',
      blame_others: 'Blame local administrations',
    },
  },
  coup_attempt: {
    title: '🎖️ Coup Attempt',
    description: 'Army officers plotting a coup! Intelligence has uncovered the conspiracy.',
    choices: {
      purge_military: 'Purge the army and arrest conspirators',
      quiet_removal: 'Quietly remove those involved',
      negotiate_conspirators: 'Negotiate with conspirators',
    },
  },
  corruption_scandal: {
    title: '💰 Corruption Scandal',
    description: 'Media exposes major corruption scandal involving top officials!',
    choices: {
      full_investigation: 'Full investigation and prosecution',
      limited_action: 'Limited action and form committee',
      cover_up: 'Cover up the scandal',
    },
  },
  stock_market_crash: {
    title: '📉 Stock Market Crash',
    description: 'Stock market collapses! Companies going bankrupt and unemployment rising.',
    choices: {
      bailout: 'Bail out major corporations with state funds',
      stimulus: 'Stimulus package for citizens and small businesses',
      let_market: 'Let the market correct itself',
    },
  },
  oil_crisis: {
    title: '🛢️ Oil Crisis',
    description: 'Oil prices collapse globally! State revenues plummeting.',
    choices: {
      diversify_economy: 'Urgent economic diversification plan',
      cut_spending: 'Austerity and cut government spending',
      borrow_money: 'Borrow from international funds',
    },
  },
  mass_strike: {
    title: '🪧 General Strike',
    description: 'Workers declare a general strike! Vital facilities shutting down.',
    choices: {
      meet_demands: 'Meet workers\' demands',
      negotiate: 'Negotiate a compromise',
      break_strike: 'Break the strike by force',
    },
  },
  refugee_crisis: {
    title: '🏃 Refugee Crisis',
    description: 'Thousands of refugees flood across the border fleeing conflict in a neighboring country!',
    choices: {
      open_borders: 'Open borders and establish camps',
      limited_entry: 'Accept limited numbers only',
      close_borders: 'Close borders completely',
    },
  },
};

// Spanish translations
const esEvents: EventTranslations = {
  earthquake: {
    title: '🌍 Terremoto Devastador',
    description: '¡Un poderoso terremoto golpea la región sur! Miles de edificios dañados y víctimas en aumento.',
    choices: {
      full_response: 'Declarar emergencia y asignar presupuesto masivo',
      moderate_response: 'Enviar equipos de rescate con ayuda limitada',
      request_international_aid: 'Solicitar asistencia internacional',
    },
  },
  flood: {
    title: '🌊 Inundaciones Catastróficas',
    description: '¡Lluvias intensas causan inundaciones en la región costera! Cultivos destruidos y miles desplazados.',
    choices: {
      evacuate_all: 'Evacuación total y campamentos temporales',
      local_response: 'Confiar en esfuerzos locales',
    },
  },
  drought: {
    title: '☀️ Sequía Severa',
    description: '¡Sequía severa golpea áreas agrícolas! Cultivos muriendo y agricultores sufriendo.',
    choices: {
      emergency_irrigation: 'Proyecto de riego de emergencia y apoyo a agricultores',
      import_food: 'Importar alimentos del extranjero',
      ration_water: 'Racionar agua y depender de reservas',
    },
  },
  border_attack: {
    title: '⚔️ Ataque Fronterizo',
    description: '¡Fuerzas armadas desconocidas atacan un puesto fronterizo! Bajas militares reportadas.',
    choices: {
      counter_attack: 'Lanzar contraataque inmediato',
      defensive_stance: 'Fortalecer defensas y exigir explicación',
      seek_ceasefire: 'Buscar un alto el fuego',
    },
  },
  terrorist_attack: {
    title: '💥 Ataque Terrorista',
    description: '¡Explosión en la capital deja víctimas civiles! El terror se apodera de la nación.',
    choices: {
      security_crackdown: 'Campaña de seguridad extensiva y arrestos',
      balanced_response: 'Investigaciones respetando libertades',
      national_unity: 'Discurso de unidad nacional y asistencia a víctimas',
    },
  },
  civil_war_threat: {
    title: '🔥 Amenaza de Guerra Civil',
    description: '¡Tensiones crecientes entre facciones amenazan guerra civil! Grupos armados reuniéndose.',
    choices: {
      military_solution: 'Aplastar grupos armados por la fuerza',
      peace_talks: 'Negociaciones de paz urgentes',
      power_sharing: 'Ofrecer compartir el poder',
    },
  },
  disease_outbreak: {
    title: '🦠 Brote de Enfermedad',
    description: '¡Una enfermedad infecciosa se propaga rápidamente! Hospitales saturados y pánico.',
    choices: {
      total_lockdown: 'Confinamiento total y cuarentena',
      targeted_measures: 'Medidas focalizadas en focos de brote',
      herd_immunity: 'Depender de inmunidad natural',
    },
  },
  water_contamination: {
    title: '☠️ Contaminación del Agua',
    description: '¡Contaminación grave descubierta en fuentes de agua! Casos de envenenamiento aumentando.',
    choices: {
      emergency_water: 'Distribuir agua embotellada a todos',
      fix_infrastructure: 'Reparar urgentemente red de agua',
      blame_others: 'Culpar a administraciones locales',
    },
  },
  coup_attempt: {
    title: '🎖️ Intento de Golpe',
    description: '¡Oficiales del ejército planean un golpe! Inteligencia ha descubierto la conspiración.',
    choices: {
      purge_military: 'Purgar el ejército y arrestar conspiradores',
      quiet_removal: 'Remover discretamente a los involucrados',
      negotiate_conspirators: 'Negociar con conspiradores',
    },
  },
  corruption_scandal: {
    title: '💰 Escándalo de Corrupción',
    description: '¡Medios exponen escándalo de corrupción involucrando altos funcionarios!',
    choices: {
      full_investigation: 'Investigación completa y enjuiciamiento',
      limited_action: 'Acción limitada y formar comité',
      cover_up: 'Encubrir el escándalo',
    },
  },
  stock_market_crash: {
    title: '📉 Colapso Bursátil',
    description: '¡El mercado de valores colapsa! Empresas en bancarrota y desempleo creciendo.',
    choices: {
      bailout: 'Rescatar grandes corporaciones con fondos estatales',
      stimulus: 'Paquete de estímulo para ciudadanos y pequeñas empresas',
      let_market: 'Dejar que el mercado se corrija solo',
    },
  },
  oil_crisis: {
    title: '🛢️ Crisis Petrolera',
    description: '¡Precios del petróleo colapsan globalmente! Ingresos estatales desplomándose.',
    choices: {
      diversify_economy: 'Plan urgente de diversificación económica',
      cut_spending: 'Austeridad y recortar gasto gubernamental',
      borrow_money: 'Pedir préstamos a fondos internacionales',
    },
  },
  mass_strike: {
    title: '🪧 Huelga General',
    description: '¡Trabajadores declaran huelga general! Instalaciones vitales cerrando.',
    choices: {
      meet_demands: 'Satisfacer demandas de trabajadores',
      negotiate: 'Negociar un compromiso',
      break_strike: 'Romper la huelga por la fuerza',
    },
  },
  refugee_crisis: {
    title: '🏃 Crisis de Refugiados',
    description: '¡Miles de refugiados cruzan la frontera huyendo de conflicto en país vecino!',
    choices: {
      open_borders: 'Abrir fronteras y establecer campamentos',
      limited_entry: 'Aceptar solo números limitados',
      close_borders: 'Cerrar fronteras completamente',
    },
  },
};

// French translations
const frEvents: EventTranslations = {
  earthquake: {
    title: '🌍 Tremblement de Terre Dévastateur',
    description: 'Un puissant séisme frappe la région sud! Des milliers de bâtiments endommagés.',
    choices: {
      full_response: 'Déclarer l\'urgence et allouer un budget massif',
      moderate_response: 'Envoyer des équipes de secours avec aide limitée',
      request_international_aid: 'Demander l\'assistance internationale',
    },
  },
  flood: {
    title: '🌊 Inondations Catastrophiques',
    description: 'Des pluies torrentielles causent des inondations! Récoltes détruites et milliers déplacés.',
    choices: {
      evacuate_all: 'Évacuation totale et camps temporaires',
      local_response: 'Compter sur les efforts locaux',
    },
  },
  drought: {
    title: '☀️ Sécheresse Sévère',
    description: 'Une sécheresse sévère frappe les zones agricoles! Récoltes mourantes.',
    choices: {
      emergency_irrigation: 'Projet d\'irrigation d\'urgence et soutien aux agriculteurs',
      import_food: 'Importer de la nourriture de l\'étranger',
      ration_water: 'Rationner l\'eau et compter sur les réserves',
    },
  },
  border_attack: {
    title: '⚔️ Attaque Frontalière',
    description: 'Des forces armées inconnues attaquent un poste frontière! Victimes militaires signalées.',
    choices: {
      counter_attack: 'Lancer une contre-attaque immédiate',
      defensive_stance: 'Renforcer les défenses et exiger des explications',
      seek_ceasefire: 'Rechercher un cessez-le-feu',
    },
  },
  terrorist_attack: {
    title: '💥 Attaque Terroriste',
    description: 'Une explosion dans la capitale fait des victimes civiles! La terreur saisit la nation.',
    choices: {
      security_crackdown: 'Campagne de sécurité étendue et arrestations',
      balanced_response: 'Enquêtes en respectant les libertés',
      national_unity: 'Discours d\'unité nationale et aide aux victimes',
    },
  },
  civil_war_threat: {
    title: '🔥 Menace de Guerre Civile',
    description: 'Les tensions entre factions menacent une guerre civile! Groupes armés se rassemblent.',
    choices: {
      military_solution: 'Écraser les groupes armés par la force',
      peace_talks: 'Négociations de paix urgentes',
      power_sharing: 'Offrir le partage du pouvoir',
    },
  },
  disease_outbreak: {
    title: '🦠 Épidémie',
    description: 'Une maladie infectieuse se propage rapidement! Hôpitaux débordés et panique.',
    choices: {
      total_lockdown: 'Confinement total et quarantaine',
      targeted_measures: 'Mesures ciblées dans les foyers d\'épidémie',
      herd_immunity: 'Compter sur l\'immunité naturelle',
    },
  },
  water_contamination: {
    title: '☠️ Contamination de l\'Eau',
    description: 'Contamination grave découverte dans les sources d\'eau! Cas d\'empoisonnement en hausse.',
    choices: {
      emergency_water: 'Distribuer de l\'eau en bouteille à tous',
      fix_infrastructure: 'Réparer d\'urgence le réseau d\'eau',
      blame_others: 'Blâmer les administrations locales',
    },
  },
  coup_attempt: {
    title: '🎖️ Tentative de Coup d\'État',
    description: 'Des officiers de l\'armée complotent un coup! Les renseignements ont découvert le complot.',
    choices: {
      purge_military: 'Purger l\'armée et arrêter les conspirateurs',
      quiet_removal: 'Retirer discrètement les impliqués',
      negotiate_conspirators: 'Négocier avec les conspirateurs',
    },
  },
  corruption_scandal: {
    title: '💰 Scandale de Corruption',
    description: 'Les médias révèlent un scandale de corruption impliquant de hauts responsables!',
    choices: {
      full_investigation: 'Enquête complète et poursuites',
      limited_action: 'Action limitée et formation d\'un comité',
      cover_up: 'Étouffer le scandale',
    },
  },
  stock_market_crash: {
    title: '📉 Effondrement Boursier',
    description: 'Le marché boursier s\'effondre! Entreprises en faillite et chômage en hausse.',
    choices: {
      bailout: 'Renflouer les grandes entreprises avec des fonds publics',
      stimulus: 'Plan de relance pour citoyens et petites entreprises',
      let_market: 'Laisser le marché se corriger',
    },
  },
  oil_crisis: {
    title: '🛢️ Crise Pétrolière',
    description: 'Les prix du pétrole s\'effondrent mondialement! Revenus de l\'État en chute.',
    choices: {
      diversify_economy: 'Plan urgent de diversification économique',
      cut_spending: 'Austérité et réduction des dépenses gouvernementales',
      borrow_money: 'Emprunter auprès de fonds internationaux',
    },
  },
  mass_strike: {
    title: '🪧 Grève Générale',
    description: 'Les travailleurs déclarent une grève générale! Installations vitales à l\'arrêt.',
    choices: {
      meet_demands: 'Satisfaire les demandes des travailleurs',
      negotiate: 'Négocier un compromis',
      break_strike: 'Briser la grève par la force',
    },
  },
  refugee_crisis: {
    title: '🏃 Crise des Réfugiés',
    description: 'Des milliers de réfugiés affluent à travers la frontière fuyant un conflit voisin!',
    choices: {
      open_borders: 'Ouvrir les frontières et établir des camps',
      limited_entry: 'Accepter un nombre limité seulement',
      close_borders: 'Fermer complètement les frontières',
    },
  },
};

// Severity text translations
export const severityTranslations: Record<LanguageCode, Record<string, string>> = {
  ar: { critical: 'حرج!', high: 'خطير', medium: 'متوسط', low: 'بسيط' },
  en: { critical: 'Critical!', high: 'High', medium: 'Medium', low: 'Low' },
  es: { critical: '¡Crítico!', high: 'Alto', medium: 'Medio', low: 'Bajo' },
  fr: { critical: 'Critique!', high: 'Élevé', medium: 'Moyen', low: 'Faible' },
  de: { critical: 'Kritisch!', high: 'Hoch', medium: 'Mittel', low: 'Niedrig' },
  it: { critical: 'Critico!', high: 'Alto', medium: 'Medio', low: 'Basso' },
  pt: { critical: 'Crítico!', high: 'Alto', medium: 'Médio', low: 'Baixo' },
  ru: { critical: 'Критический!', high: 'Высокий', medium: 'Средний', low: 'Низкий' },
  zh: { critical: '危急!', high: '高', medium: '中', low: '低' },
  ja: { critical: '危機的!', high: '高', medium: '中', low: '低' },
  ko: { critical: '위기!', high: '높음', medium: '보통', low: '낮음' },
  hi: { critical: 'गंभीर!', high: 'उच्च', medium: 'मध्यम', low: 'निम्न' },
  bn: { critical: 'সংকটপূর্ণ!', high: 'উচ্চ', medium: 'মাঝারি', low: 'নিম্ন' },
  tr: { critical: 'Kritik!', high: 'Yüksek', medium: 'Orta', low: 'Düşük' },
  vi: { critical: 'Nguy cấp!', high: 'Cao', medium: 'Trung bình', low: 'Thấp' },
  th: { critical: 'วิกฤต!', high: 'สูง', medium: 'ปานกลาง', low: 'ต่ำ' },
  id: { critical: 'Kritis!', high: 'Tinggi', medium: 'Sedang', low: 'Rendah' },
  ms: { critical: 'Kritikal!', high: 'Tinggi', medium: 'Sederhana', low: 'Rendah' },
  fa: { critical: 'بحرانی!', high: 'بالا', medium: 'متوسط', low: 'پایین' },
  ur: { critical: 'نازک!', high: 'زیادہ', medium: 'درمیانہ', low: 'کم' },
  pl: { critical: 'Krytyczny!', high: 'Wysoki', medium: 'Średni', low: 'Niski' },
  uk: { critical: 'Критичний!', high: 'Високий', medium: 'Середній', low: 'Низький' },
  nl: { critical: 'Kritiek!', high: 'Hoog', medium: 'Gemiddeld', low: 'Laag' },
  sv: { critical: 'Kritisk!', high: 'Hög', medium: 'Medel', low: 'Låg' },
  no: { critical: 'Kritisk!', high: 'Høy', medium: 'Middels', low: 'Lav' },
  da: { critical: 'Kritisk!', high: 'Høj', medium: 'Middel', low: 'Lav' },
  fi: { critical: 'Kriittinen!', high: 'Korkea', medium: 'Keskitaso', low: 'Matala' },
  el: { critical: 'Κρίσιμο!', high: 'Υψηλό', medium: 'Μέτριο', low: 'Χαμηλό' },
  he: { critical: 'קריטי!', high: 'גבוה', medium: 'בינוני', low: 'נמוך' },
  cs: { critical: 'Kritický!', high: 'Vysoký', medium: 'Střední', low: 'Nízký' },
  ro: { critical: 'Critic!', high: 'Înalt', medium: 'Mediu', low: 'Scăzut' },
  hu: { critical: 'Kritikus!', high: 'Magas', medium: 'Közepes', low: 'Alacsony' },
  sk: { critical: 'Kritický!', high: 'Vysoký', medium: 'Stredný', low: 'Nízky' },
  bg: { critical: 'Критичен!', high: 'Висок', medium: 'Среден', low: 'Нисък' },
  hr: { critical: 'Kritičan!', high: 'Visok', medium: 'Srednji', low: 'Nizak' },
  sr: { critical: 'Критичан!', high: 'Висок', medium: 'Средњи', low: 'Низак' },
  sl: { critical: 'Kritično!', high: 'Visoko', medium: 'Srednje', low: 'Nizko' },
  lt: { critical: 'Kritinis!', high: 'Aukštas', medium: 'Vidutinis', low: 'Žemas' },
  lv: { critical: 'Kritisks!', high: 'Augsts', medium: 'Vidējs', low: 'Zems' },
  et: { critical: 'Kriitiline!', high: 'Kõrge', medium: 'Keskmine', low: 'Madal' },
  sw: { critical: 'Muhimu!', high: 'Juu', medium: 'Wastani', low: 'Chini' },
  am: { critical: 'ወሳኝ!', high: 'ከፍተኛ', medium: 'መካከለኛ', low: 'ዝቅተኛ' },
  tl: { critical: 'Kritikal!', high: 'Mataas', medium: 'Katamtaman', low: 'Mababa' },
};

// Create default translations for other languages (fallback to English)
const createEventTranslation = (overrides: Partial<EventTranslations>): EventTranslations => ({
  ...enEvents,
  ...overrides,
});

export const eventTranslations: Record<LanguageCode, EventTranslations> = {
  ar: arEvents,
  en: enEvents,
  es: esEvents,
  fr: frEvents,
  de: createEventTranslation({}),
  it: createEventTranslation({}),
  pt: createEventTranslation({}),
  ru: createEventTranslation({}),
  zh: createEventTranslation({}),
  ja: createEventTranslation({}),
  ko: createEventTranslation({}),
  hi: createEventTranslation({}),
  bn: createEventTranslation({}),
  tr: createEventTranslation({}),
  vi: createEventTranslation({}),
  th: createEventTranslation({}),
  id: createEventTranslation({}),
  ms: createEventTranslation({}),
  fa: createEventTranslation({}),
  ur: createEventTranslation({}),
  pl: createEventTranslation({}),
  uk: createEventTranslation({}),
  nl: createEventTranslation({}),
  sv: createEventTranslation({}),
  no: createEventTranslation({}),
  da: createEventTranslation({}),
  fi: createEventTranslation({}),
  el: createEventTranslation({}),
  he: createEventTranslation({}),
  cs: createEventTranslation({}),
  ro: createEventTranslation({}),
  hu: createEventTranslation({}),
  sk: createEventTranslation({}),
  bg: createEventTranslation({}),
  hr: createEventTranslation({}),
  sr: createEventTranslation({}),
  sl: createEventTranslation({}),
  lt: createEventTranslation({}),
  lv: createEventTranslation({}),
  et: createEventTranslation({}),
  sw: createEventTranslation({}),
  am: createEventTranslation({}),
  tl: createEventTranslation({}),
};

export const getEventTranslation = (
  eventId: string,
  language: LanguageCode
): EventTranslation | undefined => {
  return eventTranslations[language]?.[eventId] || eventTranslations.en[eventId];
};

export const getSeverityText = (
  severity: string,
  language: LanguageCode
): string => {
  return severityTranslations[language]?.[severity] || severityTranslations.en[severity] || severity;
};
