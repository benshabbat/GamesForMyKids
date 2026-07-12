import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary } from "@/lib/constants/core";

export const PERSONAL_SAFETY_ITEMS: Record<string, BaseGameItem> = {
  POLICE: {
    name: "police",
    hebrew: "שוטר",
    hebrewNikud: "שׁוֹטֵר",
    english: "Police",
    emoji: "👮",
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  FIREFIGHTER: {
    name: "firefighter",
    hebrew: "כבאי",
    hebrewNikud: "כַּבַּאי",
    english: "Firefighter",
    emoji: "🧑‍🚒",
    color: "bg-gradient-to-br from-red-500 to-orange-600",
  },
  DOCTOR: {
    name: "doctor",
    hebrew: "רופא",
    hebrewNikud: "רוֹפֵא",
    english: "Doctor",
    emoji: "👨‍⚕️",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
  },
  AMBULANCE: {
    name: "ambulance",
    hebrew: "אמבולנס",
    hebrewNikud: "אַמְבּוּלַנְס",
    english: "Ambulance",
    emoji: "🚑",
    color: "bg-gradient-to-br from-red-400 to-red-600",
  },
  HELMET: {
    name: "helmet",
    hebrew: "קסדה",
    hebrewNikud: "קַסְדָּה",
    english: "Helmet",
    emoji: "⛑️",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
  },
  SEATBELT: {
    name: "seatbelt",
    hebrew: "חגורת בטיחות",
    hebrewNikud: "חֲגוֹרַת בְּטִיחוּת",
    english: "Seatbelt",
    emoji: "🔒",
    color: "bg-gradient-to-br from-gray-500 to-gray-700",
  },
  FIRE_EXTINGUISHER: {
    name: "fire-extinguisher",
    hebrew: "מטף",
    hebrewNikud: "מַטָּף",
    english: "Fire Extinguisher",
    emoji: "🧯",
    color: "bg-gradient-to-br from-red-600 to-rose-700",
  },
  FIRST_AID: {
    name: "first-aid",
    hebrew: "עזרה ראשונה",
    hebrewNikud: "עֶזְרָה רִאשׁוֹנָה",
    english: "First Aid",
    emoji: "🩹",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
  },
  PHONE_EMERGENCY: {
    name: "phone-emergency",
    hebrew: "טלפון חירום",
    hebrewNikud: "טֶלֶפוֹן חֵרוּם",
    english: "Emergency Phone",
    emoji: "📞",
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  TRAFFIC_LIGHT: {
    name: "traffic-light",
    hebrew: "רמזור",
    hebrewNikud: "רַמְזוֹר",
    english: "Traffic Light",
    emoji: "🚦",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  CROSSWALK: {
    name: "crosswalk",
    hebrew: "מעבר חציה",
    hebrewNikud: "מַעֲבַר חֲצִיָּה",
    english: "Crosswalk",
    emoji: "🚶",
    color: "bg-gradient-to-br from-slate-400 to-slate-600",
  },
  LIFEGUARD: {
    name: "lifeguard",
    hebrew: "מציל",
    hebrewNikud: "מַצִּיל",
    english: "Lifeguard",
    emoji: "🏊",
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
  },
};

export const ALL_PERSONAL_SAFETY = createItemsList(PERSONAL_SAFETY_ITEMS);
export const PERSONAL_SAFETY_PRONUNCIATIONS = createPronunciationDictionary(PERSONAL_SAFETY_ITEMS);
