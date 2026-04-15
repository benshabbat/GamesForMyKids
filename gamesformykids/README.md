# Games For My Kids

An interactive educational games platform for children aged 2-5, featuring full Hebrew language support and audio-based learning.

**Developed with love by David-Chen Benshabbat**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-David--Chen%20Benshabbat-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/davidchen-benshabbat)

## Overview

131 educational games across 15 categories — Hebrew letters, math, nature, creativity, holidays, arcade, board games and more. Fully responsive with mobile-first design and Hebrew text-to-speech throughout.

## Features

- **131 Games**  covering all key early-childhood learning areas
- **Daily Featured Game**  smart algorithm recommends a game each day
- **Age Recommendations**  grouped for ages 2-3, 3-4, and 4-5
- **Hebrew TTS**  full audio pronunciation via Web Speech API
- **Mobile-First**  responsive Tailwind CSS, optimized for touch screens
- **PWA**  installable as a native app with offline support
- **Guest Mode**  works fully without authentication

## Game Categories

| Category | Examples |
|----------|---------|
| Basic Learning | Hebrew Letters, Numbers, Colors, Shapes, Advanced Colors |
| Math & Numbers | Counting, Math, Arithmetic, Multiplication, Fractions, Sequences |
| Language & Words | Spelling, Word Builder, Word Scramble, Opposites, English Words |
| Nature & Animals | Animals, Birds, Bugs & Insects, Dinosaurs, Ocean Life, Dog Breeds, Cat Breeds |
| Food & Health | Fruits, Vegetables, Healthy Food, World Food, Medicine |
| World & Geography | Geography, Capitals, Continents, Israel, Flags, Transport, Solar System |
| Home & Life | House, Clothing, Professions, Family, Tzedakah |
| Creativity & Arts | Instruments, Drawing, Building, Art & Craft, Puzzles, Famous Paintings |
| Science & Thinking | Science, Recycling, Climate, Space, Logic Games, True/False, Trivia |
| Health & Emotions | Emotions, Emotional Social, Body Movements, Road Safety |
| Holidays & Religion | Jewish Holidays, Holidays, Tzadikim, Seasons & Holidays |
| Trivia & Quizzes | Sports Quiz, Soccer, NBA Teams, Car Brands, Superheroes, Magic Fairy Tales |
| Arcade Games | Flappy Bird, Snake, Dino Runner, Space Defender, Pong, Frogger, Tetris, Reflex |
| Board & Card Games | Memory, Simon Says, Taki, Checkers, Chess, Shesh-Besh |
| Advanced Themes | Advanced Colors, Advanced Weather, Color Mix, Shapes 3D, Camping |

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
| **Next.js 15** | App Router, Server Components, Turbopack |
| **React 19** | Latest stable React with concurrent features |
| **TypeScript** | Strict type safety |
| **Tailwind CSS 4** | Responsive styling |
| **Framer Motion** | Animations |
| **Zustand** | Global state management |
| **Web Speech API** | Hebrew TTS |
| **Lucide React** | Icon system |
| **Supabase** | Optional auth (guest mode works without it) |
| **PWA / Service Worker** | Offline support |

## Project Structure

```
gamesformykids/
 app/
    games/[gameType]/     # Universal route for all 131 games
    page.tsx
 components/
    game/                 # Game UI: cards, grid, navigation
    layout/               # Header, Footer, LoadingScreen
    marketing/            # Home page sections
 lib/
    constants/
       gameData/         # Item data per game group
       ui/gameConfigs.ts # Per-game auto-start config
    registry/gamesRegistry.ts  # Single source of truth
    types/core/base.ts    # GameType union
 contexts/                 # Auth, game config, logic contexts
 hooks/games/              # Per-game custom hooks
 public/                   # manifest.json, sw.js, icons
```

## Adding a New Game

1. Add data to `lib/constants/gameData/*.ts`
2. Export from `lib/constants/index.ts`
3. Add to `GameType` union in `lib/types/core/base.ts`
4. Add map entry in `lib/constants/gameItemsMap.ts`
5. Add metadata in `lib/registry/gamesRegistry.ts`
6. Add to `SUPPORTED_GAMES` in `app/games/[gameType]/page.tsx`
7. Add UI config in `lib/constants/ui/gameConfigs.ts`
8. Add to category in `components/marketing/CategorizedGamesGrid.tsx`

See `../GAME_CREATION_GUIDE.md` for full instructions.

## Auth & Supabase

The app works fully in **guest mode** without any Supabase credentials.
To enable authentication:
1. Create a project at [supabase.com](https://supabase.com)
2. Copy your credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Scripts

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run lint             # ESLint check
```

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, iOS Safari 14+

## License

MIT  see [LICENSE](../LICENSE)

## Contact

- GitHub Issues
- [LinkedIn](https://www.linkedin.com/in/davidchen-benshabbat)

---

**Developed with love by David-Chen Benshabbat**
*"Because every child deserves quality and fun education  through play!"*
