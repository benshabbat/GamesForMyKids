# GamesForMyKids — Claude Agent Instructions

This file is loaded automatically by Claude Code in every conversation for this project.
It contains two sections:
1. **Anti-duplicate-code rules** — what to grep/read before writing anything new
2. **Game creation guides** — exact checklist for each of the 3 game styles

---

## Part 1 — Anti-Duplicate Code Agent

Before writing any new code, run these checks. The project has rich shared infrastructure; most "new" needs are already covered.

### Mandatory grep checks before writing new code

| You want to write... | Grep for this first |
|---|---|
| A new Zustand store | `createChallengeStore\|makeStore\|makePersistStore` in `lib/stores/` |
| A new quiz hook | `useGenericQuizGame\|createCategoryIndexQuizHook` in `lib/quiz/` |
| A new quiz game component | `makeQuizGame\|GenericQuizGame` in `lib/quiz/` |
| A new "start screen" component | `GenericStartScreen\|UltimateStartScreen` in `components/game/` |
| A new canvas game loop | `useCanvasLoop\|useCanvasReady` in `hooks/canvas/` |
| A new score/progress bar | `GameResultCard\|ProgressDisplay\|LivesDisplay` in `components/` |
| A new celebration/feedback | `GameCompletionCelebration\|CelebrationBox\|feedbackUtils` |
| A new card/grid layout | `SimpleCard\|AdvancedCard\|GameCardGrid\|PhotoGameCard` in `components/shared/cards/` |
| A new start button | `SimpleGameStartButton\|GameStatsButton` in `components/shared/buttons/` |
| A new game client wrapper | `makeGameClient` in `components/game/shared/` |
| A new phase-based hook | `createPhaseGameHook` in `hooks/shared/progress/` |
| New game item data | Grep `lib/constants/gameData/` — data may already exist under a different export name |
| New UI config for a game | `GAME_UI_CONFIGS` in `lib/constants/ui/` — check all `gameConfigs.*.ts` files |
| New game type in TypeScript | `GameType` union in `lib/types/core/base.ts` — add there, not a new file |

### Key locations of shared infrastructure

```
lib/stores/utils/createChallengeStore.ts   — factory for challenge-based Zustand stores
lib/quiz/makeQuizGame.tsx                  — factory for quiz game components
lib/quiz/createCategoryIndexQuizHook.ts    — factory for category quiz hooks
components/game/shared/makeGameClient.tsx  — factory to wrap a client component (no-SSR)
hooks/shared/progress/createPhaseGameHook.ts — factory for multi-phase game hooks
hooks/shared/game-state/useBaseGame.ts     — base game state hook (score, level, phase)
hooks/shared/audio/useGameAudio.ts         — TTS + sound effects
hooks/shared/progress/useSessionStats.ts  — session-level progress tracking
hooks/canvas/useCanvasLoop.ts              — requestAnimationFrame loop for canvas games
```

### DRY rules

- **Never create a new store** unless `createChallengeStore` or the existing stores don't fit.
- **Never create a new quiz component** — use `makeQuizGame` (custom) or `GenericQuizGame` (data-only).
- **Never create a new start screen** — use `GenericStartScreen` or `UltimateStartScreen`.
- **Never add a `GameType` in a local file** — it must go in `lib/types/core/base.ts`.
- **Never duplicate game item data** — all items live in `lib/constants/gameData/`. Check before adding.
- **Never write raw `fetch`** for game data — use the existing `gameItemsLoader.ts` server loader.

---

## Part 2 — How to Create a Game (All Styles)

All games are served from the single route `gamesformykids/app/games/[gameType]/page.tsx`.
The route dispatches to one of three renderers based on the game type.

---

### Style A — Generic Card Game (UltimateGamePage)

**When to use:** The game is about recognising/learning items from a vocabulary list (animals, colors, professions, flags, etc.). The engine handles audio, challenge generation, scoring, and difficulty automatically.

**Files to touch (in order):**

#### 1. Game data — `lib/constants/gameData/<category>.ts`

```typescript
import type { BaseGameItem } from "@/lib/types/core/base";

export const MY_ITEMS: BaseGameItem[] = [
  { name: "item1", hebrew: "פריט א", english: "Item A", emoji: "🎈", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
  { name: "item2", hebrew: "פריט ב", english: "Item B", emoji: "🎁", color: "bg-gradient-to-br from-green-400 to-green-600" },
  // minimum ~8 items recommended
];

export const MY_PRONUNCIATIONS: Record<string, string> = {
  "item1": "פריט אֶחָד",
};
```

#### 2. Register items — `lib/constants/gameItemsMap.ts`

```typescript
import { MY_ITEMS, MY_PRONUNCIATIONS } from "./gameData/<category>";

export const GAME_ITEMS_MAP = {
  // ...existing entries...
  'my-game': { items: MY_ITEMS, pronunciations: MY_PRONUNCIATIONS },
} as const;
```

#### 3. UI config — add to the right `lib/constants/ui/gameConfigs.<group>.ts`

Pick the closest group file (`educational`, `nature`, `home-life`, `activities`, `advanced`, `photo-quiz`) and add:

