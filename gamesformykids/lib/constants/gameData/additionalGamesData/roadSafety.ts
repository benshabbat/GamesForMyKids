import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const ROAD_SAFETY_CONSTANTS: Record<string, BaseGameItem> = {
  TRAFFIC_LIGHT_RED: { name: "traffic-light-red", hebrew: "רמזור אדום", hebrewNikud: "רַמְזוֹר אָדֹם", english: "Red Light", emoji: "🔴", color: "bg-red-500", sound: [220, 277, 330] },
  TRAFFIC_LIGHT_YELLOW: { name: "traffic-light-yellow", hebrew: "רמזור צהוב", hebrewNikud: "רַמְזוֹר צָהֹב", english: "Yellow Light", emoji: "🟡", color: "bg-yellow-500", sound: [294, 370, 440] },
  TRAFFIC_LIGHT_GREEN: { name: "traffic-light-green", hebrew: "רמזור ירוק", hebrewNikud: "רַמְזוֹר יָרֹק", english: "Green Light", emoji: "🟢", color: "bg-green-500", sound: [349, 440, 523] },
  CROSSWALK: { name: "crosswalk", hebrew: "מעבר חצייה", hebrewNikud: "מַעֲבַר חֲצִיָּה", english: "Crosswalk", emoji: "🚸", color: "bg-blue-500", sound: [392, 494, 587] },
  STOP_SIGN: { name: "stop-sign", hebrew: "תמרור עצור", hebrewNikud: "תַּמְרוּר עֲצוֹר", english: "Stop Sign", emoji: "🛑", color: "bg-red-600", sound: [196, 247, 294] },
  HELMET: { name: "helmet", hebrew: "קסדה", hebrewNikud: "קַסְדָּה", english: "Helmet", emoji: "⛑️", color: "bg-yellow-600", sound: [440, 550, 660] },
  SEATBELT: { name: "seatbelt", hebrew: "חגורת בטיחות", hebrewNikud: "חֲגוֹרַת בְּטִיחוּת", english: "Seatbelt", emoji: "🔗", color: "bg-black", sound: [330, 415, 494] },
  PEDESTRIAN: { name: "pedestrian", hebrew: "הולך רגל", hebrewNikud: "הוֹלֵךְ רֶגֶל", english: "Pedestrian", emoji: "🚶", color: "bg-blue-400", sound: [523, 659, 784] },
  SCHOOL_ZONE: { name: "school-zone", hebrew: "אזור בית ספר", hebrewNikud: "אֵזוֹר בֵּית סֵפֶר", english: "School Zone", emoji: "🏫", color: "bg-green-600", sound: [262, 330, 392] },
  SPEED_LIMIT: { name: "speed-limit", hebrew: "הגבלת מהירות", hebrewNikud: "הַגְבָּלַת מְהִירוּת", english: "Speed Limit", emoji: "⚠️", color: "bg-orange-500", sound: [587, 698, 831] },
};

export const ROAD_SAFETY_ITEMS = createItemsList(ROAD_SAFETY_CONSTANTS);
export const ROAD_SAFETY_PRONUNCIATIONS = createPronunciationDictionary(ROAD_SAFETY_CONSTANTS);
export const ROAD_SAFETY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק בטיחות בדרכים",
  subTitle: "למד כללי בטיחות חשובים בדרכים!",
  description: "פתח מודעות לבטיחות בדרכים!",
  instructions: "לחץ על התמרור או הפעולה הנכונה",
};
