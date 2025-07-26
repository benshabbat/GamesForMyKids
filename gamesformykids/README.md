# 🎮 Games For My Kids - משחקים לילדים שלי

An interactive educational games platform for children, featuring Hebrew language support and audio-based learning experiences.

## 🌟 Overview

This platform offers a collection of educational games designed to help children learn through interactive play. Each game focuses on different learning areas such as colors, numbers, animals, shapes, and more - all with Hebrew language support and audio pronunciation.

## 🎯 Features

- **🔊 Audio Learning**: Full Hebrew text-to-speech support for all games
- **🎨 Interactive Gameplay**: Touch/click-based interaction suitable for young children  
- **🏆 Progressive Difficulty**: Games adapt difficulty based on player progress
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🎭 Multiple Game Categories**: Animals, Colors, Numbers, Math, Shapes, and more
- **🎉 Celebration Animations**: Positive reinforcement for correct answers
- **🔧 Type-Safe Architecture**: Built with TypeScript for reliability

## 🎮 Available Games

### 🐾 Animals Game
Learn animal names through listening and identification

### 🎨 Colors Game  
Identify colors by name and visual representation

### 🔢 Numbers Game
Number recognition and counting exercises

### ➕ Math Game
Simple addition and subtraction problems

### 🔵 Shapes Game
Geometric shape identification and learning

### 🍎 Fruits Game
Learn fruit names and recognition

### 🏠 House Items Game
Household objects and their names

### 🎵 Instruments Game
Musical instrument identification

### 🔤 Letters Game
Hebrew alphabet learning

### 🧠 Memory Game
Memory and concentration exercises

### 👔 Professions Game
Learn about different jobs and professions

### 🚗 Transport Game
Vehicles and transportation methods

### 🥕 Vegetables Game
Healthy vegetables identification

### ☀️ Weather Game
Weather conditions and descriptions

### 🫧 Bubbles Game
Interactive bubble-popping game

### 👕 Clothing Game
Clothing items and their names

### 🛠️ Tools Game
Common tools and their uses

### 🌌 Space Game
Space objects and astronomy

### 👃 Smell & Taste Game
Sensory learning experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/benshabbat/GamesForMyKids.git
cd GamesForMyKids/gamesformykids
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or  
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
gamesformykids/
├── app/                          # Next.js App Router
│   ├── games/                    # Individual game pages
│   │   ├── animals/             # Animals game
│   │   ├── colors/              # Colors game
│   │   ├── numbers/             # Numbers game
│   │   ├── math/                # Math game
│   │   └── ...                  # Other games
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Shared components
│   ├── shared/                  # Common game components
│   ├── ui/                      # UI components
│   └── game/                    # Game-specific components
├── lib/                         # Utilities and configuration
│   ├── constants/               # Game constants and data
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   └── registry/                # Game registration system
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
│   ├── images/                  # Game images
│   ├── sounds/                  # Audio files
│   └── icons/                   # Icon components
└── styles/                      # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API + Speech Synthesis API
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## 🎨 Design System

The project uses a consistent design system with:
- Gradient backgrounds for each game theme
- Rounded corners and shadow effects
- Hover animations and transitions
- Responsive grid layouts
- Accessibility-friendly color contrasts

## 🔧 Development

### Adding a New Game

1. Create game folder in `app/games/[game-name]/`
2. Define constants in `lib/constants/gameConstants.ts`
3. Add types in `lib/types/games.ts`
4. Create game hook in `use[GameName]Game.ts`
5. Build components (Card, StartScreen, page.tsx)
6. Register in `lib/registry/gamesRegistry.ts`

See `GAME_DEVELOPMENT_GUIDE.md` for detailed instructions.

### Key Development Principles

- **DRY**: Reusable components and utilities
- **Type Safety**: Comprehensive TypeScript coverage
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **Consistency**: Shared design patterns across games

## 🌐 Internationalization

The platform primarily supports Hebrew with:
- Right-to-left (RTL) text support
- Hebrew pronunciations for all game items
- Cultural context appropriate for Israeli children

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+  
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with love for educational gaming
- Inspired by child development research
- Community feedback and testing

## 📧 Contact

For questions, suggestions, or support, please open an issue on GitHub.

---

**Happy Learning! למידה מהנה!** 🎉
