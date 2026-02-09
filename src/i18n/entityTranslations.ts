import { LanguageCode } from './translations';

// Region name translations by region ID
const regionNames: Record<string, Record<string, string>> = {
  capital: {
    ar: 'العاصمة', en: 'The Capital', es: 'La Capital', fr: 'La Capitale', de: 'Die Hauptstadt',
    it: 'La Capitale', pt: 'A Capital', ru: 'Столица', zh: '首都', ja: '首都',
    ko: '수도', hi: 'राजधानी', tr: 'Başkent', fa: 'پایتخت', ur: 'دارالحکومت',
    he: 'הבירה', pl: 'Stolica', uk: 'Столиця', nl: 'De Hoofdstad', sv: 'Huvudstaden',
    no: 'Hovedstaden', da: 'Hovedstaden', fi: 'Pääkaupunki', el: 'Πρωτεύουσα',
  },
  north: {
    ar: 'الشمال', en: 'The North', es: 'El Norte', fr: 'Le Nord', de: 'Der Norden',
    it: 'Il Nord', pt: 'O Norte', ru: 'Север', zh: '北部', ja: '北部',
    ko: '북부', hi: 'उत्तर', tr: 'Kuzey', fa: 'شمال', ur: 'شمال',
    he: 'הצפון', pl: 'Północ', uk: 'Північ', nl: 'Het Noorden', sv: 'Norr',
    no: 'Nord', da: 'Nord', fi: 'Pohjoinen', el: 'Βορράς',
  },
  south: {
    ar: 'الجنوب', en: 'The South', es: 'El Sur', fr: 'Le Sud', de: 'Der Süden',
    it: 'Il Sud', pt: 'O Sul', ru: 'Юг', zh: '南部', ja: '南部',
    ko: '남부', hi: 'दक्षिण', tr: 'Güney', fa: 'جنوب', ur: 'جنوب',
    he: 'הדרום', pl: 'Południe', uk: 'Південь', nl: 'Het Zuiden', sv: 'Söder',
    no: 'Sør', da: 'Syd', fi: 'Etelä', el: 'Νότος',
  },
  east: {
    ar: 'الشرق', en: 'The East', es: 'El Este', fr: "L'Est", de: 'Der Osten',
    it: "L'Est", pt: 'O Leste', ru: 'Восток', zh: '东部', ja: '東部',
    ko: '동부', hi: 'पूर्व', tr: 'Doğu', fa: 'شرق', ur: 'مشرق',
    he: 'המזרח', pl: 'Wschód', uk: 'Схід', nl: 'Het Oosten', sv: 'Öster',
    no: 'Øst', da: 'Øst', fi: 'Itä', el: 'Ανατολή',
  },
  west: {
    ar: 'الغرب', en: 'The West', es: 'El Oeste', fr: "L'Ouest", de: 'Der Westen',
    it: "L'Ovest", pt: 'O Oeste', ru: 'Запад', zh: '西部', ja: '西部',
    ko: '서부', hi: 'पश्चिम', tr: 'Batı', fa: 'غرب', ur: 'مغرب',
    he: 'המערב', pl: 'Zachód', uk: 'Захід', nl: 'Het Westen', sv: 'Väster',
    no: 'Vest', da: 'Vest', fi: 'Länsi', el: 'Δύση',
  },
  coast: {
    ar: 'الساحل', en: 'The Coast', es: 'La Costa', fr: 'La Côte', de: 'Die Küste',
    it: 'La Costa', pt: 'O Litoral', ru: 'Побережье', zh: '海岸', ja: '沿岸',
    ko: '해안', hi: 'तट', tr: 'Sahil', fa: 'ساحل', ur: 'ساحل',
    he: 'החוף', pl: 'Wybrzeże', uk: 'Узбережжя', nl: 'De Kust', sv: 'Kusten',
    no: 'Kysten', da: 'Kysten', fi: 'Rannikko', el: 'Ακτή',
  },
};

