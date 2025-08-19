import { GamesRegistry, GameRegistration } from '@/lib/registry/gamesRegistry';

export interface NavigationGame {
  href: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function getGameNavigation(currentGameId: string): {
  previous?: NavigationGame;
  next?: NavigationGame;
} {
  const allGames = GamesRegistry.getAllGameRegistrations().filter(game => game.available);
  const currentIndex = allGames.findIndex((game: GameRegistration) => game.id === currentGameId);
  
  if (currentIndex === -1) {
    return {};
  }

  const previous = currentIndex > 0 ? allGames[currentIndex - 1] : undefined;
  const next = currentIndex < allGames.length - 1 ? allGames[currentIndex + 1] : undefined;

  return {
    previous: previous ? {
      href: previous.href,
      title: previous.title,
      icon: previous.icon
    } : undefined,
    next: next ? {
      href: next.href,
      title: next.title,
      icon: next.icon
    } : undefined
  };
}
