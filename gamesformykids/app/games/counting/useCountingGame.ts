'use client';

import { CountingChallenge, CountingGameState } from "@/lib/types/games";
import { BaseGameItem } from "@/lib/types/core/base";
import { speakHebrew } from "@/lib/utils/speech/enhancedSpeechUtils";
import { useGameAudio } from "@/hooks/shared/audio/useGameAudio";
import { getRandomItem } from "@/lib/utils/game/gameUtils";
import { COUNTING_GAME_CONSTANTS } from "@/lib/constants";
import { useCountingChallengeStore } from "@/lib/stores/countingChallengeStore";
import { useNumericQuizRuntime } from "@/hooks/games/useNumericQuizRuntime";

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

const COUNTING_ITEMS = [
  { emoji: "🐶", name: "כלב", plural: "כלבים" },
  { emoji: "🐱", name: "חתול", plural: "חתולים" },
  { emoji: "🍎", name: "תפוח", plural: "תפוחים" },
  { emoji: "🌟", name: "כוכב", plural: "כוכבים" },
  { emoji: "⚽", name: "כדור", plural: "כדורים" },
  { emoji: "🌸", name: "פרח", plural: "פרחים" },
  { emoji: "🎈", name: "בלון", plural: "בלונים" },
  { emoji: "🦋", name: "פרפר", plural: "פרפרים" },
  { emoji: "🍊", name: "תפוז", plural: "תפוזים" },
  { emoji: "🧸", name: "דובי", plural: "דובים" },
  { emoji: "🏀", name: "כדורסל", plural: "כדורי סל" },
  { emoji: "🎀", name: "סרט", plural: "סרטים" },
];

// ---------------------------------------------------------------------------
// Pure helpers (defined outside hook — stable references, no closures)
// ---------------------------------------------------------------------------

function getMaxCount(level: number): number {
  return Math.min(
    COUNTING_GAME_CONSTANTS.BASE_COUNT +
      Math.floor((level - 1) / COUNTING_GAME_CONSTANTS.LEVEL_THRESHOLD) *
        COUNTING_GAME_CONSTANTS.INCREMENT,
    15,
  );
}

function generateCountingChallenge(level: number): CountingChallenge {
  const maxCount = getMaxCount(level);
  const count = Math.floor(Math.random() * maxCount) + 1;
  const item = getRandomItem(COUNTING_ITEMS);
  return {
    emojis: item.emoji.repeat(count),
    answer: count,
    itemName: item.name,
    itemPlural: item.plural,
    emoji: item.emoji,
  };
}

function generateCountingOptions(correctAnswer: number, level: number): number[] {
  const maxCount = getMaxCount(level);
  const allNumbers = Array.from({ length: maxCount }, (_, i) => i + 1);
  const incorrect = allNumbers
    .filter(n => n !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [...incorrect, correctAnswer].sort(() => Math.random() - 0.5);
}

function toChallengeItem(challenge: CountingChallenge): BaseGameItem {
  return {
    name: String(challenge.answer),
    hebrew: `כמה ${challenge.itemPlural} יש?`,
    english: `How many ${challenge.itemPlural}?`,
    emoji: challenge.emoji,
    color: '#06b6d4',
  };
}

function toOptionItem(n: number): BaseGameItem {
  return { name: String(n), hebrew: String(n), english: String(n), emoji: '', color: '#06b6d4' };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCountingGame() {
  const { speechEnabled } = useGameAudio();

  const speakCountingQuestion = async (challenge: CountingChallenge): Promise<void> => {
    if (!speechEnabled) return;
    try {
      await speakHebrew(`כמה ${challenge.itemPlural} יש?`);
    } catch (error) {
      console.error("שגיאה בהשמעת השאלה:", error);
    }
  };

  const { gameState, startGame, handleNumberClick, handleItemClick, speakItemName, resetGame } =
    useNumericQuizRuntime<CountingChallenge>({
      generateChallenge: generateCountingChallenge,
      generateOptions: generateCountingOptions,
      speakQuestion: speakCountingQuestion,
      toChallengeItem,
      toOptionItem,
      onChallengeChange: (challenge) => useCountingChallengeStore.getState().setChallenge(challenge),
    });

  return {
    // For the dedicated app/games/counting/page.tsx
    gameState: gameState as CountingGameState,
    speakQuestion: () =>
      gameState.currentChallenge ? speakCountingQuestion(gameState.currentChallenge) : Promise.resolve(),
    startGame,
    handleNumberClick,
    resetGame,
    // For the universal UltimateGamePage / GameLogicSync
    handleItemClick,
    speakItemName,
    hints: [] as string[],
    hasMoreHints: false,
    showNextHint: () => {},
    currentAccuracy: 0,
  };
}