// Faction name translations by faction ID
const factionNames: Record<string, Record<string, string>> = {
  military_faction: {
    ar: 'المؤسسة العسكرية', en: 'Military Establishment', es: 'Establishment Militar', fr: 'Establishment Militaire', de: 'Militärapparat',
    it: 'Establishment Militare', pt: 'Establishment Militar', ru: 'Военный истеблишмент', zh: '军方', ja: '軍部',
    ko: '군부', hi: 'सैन्य प्रतिष्ठान', tr: 'Askeri Kurum', fa: 'نهاد نظامی', ur: 'فوجی ادارہ',
    he: 'הממסד הצבאי', pl: 'Wojsko', uk: 'Військовий апарат', nl: 'Militair Establishment', sv: 'Militären',
  },
  business: {
    ar: 'رجال الأعمال', en: 'Business Leaders', es: 'Líderes Empresariales', fr: "Chefs d'Entreprise", de: 'Wirtschaftsführer',
    it: 'Leader Aziendali', pt: 'Líderes Empresariais', ru: 'Бизнес-лидеры', zh: '商界领袖', ja: '財界',
    ko: '재계', hi: 'व्यापार नेता', tr: 'İş Liderleri', fa: 'رهبران تجارت', ur: 'تاجر برادری',
    he: 'מנהיגי עסקים', pl: 'Liderzy Biznesu', uk: 'Бізнес-лідери', nl: 'Bedrijfsleiders', sv: 'Näringslivet',
  },
  religious: {
    ar: 'المؤسسة الدينية', en: 'Religious Institution', es: 'Institución Religiosa', fr: 'Institution Religieuse', de: 'Religiöse Institution',
    it: 'Istituzione Religiosa', pt: 'Instituição Religiosa', ru: 'Религиозный институт', zh: '宗教机构', ja: '宗教組織',
    ko: '종교 기관', hi: 'धार्मिक संस्था', tr: 'Dini Kurum', fa: 'نهاد مذهبی', ur: 'مذہبی ادارہ',
    he: 'הממסד הדתי', pl: 'Instytucja Religijna', uk: 'Релігійна установа', nl: 'Religieuze Instelling', sv: 'Religiösa Institutionen',
  },
  labor: {
    ar: 'نقابات العمال', en: 'Labor Unions', es: 'Sindicatos', fr: 'Syndicats', de: 'Gewerkschaften',
    it: 'Sindacati', pt: 'Sindicatos', ru: 'Профсоюзы', zh: '工会', ja: '労働組合',
    ko: '노동 조합', hi: 'श्रमिक संघ', tr: 'İşçi Sendikaları', fa: 'اتحادیه‌های کارگری', ur: 'مزدور یونین',
    he: 'איגודי עובדים', pl: 'Związki Zawodowe', uk: 'Профспілки', nl: 'Vakbonden', sv: 'Fackföreningar',
  },
  intellectuals: {
    ar: 'المثقفون والأكاديميون', en: 'Intellectuals & Academics', es: 'Intelectuales y Académicos', fr: 'Intellectuels et Universitaires', de: 'Intellektuelle & Akademiker',
    it: 'Intellettuali e Accademici', pt: 'Intelectuais e Acadêmicos', ru: 'Интеллигенция', zh: '知识分子', ja: '知識人',
    ko: '지식인', hi: 'बुद्धिजीवी', tr: 'Aydınlar ve Akademisyenler', fa: 'روشنفکران', ur: 'دانشور',
    he: 'אינטלקטואלים', pl: 'Intelektualiści', uk: 'Інтелігенція', nl: 'Intellectuelen', sv: 'Intellektuella',
  },
};

