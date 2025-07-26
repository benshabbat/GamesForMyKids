# Game Development Guide for "Kids Games" System

## 🎯 Overview
This guide explains how to add a new game to the system while maintaining all existing standards and conventions. The system has been refactored with modern TypeScript practices, DRY principles, and comprehensive type safety.

## 🏗️ Current Architecture (Updated 2025)

### Key Improvements:
- **Full TypeScript Coverage**: Complete type safety with custom interfaces
- **DRY Architecture**: Reusable components and shared utilities
- **Centralized Constants**: All game data in organized constant files
- **Generic Components**: Flexible, reusable UI components
- **Consistent State Management**: Unified game state interfaces
- **Error-Free Codebase**: Comprehensive error handling and validation

### 🎮 Available Games (20+):
Animals, Bubbles, Clothing, Colors, Counting, Fruits, House Items, Instruments, Letters, Math, Memory, Numbers, Professions, Shapes, Smell & Taste, Space, Tools, Transport, Vegetables, Vehicles, Weather

---

## Example: Vegetables Game

We'll walk through adding a "Vegetables Game" as a complete example following the updated architecture.

---

## Step 1: Define Constants

### 1.1 Update `lib/constants/gameConstants.ts`

**Important**: The system now uses `BaseGameItem` interface for all game items. Here's the updated structure:

```typescript
import { BaseGameItem } from "@/lib/types/base";

/**
 * Vegetable constants for the game - using BaseGameItem interface
 */
export const VEGETABLE_CONSTANTS = {
  CARROT: {
    name: "carrot",
    hebrew: "גזר",
    english: "Carrot",
    emoji: "🥕",
    color: "bg-orange-500",
    sound: [440, 550, 660],
    plural: "גזרים",
  },
  TOMATO: {
    name: "tomato",
    hebrew: "עגבנייה", 
    english: "Tomato",
    emoji: "🍅",
    color: "bg-red-500",
    sound: [392, 494, 587],
    plural: "עגבניות",
  },
  CUCUMBER: {
    name: "cucumber",
    hebrew: "מלפפון",
    english: "Cucumber", 
    emoji: "🥒",
    color: "bg-green-500",
    sound: [349, 440, 523],
    plural: "מלפפונים",
  },
  PEPPER: {
    name: "pepper",
    hebrew: "פלפל",
    english: "Pepper",
    emoji: "🫑",
    color: "bg-green-600",
    sound: [330, 415, 494],
    plural: "פלפלים",
  },
  ONION: {
    name: "onion",
    hebrew: "בצל",
    english: "Onion",
    emoji: "🧅", 
    color: "bg-yellow-600",
    sound: [294, 370, 440],
    plural: "בצלים",
  },
  LETTUCE: {
    name: "lettuce",
    hebrew: "חסה",
    english: "Lettuce",
    emoji: "🥬",
    color: "bg-green-400",
    sound: [262, 330, 392],
    plural: "חסות",
  },
} as const;

// List of all vegetables - now properly typed
export const ALL_VEGETABLES: BaseGameItem[] = Object.values(VEGETABLE_CONSTANTS);

/**
 * Hebrew pronunciations for vegetables
 */
export const VEGETABLE_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  carrot: "גזר",
  tomato: "עגבנייה",
  cucumber: "מלפפון", 
  pepper: "פלפל",
  onion: "בצל",
  lettuce: "חסה",
};

/**
 * Game-specific constants for vegetables
 */
export const VEGETABLE_GAME_CONSTANTS = {
  BASE_VEGETABLES_COUNT: 4,
  VEGETABLES_INCREMENT: 1,
  LEVEL_THRESHOLD: 3
};
```

### 1.2 Update `lib/constants/uiConstants.ts`

```typescript
/**
 * Vegetables game steps
 */
export const VEGETABLE_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. Listen", description: "Which vegetable am I saying" },
  { icon: "🤔", title: "2. Think", description: "How does the vegetable look" },
  { icon: "👆", title: "3. Click", description: "On the correct vegetable" },
];
```

---

## Step 2: Define Types

### 2.1 Update `lib/types/games.ts`

**Important**: The system now uses `BaseGameItem` for consistency. Here's the updated approach:

```typescript
import { BaseGameItem, BaseGameState } from "./base";

// Vegetables extend BaseGameItem - no need for custom interface unless specialized
export type Vegetable = BaseGameItem;

// Vegetable game state extends BaseGameState  
export interface VegetableGameState extends BaseGameState {
  currentChallenge: Vegetable | null;
  options: Vegetable[];
  // Add any vegetable-specific state properties here if needed
}
```

### 2.2 Update `lib/types/startScreen.ts`

