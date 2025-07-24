export interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  available: boolean;
}

export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface AnimalData {
  emoji: string;
  sound: string;
  name: string;
}

export interface Color {
  name: string;
  hebrew: string;
  value: string;
  sound: number[];
  tailwindClass?: string;
}

export interface GameState {
  currentChallenge: Color | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Color[];
}

// ממשק למשחק אותיות
export interface Letter {
  name: string;
  hebrew: string;
  english: string;
  sound: number[];
}

export interface LetterGameState {
  currentChallenge: Letter | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Letter[];
}

// ממשק למשחק צורות
export interface Shape {
  name: string;
  hebrew: string;
  english: string;
  color: string;
  sound: number[];
  svg: string;
}

export interface ShapeGameState {
  currentChallenge: Shape | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Shape[];
}

// ממשק למשחק מספרים
export interface NumberItem {
  name: string;
  hebrew: string;
  english: string;
  digit: string;
  sound: number[];
}

export interface NumberGameState {
  currentChallenge: NumberItem | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: NumberItem[];
}
export interface CountingChallenge {
  emojis: string;
  correctAnswer: number;
  itemName: string;      // שם הפריט ביחיד (כלב)
  itemPlural: string;    // שם הפריט ברבים (כלבים)  
  emoji: string;         // האימוג'י הבודד
}

export interface CountingGameState {
  currentChallenge: CountingChallenge | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: number[];
}
export type GameType = 'memory' | 'colors' | 'letters' | 'shapes' | 'numbers' | 'fruits' | 'bubbles' | 'animals' | 'counting' ;

// הוספת הממשקים החדשים לפירות
export interface Fruit {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface FruitGameState {
  currentChallenge: Fruit | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Fruit[];
}

export interface Animal {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  sound: number[];
  color: string;
}

export interface AnimalGameState {
  currentChallenge: Animal | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Animal[];
}

export interface Weather {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface WeatherGameState {
  currentChallenge: Weather | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Weather[];
}

export interface Transport {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface TransportGameState {
  currentChallenge: Transport | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Transport[];
}

export interface MathChallenge {
  firstNumber: number;
  secondNumber: number;
  operation: 'addition' | 'subtraction';
  correctAnswer: number;
  itemName: string;      // שם הפריט ביחיד (תפוח)
  itemPlural: string;    // שם הפריט ברבים (תפוחים)  
  emoji: string;         // האימוג'י הבודד
}

export interface MathGameState {
  currentChallenge: MathChallenge | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: number[];
}

// ממשק למשחק מקצועות
export interface Profession {
  id: string;
  emoji: string;
  name: string;
  description: string;
  sound: number[];
  color: string;
}

export interface ProfessionGameState {
  currentChallenge: Profession | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Profession[];
}

// ממשק למשחק ירקות
export interface Vegetable {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface VegetableGameState {
  currentChallenge: Vegetable | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Vegetable[];
}

// ממשק למשחק כלי נגינה
export interface Instrument {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface InstrumentGameState {
  currentChallenge: Instrument | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Instrument[];
}

// ממשק למשחק גופי השמים
export interface SpaceObject {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface SpaceGameState {
  currentChallenge: SpaceObject | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: SpaceObject[];
}

// ממשק למשחק בגדים
export interface ClothingItem {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface ClothingGameState {
  currentChallenge: ClothingItem | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: ClothingItem[];
}

// ממשק למשחק ריחות וטעמים
export interface SmellTasteItem {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface SmellTasteGameState {
  currentChallenge: SmellTasteItem | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: SmellTasteItem[];
}

// ממשק למשחק חפצי הבית
export interface HouseItem {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface HouseGameState {
  currentChallenge: HouseItem | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: HouseItem[];
}

// ממשק למשחק כלי עבודה
export interface Tool {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface ToolGameState {
  currentChallenge: Tool | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Tool[];
}