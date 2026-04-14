import type { GameType } from '@/lib/types/core/base';
import { SUPPORTED_GAMES, URL_TO_GAME_TYPE_MAP, type SupportedGameType } from './gamePageConstants';

/** ממיר URL slug ל-GameType — מטפל במיפויים מיוחדים */
export function resolveGameType(urlSlug: string): GameType {
  return (URL_TO_GAME_TYPE_MAP[urlSlug] ?? urlSlug) as GameType;
}

/** מחזיר true אם המשחק נמצא ברשימת המשחקים הנתמכים */
export function isSupportedGame(gameType: GameType): gameType is SupportedGameType {
  return (SUPPORTED_GAMES as ReadonlyArray<string>).includes(gameType);
}

/** מחזיר את כל ה-static params כולל מיפויי URL */
export function buildStaticParams(): { gameType: string }[] {
  const direct = SUPPORTED_GAMES.map((gameType) => ({ gameType }));
  const mapped = Object.keys(URL_TO_GAME_TYPE_MAP).map((gameType) => ({ gameType }));
  return [...direct, ...mapped];
}