```typescript
import { BaseGameItem } from "./base";

/**
 * Start screen props for vegetables game
 */
export interface VegetableStartScreenProps extends BaseStartScreenProps {
  vegetables: BaseGameItem[];
  onSpeak?: (itemName: string) => Promise<void>;
}
```

---

## Step 3: Game Configuration

### 3.1 Update `hooks/shared/useGameStartScreenConfig.tsx`

```typescript
vegetables: {
  background:
    "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #16a34a 100%)",
  button: { from: "green", to: "emerald" },
  header: "text-white",
  subHeader: "text-green-100",
},
```

---

## Step 4: Create Game Files

### 4.1 Create Folder Structure

```
app/games/vegetables/
├── page.tsx
├── StartScreen.tsx
├── VegetableCard.tsx
└── useVegetableGame.ts
```

### 4.2 `app/games/vegetables/useVegetableGame.ts`

**Updated with modern TypeScript and DRY principles:**

```typescript
import { useState, useEffect } from "react";
import { BaseGameItem, BaseGameState } from "@/lib/types/base";
import { VegetableGameState } from "@/lib/types/games";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  generateOptions as generateGameOptions,
  getRandomItem,
  speakItemName,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, VEGETABLE_HEBREW_PRONUNCIATIONS, VEGETABLE_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useVegetableGame(vegetables: BaseGameItem[]) {
  const [gameState, setGameState] = useState<VegetableGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
    isCorrect: null,
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---
  const getAvailableVegetables = (): BaseGameItem[] => {
    const baseVegetables = VEGETABLE_GAME_CONSTANTS.BASE_VEGETABLES_COUNT;
    const additionalVegetables = Math.floor((gameState.level - 1) / VEGETABLE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * VEGETABLE_GAME_CONSTANTS.VEGETABLES_INCREMENT;
    const totalVegetables = Math.min(baseVegetables + additionalVegetables, vegetables.length);
    return vegetables.slice(0, totalVegetables);
  };

  const generateOptions = (correctVegetable: BaseGameItem): BaseGameItem[] => {
    const availableVegetables = getAvailableVegetables();
    return generateGameOptions(correctVegetable, availableVegetables, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakVegetableName = async (vegetableName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(vegetableName, (name) => {
        const pronunciation = VEGETABLE_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing vegetable name:", error);
    }
  };

  const startGame = async () => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
      isCorrect: null,
    } as VegetableGameState);

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const availableVegetables = getAvailableVegetables();
    const randomVegetable = getRandomItem(availableVegetables);
    const options = generateOptions(randomVegetable);

    setGameState((prev: VegetableGameState) => ({
      ...prev,
      currentChallenge: randomVegetable,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakVegetableName(randomVegetable.name);
  };

  const handleVegetableClick = async (selectedVegetable: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedVegetable.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableVegetables = getAvailableVegetables();
      const randomVegetable = getRandomItem(availableVegetables);
      const options = generateOptions(randomVegetable);
      
      const onComplete = async () => {
        setGameState((prev: VegetableGameState) => ({
          ...prev,
          currentChallenge: randomVegetable,
          options,
        }));
        
        await delay(300);
        await speakVegetableName(randomVegetable.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakVegetableName(gameState.currentChallenge.name);
        }
      });
    }
  };

  const resetGame = () => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
      isCorrect: null,
    } as VegetableGameState);
  };

  return {
    gameState,
    speakVegetableName,
    startGame,
    handleVegetableClick,
    resetGame,
    getAvailableVegetables,
  };
}
```

### 4.3 `app/games/vegetables/VegetableCard.tsx`

**Updated with BaseGameItem interface:**

```typescript
import { BaseGameItem } from "@/lib/types/base";

interface VegetableCardProps {
  vegetable: BaseGameItem;
  onClick: (vegetable: BaseGameItem) => void;
}

/**
 * VegetableCard - A component for displaying vegetable cards in the vegetable game
 * 
 * This component handles the rendering of individual vegetable cards with their
 * emoji and Hebrew names. Uses the standard BaseGameItem interface.
 */
export default function VegetableCard({ vegetable, onClick }: VegetableCardProps) {
  return (
    <div
      onClick={() => onClick(vegetable)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {vegetable.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {vegetable.hebrew}
        </div>
      </div>
    </div>
  );
}
```

### 4.4 `app/games/vegetables/StartScreen.tsx`

**Updated with proper imports and typing:**

