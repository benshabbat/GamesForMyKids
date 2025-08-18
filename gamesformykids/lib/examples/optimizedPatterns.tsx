/**
 * ===============================================
 * דוגמה לשימוש בפתרונות נגד דופליקייטים
 * ===============================================
 */

// 1. שימוש ב-Game Config Factory
import { GAME_CONFIG_PRESETS, createGameConfig } from '@/lib/utils/gameConfigFactory';

// במקום לכתוב ידנית כל קונפיגורציה:
export const OPTIMIZED_GAME_CONFIGS = {
  colors: GAME_CONFIG_PRESETS.colors(),
  animals: GAME_CONFIG_PRESETS.animals(),
  shapes: GAME_CONFIG_PRESETS.shapes(),
  numbers: GAME_CONFIG_PRESETS.numbers(),
  
  // למשחק מותאם אישית:
  fruits: createGameConfig({
    title: "🍎 משחק פירות 🍌",
    subTitle: "למד פירות דרך שמיעה!",
    itemsTitle: "כל הפירות שנלמד:",
    itemsDescription: "לחץ על פרי כדי לשמוע את השם שלו!",
    challengeTitle: "איזה פרי שמעת?",
    challengeIcon: "🍎🍌🍊🥝",
    challengeDescription: "בחר את הפרי הנכון!",
    itemLabel: "פרי",
    itemType: "פרי",
    theme: "warm"
  })
};

// 2. שימוש ב-Hook Factory
import { createGameHook } from '@/lib/utils/hookFactory';
import { BaseGameItem } from '@/lib/types';
// import { ALL_COLORS } from '@/lib/constants/items/colors';
// import { ALL_ANIMALS } from '@/lib/constants/items/animals';

// Placeholder data until constants are created
const ALL_COLORS: BaseGameItem[] = [];
const ALL_ANIMALS: BaseGameItem[] = [];

// במקום useGenericGame:
export const useColorsGame = createGameHook(ALL_COLORS, 'colors');
export const useAnimalsGame = createGameHook(ALL_ANIMALS, 'animals');

// 3. שימוש ב-Context Factory
import { createGameContext } from '@/lib/utils/contextFactory';

interface ScoreContextValue {
  score: number;
  level: number;
  updateScore: (points: number) => void;
}

export const { Provider: ScoreProvider, useScore } = createGameContext<ScoreContextValue>('Score');

// שימוש בקומפוננט:
export function GameWithOptimizedContext() {
  const scoreValue: ScoreContextValue = {
    score: 100,
    level: 2,
    updateScore: (points) => console.log(`Adding ${points} points`)
  };

  return (
    <ScoreProvider value={scoreValue}>
      <GameComponent />
    </ScoreProvider>
  );
}

function GameComponent() {
  // Placeholder - using dummy values until proper context is implemented
  const score = 0;
  const level = 1;
  const updateScore = () => {
    // Placeholder function for updating score
  };
  
  return (
    <div>
      <p>Score: {score}</p>
      <p>Level: {level}</p>
      <button onClick={() => updateScore()}>Add 10 points</button>
    </div>
  );
}
