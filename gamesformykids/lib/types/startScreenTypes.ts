/**
 * טיפוסים שמשמשים במסכי התחלה של משחקים
 */

import { Color, Letter, NumberItem, Shape, AnimalData, Fruit, Animal, Weather, Transport, Profession, Vegetable, Instrument, SpaceObject } from "./game";

/**
 * מאפיינים בסיסיים למסכי התחלה
 */
export interface BaseStartScreenProps {
  onStart: () => void;
  onSpeak?: (name: string) => void;
}

/**
 * מאפייני מסך התחלה למשחק אותיות
 */
export interface LetterStartScreenProps extends BaseStartScreenProps {
  letters: Letter[];
}

/**
 * מאפייני מסך התחלה למשחק צבעים
 */
export interface ColorStartScreenProps extends BaseStartScreenProps {
  colors: Color[];
}

/**
 * מאפייני מסך התחלה למשחק צורות
 */
export interface ShapeStartScreenProps extends BaseStartScreenProps {
  shapes: Shape[];
}

/**
 * מאפייני מסך התחלה למשחק מספרים
 */
export interface NumberStartScreenProps extends BaseStartScreenProps {
  numbers: NumberItem[];
}

/**
 * מאפייני מסך התחלה למשחק זיכרון
 */
export interface MemoryStartScreenProps extends BaseStartScreenProps {
  animals: AnimalData[];
}

/**
 * מאפייני מסך התחלה למשחק פירות
 */
export interface FruitStartScreenProps extends BaseStartScreenProps {
  fruits: Fruit[];
}


/**
 * מאפייני מסך התחלה למשחק חיות
 */
export interface AnimalStartScreenProps extends BaseStartScreenProps {
  animals: Animal[];
}
export type CountingStartScreenProps = BaseStartScreenProps;

export interface WeatherStartScreenProps extends BaseStartScreenProps {
  weathers: Weather[];
}

export interface TransportStartScreenProps extends BaseStartScreenProps {
  transports: Transport[];
}

export type MathStartScreenProps = BaseStartScreenProps;

/**
 * מאפייני מסך התחלה למשחק מקצועות
 */
export interface ProfessionStartScreenProps extends BaseStartScreenProps {
  professions: Profession[];
}

/**
 * מאפייני מסך התחלה למשחק ירקות
 */
export interface VegetableStartScreenProps extends BaseStartScreenProps {
  vegetables: Vegetable[];
}

/**
 * מאפייני מסך התחלה למשחק כלי נגינה
 */
export interface InstrumentStartScreenProps extends BaseStartScreenProps {
  instruments: Instrument[];
}

/**
 * מאפייני מסך התחלה למשחק גופי השמים
 */
export interface SpaceStartScreenProps extends BaseStartScreenProps {
  spaceObjects: SpaceObject[];
}