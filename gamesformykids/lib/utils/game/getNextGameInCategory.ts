import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

export interface NextGameInfo {
  id: string;
  title: string;
  emoji: string;
  href: string;
}

export function getNextGameInCategory(gameType: string): NextGameInfo | null {
  for (const category of Object.values(GAME_CATEGORIES)) {
    const ids = category.gameIds;
    const idx = ids.indexOf(gameType);
    if (idx === -1) continue;
    const nextId = ids[(idx + 1) % ids.length];
    if (!nextId || nextId === gameType) continue;
    const reg = GamesRegistry.getGameById(nextId);
    if (!reg) continue;
    return { id: nextId, title: reg.title, emoji: reg.emoji, href: reg.href };
  }
  return null;
}
