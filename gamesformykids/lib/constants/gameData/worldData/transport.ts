import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const TRANSPORT_CONSTANTS: Record<string, BaseGameItem> = {
  CAR: { name: "car", hebrew: "מכונית", english: "Car", emoji: "🚗", color: "bg-red-500", sound: [440, 550, 660] },
  BUS: { name: "bus", hebrew: "אוטובוס", english: "Bus", emoji: "🚌", color: "bg-orange-500", sound: [392, 494, 587] },
  TRAIN: { name: "train", hebrew: "רכבת", english: "Train", emoji: "🚂", color: "bg-green-500", sound: [349, 440, 523] },
  AIRPLANE: { name: "airplane", hebrew: "מטוס", english: "Airplane", emoji: "✈️", color: "bg-blue-500", sound: [523, 659, 784] },
  SHIP: { name: "ship", hebrew: "ספינה", english: "Ship", emoji: "🚢", color: "bg-cyan-500", sound: [294, 370, 440] },
  BICYCLE: { name: "bicycle", hebrew: "אופניים", english: "Bicycle", emoji: "🚲", color: "bg-green-400", sound: [330, 415, 494] },
  MOTORCYCLE: { name: "motorcycle", hebrew: "אופנוע", english: "Motorcycle", emoji: "🏍️", color: "bg-black", sound: [587, 698, 784] },
  TRUCK: { name: "truck", hebrew: "משאית", english: "Truck", emoji: "🚚", color: "bg-gray-600", sound: [196, 247, 294] },
  HELICOPTER: { name: "helicopter", hebrew: "מסוק", english: "Helicopter", emoji: "🚁", color: "bg-purple-500", sound: [659, 831, 988] },
  TAXI: { name: "taxi", hebrew: "מונית", english: "Taxi", emoji: "🚕", color: "bg-yellow-500", sound: [277, 349, 415] },
};

export const ALL_TRANSPORTS = createItemsList(TRANSPORT_CONSTANTS);
export const TRANSPORT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(TRANSPORT_CONSTANTS);
export const TRANSPORT_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
