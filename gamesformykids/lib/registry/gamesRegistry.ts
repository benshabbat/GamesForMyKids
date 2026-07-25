import { Game } from "@/lib/types";
import { createElement } from "react";
import type { GameRegistration } from "@/lib/types/games/base";
export type { GameRegistration };
import { GAMES_REGISTRY } from "./gamesRegistryData";
import { applyGameOverrides, getGameOverridesCache } from "./gameOverrides";

// פונקציות עזר לעבודה עם המשחקים
export class GamesRegistry {
  // קבלת כל הרישומים המקוריים (מסונן/ממוין לפי game_overrides)
  static getAllGameRegistrations(): GameRegistration[] {
    const sorted = [...GAMES_REGISTRY].sort((a, b) => a.order - b.order);
    return applyGameOverrides(sorted, getGameOverridesCache());
  }

  // קבלת כל המשחקים ממוינים לפי סדר
  static getAllGames(): Game[] {
    return this.getAllGameRegistrations().map((game) => ({
      id: game.id,
      title: game.title,
      hebrew: game.title, // Same as title for now
      english: game.id, // Use id as English name
      description: game.description,
      icon: createElement(game.icon, { className: "w-8 h-8" }),
      color: game.color,
      href: game.href,
      available: game.available,
    }));
  }

  // קבלת רק המשחקים הזמינים
  static getAvailableGames(): Game[] {
    return this.getAllGames().filter((game) => game.available);
  }

  // קבלת מספר המשחקים הזמינים
  static getAvailableGamesCount(): number {
    return this.getAvailableGames().length;
  }

  // קבלת מספר כל המשחקים
  static getTotalGamesCount(): number {
    return GAMES_REGISTRY.length;
  }

  // הוספת משחק חדש
  static registerGame(game: GameRegistration): void {
    // בדיקה שהמשחק לא קיים כבר
    const existingGame = GAMES_REGISTRY.find((g) => g.id === game.id);
    if (existingGame) {
      console.warn(`משחק עם ID ${game.id} כבר קיים`);
      return;
    }

    GAMES_REGISTRY.push(game);
  }

  // עדכון סטטוס זמינות משחק
  static updateGameAvailability(gameId: string, available: boolean): void {
    const game = GAMES_REGISTRY.find((g) => g.id === gameId);
    if (game) {
      game.available = available;
    }
  }

  // קבלת משחק לפי ID
  static getGameById(gameId: string): GameRegistration | undefined {
    return GAMES_REGISTRY.find((g) => g.id === gameId);
  }
}
