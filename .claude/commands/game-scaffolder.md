# New Game Scaffolder — GamesForMyKids

You are the **New Game Scaffolder** for GamesForMyKids.

Your job: create a complete, working game skeleton for a new game, including all required files and registry connections, based on the chosen style (A/B/C/D/E) and the game spec provided by the user.

---

## When invoked

`$ARGUMENTS` must be provided in this format:

```
<game-id> <style> "<Hebrew title>" "<emoji>" "<category>"
```

Example:
```
space-objects A "חפצי חלל" "🚀" "nature"
```

If `$ARGUMENTS` is missing or incomplete, ask the user for:
1. Game ID (kebab-case, e.g. `space-objects`)
2. Style (A / B / C / D / E)
3. Hebrew title
4. Emoji
5. Category for the home grid (basic / creative / nature / world / home / math / games / health / science / holidays / innovative / arcade / educational)

---

## Phase 1 — Discover next available order number

```bash
grep -h "order:" gamesformykids/lib/registry/registryData/batch*.ts | sort -t: -k2 -n | tail -1
```

Use `order + 1` for the new game.

---

## Phase 2 — Load existing infrastructure to avoid duplication

```bash
# Check if game ID already exists anywhere
grep -r "'<game-id>'" gamesformykids/ --include="*.ts" --include="*.tsx" -l

# Check GameType union for conflicts
grep "GameType" gamesformykids/lib/types/core/base.ts | head -5

# Check highest batch number
ls gamesformykids/lib/registry/registryData/
```

If the game ID already exists, **stop and report** — do not create duplicate scaffolding.

---

## Phase 3 — Style A scaffold

Only if style = A.

### Files to create or extend:

**`gamesformykids/lib/constants/gameData/<game-id>.ts`** (new file):
```typescript
import type { BaseGameItem } from "@/lib/types/core/base";

export const <GAME_ID_UPPER>_ITEMS: BaseGameItem[] = [
  { name: "item1", hebrew: "פריט א", english: "Item A", emoji: "🎈", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
  { name: "item2", hebrew: "פריט ב", english: "Item B", emoji: "🎁", color: "bg-gradient-to-br from-green-400 to-green-600" },
  { name: "item3", hebrew: "פריט ג", english: "Item C", emoji: "⭐", color: "bg-gradient-to-br from-purple-400 to-purple-600" },
  { name: "item4", hebrew: "פריט ד", english: "Item D", emoji: "🌟", color: "bg-gradient-to-br from-pink-400 to-pink-600" },
  { name: "item5", hebrew: "פריט ה", english: "Item E", emoji: "💫", color: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
  { name: "item6", hebrew: "פריט ו", english: "Item F", emoji: "✨", color: "bg-gradient-to-br from-red-400 to-red-600" },
  { name: "item7", hebrew: "פריט ז", english: "Item G", emoji: "🔮", color: "bg-gradient-to-br from-indigo-400 to-indigo-600" },
  { name: "item8", hebrew: "פריט ח", english: "Item H", emoji: "🎯", color: "bg-gradient-to-br from-teal-400 to-teal-600" },
];

export const <GAME_ID_UPPER>_PRONUNCIATIONS: Record<string, string> = {};
```

**Additions to existing files (show exact snippet for each):**

- `lib/constants/gameItemsMap.ts`: add `'<game-id>': { items: <GAME_ID_UPPER>_ITEMS, pronunciations: <GAME_ID_UPPER>_PRONUNCIATIONS },`
- `lib/constants/ui/gameConfigs.<category>.ts`: add full UI config block (see template below)
- `lib/types/core/base.ts`: add `| '<game-id>'` to GameType
- `app/games/[gameType]/gamePageConstants.ts`: add `'<game-id>'` to SUPPORTED_GAMES array
- `lib/registry/registryData/batch<N>.ts`: add registry entry
- `lib/constants/gameCategories.ts`: add `'<game-id>'` to `gameIds` of the correct category object

**UI config template:**
```typescript
'<game-id>': {
  title: "<emoji> <Hebrew title>",
  subTitle: "למד על...",
  challengeTitle: "מה שמעת?",
  challengeIcon: "<emoji>",
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
    keywords: "<Hebrew SEO keywords>",
    description: "<Hebrew SEO description>",
  },
},
```

