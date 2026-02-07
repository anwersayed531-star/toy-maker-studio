// Translations for 40+ languages with automatic detection

export type LanguageCode = 
  | 'ar' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja'
  | 'ko' | 'hi' | 'bn' | 'tr' | 'vi' | 'th' | 'id' | 'ms' | 'fa' | 'ur'
  | 'pl' | 'uk' | 'nl' | 'sv' | 'no' | 'da' | 'fi' | 'el' | 'he' | 'cs'
  | 'ro' | 'hu' | 'sk' | 'bg' | 'hr' | 'sr' | 'sl' | 'lt' | 'lv' | 'et'
  | 'sw' | 'am' | 'tl';

export interface Translation {
  // General
  appName: string;
  settings: string;
  save: string;
  cancel: string;
  confirm: string;
  back: string;
  year: string;
  
  // Settings Screen
  settingsTitle: string;
  soundSettings: string;
  soundEnabled: string;
  soundDisabled: string;
  notificationSettings: string;
  notificationsEnabled: string;
  notificationsDisabled: string;
  languageSettings: string;
  selectLanguage: string;
  dataManagement: string;
  deleteSavedData: string;
  deleteDataConfirm: string;
  deleteDataWarning: string;
  dataDeleted: string;
  
  // Start Screen
  newGame: string;
  continueGame: string;
  loadGame: string;
  enterName: string;
  countryName: string;
  startGame: string;
  autoSaveEnabled: string;
  notificationsReminder: string;
  
  // Game
  turn: string;
  economy: string;
  military: string;
  popularity: string;
  diplomacy: string;
  treasury: string;
  
  // Tabs
  tabStats: string;
  tabMap: string;
  tabFactions: string;
  tabAdmin: string;
  
  // Decision Categories
  economicDecision: string;
  militaryDecision: string;
  diplomaticDecision: string;
  socialDecision: string;
  decision: string;
  
  // Victory/Game Over
  victory: string;
  gameOver: string;
  playAgain: string;
  mainMenu: string;
  victoryConditions: string;
  completed: string;
  
  // Map
  countryMap: string;
  emergencyEvent: string;
  stable: string;
  moderate: string;
  danger: string;
  population: string;
  loyalty: string;
  development: string;
  unrest: string;
  oil: string;
  agriculture: string;
  industry: string;
  tourism: string;
  mining: string;
  
  // Factions
  supportSystem: string;
  average: string;
  influence: string;
  
  // Advisors
  adminSystem: string;
  competence: string;
  
  // Advisor roles
  economicAdvisor: string;
  militaryAdvisor: string;
  diplomaticAdvisor: string;
  internalAdvisor: string;
  
  // Stats
  statistics: string;
  totalGames: string;
  victories: string;
  defeats: string;
  longestGame: string;
  highestStats: string;
  
  // Decisions
  accept: string;
  reject: string;
}

