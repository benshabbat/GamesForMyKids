import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { LucideIcon } from "lucide-react";

interface NewGameConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  available?: boolean;
  order?: number;
}

/**
 * פונקציה נוחה לרישום משחק חדש
 * הופכת את התהליך לפשוט ומהיר
 */
export function registerNewGame(config: NewGameConfig): void {
  const gameRegistration: GameRegistration = {
    id: config.id,
    title: config.title,
    description: config.description,
    icon: config.icon,
    color: config.color,
    href: `/games/${config.id}`,
    available: config.available ?? true, // ברירת מחדל זמין
    order: config.order ?? GamesRegistry.getTotalGamesCount() + 1, // ברירת מחדל בסוף
  };

  GamesRegistry.registerGame(gameRegistration);
}

/**
 * דוגמה לשימוש - הוספת משחק פירות:
 * 
 * import { Apple } from "lucide-react";
 * import { registerNewGame } from "@/lib/utils/gameRegistrationHelper";
 * 
 * registerNewGame({
 *   id: "fruits",
 *   title: "משחק פירות",
 *   description: "למד פירות!",
 *   icon: Apple,
 *   color: "bg-red-400 hover:bg-red-500",
 *   available: true,
 *   order: 6
 * });
 */

/**
 * פונקציה לעדכון סטטוס זמינות משחק
 */
export function toggleGameAvailability(gameId: string): void {
  const game = GamesRegistry.getGameById(gameId);
  if (game) {
    GamesRegistry.updateGameAvailability(gameId, !game.available);
  }
}

/**
 * פונקציה לקבלת סטטיסטיקות המשחקים
 */
export function getGamesStats() {
  return {
    total: GamesRegistry.getTotalGamesCount(),
    available: GamesRegistry.getAvailableGamesCount(),
    inDevelopment: GamesRegistry.getTotalGamesCount() - GamesRegistry.getAvailableGamesCount(),
    availableGames: GamesRegistry.getAvailableGames().map(g => g.title),
  };
}