---

## Phase 4 — Style B scaffold

Only if style = B.

**`gamesformykids/lib/quiz/data/<game-id>.ts`** (new file):
```typescript
export type <GameId>Question = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const <GAME_ID_UPPER>_QUESTIONS: <GameId>Question[] = [
  { id: 1, question: "שאלה לדוגמה?", answer: "תשובה נכונה", emoji: "🎯", wrongOptions: ["אפשרות א", "אפשרות ב", "אפשרות ג"] },
  { id: 2, question: "שאלה נוספת?", answer: "תשובה", emoji: "⭐", wrongOptions: ["א", "ב", "ג"] },
  // Add at least 10 questions
];
```

**Additions:**
- `lib/quiz/registry/genericQuizGames.tsx`: add entry
- `lib/types/core/base.ts`: add to GameType
- `app/games/[gameType]/gamePageConstants.ts`: add to SUPPORTED_GAMES
- `lib/registry/registryData/batch<N>.ts`: add registry entry
- `lib/constants/gameCategories.ts`: add `'<game-id>'` to `gameIds` of the correct category object

---

## Phase 5 — Style C scaffold

Only if style = C.

**New files to create:**
- `gamesformykids/lib/quiz/data/<game-id>.ts` — same shape as Style B
- `gamesformykids/lib/quiz/use<GameId>Game.ts` — game hook
- `gamesformykids/components/game/quiz/screens/<GameId>MenuScreen.tsx`
- `gamesformykids/components/game/quiz/screens/<GameId>Question.tsx`

**Hook template** (`use<GameId>Game.ts`):
```typescript
'use client';
import { useState, useCallback } from 'react';
import { <GAME_ID_UPPER>_QUESTIONS, type <GameId>Question } from './data/<game-id>';

type Phase = 'menu' | 'playing' | 'result';

export function use<GameId>Game() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [current, setCurrent] = useState<<GameId>Question | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const pickNext = useCallback(() => {
    const q = <GAME_ID_UPPER>_QUESTIONS[Math.floor(Math.random() * <GAME_ID_UPPER>_QUESTIONS.length)];
    setCurrent(q);
    setChoices([q.answer, ...q.wrongOptions].sort(() => Math.random() - 0.5));
  }, []);

  const startGame = useCallback(() => {
    pickNext();
    setPhase('playing');
  }, [pickNext]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    if (choice === current.answer) setScore(s => s + 1);
    setTotal(t => t + 1);
    pickNext();
  }, [current, pickNext]);

  const restart = useCallback(() => {
    setScore(0); setTotal(0); setPhase('menu');
  }, []);

  return { phase, current, choices, score, total, startGame, selectAnswer, restart };
}
```

**Additions:**
- `lib/quiz/registry/customQuizGames.tsx`: add makeQuizGame call
- `lib/types/core/base.ts`: add to GameType
- `app/games/[gameType]/gamePageConstants.ts`: add to SUPPORTED_GAMES
- `lib/registry/registryData/batch<N>.ts`: add registry entry
- `lib/constants/gameCategories.ts`: add `'<game-id>'` to `gameIds` of the correct category object

---

## Phase 6 — Style D scaffold

Only if style = D.

**New files to create:**
- `gamesformykids/app/games/<game-id>/<GameId>Client.tsx`
- `gamesformykids/app/games/<game-id>/<game-id>Store.ts`
- `gamesformykids/app/games/<game-id>/use<GameId>.ts`
- `gamesformykids/app/games/<game-id>/components/<GameId>Screen.tsx`

**Client template:**
```typescript
'use client';
import { use<GameId> } from './use<GameId>';
import <GameId>Screen from './components/<GameId>Screen';

export default function <GameId>Client() {
  const game = use<GameId>();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <<GameId>Screen {...game} />
    </div>
  );
}
```

**Store template:**
```typescript
'use client';
import { create } from 'zustand';

interface State {
  score: number;
  phase: 'idle' | 'playing' | 'result';
}
interface Actions {
  startGame: () => void;
  endGame: () => void;
  reset: () => void;
}

export const use<GameId>Store = create<State & Actions>((set) => ({
  score: 0,
  phase: 'idle',
  startGame: () => set({ phase: 'playing' }),
  endGame: () => set({ phase: 'result' }),
  reset: () => set({ score: 0, phase: 'idle' }),
}));
```