// Advisor name translations by advisor ID
const advisorNames: Record<string, Record<string, string>> = {
  economic: {
    ar: 'وزير المالية', en: 'Finance Minister', es: 'Ministro de Finanzas', fr: 'Ministre des Finances', de: 'Finanzminister',
    it: 'Ministro delle Finanze', pt: 'Ministro das Finanças', ru: 'Министр финансов', zh: '财政部长', ja: '財務大臣',
    ko: '재무장관', hi: 'वित्त मंत्री', tr: 'Maliye Bakanı', fa: 'وزیر دارایی', ur: 'وزیر خزانہ',
    he: 'שר האוצר', pl: 'Minister Finansów', uk: 'Міністр фінансів', nl: 'Minister van Financiën', sv: 'Finansminister',
  },
  military: {
    ar: 'وزير الدفاع', en: 'Defense Minister', es: 'Ministro de Defensa', fr: 'Ministre de la Défense', de: 'Verteidigungsminister',
    it: 'Ministro della Difesa', pt: 'Ministro da Defesa', ru: 'Министр обороны', zh: '国防部长', ja: '防衛大臣',
    ko: '국방장관', hi: 'रक्षा मंत्री', tr: 'Savunma Bakanı', fa: 'وزیر دفاع', ur: 'وزیر دفاع',
    he: 'שר הביטחון', pl: 'Minister Obrony', uk: 'Міністр оборони', nl: 'Minister van Defensie', sv: 'Försvarsminister',
  },
  diplomatic: {
    ar: 'وزير الخارجية', en: 'Foreign Affairs Minister', es: 'Ministro de Exteriores', fr: 'Ministre des Affaires Étrangères', de: 'Außenminister',
    it: 'Ministro degli Esteri', pt: 'Ministro das Relações Exteriores', ru: 'Министр иностранных дел', zh: '外交部长', ja: '外務大臣',
    ko: '외교장관', hi: 'विदेश मंत्री', tr: 'Dışişleri Bakanı', fa: 'وزیر خارجه', ur: 'وزیر خارجہ',
    he: 'שר החוץ', pl: 'Minister Spraw Zagranicznych', uk: 'Міністр закордонних справ', nl: 'Minister van Buitenlandse Zaken', sv: 'Utrikesminister',
  },
  internal: {
    ar: 'وزير الداخلية', en: 'Interior Minister', es: 'Ministro del Interior', fr: "Ministre de l'Intérieur", de: 'Innenminister',
    it: "Ministro dell'Interno", pt: 'Ministro do Interior', ru: 'Министр внутренних дел', zh: '内政部长', ja: '内務大臣',
    ko: '내무장관', hi: 'गृह मंत्री', tr: 'İçişleri Bakanı', fa: 'وزیر کشور', ur: 'وزیر داخلہ',
    he: 'שר הפנים', pl: 'Minister Spraw Wewnętrznych', uk: 'Міністр внутрішніх справ', nl: 'Minister van Binnenlandse Zaken', sv: 'Inrikesminister',
  },
};