```typescript
'my-game': {
  title: "🎮 המשחק שלי",
  subTitle: "למד על...",
  challengeTitle: "מה שמעת?",
  challengeIcon: "🎮",
  challengeDescription: "בחר את התשובה הנכונה!",
  itemLabel: "פריט",
  tip: "💡 טיפ: תקשיב טוב",
  tipDescription: "לחץ על פריט כדי לשמוע שוב",
  colors: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    header: "text-purple-800",
    subHeader: "text-purple-600",
    button: { from: "teal", to: "cyan" },
    stepsBg: "bg-white bg-opacity-90",
  },
  steps: [
    { icon: "👀", title: "1. תראה", description: "מה מוצג" },
    { icon: "🎤", title: "2. תשמע", description: "את השם" },
    { icon: "👆", title: "3. תלחץ", description: "על התשובה" },
  ],
  metadata: {
    keywords: "מילות חיפוש SEO",
    description: "תיאור לגוגל",
  },
},
```

#### 4. GameType union — `lib/types/core/base.ts`

Add `| 'my-game'` to the `GameType` union (in the correct thematic group).

#### 5. Supported games — `app/games/[gameType]/gamePageConstants.ts`

Add `'my-game'` to `SUPPORTED_GAMES` (card games section only — **not** `CUSTOM_GAME_TYPES`).

#### 6. Registry — add to the right `lib/registry/registryData/batch<N>.ts`

```typescript
{ id: "my-game", title: "המשחק שלי", description: "למד על...", icon: SomeIcon, emoji: "🎮", color: "bg-blue-400 hover:bg-blue-500", href: "/games/my-game", available: true, order: 99 },
```

#### 7. Category grid — `components/marketing/CategorizedGamesGrid.tsx`

Add `'my-game'` to the appropriate category array so it appears on the home page.

**Total new files: 1** (`gameData/<category>.ts` if the category is new — otherwise 0). Everything else is an addition to existing files.

---

### Style B — Generic Quiz Game (GenericQuizGame, data-only)

**When to use:** The game is a simple Q&A quiz where questions come from a static data array (riddles, capitals, spelling, opposites, etc.) and the engine renders them with a standard 4-choice layout.

**Files to touch:**

#### 1. Quiz data — `lib/quiz/data/<game>.ts`

```typescript
export type MyQuestion = {
  id: number;
  question: string;   // שאלה
  answer: string;     // תשובה נכונה
  emoji: string;
  wrongOptions: [string, string, string];
};

export const MY_QUESTIONS: MyQuestion[] = [
  { id: 1, question: "...", answer: "...", emoji: "🎯", wrongOptions: ["א", "ב", "ג"] },
  // ...minimum 10 questions
];
```

#### 2. Register as GenericQuizGame — `lib/quiz/registry/genericQuizGames.tsx`

```typescript
export const GENERIC_QUIZ_GAMES: Record<string, ComponentType> = {
  // ...existing
  'my-quiz': GenericQuizGame,
};
```

#### 3. Wire quiz data to the component — `components/game/quiz/GenericQuizGame.tsx`

Look at how existing games like `riddles` or `capitals` pass data. Usually you add a case to the data-selector inside `GenericQuizGame` or its hook.

#### 4. GameType, SUPPORTED_GAMES, Registry — same as Style A steps 4-6.

**Total new files: 1** (`lib/quiz/data/<game>.ts`).

---

### Style C — Custom Quiz Game (makeQuizGame factory)

**When to use:** The quiz needs a custom question screen (visual, interactive, or animated — e.g., clock face, color mixer, sequence grid) but still follows the menu → question → result flow.

**Files to create:**

```
lib/quiz/use<Game>Game.ts           — game hook (state machine: menu/playing/result)
lib/quiz/data/<game>.ts             — question data
components/game/quiz/screens/<Game>MenuScreen.tsx
components/game/quiz/screens/<Game>Question.tsx
```

#### 1. Quiz data — same shape as Style B.

#### 2. Game hook — `lib/quiz/use<Game>Game.ts`

```typescript
'use client';
import { useState, useCallback } from 'react';
import { MY_QUESTIONS, type MyQuestion } from './data/my-game';

type Phase = 'menu' | 'playing' | 'result';

export function useMyGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [current, setCurrent] = useState<MyQuestion | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const startGame = useCallback(() => {
    pickNext();
    setPhase('playing');
  }, []);

  const pickNext = useCallback(() => {
    const q = MY_QUESTIONS[Math.floor(Math.random() * MY_QUESTIONS.length)];
    setCurrent(q);
    setChoices([q.answer, ...q.wrongOptions].sort(() => Math.random() - 0.5));
  }, []);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    if (choice === current.answer) setScore(s => s + 1);
    setTotal(t => t + 1);
    // show feedback then pick next or go to result
    pickNext();
  }, [current, pickNext]);

  const restart = useCallback(() => {
    setScore(0); setTotal(0); setPhase('menu');
  }, []);

  return { phase, current, choices, score, total, startGame, selectAnswer, restart };
}
```