**Additions:**
- `app/games/[gameType]/CustomGameRenderer.tsx`: add dynamic import
- `app/games/[gameType]/gamePageConstants.ts`: add to SUPPORTED_GAMES **and** CUSTOM_GAME_TYPES
- `lib/types/core/base.ts`: add to GameType
- `lib/registry/registryData/batch<N>.ts`: add registry entry
- `lib/constants/gameCategories.ts`: add `'<game-id>'` to `gameIds` of the correct category object

---

## Phase 7 — Style E scaffold

Only if style = E (Complex Quiz — own standalone component).

**When to choose E over C:** The game needs its own Zustand store, deeply custom multi-phase rendering that doesn't map cleanly to `makeQuizGame`'s `{ menu, question, result }` signature, or category-indexed question sets with complex state.

**New files to create:**
- `gamesformykids/app/games/<game-id>/<GameId>Game.tsx` — top-level 'use client' component that manages all phases
- `gamesformykids/app/games/<game-id>/<gameId>Store.ts` — Zustand store (optional; may use hook-only state)
- `gamesformykids/app/games/<game-id>/components/<GameId>MenuScreen.tsx`
- `gamesformykids/app/games/<game-id>/components/<GameId>Question.tsx`
- `gamesformykids/app/games/<game-id>/components/<GameId>ResultScreen.tsx`

**Top-level component template** (`<GameId>Game.tsx`):
```typescript
'use client';
import { useState } from 'react';
import <GameId>MenuScreen from './components/<GameId>MenuScreen';
import <GameId>Question from './components/<GameId>Question';
import <GameId>ResultScreen from './components/<GameId>ResultScreen';

type Phase = 'menu' | 'playing' | 'result';

export default function <GameId>Game() {
  const [phase, setPhase] = useState<Phase>('menu');
  // game state...

  if (phase === 'menu')   return <<GameId>MenuScreen onStart={() => setPhase('playing')} />;
  if (phase === 'result') return <<GameId>ResultScreen onRestart={() => setPhase('menu')} />;
  return <<GameId>Question onFinish={() => setPhase('result')} />;
}
```

**Additions:**
- `lib/quiz/registry/complexQuizGames.tsx`: add dynamic import entry:
  ```typescript
  '<game-id>': dynamic(() => import('@/app/games/<game-id>/<GameId>Game'), { loading: () => <GameSpinnerScreen /> }),
  ```
- `lib/types/core/base.ts`: add to GameType
- `app/games/[gameType]/gamePageConstants.ts`: add to SUPPORTED_GAMES (NOT to CUSTOM_GAME_TYPES)
- `lib/registry/registryData/batch<N>.ts`: add registry entry
- `lib/constants/gameCategories.ts`: add `'<game-id>'` to `gameIds` of the correct category object

---

## Phase 8 — Confirm and apply

After generating all file contents and snippets, present a summary:

```
## Scaffolding Plan: `<game-id>` (Style <X>)

New files to create: <N>
Existing files to update: <N>

### New files:
- <path> — <purpose>

### Updates:
- <file>: <what will be added>

---

Ready to apply? (yes / no / show me each change first)
```

Only create/edit files after confirmation. Apply one file at a time. After all edits:

```bash
grep -r "'<game-id>'" gamesformykids/ --include="*.ts" --include="*.tsx" -l
cd gamesformykids && npx tsc --noEmit 2>&1 | head -20
```

Report any TypeScript errors and offer to fix them.

---

## Rules

- **Never overwrite existing files** — only create truly new files or add to existing ones.
- **Check for ID conflicts** before writing anything.
- **Always confirm before applying** — show the plan first.
- **Minimum 8 items for Style A**, minimum 10 questions for Style B/C/E.
- **Replace all placeholder text** (`<Hebrew title>`, `פריט א`, etc.) with the actual content where known, and mark `// TODO: fill in` where the user must provide content.
- **Run `tsc --noEmit` after scaffolding** and report errors.