```typescript
import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { VEGETABLE_GAME_STEPS } from "@/lib/constants/uiConstants";
import { VegetableStartScreenProps } from "@/lib/types/startScreen";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ vegetables, onStart, onSpeak }: VegetableStartScreenProps) {
  const gameConfig = useGameStartScreenConfig();

  return (
    <GenericStartScreen
      title="🥕 Vegetables Game 🥬"
      subTitle="Learn vegetables through listening!"
      textColorHeader={gameConfig.vegetables.header}
      textColorSubHeader={gameConfig.vegetables.subHeader}
      gameSteps={VEGETABLE_GAME_STEPS}
      gameStepsBgClass="bg-green-100 bg-opacity-90"
      items={vegetables}
      onStart={onStart}
      buttonFromColor={gameConfig.vegetables.button.from}
      buttonToColor={gameConfig.vegetables.button.to}
      backgroundStyle={gameConfig.vegetables.background}
      itemsTitle="All vegetables we'll learn:"
      itemsDescription="Click on a vegetable to hear its name! Healthy and delicious vegetables"
      itemsDescriptionColor="text-green-100"
      itemsGridClass="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      renderItem={(vegetable) => (
        <GameItem
          key={vegetable.name}
          hebrewText={vegetable.hebrew}
          color={vegetable.color}
          icon={<span className="text-3xl">{vegetable.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(vegetable.name)}
        />
      )}
    />
  );
}
```

### 4.5 `app/games/vegetables/page.tsx`

**Updated with BaseGameItem and proper component usage:**

```typescript
"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useVegetableGame } from "./useVegetableGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import VegetableCard from "./VegetableCard";
import { ALL_VEGETABLES } from "@/lib/constants/gameConstants";

export default function VegetableGame() {
  const vegetables: BaseGameItem[] = ALL_VEGETABLES;

  const {
    gameState,
    speakVegetableName,
    startGame,
    handleVegetableClick,
    resetGame,
  } = useVegetableGame(vegetables);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        vegetables={vegetables}
        onStart={startGame}
        onSpeak={speakVegetableName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-green-800"
            levelColor="text-green-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="Which vegetable did you hear?"
              icon="🥕🥬🍅🥒"
              iconColor="text-green-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakVegetableName(gameState.currentChallenge!.name)}
              description="Choose the correct vegetable!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="vegetable" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <GameCardGrid
          items={gameState.options}
          onItemClick={handleVegetableClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(vegetable) => (
            <VegetableCard
              key={vegetable.name}
              vegetable={vegetable}
              onClick={handleVegetableClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 Tip: Listen to the vegetable name I'm saying!"
          description="Click the icon above to hear again, or click vegetables below to hear their names"
        />
      </div>
    </div>
  );
}
```

---

## Step 5: Register Game in System

### 5.1 Update `lib/registry/gamesRegistry.ts`

```typescript
import { Salad } from "lucide-react"; // or another appropriate icon

// Add to GAMES_REGISTRY array:
{
  id: "vegetables",
  title: "Vegetables Game",
  description: "Learn vegetables!",
  icon: Salad,
  color: "bg-green-400 hover:bg-green-500",
  href: "/games/vegetables",
  available: true,
  order: 14, // or another order number
}
```

---

## Step 6: Testing & Debugging

### 🧪 TypeScript Validation
First, ensure your code compiles without errors:
```bash
npx tsc --noEmit
```

### 🎯 Testing Checklist:
- [x] **TypeScript Compilation**: No TS errors
- [x] **Type Safety**: All interfaces properly implemented
- [ ] **Game loads without errors**: Check browser console
- [ ] **Start screen displays correctly**: UI components render
- [ ] **Color and style settings match theme**: Consistent design
- [ ] **Audio works properly**: Speech synthesis functional
- [ ] **Score and levels function correctly**: Game logic works
- [ ] **Navigation works**: Back, reset, and home buttons
- [ ] **Game is registered on main page**: Appears in games grid

### 🔧 Common Debug Commands:
```bash
# Check for TypeScript errors
npm run type-check

# Run development server
npm run dev

# Check for linting issues
npm run lint
```

---

## 🚀 Advanced Development Practices

### 🎯 Modern Architecture Benefits:
1. **Type Safety**: Catch errors at compile time
2. **Code Reuse**: DRY principles throughout
3. **Consistent State**: Unified state management
4. **Generic Components**: Flexible, reusable UI
5. **Error Handling**: Comprehensive error boundaries

### 🔄 Refactoring Guidelines:
- Always use `BaseGameItem` for game items
- Extend `BaseGameState` for game states
- Leverage shared utilities in `gameUtils.ts`
- Follow consistent naming conventions
- Use proper TypeScript typing throughout

## 📋 Important Guidelines

