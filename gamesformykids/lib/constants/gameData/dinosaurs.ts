/**
 * נתוני המשחקים - דינוזאורים ופרהיסטוריה
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני דינוזאורים פופולריים
 * ===============================================
 */
export const DINOSAURS_CONSTANTS: Record<string, BaseGameItem> = {
  TRICERATOPS: { name: "triceratops", hebrew: "טריצרטופס", english: "Triceratops", emoji: "🦕", color: "bg-green-600", sound: [440, 550, 660] },
  TYRANNOSAURUS: { name: "tyrannosaurus", hebrew: "טירנוזאורוס רקס", english: "Tyrannosaurus Rex", emoji: "🦖", color: "bg-red-600", sound: [392, 494, 587] },
  STEGOSAURUS: { name: "stegosaurus", hebrew: "סטגוזאורוס", english: "Stegosaurus", emoji: "🦕", color: "bg-orange-600", sound: [349, 440, 523] },
  BRACHIOSAURUS: { name: "brachiosaurus", hebrew: "ברכיוזאורוס", english: "Brachiosaurus", emoji: "🦕", color: "bg-brown-500", sound: [523, 659, 784] },
  VELOCIRAPTOR: { name: "velociraptor", hebrew: "ולוסירפטור", english: "Velociraptor", emoji: "🦖", color: "bg-gray-700", sound: [294, 370, 440] },
  DIPLODOCUS: { name: "diplodocus", hebrew: "דיפלודוקוס", english: "Diplodocus", emoji: "🦕", color: "bg-green-500", sound: [330, 415, 494] },
  PTERANODON: { name: "pteranodon", hebrew: "פטרנודון", english: "Pteranodon", emoji: "🦅", color: "bg-blue-500", sound: [587, 698, 784] },
  ANKYLOSAURUS: { name: "ankylosaurus", hebrew: "אנקילוזאורוס", english: "Ankylosaurus", emoji: "🦕", color: "bg-gray-600", sound: [196, 247, 294] },
  SPINOSAURUS: { name: "spinosaurus", hebrew: "ספינוזאורוס", english: "Spinosaurus", emoji: "🦖", color: "bg-purple-600", sound: [659, 831, 988] },
  ALLOSAURUS: { name: "allosaurus", hebrew: "אלוזאורוס", english: "Allosaurus", emoji: "🦖", color: "bg-red-500", sound: [277, 349, 415] },
  PARASAUROLOPHUS: { name: "parasaurolophus", hebrew: "פרזאורולופוס", english: "Parasaurolophus", emoji: "🦕", color: "bg-yellow-500", sound: [415, 523, 622] },
  COMPSOGNATHUS: { name: "compsognathus", hebrew: "קומפסוגנתוס", english: "Compsognathus", emoji: "🦖", color: "bg-green-300", sound: [220, 277, 330] },
};

/**
 * ===============================================
 * נתוני סוגי דינוזאורים
 * ===============================================
 */
export const DINOSAUR_TYPES_CONSTANTS: Record<string, BaseGameItem> = {
  HERBIVORE: { name: "herbivore", hebrew: "צמחוני", english: "Herbivore", emoji: "🌿", color: "bg-green-400", sound: [440, 550, 660] },
  CARNIVORE: { name: "carnivore", hebrew: "טורף", english: "Carnivore", emoji: "🥩", color: "bg-red-500", sound: [392, 494, 587] },
  OMNIVORE: { name: "omnivore", hebrew: "אוכל הכל", english: "Omnivore", emoji: "🍽️", color: "bg-orange-400", sound: [349, 440, 523] },
  FLYING: { name: "flying", hebrew: "מעופף", english: "Flying", emoji: "🦅", color: "bg-blue-400", sound: [523, 659, 784] },
  SWIMMING: { name: "swimming", hebrew: "שוחה", english: "Swimming", emoji: "🏊", color: "bg-cyan-500", sound: [294, 370, 440] },
  LARGE: { name: "large", hebrew: "גדול", english: "Large", emoji: "📏", color: "bg-purple-500", sound: [330, 415, 494] },
  SMALL: { name: "small", hebrew: "קטן", english: "Small", emoji: "🔍", color: "bg-yellow-400", sound: [587, 698, 784] },
  ARMORED: { name: "armored", hebrew: "משוריין", english: "Armored", emoji: "🛡️", color: "bg-gray-600", sound: [196, 247, 294] },
};

/**
 * ===============================================
 * נתוני תקופות פרהיסטוריות
 * ===============================================
 */
