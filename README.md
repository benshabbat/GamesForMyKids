# Games For My Kids - Kids Educational Games Platform (Ages 2-5)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat)](https://web.dev/progressive-web-apps/)

**Developed with love by David-Chen Benshabbat**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-David--Chen%20Benshabbat-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/davidchen-benshabbat)

An interactive educational gaming platform for children aged 2-5. Features **128 games** across 15 categories — covering Hebrew letters, math, nature, creativity, holidays, arcade games, board games and more, with full Hebrew audio and a fully responsive mobile-first design.

---

## Project Goals

- Learn Hebrew letters, numbers, colors, and shapes
- Develop memory and concentration skills
- Discover animals, nature, space, and the world
- Practice counting and basic math
- Explore creativity through art, music, and building
- Enjoy interactive games with Hebrew text-to-speech

---

## Game Categories (128 Games)

### Basic Learning
Hebrew Letters, Letters, Numbers, Colors, Shapes, Colored Shapes, Advanced Colors

### Math & Numbers
Counting, Math, Arithmetic, Multiplication, Fractions, Emoji Math, Math Race, Number Bubbles, Sequences

### Language & Words
Spelling, Word Builder, Word Scramble, Opposites, English Words, World Languages, Riddles

### Nature & Animals
Animals, Birds, Bugs & Insects, Dinosaurs, Ocean Life, Garden Plants, Nature, Nature Sounds, Exotic Birds, Butterflies, Dog Breeds, Cat Breeds

### Food & Health
Fruits, Vegetables, Healthy Food, World Food, Cooking Kitchen, Medicine

### World & Geography
Geography, Capitals, Continents, Israel, Flags, World Landmarks, Transport, World Languages, Solar System

### Home & Life
House Items, Clothing, Professions, Modern Professions, Tools, Family, Kitchen, Body Parts, Human Body, Tzedakah

### Creativity & Arts
Instruments, Puzzles, Drawing, Building, Art & Craft, Famous Paintings, Musical Bubbles

### Science & Thinking
Science, Recycling, Climate & Planet, Space, Space Adventure, Virtual Reality, Logic Games, True/False

### Health & Emotions
Emotions, Emotional Social, Body Movements, Touch Senses, Road Safety, Feelings

### Holidays & Religion
Jewish Holidays, Holidays, Tzadikim, Seasons & Holidays, Time & Clock

### Trivia & Quizzes
Trivia, Sports Quiz, Soccer, Soccer Logos, NBA Teams, Car Brands, Tech Logos, Superheroes, Circus Show, Magic Fairy Tales, Fairy Tale Characters, Camping

### Arcade Games
Flappy Bird, Snake, Dino Runner, Catch Fruit, Space Defender, Whack-a-Mole, Brick Breaker, Balloon Pop, Pong, Meteor Dodge, Frogger, Stack, Color Tap, Jumper, Reflex, Tetris

### Board & Card Games
Memory, Simon Says, Taki, Checkers, Chess, Shesh-Besh

### Advanced Themes
Advanced Colors, Advanced Weather, Color Mix, Shapes 3D, Color Tap, Sequences

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
- Mobile-first design  works on all screen sizes
- Optimized for touch screens
- Compatible with all modern browsers

### Progressive Difficulty
- Scoring and level system
- Encouraging celebrations
- Gradually increasing challenge

---

## Quick Start

### Requirements
- Node.js 18+
- npm / yarn / pnpm

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

- **Next.js 15**  App Router with Server Components and Turbopack
- **React 19**  Latest stable React with concurrent features
- **TypeScript**  Strict type safety across the entire codebase
- **Tailwind CSS 4**  Responsive styling with mobile-first approach
- **Framer Motion**  Smooth animations and transitions
- **Zustand**  Lightweight global state management
- **Web Speech API**  Hebrew text-to-speech narration
- **Lucide React**  Consistent icon system
- **Supabase**  Optional auth (app works fully in guest mode without it)
- **PWA**  Installable as a native app with offline support

---

## Project Structure

```
gamesformykids/
 app/
    games/[gameType]/     # Universal game page (all 63 games route here)
    layout.tsx
    page.tsx
 components/
    game/                 # Game grid, cards, navigation
    layout/               # Header, Footer, LoadingScreen
    marketing/            # Featured game, recommendations, category grid
 lib/
    constants/
       gameData/         # Game item data (one file per game group)
       ui/gameConfigs.ts # AutoStartScreen UI config per game
    registry/gamesRegistry.ts  # Single source of truth for all games
    types/core/base.ts    # GameType union
 contexts/                 # Auth, game config, game logic contexts
 hooks/                    # Custom React hooks per game
 public/                   # PWA manifest, icons, service worker
```

---

## Adding a New Game

The platform uses a registry-based pattern. To add a game:

1. **Add game data**  create or update `lib/constants/gameData/*.ts`
2. **Export from barrel**  add to `lib/constants/index.ts`
3. **Register the type**  add to `GameType` union in `lib/types/core/base.ts`
4. **Add to item map**  add entry in `lib/constants/gameItemsMap.ts`
5. **Register metadata**  add entry in `lib/registry/gamesRegistry.ts`
6. **Enable routing**  add to `SUPPORTED_GAMES` in `app/games/[gameType]/page.tsx`
7. **Add UI config**  add to `lib/constants/ui/gameConfigs.ts`

See `GAME_CREATION_GUIDE.md` for a detailed step-by-step guide.

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

- **Registry pattern**  `GamesRegistry` is the single source of truth
- **Universal game page**  one `[gameType]/page.tsx` handles all 128 game routes
- **Typed game items**  `GAME_ITEMS_MAP` maps every `GameType` to its data
- **Guest-mode auth**  app runs fully without Supabase credentials; auth is opt-in
- **Mobile-first**  all components use Tailwind responsive classes (`md:`, `lg:`)

---

## Security & Privacy

- No user data collection
- No external tracking
- Local storage only for session state
- Safe for children  no external links during gameplay

---

## Performance

- Turbopack dev server for fast HMR
- Code splitting by game
- Static header for optimal LCP
- Lazy-loaded client components
- Target: LCP < 2.5s, CLS < 0.1

---

## License

MIT License  see [LICENSE](LICENSE)

---

## Contact

- Open an Issue on GitHub
- Connect on [LinkedIn](https://www.linkedin.com/in/davidchen-benshabbat)

---

**Created with love for children aged 2-5**

*"Because every child deserves quality, fun education  through play!"*

## Project Stats

- **128 Interactive Games**
- **Hebrew Audio Support**
- **Mobile-First Responsive**
- **TypeScript Strict Mode**
- **PWA Ready**
- **Child-Safe**