// Victory condition translations
const victoryNames: Record<string, Record<string, { name: string; description: string }>> = {
  economic_victory: {
    ar: { name: 'الازدهار الاقتصادي', description: 'وصول الاقتصاد إلى 90+' },
    en: { name: 'Economic Prosperity', description: 'Reach Economy 90+' },
    es: { name: 'Prosperidad Económica', description: 'Alcanzar Economía 90+' },
    fr: { name: 'Prospérité Économique', description: "Atteindre l'Économie 90+" },
    de: { name: 'Wirtschaftlicher Wohlstand', description: 'Wirtschaft auf 90+ bringen' },
    ru: { name: 'Экономическое Процветание', description: 'Довести экономику до 90+' },
    zh: { name: '经济繁荣', description: '经济达到90+' },
    ja: { name: '経済的繁栄', description: '経済を90+に' },
    ko: { name: '경제 번영', description: '경제 90+ 달성' },
    tr: { name: 'Ekonomik Refah', description: 'Ekonomiyi 90+ yapın' },
  },
  military_victory: {
    ar: { name: 'القوة العسكرية', description: 'وصول القوة العسكرية إلى 90+' },
    en: { name: 'Military Power', description: 'Reach Military 90+' },
    es: { name: 'Poder Militar', description: 'Alcanzar Militar 90+' },
    fr: { name: 'Puissance Militaire', description: 'Atteindre Militaire 90+' },
    de: { name: 'Militärische Macht', description: 'Militär auf 90+ bringen' },
    ru: { name: 'Военная Мощь', description: 'Довести военную мощь до 90+' },
    zh: { name: '军事力量', description: '军事达到90+' },
    ja: { name: '軍事力', description: '軍事を90+に' },
    ko: { name: '군사력', description: '군사 90+ 달성' },
    tr: { name: 'Askeri Güç', description: 'Askeriyi 90+ yapın' },
  },
  diplomatic_victory: {
    ar: { name: 'الهيمنة الدبلوماسية', description: 'وصول الدبلوماسية إلى 90+' },
    en: { name: 'Diplomatic Dominance', description: 'Reach Diplomacy 90+' },
    es: { name: 'Dominio Diplomático', description: 'Alcanzar Diplomacia 90+' },
    fr: { name: 'Domination Diplomatique', description: 'Atteindre Diplomatie 90+' },
    de: { name: 'Diplomatische Vorherrschaft', description: 'Diplomatie auf 90+ bringen' },
    ru: { name: 'Дипломатическое Господство', description: 'Довести дипломатию до 90+' },
    zh: { name: '外交主导', description: '外交达到90+' },
    ja: { name: '外交的優位', description: '外交を90+に' },
    ko: { name: '외교 지배', description: '외교 90+ 달성' },
    tr: { name: 'Diplomatik Hakimiyet', description: 'Diplomasiyi 90+ yapın' },
  },
  popular_victory: {
    ar: { name: 'الزعيم المحبوب', description: 'وصول الشعبية إلى 95+' },
    en: { name: 'Beloved Leader', description: 'Reach Popularity 95+' },
    es: { name: 'Líder Amado', description: 'Alcanzar Popularidad 95+' },
    fr: { name: 'Leader Bien-Aimé', description: 'Atteindre Popularité 95+' },
    de: { name: 'Beliebter Anführer', description: 'Beliebtheit auf 95+ bringen' },
    ru: { name: 'Любимый Лидер', description: 'Довести популярность до 95+' },
    zh: { name: '人民爱戴的领袖', description: '人气达到95+' },
    ja: { name: '愛される指導者', description: '人気を95+に' },
    ko: { name: '사랑받는 지도자', description: '인기 95+ 달성' },
    tr: { name: 'Sevilen Lider', description: 'Popüleriteyi 95+ yapın' },
  },
};

