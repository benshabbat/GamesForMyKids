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

import { useEffect } from 'react';
import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import { useGameEffects } from '@/hooks/shared/game-state/useGameEffects';
import { useAutoGameConfig } from '@/hooks/shared/game-state/useGameConfig';
import { useGameActionsStore } from '@/lib/stores/gameActionsStore';
import { GameType } from '@/lib/types/core/base';
import { AutoGameType } from '@/lib/constants/gameHooksMap';

// רכיבים מפורקים
import { GameLoadingScreen } from "../../shared";
import { GameErrorScreen } from "../../shared";
import { AutoStartScreen } from "../../shared";
import { GameHeaderSection } from "../../shared";
import GameMainContent from "../../shared/GameMainContent";
import { SimpleProgressDisplay } from "../../shared";

interface UltimateGamePageProps {
  gameType?: AutoGameType | GameType;
}

/**
 * Separate component: runs the game-specific hook and syncs actions to the store.
 * MUST be rendered as a SIBLING of UltimateGamePage (not a child) so that
 * UltimateGamePage re-renders (from gameActionsStore subscription) don't
 * cascade into GameLogicSync and trigger an infinite effect loop.
 */
export function GameLogicSync({ gameType }: { gameType?: AutoGameType | GameType }) {
  const { useGameHook } = useAutoGameConfig(gameType);
  const gameHookResult = useGameHook();

  // No dependency array — syncs on every render of THIS component only.
  // This component doesn't subscribe to the store, so no infinite loop.
  useEffect(() => {
    useGameActionsStore.getState().setGameActions({
      startGame: gameHookResult.startGame,
      resetGame: gameHookResult.resetGame,
      handleItemClick: gameHookResult.handleItemClick,
      speakItemName: gameHookResult.speakItemName,
      hints: gameHookResult.hints?.map(
        (h: string | { text?: string }) => (typeof h === 'string' ? h : h.text || ''),
      ) ?? [],
      hasMoreHints: gameHookResult.hasMoreHints ?? false,
      showNextHint: gameHookResult.showNextHint ?? (() => {}),
      currentAccuracy: gameHookResult.currentAccuracy ?? 0,
    });
  });

  return null;
}

/**
 * 🎯 הקומפוננט הסופי - אפס props drilling, הכל מ-Zustand!
 */
export function UltimateGamePage({ gameType }: UltimateGamePageProps = {}) {
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
    return (
      <div style={{ background: game.config.colors?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="min-h-screen">
        <AutoStartScreen />
      </div>
    );
  }

  // 🎮 Main Game
  return (
    <div 
      className="min-h-screen p-4"
      style={{ background: game.config.colors?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* 🎯 Game Header Section */}
        <GameHeaderSection />

        {/*  Game Content */}
        <GameMainContent />

        {/* 📊 Progress Modal */}
        <SimpleProgressDisplay />
      </div>
    </div>
  );
}

/**
 * 🎯 גרסה מינימלית לטסטים
 */
export function MinimalGamePage() {
  const game = useUniversalGame();
  
  if (!game.isReady) return <div className="p-8 text-center">טוען...</div>;
  if (game.error) return <div className="p-8 text-center text-red-500">שגיאה: {game.error}</div>;
  if (!game.isPlaying) return <div className="p-8 text-center"><button onClick={game.startGame} className="px-4 py-2 bg-blue-500 text-white rounded">התחל משחק</button></div>;
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{game.config.title}</h1>
      <p className="mb-4">ניקוד: {game.score} | רמה: {game.level}</p>
      {game.currentChallenge && (
        <div className="mb-4 p-4 bg-blue-100 rounded">
          <p>מה זה: {game.currentChallenge.hebrew}</p>
          <button onClick={() => game.speakItemName(game.currentChallenge!.name)} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">🔊</button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {game.options.map((item, index) => (
          <button
            key={index}
            onClick={() => game.handleItemClick(item)}
            className="p-4 border rounded hover:bg-gray-100"
          >
            {item.hebrew}
          </button>
        ))}
      </div>
    </div>
  );
}
