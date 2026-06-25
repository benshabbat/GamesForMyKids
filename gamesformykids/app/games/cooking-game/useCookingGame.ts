'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

interface Ingredient { name: string; emoji: string; label: string; plural: string; }

export const INGREDIENTS: Record<string, Ingredient> = {
  egg:       { name: 'egg',       emoji: '🥚', label: 'ביצה',          plural: 'ביצים' },
  tomato:    { name: 'tomato',    emoji: '🍅', label: 'עגבנייה',        plural: 'עגבניות' },
  cheese:    { name: 'cheese',    emoji: '🧀', label: 'גבינה',          plural: 'גבינה' },
  flour:     { name: 'flour',     emoji: '🌾', label: 'קמח',            plural: 'קמח' },
  chocolate: { name: 'chocolate', emoji: '🍫', label: 'שוקולד',         plural: 'שוקולד' },
  butter:    { name: 'butter',    emoji: '🧈', label: 'חמאה',           plural: 'חמאה' },
  cucumber:  { name: 'cucumber',  emoji: '🥒', label: 'מלפפון',         plural: 'מלפפונים' },
  onion:     { name: 'onion',     emoji: '🧅', label: 'בצל',            plural: 'בצל' },
  pepper:    { name: 'pepper',    emoji: '🫑', label: 'פלפל',           plural: 'פלפל' },
  oil:       { name: 'oil',       emoji: '🫙', label: 'שמן',            plural: 'שמן' },
  bread:     { name: 'bread',     emoji: '🍞', label: 'לחם',            plural: 'לחם' },
  lettuce:   { name: 'lettuce',   emoji: '🥬', label: 'חסה',            plural: 'חסה' },
  milk:      { name: 'milk',      emoji: '🥛', label: 'חלב',            plural: 'חלב' },
  dough:     { name: 'dough',     emoji: '🫓', label: 'בצק',            plural: 'בצק' },
  sauce:     { name: 'sauce',     emoji: '🍝', label: 'רוטב עגבניות',   plural: 'רוטב' },
  sugar:     { name: 'sugar',     emoji: '🍬', label: 'סוכר',           plural: 'סוכר' },
};

interface RecipeStep { ingredient: string; count: number; }

export interface Recipe { name: string; emoji: string; color: string; steps: RecipeStep[]; }

export const RECIPES: Recipe[] = [
  { name: 'פיצה', emoji: '🍕', color: '#ef4444',
    steps: [{ ingredient: 'dough', count: 1 }, { ingredient: 'sauce', count: 2 }, { ingredient: 'cheese', count: 3 }, { ingredient: 'tomato', count: 2 }] },
  { name: 'עוגת שוקולד', emoji: '🎂', color: '#92400e',
    steps: [{ ingredient: 'flour', count: 2 }, { ingredient: 'sugar', count: 2 }, { ingredient: 'egg', count: 3 }, { ingredient: 'chocolate', count: 2 }, { ingredient: 'butter', count: 1 }] },
  { name: 'סלט ירקות', emoji: '🥗', color: '#16a34a',
    steps: [{ ingredient: 'tomato', count: 2 }, { ingredient: 'cucumber', count: 2 }, { ingredient: 'onion', count: 1 }, { ingredient: 'pepper', count: 1 }, { ingredient: 'oil', count: 2 }] },
  { name: 'שקשוקה', emoji: '🍳', color: '#d97706',
    steps: [{ ingredient: 'oil', count: 1 }, { ingredient: 'onion', count: 1 }, { ingredient: 'tomato', count: 3 }, { ingredient: 'pepper', count: 1 }, { ingredient: 'egg', count: 2 }] },
  { name: 'לביבות', emoji: '🥞', color: '#f59e0b',
    steps: [{ ingredient: 'flour', count: 2 }, { ingredient: 'egg', count: 1 }, { ingredient: 'milk', count: 3 }, { ingredient: 'oil', count: 1 }] },
  { name: 'כריך', emoji: '🥪', color: '#65a30d',
    steps: [{ ingredient: 'bread', count: 2 }, { ingredient: 'cheese', count: 1 }, { ingredient: 'tomato', count: 2 }, { ingredient: 'lettuce', count: 1 }] },
];

