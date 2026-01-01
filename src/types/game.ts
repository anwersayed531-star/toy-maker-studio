export interface GameState {
  countryName: string;
  presidentName: string;
  year: number;
  month: number;
  
  // Core stats (0-100)
  economy: number;
  military: number;
  popularity: number;
  diplomacy: number;
  
  // Resources
  treasury: number; // in billions
  population: number; // in millions
  
  // Game status
  gameOver: boolean;
  gameOverReason?: string;
  turnCount: number;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  category: 'economy' | 'military' | 'diplomacy' | 'social';
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  effects: Partial<Pick<GameState, 'economy' | 'military' | 'popularity' | 'diplomacy' | 'treasury'>>;
}

export interface NewsEvent {
  id: string;
  headline: string;
  description: string;
  impact: string;
}

export const initialGameState: GameState = {
  countryName: 'الجمهورية',
  presidentName: 'الرئيس',
  year: 2024,
  month: 1,
  economy: 50,
  military: 50,
  popularity: 60,
  diplomacy: 50,
  treasury: 100,
  population: 50,
  gameOver: false,
  turnCount: 0,
};
