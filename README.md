# Games For My Kids - Kids Educational Games Platform (Ages 2-5)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat)](https://web.dev/progressive-web-apps/)

**Developed with love by David-Chen Benshabbat**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-David--Chen%20Benshabbat-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/davidchen-benshabbat)

An interactive educational gaming platform for children aged 2-5. Features **214 games** across 13 categories — covering Hebrew letters, math, nature, creativity, holidays, arcade games, board games and more, with full Hebrew audio and a fully responsive mobile-first design.

---

## Project Goals

- Learn Hebrew letters, numbers, colors, and shapes
- Develop memory and concentration skills
- Discover animals, nature, space, and the world
- Practice counting and basic math
- Explore creativity through art, music, and building
- Enjoy interactive games with Hebrew text-to-speech

---

## Game Categories (214 Games)

### Basic Learning (20)
Letters, Hebrew Letters, Hebrew Script, Letter Trace, Numbers, Shapes, Colored Shapes, Colors, Advanced Colors, Shapes 3D, Phonics, Rhyming, Nikud, Gender, Final Letters, Alphabet Order, Letter Race, Nikud Drag, Letter Merge, Word Clicker

### Creativity & Arts (19)
Instruments, Puzzles, Drawing, Coloring, Building, Tetris, Magic Fairy Tales, Circus Show, Logic Games, Art & Craft, Superheroes, Fairy Tale Characters, Famous Paintings, Tech Logos, Color Mix, Puppet Story, Melody Maker, Craft Guide, Avatar Maker

### Nature & Food (16)
Animals, Fruits, Vegetables, Ocean Life, Garden Plants, Smells & Tastes, Nature Sounds, Dinosaurs, Birds, Bugs & Insects, Dog Breeds, Cat Breeds, Exotic Birds, Butterflies, Nature, Healthy Food

### World & Transport (19)
Transport, Vehicles, Weather, Space, World Food, Advanced Weather, Road Safety, Camping, Flags, Car Brands, World Landmarks, Solar System, Capitals, Continents, Israel, Geography Flags, Geography Capitals, Geography Continents, Israel Map

### Home & Life (13)
House Items, Clothing, Professions, Tools, Tzedakah, Kitchen, Family, Body Parts, New Professions, Morning Routine, Dress Up, Cooking Game, Market Game

### Math & Thinking (21)
Counting, Math, Shopping & Money, Coins Match, Multiplication, Fractions, Sequences, Arithmetic, Ordinals, Number Words, Spatial Concepts, Sorting, Patterns, Skip Counting, Division, Visual Addition, Gematria, Number Slide, Math Stories, Number Merge, Mispar Bonds

### Special Games (9)
Memory, Bubbles, Emotions, Sports, Circus Show, Soccer Logos, NBA Teams, Sports Quiz, Soccer

### Health & Safety (7)
Medicine, Road Safety, Body Parts, Body Movements, Touch Senses, Human Body, Personal Safety

### Science & Technology (7)
Recycling, Dinosaurs, Virtual Reality, New Professions, Climate & Planet, Science, Life Cycles

### Holidays & Seasons (8)
Seasons & Holidays, Jewish Holidays, Time & Clock, Tzadikim, Holidays, Days of the Week, Months of the Year, Blessings

### Innovative Games (11)
Sound Imitation, Emotional Social, Advanced Weather, Advanced Colors, Logic Games, Visual Logic, Sound Quiz, Spinner, Team Picker, Dice, Timer

### 🕹️ Arcade Games (33)
Flappy Bird, Snake, Dino Runner, Catch Fruit, Space Defender, Whack-a-Mole, Brick Breaker, Balloon Pop, Pong, Meteor Dodge, Frogger, Stack, Color Tap, Jumper, Simon, Reflex, Taki, Checkers, Chess, Shesh-Besh, Maze, Letter Defender, Snakes & Ladders, Escape Room, Find in Scene, Answer Cannon, Word Fishing, Letter Grow, Letter Slingshot, Syllable Drums, Letter Bubble Shooter, Letter Slicer, Spot the Difference

### 📚 Educational Games (39)
True/False, Emoji Math, Math Race, Number Bubbles, Word Scramble, Word Builder, Word Chain, Trivia, Trivia Categories, Clock, Spelling, Opposites, World Languages, Riddles, Riddles Pro, English Words, Singular/Plural, Adjectives, Verbs, Visual Opposites, English Cards, Proverbs, Story Builder, Robot Coder, Hangman, Choose Your Adventure, Picture Dictionary, Word Search, Kids Songs, Kids Encyclopedia, Age Calculator, Jokes Browser, Word Maze, City Builder, Drag & Sort, Word Wheel, Typing Race, Crossword, Hebrew Racer

*Some games appear in more than one category. `lib/constants/gameCategories.ts` is the source of truth if this list drifts.*

---

## Special Features

### Hebrew Audio Narration
- Correct pronunciation of all words
- Encouraging voice feedback
- Fun music and sound effects

### Age-Appropriate Design
- Simple and intuitive interface for ages 2-5
- Bright, child-friendly colors
- Large touch-friendly targets

### Fully Responsive
- Mobile-first design — works on all screen sizes
- Optimized for touch screens
- Compatible with all modern browsers

### Progressive Difficulty
- Scoring and level system
- Encouraging celebrations
- Gradually increasing challenge

---

## Quick Start

### Requirements
- Node.js 20+ (CI and `.nvmrc` pin Node 22)
- npm

