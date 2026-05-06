'use client';

import { MathChallenge } from "@/lib/types";
import { BaseGameItem } from "@/lib/types/core/base";
import { speakHebrew } from "@/lib/utils/speech/enhancedSpeechUtils";
import { useGameAudio } from "@/hooks/shared/audio/useGameAudio";
import { delay, getRandomItem } from "@/lib/utils/game/gameUtils";
import { MATH_GAME_CONSTANTS } from "@/lib/constants";
import { useMathChallengeStore } from "@/lib/stores/mathChallengeStore";
import { useNumericQuizRuntime } from "@/hooks/games/useNumericQuizRuntime";

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

const MATH_ITEMS = [
  { emoji: "🍎", name: "תפוח", plural: "תפוחים" },
  { emoji: "🌟", name: "כוכב", plural: "כוכבים" },
  { emoji: "🐶", name: "כלב", plural: "כלבים" },
  { emoji: "🎈", name: "בלון", plural: "בלונים" },
  { emoji: "🍭", name: "סוכריה", plural: "סוכריות" },
  { emoji: "🦋", name: "פרפר", plural: "פרפרים" },
];

// ---------------------------------------------------------------------------
// Pure helpers (defined outside hook — stable references, no closures)
// ---------------------------------------------------------------------------

function getMaxNumber(level: number): number {
  return Math.min(
    MATH_GAME_CONSTANTS.BASE_MAX_NUMBER +
      Math.floor((level - 1) / MATH_GAME_CONSTANTS.LEVEL_THRESHOLD) *
        MATH_GAME_CONSTANTS.NUMBER_INCREMENT,
    MATH_GAME_CONSTANTS.ABSOLUTE_MAX_NUMBER,
  );
}

function generateMathChallenge(level: number): MathChallenge {
  const maxNumber = getMaxNumber(level);
  const item = getRandomItem(MATH_ITEMS);

  const operations = level >= 3 ? ['addition', 'subtraction'] : ['addition'];
  const operation = getRandomItem(operations) as 'addition' | 'subtraction';

  let firstNumber: number;
  let secondNumber: number;
  let correctAnswer: number;

  if (operation === 'addition') {
    firstNumber = Math.floor(Math.random() * (maxNumber - 1)) + 1;
    secondNumber = Math.floor(Math.random() * (maxNumber - firstNumber)) + 1;
    correctAnswer = firstNumber + secondNumber;
  } else {
    correctAnswer = Math.floor(Math.random() * maxNumber) + 1;
    secondNumber = Math.floor(Math.random() * correctAnswer) + 1;
    firstNumber = correctAnswer + secondNumber;
  }

  return {
    firstNumber, secondNumber, operation, correctAnswer,
    itemName: item.name, itemPlural: item.plural, emoji: item.emoji,
    operand1: firstNumber, operand2: secondNumber,
    operator: operation === 'addition' ? '+' : '-',
    answer: correctAnswer,
    question: `${firstNumber} ${operation === 'addition' ? '+' : '-'} ${secondNumber} = ?`,
  };
}

function generateMathOptions(correctAnswer: number, level: number): number[] {
  const maxNumber = getMaxNumber(level);
  const allNumbers = Array.from({ length: maxNumber + 5 }, (_, i) => i);
  const incorrectNumbers = allNumbers.filter(n => n !== correctAnswer);

  const close = incorrectNumbers.filter(n => Math.abs(n - correctAnswer) <= 3 && n >= 0);
  const pool = close.length >= 3
    ? close.sort(() => Math.random() - 0.5)
    : [...close, ...incorrectNumbers.filter(n => n >= 0)].sort(() => Math.random() - 0.5);

  return [...pool.slice(0, 3), correctAnswer].sort(() => Math.random() - 0.5);
}

function toChallengeItem(challenge: MathChallenge): BaseGameItem {
  const op = challenge.operation === 'addition' ? '+' : '-';
  const equation = `${challenge.firstNumber} ${op} ${challenge.secondNumber} = ?`;
  return { name: String(challenge.correctAnswer), hebrew: equation, english: equation, emoji: challenge.emoji, color: '#FF7043' };
}

function toOptionItem(n: number): BaseGameItem {
  return { name: String(n), hebrew: String(n), english: String(n), emoji: '🔢', color: '#FF7043' };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useMathGame() {
  const { speechEnabled } = useGameAudio();

  const speakMathQuestion = async (challenge: MathChallenge): Promise<void> => {
    if (!speechEnabled) return;
    try {
      const operationText = challenge.operation === 'addition' ? 'ועוד' : 'פחות';
      await speakHebrew(`${challenge.firstNumber} ${challenge.itemPlural} ${operationText} ${challenge.secondNumber} ${challenge.itemPlural}, `);
      await delay(500);
      await speakHebrew(`כמה ${challenge.itemPlural} יש?`);
    } catch (error) {
      console.error("שגיאה בהשמעת השאלה:", error);
    }
  };

  const { gameState, startGame, handleNumberClick, handleItemClick, speakItemName, resetGame } =
    useNumericQuizRuntime<MathChallenge>({
      generateChallenge: generateMathChallenge,
      generateOptions: generateMathOptions,
      speakQuestion: speakMathQuestion,
      toChallengeItem,
      toOptionItem,
      onChallengeChange: (challenge) => useMathChallengeStore.getState().setChallenge(challenge),
    });

  return {
    // For the dedicated app/games/math/page.tsx
    gameState,
    speakQuestion: () =>
      gameState.currentChallenge ? speakMathQuestion(gameState.currentChallenge) : Promise.resolve(),
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
