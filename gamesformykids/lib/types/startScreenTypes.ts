/**
 * טיפוסים שמשמשים במסכי התחלה של משחקים
 */

import { Color, Letter, NumberItem, Shape, AnimalData, Fruit, Animal } from "./game";

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