### 🎯 Essential Development Principles:
1. **Type Safety First** - Always use TypeScript interfaces
2. **DRY Architecture** - Reuse existing components and utilities
3. **Consistency** - Follow established patterns across all games
4. **BaseGameItem Usage** - Use the standard interface for all game items
5. **Proper State Management** - Extend BaseGameState for game states
6. **Error Handling** - Include comprehensive error boundaries
7. **Accessibility** - Ensure child-friendly design and navigation

### 🔧 Common Issues & Solutions:

#### TypeScript Errors:
```typescript
// ❌ Wrong - Custom interface
interface CustomVegetable {
  name: string;
  // ...
}

// ✅ Correct - Use BaseGameItem
import { BaseGameItem } from "@/lib/types/base";
type Vegetable = BaseGameItem;
```

#### State Management:
```typescript
// ❌ Wrong - Custom state
interface CustomGameState {
  score: number;
  // ...
}

// ✅ Correct - Extend BaseGameState  
interface VegetableGameState extends BaseGameState {
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
}
```

#### Constants Usage:
```typescript
// ❌ Wrong - Direct object usage
const vegetables = [{ name: "carrot", ... }];

// ✅ Correct - Use typed constants
import { ALL_VEGETABLES } from "@/lib/constants/gameConstants";
const vegetables: BaseGameItem[] = ALL_VEGETABLES;
```

### 🚨 Critical Checks Before Deployment:
- [ ] **TypeScript Compilation**: `npx tsc --noEmit` passes
- [ ] **No Console Errors**: Clean browser console
- [ ] **Proper Imports**: All imports resolve correctly
- [ ] **State Typing**: Proper TypeScript typing in useState
- [ ] **Component Props**: Correct prop interfaces
- [ ] **Constants Usage**: Using centralized constants
- [ ] **Error Boundaries**: Proper error handling

---

## 🎨 Design & Style Guidelines

### 🗂️ File Structure Template:
```
app/games/[GAME_NAME]/
├── page.tsx                 // Main game component
├── StartScreen.tsx          // Start screen component
├── [GAME_NAME]Card.tsx     // Individual item card
└── use[GAME_NAME]Game.ts   // Game logic hook
```

### 🔤 Naming Conventions:
- **Files**: PascalCase for components, camelCase for hooks
- **Constants**: SCREAMING_SNAKE_CASE
- **Variables**: camelCase
- **Types**: PascalCase
- **Interfaces**: PascalCase with descriptive names

### 🎨 Visual Design Standards:
- **Gradient backgrounds**: `bg-gradient-to-br from-[color]-100 via-[color]-100 to-[color]-100`
- **Card hover effects**: `hover:scale-110 transition-all duration-300`
- **Border radius**: `rounded-3xl` for consistency
- **Shadows**: `shadow-xl hover:shadow-2xl`
- **Colors**: Use theme-appropriate color palettes
- **Typography**: Clear, child-friendly fonts

---

## 🚀 Advanced Features & Extensions

### 📝 Optional Advanced Development:
After the basic game works, you can enhance it with:
- **Advanced animations**: Custom CSS animations and transitions
- **Special sound effects**: Unique audio for each item
- **Difficulty levels**: Dynamic complexity adjustment
- **Keyboard support**: Arrow keys and Enter navigation
- **Performance optimization**: Lazy loading and code splitting
- **Analytics integration**: Track game performance and engagement

### 🔧 Performance Optimization:
- Use React.memo for components that don't change frequently
- Implement proper key props for list items
- Optimize images and audio files
- Consider lazy loading for large games

---

## 📚 Quick Reference

### Essential Imports:
```typescript
import { BaseGameItem, BaseGameState } from "@/lib/types/base";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { GAME_CONSTANTS } from "@/lib/constants/gameConstants";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";
```

### Key Interfaces:
- `BaseGameItem`: Standard item interface
- `BaseGameState`: Standard game state interface
- `BaseStartScreenProps`: Standard start screen props

### Essential Constants:
- `GAME_CONSTANTS`: General game configuration
- `[GAME_NAME]_GAME_CONSTANTS`: Game-specific configuration
- `[GAME_NAME]_HEBREW_PRONUNCIATIONS`: Hebrew pronunciation mapping

---

## 🎯 Success Criteria

A successfully implemented game should:
✅ Compile without TypeScript errors
✅ Use BaseGameItem and BaseGameState interfaces
✅ Follow consistent naming conventions
✅ Implement proper error handling
✅ Have responsive design
✅ Support Hebrew audio
✅ Include proper navigation
✅ Be registered in the games registry

---

**🎉 Congratulations! You're now ready to create a new game following modern TypeScript and React best practices. Happy coding!**