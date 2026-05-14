import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const MEDICINE_CONSTANTS: Record<string, BaseGameItem> = {
  STETHOSCOPE: { name: "stethoscope", hebrew: "סטטוסקופ", english: "Stethoscope", emoji: "🩺", color: "bg-blue-500", sound: [440, 550, 660] },
  THERMOMETER: { name: "thermometer", hebrew: "מד חום", english: "Thermometer", emoji: "🌡️", color: "bg-red-500", sound: [392, 494, 587] },
  BANDAGE: { name: "bandage", hebrew: "תחבושת", english: "Bandage", emoji: "🩹", color: "bg-pink-300", sound: [349, 440, 523] },
  SYRINGE: { name: "syringe", hebrew: "מזרק", english: "Syringe", emoji: "💉", color: "bg-gray-500", sound: [294, 370, 440] },
  PILLS: { name: "pills", hebrew: "כדורים", english: "Pills", emoji: "💊", color: "bg-purple-500", sound: [330, 415, 494] },
  FIRST_AID_KIT: { name: "first-aid-kit", hebrew: "ערכת עזרה ראשונה", english: "First Aid Kit", emoji: "🩹", color: "bg-red-600", sound: [262, 330, 392] },
  MASK: { name: "mask", hebrew: "מסכה", english: "Mask", emoji: "😷", color: "bg-white", sound: [523, 659, 784] },
  DOCTOR: { name: "doctor", hebrew: "רופא", english: "Doctor", emoji: "👨‍⚕️", color: "bg-blue-600", sound: [587, 698, 831] },
  NURSE: { name: "nurse", hebrew: "אחות", english: "Nurse", emoji: "👩‍⚕️", color: "bg-pink-500", sound: [196, 247, 294] },
  HOSPITAL: { name: "hospital", hebrew: "בית חולים", english: "Hospital", emoji: "🏥", color: "bg-blue-700", sound: [277, 349, 415] },
};

export const MEDICINE_ITEMS = createItemsList(MEDICINE_CONSTANTS);
export const MEDICINE_PRONUNCIATIONS = createPronunciationDictionary(MEDICINE_CONSTANTS);
export const MEDICINE_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק מרקחת ותרופות",
  subTitle: "הכר כלי רפואה ומתן עזרה ראשונה!",
  description: "למד על כלי רפואה בסיסיים ואיך לתת עזרה ראשונה!",
  instructions: "לחץ על הכלי הרפואי הנכון כשאתה שומע את השם שלו",
};
