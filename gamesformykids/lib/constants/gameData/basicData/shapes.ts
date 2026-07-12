import { BaseGameItem } from "@/lib/types/core/base";
import { createGameConfig, createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SHAPE_CONSTANTS: Record<string, BaseGameItem> = {
  CIRCLE: { name: "circle", hebrew: "עיגול", hebrewNikud: "עִגּוּל", english: "Circle", emoji: "⭕", color: "bg-blue-500", sound: [523, 659, 784], svg: "circle" },
  SQUARE: { name: "square", hebrew: "ריבוע", hebrewNikud: "רִבּוּעַ", english: "Square", emoji: "⬜", color: "bg-red-500", sound: [440, 550, 660], svg: "square" },
  TRIANGLE: { name: "triangle", hebrew: "משולש", hebrewNikud: "מְשֻׁלָּשׁ", english: "Triangle", emoji: "🔺", color: "bg-green-500", sound: [349, 440, 523], svg: "triangle" },
  RECTANGLE: { name: "rectangle", hebrew: "מלבן", hebrewNikud: "מַלְבֵּן", english: "Rectangle", emoji: "▬", color: "bg-purple-500", sound: [294, 370, 440], svg: "rectangle" },
  STAR: { name: "star", hebrew: "כוכב", hebrewNikud: "כּוֹכָב", english: "Star", emoji: "⭐", color: "bg-yellow-500", sound: [392, 494, 587], svg: "star" },
  HEART: { name: "heart", hebrew: "לב", hebrewNikud: "לֵב", english: "Heart", emoji: "❤️", color: "bg-pink-500", sound: [587, 698, 784], svg: "heart" },
  DIAMOND: { name: "diamond", hebrew: "מעויין", hebrewNikud: "מְעֻיָּן", english: "Diamond", emoji: "💎", color: "bg-indigo-500", sound: [277, 349, 415], svg: "diamond" },
  OVAL: { name: "oval", hebrew: "אליפסה", hebrewNikud: "אֶלִיפְּסָה", english: "Oval", emoji: "⭕", color: "bg-teal-500", sound: [220, 277, 330], svg: "oval" }
};

export const ALL_SHAPES = createItemsList(SHAPE_CONSTANTS);
export const SHAPE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SHAPE_CONSTANTS);
export const SHAPE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;

// ─── Colored shapes ────────────────────────────────────────────────────────

export interface ColoredShapeGameItem extends BaseGameItem {
  readonly shape: string;
  readonly colorName?: string;
  readonly svgPath?: string;
  readonly shapeHebrew?: string;
  readonly value?: string;
  readonly tailwindClass?: string;
}