### Installation

```bash
git clone https://github.com/benshabbat/GamesForMyKids.git
cd GamesForMyKids/gamesformykids
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Technology Stack

- **Next.js 16** — App Router with Server Components and Turbopack
- **React 19** — Latest stable React with concurrent features
- **TypeScript** — Strict type safety across the entire codebase
- **Tailwind CSS 4** — Responsive styling with mobile-first approach
- **Framer Motion** — Smooth animations and transitions
- **Zustand** — Global state management (game stores, UI state, progress)
- **Web Speech API** — Hebrew text-to-speech narration
- **Lucide React** — Consistent icon system
- **Supabase** — Optional auth (app works fully in guest mode without it)
- **Sentry** — Error monitoring
- **Vitest + Testing Library** — Unit and component tests
- **Playwright** — End-to-end tests
- **PWA** — Installable as a native app with offline support

---

## Project Structure

```
gamesformykids/
├─ app/
│  ├─ games/[gameType]/     # Universal game route (all 214 games route here)
│  │  ├─ page.tsx
│  │  ├─ gamePageConstants.ts   # SUPPORTED_GAMES / CUSTOM_GAME_TYPES lists
│  │  └─ CustomGameRenderer.tsx # dispatches fully-custom games (arcade, board, canvas)
│  ├─ games/<game-name>/    # Per-game folders for custom games (store, hook, components)
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ game/                 # Game grid, cards, navigation, quiz screens
│  ├─ layout/                # Header, Footer, LoadingScreen
│  └─ marketing/             # Featured game, recommendations, category grid
├─ lib/
│  ├─ constants/
│  │  ├─ gameData/           # Game item data (one file per game group)
│  │  ├─ gameCategories.ts   # Category → gameIds mapping (home page grid)
│  │  ├─ gameItemsMap.ts     # GameType → { items, pronunciations }
│  │  └─ ui/gameConfigs.*.ts # Per-game UI config (title, colors, steps, SEO)
│  ├─ quiz/                  # Quiz game hooks, data, and registries
│  │  └─ registry/           # genericQuizGames / customQuizGames / complexQuizGames
│  ├─ registry/
│  │  └─ registryData/batch*.ts  # Single source of truth for all games (metadata)
│  ├─ stores/                # Zustand stores + createStore.ts (makeStore/makePersistStore)
│  └─ types/core/base.ts     # GameType union
├─ contexts/                 # Auth, game config, game logic contexts
├─ hooks/                    # Shared hooks (audio, canvas, progress, search)
└─ public/                   # PWA manifest, icons, service worker
```

---

## Adding a New Game

The platform uses a registry-based pattern with five game styles (generic card game, generic quiz, custom quiz, fully custom, complex quiz). See **`CLAUDE.md`** for the full, up-to-date decision tree and step-by-step checklist for each style — it's the canonical reference and is kept current with the codebase. `GAME_CREATION_GUIDE.md` has a narrative walkthrough of the same process.

At a high level, adding a game touches:

1. **Game/quiz data** — `lib/constants/gameData/*.ts` or `lib/quiz/data/*.ts`
2. **Register the type** — add to the `GameType` union in `lib/types/core/base.ts`
3. **Enable routing** — add to `SUPPORTED_GAMES` (and `CUSTOM_GAME_TYPES` if custom) in `app/games/[gameType]/gamePageConstants.ts`
4. **Register metadata** — add an entry to `lib/registry/registryData/batch<N>.ts`
5. **Add to the home page** — add the game id to a category's `gameIds` in `lib/constants/gameCategories.ts`
6. **UI config** (card games) — add to the relevant `lib/constants/ui/gameConfigs.<group>.ts`

---

## PWA (Progressive Web App)

- Offline functionality via Service Worker
- Install to home screen on mobile
- Fast cache-first loading
- Full manifest.json support

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full |
| Edge 90+ | Full |
| iOS Safari 14+ | Full |
| Samsung Internet | Full |

---

## Architecture Highlights

- **Registry pattern** — `lib/registry/registryData/batch*.ts` is the single source of truth for game metadata
- **Universal game page** — one `[gameType]/page.tsx` handles all 214 game routes
- **Typed game items** — `GAME_ITEMS_MAP` maps every `GameType` to its data
- **Guest-mode auth** — app runs fully without Supabase credentials; auth is opt-in
- **Zustand over Context** for custom games — state lives in stores, not props/Context
- **Mobile-first** — all components use Tailwind responsive classes (`md:`, `lg:`)

---

## Security & Privacy

- No user data collection
- No external tracking
- Local storage only for session state
- Safe for children — no external links during gameplay

---

## Performance

- Turbopack dev server for fast HMR
- Code splitting by game
- Static header for optimal LCP
- Lazy-loaded client components
- Target: LCP < 2.5s, CLS < 0.1

---

## License

MIT License. (No `LICENSE` file is currently checked into the repository — add one if you need to make this explicit for downstream users.)

---

## Contact

- Open an Issue on GitHub
- Connect on [LinkedIn](https://www.linkedin.com/in/davidchen-benshabbat)

---

**Created with love for children aged 2-5**

*"Because every child deserves quality, fun education — through play!"*

## Project Stats

- **214 Interactive Games**
- **Hebrew Audio Support**
- **Mobile-First Responsive**
- **TypeScript Strict Mode**
- **PWA Ready**
- **Child-Safe**
