import { BaseGameItem } from "@/lib/types/core/base";

/**
 * ===============================================
 * נתוני משחק מערכת השמש
 * ===============================================
 */
export const SOLAR_SYSTEM_ITEMS: BaseGameItem[] = [
  { name: "sun",      hebrew: "השמש",          english: "Sun",      emoji: "☀️", color: "bg-yellow-500" },
  { name: "mercury",  hebrew: "כוכב חמה",       english: "Mercury",  emoji: "⚫", color: "bg-stone-500" },
  { name: "venus",    hebrew: "נוגה",           english: "Venus",    emoji: "🟡", color: "bg-amber-400" },
  { name: "earth",    hebrew: "כדור הארץ",      english: "Earth",    emoji: "🌍", color: "bg-blue-600" },
  { name: "mars",     hebrew: "מאדים",          english: "Mars",     emoji: "🔴", color: "bg-red-600" },
  { name: "jupiter",  hebrew: "צדק",            english: "Jupiter",  emoji: "🟠", color: "bg-orange-400" },
  { name: "saturn",   hebrew: "שבתאי",          english: "Saturn",   emoji: "🪐", color: "bg-yellow-700" },
  { name: "uranus",   hebrew: "אורנוס",         english: "Uranus",   emoji: "🔵", color: "bg-teal-400" },
  { name: "neptune",  hebrew: "נפטון",          english: "Neptune",  emoji: "🔵", color: "bg-blue-800" },
  { name: "moon",     hebrew: "הירח",           english: "Moon",     emoji: "🌕", color: "bg-gray-400" },
  { name: "pluto",    hebrew: "פלוטו",          english: "Pluto",    emoji: "⚪", color: "bg-stone-300" },
  { name: "comet",    hebrew: "שביט",           english: "Comet",    emoji: "☄️", color: "bg-sky-800" },
];