export const COLORED_SHAPES_CONSTANTS: Record<string, ColoredShapeGameItem> = {
  RED_CIRCLE: { name: "red_circle", hebrew: "עיגול אדום", hebrewNikud: "עִגּוּל אָדֹם", english: "Red Circle", emoji: "🔴", color: "bg-gradient-to-br from-red-400 to-red-600", sound: [440, 550, 660], shape: "circle", shapeHebrew: "עיגול", svg: "circle", value: "#ef4444", tailwindClass: "bg-red-500" },
  BLUE_CIRCLE: { name: "blue_circle", hebrew: "עיגול כחול", hebrewNikud: "עִגּוּל כָּחֹל", english: "Blue Circle", emoji: "🔵", color: "bg-gradient-to-br from-blue-400 to-blue-600", sound: [523, 659, 784], shape: "circle", shapeHebrew: "עיגול", svg: "circle", value: "#3b82f6", tailwindClass: "bg-blue-500" },
  GREEN_CIRCLE: { name: "green_circle", hebrew: "עיגול ירוק", hebrewNikud: "עִגּוּל יָרֹק", english: "Green Circle", emoji: "🟢", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [349, 440, 523], shape: "circle", shapeHebrew: "עיגול", svg: "circle", value: "#10b981", tailwindClass: "bg-green-500" },
  YELLOW_CIRCLE: { name: "yellow_circle", hebrew: "עיגול צהוב", hebrewNikud: "עִגּוּל צָהֹב", english: "Yellow Circle", emoji: "🟡", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [392, 494, 587], shape: "circle", shapeHebrew: "עיגול", svg: "circle", value: "#eab308", tailwindClass: "bg-yellow-500" },
  RED_SQUARE: { name: "red_square", hebrew: "ריבוע אדום", hebrewNikud: "רִבּוּעַ אָדֹם", english: "Red Square", emoji: "🟥", color: "bg-gradient-to-br from-red-400 to-red-600", sound: [440, 550, 660], shape: "square", shapeHebrew: "ריבוע", svg: "square", value: "#ef4444", tailwindClass: "bg-red-500" },
  BLUE_SQUARE: { name: "blue_square", hebrew: "ריבוע כחול", hebrewNikud: "רִבּוּעַ כָּחֹל", english: "Blue Square", emoji: "🟦", color: "bg-gradient-to-br from-blue-400 to-blue-600", sound: [523, 659, 784], shape: "square", shapeHebrew: "ריבוע", svg: "square", value: "#3b82f6", tailwindClass: "bg-blue-500" },
  GREEN_SQUARE: { name: "green_square", hebrew: "ריבוע ירוק", hebrewNikud: "רִבּוּעַ יָרֹק", english: "Green Square", emoji: "🟩", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [349, 440, 523], shape: "square", shapeHebrew: "ריבוע", svg: "square", value: "#10b981", tailwindClass: "bg-green-500" },
  YELLOW_SQUARE: { name: "yellow_square", hebrew: "ריבוע צהוב", hebrewNikud: "רִבּוּעַ צָהֹב", english: "Yellow Square", emoji: "🟨", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [392, 494, 587], shape: "square", shapeHebrew: "ריבוע", svg: "square", value: "#eab308", tailwindClass: "bg-yellow-500" },
  GREEN_TRIANGLE: { name: "green_triangle", hebrew: "משולש ירוק", hebrewNikud: "מְשֻׁלָּשׁ יָרֹק", english: "Green Triangle", emoji: "🔺", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [349, 440, 523], shape: "triangle", shapeHebrew: "משולש", svg: "triangle", value: "#10b981", tailwindClass: "bg-green-500" },
  PURPLE_TRIANGLE: { name: "purple_triangle", hebrew: "משולש סגול", hebrewNikud: "מְשֻׁלָּשׁ סָגֹל", english: "Purple Triangle", emoji: "🔺", color: "bg-gradient-to-br from-purple-400 to-purple-600", sound: [294, 370, 440], shape: "triangle", shapeHebrew: "משולש", svg: "triangle", value: "#a855f7", tailwindClass: "bg-purple-500" },
  YELLOW_STAR: { name: "yellow_star", hebrew: "כוכב צהוב", hebrewNikud: "כּוֹכָב צָהֹב", english: "Yellow Star", emoji: "⭐", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [392, 494, 587], shape: "star", shapeHebrew: "כוכב", svg: "star", value: "#eab308", tailwindClass: "bg-yellow-500" },
  PINK_HEART: { name: "pink_heart", hebrew: "לב ורוד", hebrewNikud: "לֵב וָרֹד", english: "Pink Heart", emoji: "💗", color: "bg-gradient-to-br from-pink-400 to-pink-600", sound: [587, 698, 784], shape: "heart", shapeHebrew: "לב", svg: "heart", value: "#ec4899", tailwindClass: "bg-pink-500" },
};

export const ALL_COLORED_SHAPES = createItemsList(COLORED_SHAPES_CONSTANTS);
export const COLORED_SHAPES_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(COLORED_SHAPES_CONSTANTS);
export const COLORED_SHAPES_GAME_CONSTANTS = createGameConfig(6, 1, 4);