// Game over reason translations
const gameOverReasons: Record<string, Record<string, string>> = {
  economy_collapse: {
    ar: 'انهار الاقتصاد! أصبحت البلاد مفلسة.',
    en: 'The economy collapsed! The country is bankrupt.',
    es: '¡La economía colapsó! El país está en bancarrota.',
    fr: "L'économie s'est effondrée ! Le pays est en faillite.",
    de: 'Die Wirtschaft ist zusammengebrochen! Das Land ist bankrott.',
    ru: 'Экономика рухнула! Страна обанкротилась.',
    zh: '经济崩溃！国家破产了。',
    ja: '経済が崩壊！国が破産しました。',
    ko: '경제 붕괴! 나라가 파산했습니다.',
    tr: 'Ekonomi çöktü! Ülke iflas etti.',
  },
  military_collapse: {
    ar: 'انهار الجيش! تم غزو البلاد.',
    en: 'The military collapsed! The country was invaded.',
    es: '¡El ejército colapsó! El país fue invadido.',
    fr: "L'armée s'est effondrée ! Le pays a été envahi.",
    de: 'Das Militär ist zusammengebrochen! Das Land wurde überfallen.',
    ru: 'Армия рухнула! Страна была оккупирована.',
    zh: '军队崩溃！国家被入侵了。',
    ja: '軍が崩壊！国が侵略されました。',
    ko: '군대 붕괴! 나라가 침략당했습니다.',
    tr: 'Ordu çöktü! Ülke işgal edildi.',
  },
  revolution: {
    ar: 'ثورة شعبية! تم عزلك من منصبك.',
    en: 'Popular revolution! You were removed from office.',
    es: '¡Revolución popular! Fuiste destituido.',
    fr: 'Révolution populaire ! Vous avez été destitué.',
    de: 'Volksrevolution! Sie wurden abgesetzt.',
    ru: 'Народная революция! Вас сместили с поста.',
    zh: '人民革命！你被撤职了。',
    ja: '民衆革命！あなたは解任されました。',
    ko: '민중 혁명! 당신은 해임되었습니다.',
    tr: 'Halk devrimi! Görevden alındınız.',
  },
  isolation: {
    ar: 'عزلة دولية! فرضت عقوبات قاتلة على البلاد.',
    en: 'International isolation! Devastating sanctions imposed.',
    es: '¡Aislamiento internacional! Se impusieron sanciones devastadoras.',
    fr: 'Isolement international ! Des sanctions dévastatrices imposées.',
    de: 'Internationale Isolation! Verheerende Sanktionen verhängt.',
    ru: 'Международная изоляция! Наложены разрушительные санкции.',
    zh: '国际孤立！遭受毁灭性制裁。',
    ja: '国際的孤立！壊滅的な制裁を受けました。',
    ko: '국제 고립! 파괴적인 제재가 부과되었습니다.',
    tr: 'Uluslararası izolasyon! Yıkıcı yaptırımlar uygulandı.',
  },
  bankruptcy: {
    ar: 'إفلاس تام! لم تستطع البلاد سداد ديونها.',
    en: 'Total bankruptcy! The country cannot pay its debts.',
    es: '¡Bancarrota total! El país no puede pagar sus deudas.',
    fr: 'Faillite totale ! Le pays ne peut pas payer ses dettes.',
    de: 'Totaler Bankrott! Das Land kann seine Schulden nicht bezahlen.',
    ru: 'Полное банкротство! Страна не может выплатить долги.',
    zh: '完全破产！国家无法偿还债务。',
    ja: '完全破産！国が債務を支払えません。',
    ko: '완전 파산! 나라가 빚을 갚을 수 없습니다.',
    tr: 'Tam iflas! Ülke borçlarını ödeyemiyor.',
  },
  coup: {
    ar: 'انقلاب عسكري! الجيش أطاح بك من السلطة.',
    en: 'Military coup! The army overthrew you.',
    es: '¡Golpe militar! El ejército te derrocó.',
    fr: "Coup d'état militaire ! L'armée vous a renversé.",
    de: 'Militärputsch! Die Armee hat Sie gestürzt.',
    ru: 'Военный переворот! Армия свергла вас.',
    zh: '军事政变！军队推翻了你。',
    ja: '軍事クーデター！軍があなたを倒しました。',
    ko: '군사 쿠데타! 군대가 당신을 전복시켰습니다.',
    tr: 'Askeri darbe! Ordu sizi devirdi.',
  },
};

export const getRegionName = (regionId: string, lang: LanguageCode): string => {
  return regionNames[regionId]?.[lang] || regionNames[regionId]?.en || regionId;
};

export const getFactionName = (factionId: string, lang: LanguageCode): string => {
  return factionNames[factionId]?.[lang] || factionNames[factionId]?.en || factionId;
};

export const getAdvisorName = (advisorId: string, lang: LanguageCode): string => {
  return advisorNames[advisorId]?.[lang] || advisorNames[advisorId]?.en || advisorId;
};

export const getVictoryName = (victoryId: string, lang: LanguageCode): { name: string; description: string } => {
  return victoryNames[victoryId]?.[lang] || victoryNames[victoryId]?.en || { name: victoryId, description: '' };
};

export const getGameOverReason = (reasonKey: string, lang: LanguageCode, regionName?: string): string => {
  const translated = gameOverReasons[reasonKey]?.[lang] || gameOverReasons[reasonKey]?.en;
  if (translated && regionName) {
    return translated.replace('{region}', regionName);
  }
  return translated || reasonKey;
};