export const PREHISTORIC_PERIODS_CONSTANTS: Record<string, BaseGameItem> = {
  TRIASSIC: { name: "triassic", hebrew: "טריאס", english: "Triassic", emoji: "🌋", color: "bg-red-400", sound: [440, 550, 660] },
  JURASSIC: { name: "jurassic", hebrew: "יורה", english: "Jurassic", emoji: "🦕", color: "bg-green-500", sound: [392, 494, 587] },
  CRETACEOUS: { name: "cretaceous", hebrew: "קרטיקון", english: "Cretaceous", emoji: "🦖", color: "bg-brown-500", sound: [349, 440, 523] },
  PALEOZOIC: { name: "paleozoic", hebrew: "פלאוזואיקון", english: "Paleozoic", emoji: "🐟", color: "bg-blue-400", sound: [523, 659, 784] },
  MESOZOIC: { name: "mesozoic", hebrew: "מזוזואיקון", english: "Mesozoic", emoji: "🦴", color: "bg-orange-400", sound: [294, 370, 440] },
  CENOZOIC: { name: "cenozoic", hebrew: "קנוזואיקון", english: "Cenozoic", emoji: "🐘", color: "bg-yellow-500", sound: [330, 415, 494] },
};

/**
 * ===============================================
 * נתוני מאובנים וחפירות
 * ===============================================
 */
export const FOSSILS_CONSTANTS: Record<string, BaseGameItem> = {
  FOSSIL: { name: "fossil", hebrew: "מאובן", english: "Fossil", emoji: "🦴", color: "bg-brown-400", sound: [440, 550, 660] },
  SKELETON: { name: "skeleton", hebrew: "שלד", english: "Skeleton", emoji: "💀", color: "bg-gray-300", sound: [392, 494, 587] },
  BONE: { name: "bone", hebrew: "עצם", english: "Bone", emoji: "🦴", color: "bg-white", sound: [349, 440, 523] },
  TOOTH: { name: "tooth", hebrew: "שן", english: "Tooth", emoji: "🦷", color: "bg-gray-100", sound: [523, 659, 784] },
  CLAW: { name: "claw", hebrew: "טופר", english: "Claw", emoji: "🦅", color: "bg-black", sound: [294, 370, 440] },
  EXCAVATION: { name: "excavation", hebrew: "חפירה", english: "Excavation", emoji: "⛏️", color: "bg-brown-600", sound: [330, 415, 494] },
  PALEONTOLOGIST: { name: "paleontologist", hebrew: "פלאונטולוג", english: "Paleontologist", emoji: "👨‍🔬", color: "bg-blue-500", sound: [587, 698, 784] },
  MUSEUM: { name: "museum", hebrew: "מוזיאון", english: "Museum", emoji: "🏛️", color: "bg-purple-400", sound: [196, 247, 294] },
  AMBER: { name: "amber", hebrew: "ענבר", english: "Amber", emoji: "🟡", color: "bg-yellow-600", sound: [659, 831, 988] },
  SEDIMENT: { name: "sediment", hebrew: "משקע", english: "Sediment", emoji: "🪨", color: "bg-gray-500", sound: [277, 349, 415] },
};

// ייצוא רשימות והגדרות
export const DINOSAURS_ITEMS = createItemsList(DINOSAURS_CONSTANTS);
export const DINOSAURS_PRONUNCIATIONS = createPronunciationDictionary(DINOSAURS_CONSTANTS);
export const DINOSAURS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "דינוזאורים",
  description: "למד על דינוזאורים מדהימים מהעבר!"
};

export const DINOSAUR_TYPES_ITEMS = createItemsList(DINOSAUR_TYPES_CONSTANTS);
export const DINOSAUR_TYPES_PRONUNCIATIONS = createPronunciationDictionary(DINOSAUR_TYPES_CONSTANTS);
export const DINOSAUR_TYPES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "סוגי דינוזאורים",
  description: "למד על הסוגים השונים של דינוזאורים!"
};

export const PREHISTORIC_PERIODS_ITEMS = createItemsList(PREHISTORIC_PERIODS_CONSTANTS);
export const PREHISTORIC_PERIODS_PRONUNCIATIONS = createPronunciationDictionary(PREHISTORIC_PERIODS_CONSTANTS);
export const PREHISTORIC_PERIODS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "תקופות פרהיסטוריות",
  description: "למד על התקופות השונות בהיסטוריה!"
};

export const FOSSILS_ITEMS = createItemsList(FOSSILS_CONSTANTS);
export const FOSSILS_PRONUNCIATIONS = createPronunciationDictionary(FOSSILS_CONSTANTS);
export const FOSSILS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "מאובנים וחפירות",
  description: "למד על מאובנים וחקר הפרהיסטוריה!"
};