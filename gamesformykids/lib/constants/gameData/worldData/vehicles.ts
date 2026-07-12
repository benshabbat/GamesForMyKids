import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const VEHICLE_CONSTANTS: Record<string, BaseGameItem> = {
  CAR: { name: "car", hebrew: "מכונית", hebrewNikud: "מְכוֹנִית", english: "Car", emoji: "🚗", color: "bg-red-500", sound: [440, 550, 660] },
  BUS: { name: "bus", hebrew: "אוטובוס", hebrewNikud: "אוֹטוֹבּוּס", english: "Bus", emoji: "🚌", color: "bg-yellow-500", sound: [392, 494, 587] },
  TRAIN: { name: "train", hebrew: "רכבת", hebrewNikud: "רַכֶּבֶת", english: "Train", emoji: "🚂", color: "bg-green-500", sound: [349, 440, 523] },
  AIRPLANE: { name: "airplane", hebrew: "מטוס", hebrewNikud: "מָטוֹס", english: "Airplane", emoji: "✈️", color: "bg-blue-500", sound: [523, 659, 784] },
  BICYCLE: { name: "bicycle", hebrew: "אופניים", hebrewNikud: "אוֹפַנַּיִם", english: "Bicycle", emoji: "🚲", color: "bg-purple-500", sound: [294, 370, 440] },
  MOTORCYCLE: { name: "motorcycle", hebrew: "אופנוע", hebrewNikud: "אוֹפַנוֹעַ", english: "Motorcycle", emoji: "🏍️", color: "bg-orange-500", sound: [330, 415, 494] },
};

export const ALL_VEHICLES = createItemsList(VEHICLE_CONSTANTS);
export const VEHICLE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(VEHICLE_CONSTANTS);
export const VEHICLE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
