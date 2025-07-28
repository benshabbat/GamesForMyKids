/**
 * ===============================================
 * טיפוסים למסכי התחלה של משחקים
 * ===============================================
 */

import { BaseGameItem, GameType } from "./base";
import { NumberItem, ProfessionItem, AnimalData } from "./games";

/**
 * AutoStartScreen - הטיפוס החדש ל-StartScreen אוטומטי!
 * מחליף את כל הטיפוסים הישנים
 */
export interface AutoStartScreenProps {
  gameType: GameType;
  gameId?: string; // זהות המשחק לצורך הניווט
  items: BaseGameItem[];
  onStart: () => void;
  onSpeak?: (name: string) => void;
}

/**
 * מאפיינים בסיסיים למסכי התחלה
 */
export interface BaseStartScreenProps {
  onStart: () => void;
  onSpeak?: (name: string) => void;
}

/**
 * מסכי התחלה למשחקים רגילים
 */
export interface GenericStartScreenProps extends BaseStartScreenProps {
  items: BaseGameItem[];
}

/**
 * מסכי התחלה למשחקים מיוחדים
 */
export interface NumberStartScreenProps extends BaseStartScreenProps {
  items: NumberItem[];
}

export interface ColorStartScreenProps extends BaseStartScreenProps {
  items: BaseGameItem[];
}

export interface ProfessionStartScreenProps extends BaseStartScreenProps {
  items: ProfessionItem[];
}

export interface MemoryStartScreenProps extends BaseStartScreenProps {
  items: AnimalData[];
}

export interface EmotionStartScreenProps extends BaseStartScreenProps {
  items: BaseGameItem[];
}

/**
 * מסכי התחלה למשחקים ללא פריטים נוספים
 */
export type CountingStartScreenProps = BaseStartScreenProps;
export type MathStartScreenProps = BaseStartScreenProps;

/**
 * Type aliases למסכי התחלה של משחקים רגילים
 */
export type LetterStartScreenProps = GenericStartScreenProps;
export type ShapeStartScreenProps = GenericStartScreenProps;
export type FruitStartScreenProps = GenericStartScreenProps;
export type AnimalStartScreenProps = GenericStartScreenProps;
export type WeatherStartScreenProps = GenericStartScreenProps;
export type TransportStartScreenProps = GenericStartScreenProps;
export type VegetableStartScreenProps = GenericStartScreenProps;
export type InstrumentStartScreenProps = GenericStartScreenProps;
export type SpaceStartScreenProps = GenericStartScreenProps;
export type ClothingStartScreenProps = GenericStartScreenProps;
export type SmellTasteStartScreenProps = GenericStartScreenProps;
export type HouseStartScreenProps = GenericStartScreenProps;
export type ToolStartScreenProps = GenericStartScreenProps;
export type VehicleStartScreenProps = GenericStartScreenProps;
