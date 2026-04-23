"use client";

'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getGameNavigation } from "@/lib/utils/game/gameNavigation";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import { ROUTES } from "@/lib/constants/routes";

interface UseUniversalGameNavigationOptions {
  showHomeButton?: boolean;
}

export interface UseUniversalGameNavigationReturn {
  gameId: string;
  currentGame: ReturnType<typeof GamesRegistry.getGameById>;
  navigation: ReturnType<typeof getGameNavigation>;
  /** אם false — הקומפוננט לא צריך לרנדר כלום */
  shouldRender: boolean;
}

/**
 * לוגיקת הניווט האוניברסלי:
 * - מחלץ את ה-gameId מה-URL
 * - מוצא את המשחק הנוכחי
 * - מחשב קישורי קודם/הבא
 * - מאזין ל-Escape לחזרה הביתה
 */
export function useUniversalGameNavigation({
  showHomeButton = true,
}: UseUniversalGameNavigationOptions = {}): UseUniversalGameNavigationReturn {
  const pathname = usePathname();
  const router = useRouter();

  // Extract the game ID as the segment immediately after "/games/",
  // not the last segment (which may be a sub-route like "/alef").
  const pathSegments = pathname.split("/");
  const gamesIndex = pathSegments.indexOf("games");
  const gameId = gamesIndex >= 0 ? pathSegments[gamesIndex + 1] || "" : "";
  const currentGame = GamesRegistry.getGameById(gameId);
  const navigation = getGameNavigation(gameId);

  const shouldRender = Boolean(gameId && currentGame && gameId !== "games");

  useEffect(() => {
    if (!currentGame || !showHomeButton) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push(ROUTES.HOME);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHomeButton, currentGame]);

  return { gameId, currentGame, navigation, shouldRender };
}
