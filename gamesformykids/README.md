# Games For My Kids

An interactive educational games platform for children aged 2-5, featuring full Hebrew language support and audio-based learning.

**Developed with love by David-Chen Benshabbat**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-David--Chen%20Benshabbat-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/davidchen-benshabbat)

## Overview

214 educational games across 13 categories — Hebrew letters, math, nature, creativity, holidays, arcade, board games and more. Fully responsive with mobile-first design and Hebrew text-to-speech throughout.

## Features

- **214 Games**  covering all key early-childhood learning areas
- **Daily Featured Game**  smart algorithm recommends a game each day
- **Age Recommendations**  grouped for ages 2-3, 3-4, and 4-5
- **Hebrew TTS**  full audio pronunciation via Web Speech API
- **Mobile-First**  responsive Tailwind CSS, optimized for touch screens
- **PWA**  installable as a native app with offline support
- **Guest Mode**  works fully without authentication

## Game Categories

Categories and their game lists live in `lib/constants/gameCategories.ts` (source of truth — a game can belong to more than one category).

| Category | Games | Examples |
|----------|------:|---------|
| Basic Learning | 20 | Hebrew Letters, Numbers, Colors, Shapes, Nikud, Phonics |
| Creativity & Arts | 19 | Instruments, Drawing, Building, Tetris, Famous Paintings |
| Nature & Food | 16 | Animals, Birds, Ocean Life, Dinosaurs, Dog/Cat Breeds |
| World & Transport | 19 | Geography, Capitals, Continents, Israel, Flags, Solar System |
| Home & Life | 13 | House Items, Clothing, Professions, Family, Tzedakah |
| Math & Thinking | 21 | Counting, Math, Arithmetic, Multiplication, Fractions, Sequences |
| Special Games | 9 | Memory, Bubbles, Emotions, Sports, Soccer, NBA Teams |
| Health & Safety | 7 | Medicine, Road Safety, Body Parts, Human Body |
| Science & Technology | 7 | Recycling, Dinosaurs, Virtual Reality, Climate & Planet |
| Holidays & Seasons | 8 | Jewish Holidays, Holidays, Tzadikim, Seasons & Holidays |
| Innovative Games | 11 | Sound Imitation, Visual Logic, Spinner, Team Picker, Dice |
| Arcade Games | 33 | Flappy Bird, Snake, Dino Runner, Pong, Frogger, Chess, Shesh-Besh |
| Educational Games | 39 | Trivia, Spelling, Riddles, Word Scramble, Crossword, Clock |

## Installation

```bash
git clone https://github.com/benshabbat/GamesForMyKids.git
cd GamesForMyKids/gamesformykids
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Technologies

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | App Router, Server Components, Turbopack |
| **React 19** | Latest stable React with concurrent features |
| **TypeScript** | Strict type safety |
| **Tailwind CSS 4** | Responsive styling |
| **Framer Motion** | Animations |
| **Zustand** | Global state management |
| **Web Speech API** | Hebrew TTS |
| **Lucide React** | Icon system |
| **Supabase** | Optional auth (guest mode works without it) |
| **Sentry** | Error monitoring |
| **Vitest / Playwright** | Unit + component tests / E2E tests |
| **PWA / Service Worker** | Offline support |

## Project Structure

```
gamesformykids/
 app/
    games/[gameType]/         # Universal route — handles all game types
      gamePageConstants.ts    # SUPPORTED_GAMES + CUSTOM_GAME_TYPES
      CustomGameRenderer.tsx  # Dispatches to per-game client components
    games/educational/        # Category hub page
    page.tsx                  # Home page
 components/
    game/
      universal/              # UltimateGamePage, CardGamePage, GameLogicSync
      shared/                 # Shared UI: GameMenuCard, GameResultCard, etc.
    layout/                   # Header, Footer, LoadingScreen
    marketing/                # CategorizedGamesGrid, GameRecommendations
 hooks/
    shared/
      game-state/             # useBaseGame, useAutoGame, useUniversalGame, …
      progress/               # useSessionStats, useGameProgress
      ui/                     # useGameHints
      auth/                   # useAuth
      search/                 # useGameSearch
      social/                 # useShareScore
      game-controls/          # useKeyboardControls
      analytics/              # useGamePerformance
    games/                    # useGenericGame, useNumericQuizRuntime
    canvas/                   # useCanvasLoop, useCanvasReady
 lib/
    constants/
      gameData/               # Item data per game group
      gameCategories.ts       # Category -> gameIds mapping (home page grid)
      ui/gameConfigs.*.ts     # Per-game UI config, split by group
    registry/registryData/batch*.ts # Single source of truth for game metadata
    types/core/base.ts        # GameType union
    stores/                   # Zustand stores + createStore.ts (makeStore/makePersistStore)
    quiz/                     # Quiz hooks, data, and registries (generic/custom/complex)
    providers/                # React context providers (GameTypeProvider, AuthProvider)
 public/                      # manifest.json, sw.js, icons
```

## Game Rendering Architecture

All games are served from a single route: `app/games/[gameType]/page.tsx`

| Game kind | How it renders | Examples |
|-----------|---------------|----------|
| **Card games** | `UltimateGamePage` via `GameTypeProvider` + `GameLogicSync` | colors, animals, math |
| **Quiz games** | `UltimateGamePage` → `QuizGameRouter` (`components/game/quiz/`) | geography, science, spelling |
| **Custom games** | `CustomGameRenderer` → per-game client component | memory, chess, tetris, drawing |

## Adding a New Game

1. Add item data to `lib/constants/gameData/*.ts`
2. Export from `lib/constants/gameItemsMap.ts`
3. Add to `GameType` union in `lib/types/core/base.ts`
4. Add entry in `lib/registry/registryData/batch<N>.ts`
5. Add to `SUPPORTED_GAMES` (and `CUSTOM_GAME_TYPES` if custom) in `app/games/[gameType]/gamePageConstants.ts`
6. Add UI config in the relevant `lib/constants/ui/gameConfigs.<group>.ts`
7. Add the game id to a category's `gameIds` in `lib/constants/gameCategories.ts`

See `CLAUDE.md` for the full, current step-by-step checklist per game style (it supersedes `GAME_CREATION_GUIDE.md` for anything that conflicts).

## Auth & Supabase

The app works fully in **guest mode** without any Supabase credentials.
To enable authentication:
1. Create a project at [supabase.com](https://supabase.com)
2. Copy your credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Story Agent (Gemini)

The `/api/story-agent` route (interactive AI story game) requires a Gemini API key:

```env
GEMINI_API_KEY=your-gemini-api-key
```

Get a key at [Google AI Studio](https://aistudio.google.com/apikey).

## Scripts

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run lint             # ESLint check
npx tsc --noEmit         # Type check without emitting
npm run test             # Run Vitest unit tests
```

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, iOS Safari 14+

## License

MIT. (No `LICENSE` file is currently checked into the repository — add one if you need to make this explicit for downstream users.)

## Contact

- GitHub Issues
- [LinkedIn](https://www.linkedin.com/in/davidchen-benshabbat)

---

**Developed with love by David-Chen Benshabbat**
*"Because every child deserves quality and fun education  through play!"*
