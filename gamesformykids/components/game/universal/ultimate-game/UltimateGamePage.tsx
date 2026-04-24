/**
 * ===============================================
 * Ultimate Game Page - הקומפוננט הסופי! 🎯
 * ===============================================
 *
 * קומפוננט יחיד שמחליף את כל האחרים:
 * - אפס props drilling
 * - Hook יחיד בלבד
 * - כל הלוגיקה בקונטקסט
 * - פשוט, נקי ויעיל
 */

"use client";

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import { useGameEffects } from '@/hooks/shared/game-state/useGameEffects';

import { GameLoadingScreen } from "../../../shared";
import { GameErrorScreen } from "../../../shared";
import { GameHeaderSection } from "../../../shared";
import GameMainContent from "../../../shared/GameMainContent";
import { SimpleProgressDisplay } from "../../../shared";
import { UltimateStartScreen } from "./UltimateStartScreen";

// Re-export co-located components for convenience
export { GameLogicSync } from './GameLogicSync';

const DEFAULT_BG = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

/**
 * 🎯 הקומפוננט הסופי - אפס props drilling, הכל מ-Zustand!
 * קורא game type ישירות מ-useGameTypeStore (seed על ידי GameTypeProvider).
 */
export function UltimateGamePage() {
  // ⚙️ Side effects: timer + progress reset
  useGameEffects();

  // 🎮 כל מה שצריך בשורה אחת!
  const game = useUniversalGame();

  // 🔄 Loading
  if (!game.isReady) {
    return <GameLoadingScreen />;
  }

  // ❌ Error
  if (game.error) {
    return <GameErrorScreen message={game.error} />;
  }

  // 🏠 Start Screen
  if (!game.gameState || !game.isPlaying) {
    return <UltimateStartScreen />;
  }

  // 🎮 Main Game
  return (
    <div
      className="min-h-screen p-4"
      style={{ background: game.config.colors?.background || DEFAULT_BG }}
    >
      <div className="max-w-5xl mx-auto">
        <GameHeaderSection />
        <GameMainContent />
        <SimpleProgressDisplay />
      </div>
    </div>
  );
}