// Default translation (Arabic)
const defaultTranslation: Translation = {
  appName: 'محاكي الرئيس',
  settings: 'الإعدادات',
  save: 'حفظ',
  cancel: 'إلغاء',
  confirm: 'تأكيد',
  back: 'رجوع',
  year: 'السنة',
  settingsTitle: 'الإعدادات',
  soundSettings: 'إعدادات الصوت',
  soundEnabled: 'الصوت مفعّل',
  soundDisabled: 'الصوت معطّل',
  notificationSettings: 'إعدادات الإشعارات',
  notificationsEnabled: 'الإشعارات مفعّلة',
  notificationsDisabled: 'الإشعارات معطّلة',
  languageSettings: 'اللغة',
  selectLanguage: 'اختر اللغة',
  dataManagement: 'إدارة البيانات',
  deleteSavedData: 'حذف البيانات المحفوظة',
  deleteDataConfirm: 'هل أنت متأكد؟',
  deleteDataWarning: 'سيتم حذف جميع بيانات اللعبة والإحصائيات',
  dataDeleted: 'تم حذف البيانات',
  newGame: 'لعبة جديدة',
  continueGame: 'استمرار',
  loadGame: 'تحميل اللعبة',
  enterName: 'أدخل اسم الرئيس',
  countryName: 'اسم الدولة',
  startGame: 'ابدأ اللعبة',
  autoSaveEnabled: 'الحفظ التلقائي مفعّل',
  notificationsReminder: 'تذكير كل 15 ساعة',
  turn: 'الدور',
  economy: 'الاقتصاد',
  military: 'الجيش',
  popularity: 'الشعبية',
  diplomacy: 'الدبلوماسية',
  treasury: 'الخزينة',
  tabStats: 'الإحصائيات',
  tabMap: 'الخريطة',
  tabFactions: 'الفصائل',
  tabAdmin: 'الإدارة',
  economicDecision: 'قرار اقتصادي',
  militaryDecision: 'قرار عسكري',
  diplomaticDecision: 'قرار دبلوماسي',
  socialDecision: 'قرار اجتماعي',
  decision: 'قرار',
  victory: 'فوز!',
  gameOver: 'انتهت اللعبة',
  playAgain: 'العب مرة أخرى',
  mainMenu: 'القائمة الرئيسية',
  victoryConditions: 'شروط النصر',
  completed: 'مكتمل',
  countryMap: 'خريطة الدولة',
  emergencyEvent: 'حدث طارئ!',
  stable: 'مستقر',
  moderate: 'متوسط',
  danger: 'خطر',
  population: 'نسمة',
  loyalty: 'الولاء',
  development: 'التنمية',
  unrest: 'الاضطرابات',
  oil: 'نفط',
  agriculture: 'زراعة',
  industry: 'صناعة',
  tourism: 'سياحة',
  mining: 'تعدين',
  supportSystem: 'نظام المساندة',
  average: 'المتوسط',
  influence: 'نفوذ',
  adminSystem: 'النظام الإداري',
  competence: 'الكفاءة',
  economicAdvisor: 'اقتصادي',
  militaryAdvisor: 'عسكري',
  diplomaticAdvisor: 'دبلوماسي',
  internalAdvisor: 'داخلي',
  statistics: 'الإحصائيات',
  totalGames: 'إجمالي الألعاب',
  victories: 'الانتصارات',
  defeats: 'الهزائم',
  longestGame: 'أطول لعبة',
  highestStats: 'أعلى الإحصائيات',
  accept: 'قبول',
  reject: 'رفض',
};

// English translation
const enTranslation: Translation = {
  appName: 'President Simulator',
  settings: 'Settings',
  save: 'Save',
  cancel: 'Cancel',
  confirm: 'Confirm',
  back: 'Back',
  year: 'Year',
  settingsTitle: 'Settings',
  soundSettings: 'Sound Settings',
  soundEnabled: 'Sound Enabled',
  soundDisabled: 'Sound Disabled',
  notificationSettings: 'Notification Settings',
  notificationsEnabled: 'Notifications Enabled',
  notificationsDisabled: 'Notifications Disabled',
  languageSettings: 'Language',
  selectLanguage: 'Select Language',
  dataManagement: 'Data Management',
  deleteSavedData: 'Delete Saved Data',
  deleteDataConfirm: 'Are you sure?',
  deleteDataWarning: 'All game data and statistics will be deleted',
  dataDeleted: 'Data Deleted',
  newGame: 'New Game',
  continueGame: 'Continue',
  loadGame: 'Load Game',
  enterName: 'Enter President Name',
  countryName: 'Country Name',
  startGame: 'Start Game',
  autoSaveEnabled: 'Auto-save Enabled',
  notificationsReminder: 'Reminder every 15 hours',
  turn: 'Turn',
  economy: 'Economy',
  military: 'Military',
  popularity: 'Popularity',
  diplomacy: 'Diplomacy',
  treasury: 'Treasury',
  tabStats: 'Stats',
  tabMap: 'Map',
  tabFactions: 'Factions',
  tabAdmin: 'Admin',
  economicDecision: 'Economic Decision',
  militaryDecision: 'Military Decision',
  diplomaticDecision: 'Diplomatic Decision',
  socialDecision: 'Social Decision',
  decision: 'Decision',
  victory: 'Victory!',
  gameOver: 'Game Over',
  playAgain: 'Play Again',
  mainMenu: 'Main Menu',
  victoryConditions: 'Victory Conditions',
  completed: 'Completed',
  countryMap: 'Country Map',
  emergencyEvent: 'Emergency Event!',
  stable: 'Stable',
  moderate: 'Moderate',
  danger: 'Danger',
  population: 'Population',
  loyalty: 'Loyalty',
  development: 'Development',
  unrest: 'Unrest',
  oil: 'Oil',
  agriculture: 'Agriculture',
  industry: 'Industry',
  tourism: 'Tourism',
  mining: 'Mining',
  supportSystem: 'Support System',
  average: 'Average',
  influence: 'Influence',
  adminSystem: 'Administration',
  competence: 'Competence',
  economicAdvisor: 'Economic',
  militaryAdvisor: 'Military',
  diplomaticAdvisor: 'Diplomatic',
  internalAdvisor: 'Internal',
  statistics: 'Statistics',
  totalGames: 'Total Games',
  victories: 'Victories',
  defeats: 'Defeats',
  longestGame: 'Longest Game',
  highestStats: 'Highest Stats',
  accept: 'Accept',
  reject: 'Reject',
};