export function ingredientLabel(key: string, count: number): string {
  const ing = INGREDIENTS[key];
  if (!ing) return key;
  return count > 1 ? ing.plural : ing.label;
}

export function countWord(n: number): string {
  const words = ['', 'אחד', 'שניים', 'שלושה', 'ארבעה', 'חמישה'];
  return words[n] ?? String(n);
}

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

const SHELF_SIZE = 6;
export type Phase = 'menu' | 'cooking' | 'step-done' | 'recipe-done' | 'game-done';

export function useCookingGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [tapped, setTapped] = useState(0);
  const [shelf, setShelf] = useState<string[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs for stale-closure–free handleIngredientTap
  const phaseRef = useRef<Phase>('menu');
  const recipeIdxRef = useRef(0);
  const stepIdxRef = useRef(0);
  const tappedRef = useRef(0);

  // Keep refs in sync with state
  phaseRef.current    = phase;
  recipeIdxRef.current = recipeIdx;
  stepIdxRef.current  = stepIdx;
  tappedRef.current   = tapped;

  const buildShelf = useCallback((targetKey: string) => {
    const others = Object.keys(INGREDIENTS).filter(k => k !== targetKey);
    const distractors = shuffle(others).slice(0, SHELF_SIZE - 1);
    setShelf(shuffle([targetKey, ...distractors]));
  }, []);

  const beginStep = useCallback((rIdx: number, sIdx: number) => {
    const recipe = RECIPES[rIdx];
    if (!recipe) return;
    const step = recipe.steps[sIdx];
    if (!step) return;
    setTapped(0);
    buildShelf(step.ingredient);
    const ing = ingredientLabel(step.ingredient, step.count);
    setTimeout(() => speakHebrew(`הוסף ${countWord(step.count)} ${ing}!`), 200);
  }, [buildShelf]);

  const startGame = useCallback(() => {
    const order = Array.from({ length: RECIPES.length }, (_, i) => i);
    const idx = order[Math.floor(Math.random() * order.length)]!;
    setRecipeIdx(idx);
    setStepIdx(0);
    setTapped(0);
    setScore(0);
    setPhase('cooking');
    beginStep(idx, 0);
  }, [beginStep]);

  const handleIngredientTap = useCallback((key: string) => {
    if (phaseRef.current !== 'cooking') return;
    const rIdx = recipeIdxRef.current;
    const sIdx = stepIdxRef.current;
    const recipe = RECIPES[rIdx];
    if (!recipe) return;
    const step = recipe.steps[sIdx];
    if (!step) return;

    if (key !== step.ingredient) {
      setWrongFlash(true);
      speakHebrew('לא נכון, נסה שוב!');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setWrongFlash(false), 600);
      return;
    }

    const newTapped = tappedRef.current + 1;
    setTapped(newTapped);
    tappedRef.current = newTapped;

    if (newTapped < step.count) {
      const remaining = step.count - newTapped;
      speakHebrew(`עוד ${countWord(remaining)}!`);
      return;
    }

    const ing = INGREDIENTS[step.ingredient];
    speakHebrew(`כן! ${ing ? ingredientLabel(step.ingredient, step.count) : ''}!`);
    setScore(s => s + 10 * step.count);
    setPhase('step-done');
    phaseRef.current = 'step-done';

    timerRef.current = setTimeout(() => {
      const nextStep = sIdx + 1;
      if (nextStep < recipe.steps.length) {
        setStepIdx(nextStep);
        stepIdxRef.current = nextStep;
        setPhase('cooking');
        phaseRef.current = 'cooking';
        beginStep(rIdx, nextStep);
      } else {
        setPhase('recipe-done');
        phaseRef.current = 'recipe-done';
        setTimeout(() => speakHebrew(`הכנת ${recipe.name}! מעולה!`), 100);
      }
    }, 1200);
  }, [beginStep]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return {
    phase, recipeIdx, stepIdx, tapped, shelf, wrongFlash, score,
    setRecipeIdx, setStepIdx, setPhase,
    startGame, beginStep, handleIngredientTap,
    recipe: RECIPES[recipeIdx] ?? null,
    step: RECIPES[recipeIdx]?.steps[stepIdx] ?? null,
    RECIPES, INGREDIENTS, ingredientLabel, countWord,
  };
}
