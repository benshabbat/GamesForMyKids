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
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { getQuizGameComponent } from '@/lib/quiz/quizGameRegistry';

import { GameLoadingScreen } from "../../../shared";
import { GameErrorScreen } from "../../../shared";
import { GameHeaderSection } from "../../../shared";
import GameMainContent from "../../../shared/GameMainContent";
import { ContextProgressDisplay } from "../../../shared";
import { UltimateStartScreen } from "./UltimateStartScreen";
import SpeedBurstTimer from "../../shared/SpeedBurstTimer";
import { useSpeedBurstStore } from '@/lib/stores/speedBurstStore';
import AdaptiveDifficultyBanner from "../../shared/AdaptiveDifficultyBanner";

// Re-export co-located components for convenience
export { GameLogicSync } from './GameLogicSync';

const DEFAULT_BG = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

/**
 * 🎯 נקודת כניסה אחת לכל המשחקים שאינם custom.
 * - משחקי חידון (quiz) → מועברים ל-QuizGameRouter הרלוונטי
 * - משחקי כרטיסים → CardGamePage (הלוגיקה המקורית)
 */
export function UltimateGamePage() {
  const gameType = useGameTypeStore(s => s.currentGameType);

  if (!gameType) return null;

  const QuizComponent = getQuizGameComponent(gameType);
  if (QuizComponent) return <QuizComponent />;

  return <CardGamePage />;
}

/**
 * Card-game rendering — original UltimateGamePage logic.
 * Hooks here are always called unconditionally (Rules of Hooks safe).
 */
function CardGamePage() {
  // ⚙️ Side effects: timer + progress reset
  useGameEffects();

  // 🎮 כל מה שצריך בשורה אחת!
  const game = useUniversalGame();
  const speedEnabled = useSpeedBurstStore((s) => s.enabled);

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
      {speedEnabled && <SpeedBurstTimer gameType={String(game.gameType)} />}
      <AdaptiveDifficultyBanner />
      <div className={`max-w-5xl mx-auto ${speedEnabled ? 'pt-8' : ''}`}>
        <GameHeaderSection />
        <GameMainContent />
        <ContextProgressDisplay />
      </div>
    </div>
  );
}