// Helper to create translations with fallback to English
const createTranslation = (overrides: Partial<Translation>): Translation => ({
  ...enTranslation,
  ...overrides,
});

export const translations: Record<LanguageCode, Translation> = {
  ar: defaultTranslation,
  en: enTranslation,
  es: createTranslation({
    appName: 'Simulador de Presidente',
    settings: 'Configuración',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Volver',
    year: 'Año',
    settingsTitle: 'Configuración',
    soundSettings: 'Configuración de Sonido',
    soundEnabled: 'Sonido Activado',
    soundDisabled: 'Sonido Desactivado',
    notificationSettings: 'Configuración de Notificaciones',
    notificationsEnabled: 'Notificaciones Activadas',
    notificationsDisabled: 'Notificaciones Desactivadas',
    languageSettings: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
    dataManagement: 'Gestión de Datos',
    deleteSavedData: 'Eliminar Datos Guardados',
    deleteDataConfirm: '¿Estás seguro?',
    deleteDataWarning: 'Se eliminarán todos los datos y estadísticas',
    dataDeleted: 'Datos Eliminados',
    newGame: 'Nuevo Juego',
    continueGame: 'Continuar',
    loadGame: 'Cargar Juego',
    enterName: 'Nombre del Presidente',
    startGame: 'Iniciar Juego',
    turn: 'Turno',
    economy: 'Economía',
    military: 'Militar',
    popularity: 'Popularidad',
    diplomacy: 'Diplomacia',
    treasury: 'Tesorería',
    tabStats: 'Estadísticas',
    tabMap: 'Mapa',
    tabFactions: 'Facciones',
    tabAdmin: 'Administración',
    victory: '¡Victoria!',
    gameOver: 'Fin del Juego',
    playAgain: 'Jugar de Nuevo',
    mainMenu: 'Menú Principal',
    victoryConditions: 'Condiciones de Victoria',
    countryMap: 'Mapa del País',
    supportSystem: 'Sistema de Apoyo',
    adminSystem: 'Sistema Administrativo',
    statistics: 'Estadísticas',
    totalGames: 'Juegos Totales',
    victories: 'Victorias',
    defeats: 'Derrotas',
    longestGame: 'Juego Más Largo',
    accept: 'Aceptar',
    reject: 'Rechazar',
  }),
  fr: createTranslation({
    appName: 'Simulateur de Président',
    settings: 'Paramètres',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    back: 'Retour',
    year: 'Année',
    turn: 'Tour',
    economy: 'Économie',
    military: 'Militaire',
    popularity: 'Popularité',
    diplomacy: 'Diplomatie',
    treasury: 'Trésorerie',
    tabStats: 'Statistiques',
    tabMap: 'Carte',
    tabFactions: 'Factions',
    tabAdmin: 'Administration',
    victory: 'Victoire!',
    gameOver: 'Partie Terminée',
    playAgain: 'Rejouer',
    mainMenu: 'Menu Principal',
    newGame: 'Nouvelle Partie',
    statistics: 'Statistiques',
    accept: 'Accepter',
    reject: 'Refuser',
  }),
  de: createTranslation({
    appName: 'Präsidenten Simulator',
    settings: 'Einstellungen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    back: 'Zurück',
    year: 'Jahr',
    turn: 'Runde',
    economy: 'Wirtschaft',
    military: 'Militär',
    popularity: 'Beliebtheit',
    diplomacy: 'Diplomatie',
    treasury: 'Staatskasse',
    tabStats: 'Statistiken',
    tabMap: 'Karte',
    tabFactions: 'Fraktionen',
    tabAdmin: 'Verwaltung',
    victory: 'Sieg!',
    gameOver: 'Spiel Beendet',
    playAgain: 'Nochmal Spielen',
    mainMenu: 'Hauptmenü',
    newGame: 'Neues Spiel',
    statistics: 'Statistiken',
    accept: 'Akzeptieren',
    reject: 'Ablehnen',
  }),
  it: createTranslation({
    appName: 'Simulatore Presidente',
    turn: 'Turno',
    economy: 'Economia',
    military: 'Militare',
    popularity: 'Popolarità',
    diplomacy: 'Diplomazia',
    tabStats: 'Statistiche',
    tabMap: 'Mappa',
    tabFactions: 'Fazioni',
    tabAdmin: 'Amministrazione',
    victory: 'Vittoria!',
    gameOver: 'Partita Finita',
    newGame: 'Nuova Partita',
  }),
  pt: createTranslation({
    appName: 'Simulador de Presidente',
    turn: 'Turno',
    economy: 'Economia',
    military: 'Militar',
    popularity: 'Popularidade',
    diplomacy: 'Diplomacia',
    tabStats: 'Estatísticas',
    tabMap: 'Mapa',
    tabFactions: 'Facções',
    tabAdmin: 'Administração',
    victory: 'Vitória!',
    gameOver: 'Fim de Jogo',
    newGame: 'Novo Jogo',
  }),
  ru: createTranslation({
    appName: 'Симулятор Президента',
    settings: 'Настройки',
    save: 'Сохранить',
    cancel: 'Отмена',
    year: 'Год',
    turn: 'Ход',
    economy: 'Экономика',
    military: 'Военные',
    popularity: 'Популярность',
    diplomacy: 'Дипломатия',
    treasury: 'Казна',
    tabStats: 'Статистика',
    tabMap: 'Карта',
    tabFactions: 'Фракции',
    tabAdmin: 'Управление',
    victory: 'Победа!',
    gameOver: 'Игра Окончена',
    newGame: 'Новая Игра',
    statistics: 'Статистика',
  }),
  zh: createTranslation({
    appName: '总统模拟器',
    settings: '设置',
    year: '年',
    turn: '回合',
    economy: '经济',
    military: '军事',
    popularity: '人气',
    diplomacy: '外交',
    treasury: '国库',
    tabStats: '统计',
    tabMap: '地图',
    tabFactions: '派系',
    tabAdmin: '管理',
    victory: '胜利！',
    gameOver: '游戏结束',
    newGame: '新游戏',
    statistics: '统计',
  }),
  ja: createTranslation({
    appName: '大統領シミュレーター',
    settings: '設定',
    year: '年',
    turn: 'ターン',
    economy: '経済',
    military: '軍事',
    popularity: '人気',
    diplomacy: '外交',
    tabStats: '統計',
    tabMap: 'マップ',
    tabFactions: '派閥',
    tabAdmin: '管理',
    victory: '勝利！',
    gameOver: 'ゲームオーバー',
    newGame: '新しいゲーム',
  }),
  ko: createTranslation({
    appName: '대통령 시뮬레이터',
    year: '년',
    turn: '턴',
    economy: '경제',
    military: '군사',
    popularity: '인기',
    diplomacy: '외교',
    tabStats: '통계',
    tabMap: '지도',
    tabFactions: '세력',
    tabAdmin: '관리',
    victory: '승리!',
    gameOver: '게임 오버',
    newGame: '새 게임',
  }),
  hi: createTranslation({
    appName: 'राष्ट्रपति सिम्युलेटर',
    turn: 'बारी',
    economy: 'अर्थव्यवस्था',
    military: 'सेना',
    popularity: 'लोकप्रियता',
    diplomacy: 'कूटनीति',
    victory: 'जीत!',
    gameOver: 'खेल खत्म',
    newGame: 'नया खेल',
  }),
  bn: createTranslation({ appName: 'প্রেসিডেন্ট সিমুলেটর' }),
  tr: createTranslation({
    appName: 'Başkan Simülatörü',
    turn: 'Tur',
    economy: 'Ekonomi',
    military: 'Askeri',
    popularity: 'Popülerlik',
    diplomacy: 'Diplomasi',
    victory: 'Zafer!',
    gameOver: 'Oyun Bitti',
    newGame: 'Yeni Oyun',
  }),
  vi: createTranslation({ appName: 'Mô Phỏng Tổng Thống' }),
  th: createTranslation({ appName: 'จำลองประธานาธิบดี' }),
  id: createTranslation({ appName: 'Simulator Presiden' }),
  ms: createTranslation({ appName: 'Simulator Presiden' }),
  fa: createTranslation({ appName: 'شبیه‌ساز رئیس‌جمهور' }),
  ur: createTranslation({ appName: 'صدارتی سمیلیٹر' }),
  pl: createTranslation({
    appName: 'Symulator Prezydenta',
    turn: 'Tura',
    economy: 'Ekonomia',
    military: 'Wojsko',
    popularity: 'Popularność',
    diplomacy: 'Dyplomacja',
    victory: 'Zwycięstwo!',
    gameOver: 'Koniec Gry',
    newGame: 'Nowa Gra',
  }),
  uk: createTranslation({
    appName: 'Симулятор Президента',
    turn: 'Хід',
    economy: 'Економіка',
    military: 'Військові',
    popularity: 'Популярність',
    diplomacy: 'Дипломатія',
    victory: 'Перемога!',
    gameOver: 'Гра Закінчена',
    newGame: 'Нова Гра',
  }),
  nl: createTranslation({ appName: 'President Simulator' }),
  sv: createTranslation({ appName: 'Presidentsimulator' }),
  no: createTranslation({ appName: 'Presidentsimulator' }),
  da: createTranslation({ appName: 'Præsidentsimulator' }),
  fi: createTranslation({ appName: 'Presidenttisimulaattori' }),
  el: createTranslation({ appName: 'Προσομοιωτής Προέδρου' }),
  he: createTranslation({ appName: 'סימולטור נשיא' }),
  cs: createTranslation({ appName: 'Simulátor Prezidenta' }),
  ro: createTranslation({ appName: 'Simulator de Președinte' }),
  hu: createTranslation({ appName: 'Elnök Szimulátor' }),
  sk: createTranslation({ appName: 'Simulátor Prezidenta' }),
  bg: createTranslation({ appName: 'Симулатор на Президент' }),
  hr: createTranslation({ appName: 'Simulator Predsjednika' }),
  sr: createTranslation({ appName: 'Симулатор Председника' }),
  sl: createTranslation({ appName: 'Simulator Predsednika' }),
  lt: createTranslation({ appName: 'Prezidento Simuliatorius' }),
  lv: createTranslation({ appName: 'Prezidenta Simulators' }),
  et: createTranslation({ appName: 'Presidendi Simulaator' }),
  sw: createTranslation({ appName: 'Simulator ya Rais' }),
  am: createTranslation({ appName: 'የፕሬዝዳንት ሲሙሌተር' }),
  tl: createTranslation({ appName: 'Simulator ng Pangulo' }),
};

// RTL languages
export const rtlLanguages: LanguageCode[] = ['ar', 'he', 'fa', 'ur'];

// Language names for display
export const languageNames: Record<LanguageCode, string> = {
  ar: 'العربية',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  hi: 'हिन्दी',
  bn: 'বাংলা',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  fa: 'فارسی',
  ur: 'اردو',
  pl: 'Polski',
  uk: 'Українська',
  nl: 'Nederlands',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  el: 'Ελληνικά',
  he: 'עברית',
  cs: 'Čeština',
  ro: 'Română',
  hu: 'Magyar',
  sk: 'Slovenčina',
  bg: 'Български',
  hr: 'Hrvatski',
  sr: 'Српски',
  sl: 'Slovenščina',
  lt: 'Lietuvių',
  lv: 'Latviešu',
  et: 'Eesti',
  sw: 'Kiswahili',
  am: 'አማርኛ',
  tl: 'Tagalog',
};

// Detect user's browser language
export const detectLanguage = (): LanguageCode => {
  const browserLang = navigator.language.split('-')[0] as LanguageCode;
  if (translations[browserLang]) {
    return browserLang;
  }
  return 'en';
};