#### 3. Screens — `components/game/quiz/screens/<Game>MenuScreen.tsx` and `<Game>Question.tsx`

Use the existing `QuizMenuScreen` and `QuizResultScreen` for the menu/result phases when they fit. Only build custom screens for the question phase.

#### 4. Register — `lib/quiz/registry/customQuizGames.tsx`

```typescript
import { useMyGame } from '@/lib/quiz/useMyGame';
import MyGameMenuScreen from '@/components/game/quiz/screens/MyGameMenuScreen';
import MyGameQuestion from '@/components/game/quiz/screens/MyGameQuestion';
import { QuizMenuScreen, QuizResultScreen } from '@/components/game/quiz';

export const CUSTOM_QUIZ_GAMES: Record<string, ComponentType> = {
  // ...existing
  'my-quiz': makeQuizGame(
    useMyGame,
    ({ phase, current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🎯" title="המשחק שלי" description="..." theme="violet" onStart={startGame} />,
      question: current ? <MyGameQuestion current={current} choices={choices} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="violet" />,
    }),
  ),
};
```

#### 5. GameType, SUPPORTED_GAMES, Registry — same as Style A steps 4-6.

**Total new files: 3-4** (hook, data, 1-2 screen components).

---

### Style D — Fully Custom Game (CustomGameRenderer)

**When to use:** The game has unique gameplay that doesn't fit card or quiz patterns — arcade, board games, canvas-based, drawing, etc.

**Folder structure:**

```
app/games/my-game/
├── MyGameClient.tsx        # 'use client' — entry point rendered by CustomGameRenderer
├── myGameStore.ts          # Zustand store (use createChallengeStore if applicable)
├── useMyGame.ts            # Game logic hook
└── components/
    ├── MyGameScreen.tsx    # Main play area
    └── MyGameMenu.tsx      # Start/menu screen (optional)
```

#### 1. Store — `app/games/my-game/myGameStore.ts`

Check `lib/stores/utils/createChallengeStore.ts` first — if your game is challenge-based, use the factory. Otherwise:

```typescript
'use client';
import { create } from 'zustand';

interface State {
  score: number;
  phase: 'idle' | 'playing' | 'result';
  // ...
}
interface Actions {
  startGame: () => void;
  endGame: () => void;
  reset: () => void;
  // ...
}

export const useMyGameStore = create<State & Actions>((set) => ({
  score: 0,
  phase: 'idle',
  startGame: () => set({ phase: 'playing' }),
  endGame: () => set({ phase: 'result' }),
  reset: () => set({ score: 0, phase: 'idle' }),
}));
```

#### 2. Hook — `app/games/my-game/useMyGame.ts`

```typescript
'use client';
import { useCallback } from 'react';
import { useMyGameStore } from './myGameStore';

export function useMyGame() {
  const score   = useMyGameStore(s => s.score);
  const phase   = useMyGameStore(s => s.phase);
  const { startGame, endGame, reset } = useMyGameStore();
  return { score, phase, startGame, endGame, reset };
}
```

#### 3. Client component — `app/games/my-game/MyGameClient.tsx`

```typescript
'use client';
import { useMyGame } from './useMyGame';
import MyGameScreen from './components/MyGameScreen';

export default function MyGameClient() {
  const game = useMyGame();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <MyGameScreen {...game} />
    </div>
  );
}
```

For canvas-based games, use `useCanvasLoop` + `useCanvasReady` from `hooks/canvas/`:

```typescript
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';
```

#### 4. Register in CustomGameRenderer — `app/games/[gameType]/CustomGameRenderer.tsx`

```typescript
const GAME_CLIENTS: Record<string, ComponentType> = {
  // ...existing
  'my-game': dynamic(() => import('../my-game/MyGameClient')),
};
```

#### 5. Add to CUSTOM_GAME_TYPES + SUPPORTED_GAMES — `app/games/[gameType]/gamePageConstants.ts`

Add `'my-game'` to **both** `SUPPORTED_GAMES` and `CUSTOM_GAME_TYPES`.

#### 6. GameType, Registry — same as Style A steps 4 and 6.

**Total new files: 3-5** (store, hook, client, 1-2 screen components).

---

## Quick Decision Tree

```
New game idea
│
├─ Is it "learn/recognise items from a list"?
│   └─ YES → Style A (Generic Card Game) — cheapest, 0-1 new files
│
├─ Is it a quiz with standard 4-choice layout?
│   └─ YES → Style B (GenericQuizGame) — 1 new file (data)
│
├─ Is it a quiz needing a custom visual question screen?
│   └─ YES → Style C (makeQuizGame) — 3-4 new files
│
└─ Is it arcade / board / canvas / drawing / unique logic?
    └─ YES → Style D (Custom) — 3-5 new files
```

---

## Before Opening a PR

1. `cd gamesformykids && npx tsc --noEmit` — zero TS errors
2. `npm run build` — zero build errors  
3. Test the game at `http://localhost:3000/games/<game-type>`
4. Verify it appears in the home page category grid
5. Run `gh pr checks` after opening — fix any CI failures before reporting done
6. Every PR body must contain `Closes #NNN`
