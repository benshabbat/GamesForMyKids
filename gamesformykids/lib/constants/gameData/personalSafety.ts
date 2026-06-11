import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary } from "@/lib/constants/core";

export const PERSONAL_SAFETY_ITEMS: Record<string, BaseGameItem> = {
  POLICE: {
    name: "police",
    hebrew: "שוטר",
    english: "Police",
    emoji: "👮",
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  FIREFIGHTER: {
    name: "firefighter",
    hebrew: "כבאי",
    english: "Firefighter",
    emoji: "🧑‍🚒",
    color: "bg-gradient-to-br from-red-500 to-orange-600",
  },
  DOCTOR: {
    name: "doctor",
    hebrew: "רופא",
    english: "Doctor",
    emoji: "👨‍⚕️",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
  },
  AMBULANCE: {
    name: "ambulance",
    hebrew: "אמבולנס",
    english: "Ambulance",
    emoji: "🚑",
    color: "bg-gradient-to-br from-red-400 to-red-600",
  },
  HELMET: {
    name: "helmet",
    hebrew: "קסדה",
    english: "Helmet",
    emoji: "⛑️",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
  },
  SEATBELT: {
    name: "seatbelt",
    hebrew: "חגורת בטיחות",
    english: "Seatbelt",
    emoji: "🔒",
    color: "bg-gradient-to-br from-gray-500 to-gray-700",
  },
  FIRE_EXTINGUISHER: {
    name: "fire-extinguisher",
    hebrew: "מטף",
    english: "Fire Extinguisher",
    emoji: "🧯",
    color: "bg-gradient-to-br from-red-600 to-rose-700",
  },
  FIRST_AID: {
    name: "first-aid",
    hebrew: "עזרה ראשונה",
    english: "First Aid",
    emoji: "🩹",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
  },
  PHONE_EMERGENCY: {
    name: "phone-emergency",
    hebrew: "טלפון חירום",
    english: "Emergency Phone",
    emoji: "📞",
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  TRAFFIC_LIGHT: {
    name: "traffic-light",
    hebrew: "רמזור",
    english: "Traffic Light",
    emoji: "🚦",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  CROSSWALK: {
    name: "crosswalk",
    hebrew: "מעבר חציה",
    english: "Crosswalk",
    emoji: "🚶",
    color: "bg-gradient-to-br from-slate-400 to-slate-600",
  },
  LIFEGUARD: {
    name: "lifeguard",
    hebrew: "מציל",
    english: "Lifeguard",
    emoji: "🏊",
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
  },
};

export const ALL_PERSONAL_SAFETY = createItemsList(PERSONAL_SAFETY_ITEMS);
export const PERSONAL_SAFETY_PRONUNCIATIONS = createPronunciationDictionary(PERSONAL_SAFETY_ITEMS);
