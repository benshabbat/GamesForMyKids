# Game Development Guide for "Kids Games" System

## Overview
This guide explains how to add a new game to the system while maintaining all existing standards and conventions.

## Example: Vegetables Game

We'll walk through adding a "Vegetables Game" as a complete example.

---

## Step 1: Define Constants

### 1.1 Update `lib/constants/gameConstants.ts`

```typescript
/**
 * Vegetable constants for the game
 */
export const VEGETABLE_CONSTANTS = {
  CARROT: {
    name: "carrot",
    hebrew: "גזר",
    english: "Carrot",
    emoji: "🥕",
    color: "bg-orange-500",
    sound: [440, 550, 660],
  },
  TOMATO: {
    name: "tomato",
    hebrew: "עגבנייה",
    english: "Tomato",
    emoji: "🍅",
    color: "bg-red-500",
    sound: [392, 494, 587],
  },
  CUCUMBER: {
    name: "cucumber",
    hebrew: "מלפפון",
    english: "Cucumber",
    emoji: "🥒",
    color: "bg-green-500",
    sound: [349, 440, 523],
  },
  PEPPER: {
    name: "pepper",
    hebrew: "פלפל",
    english: "Pepper",
    emoji: "🫑",
    color: "bg-green-600",
    sound: [330, 415, 494],
  },
  ONION: {
    name: "onion",
    hebrew: "בצל",
    english: "Onion",
    emoji: "🧅",
    color: "bg-yellow-600",
    sound: [294, 370, 440],
  },
  LETTUCE: {
    name: "lettuce",
    hebrew: "חסה",
    english: "Lettuce",
    emoji: "🥬",
    color: "bg-green-400",
    sound: [262, 330, 392],
  },
};

// List of all vegetables
export const ALL_VEGETABLES = Object.values(VEGETABLE_CONSTANTS);

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

### 2.1 Update `lib/types/game.ts`

```typescript
// Add vegetable interface
export interface Vegetable {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

// Add vegetable game state
export interface VegetableGameState {
  currentChallenge: Vegetable | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Vegetable[];
}
```

### 2.2 Update `lib/types/startScreenTypes.ts`

```typescript
import { Vegetable } from "./game";

/**
 * Start screen props for vegetables game
 */
export interface VegetableStartScreenProps extends BaseStartScreenProps {
  vegetables: Vegetable[];
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

```typescript
import { useState, useEffect } from "react";
import { Vegetable, VegetableGameState } from "@/lib/types/game";
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

export function useVegetableGame(vegetables: Vegetable[]) {
  const [gameState, setGameState] = useState<VegetableGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---
  const getAvailableVegetables = (): Vegetable[] => {
    const baseVegetables = VEGETABLE_GAME_CONSTANTS.BASE_VEGETABLES_COUNT;
    const additionalVegetables = Math.floor((gameState.level - 1) / VEGETABLE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * VEGETABLE_GAME_CONSTANTS.VEGETABLES_INCREMENT;
    const totalVegetables = Math.min(baseVegetables + additionalVegetables, vegetables.length);
    return vegetables.slice(0, totalVegetables);
  };

  const generateOptions = (correctVegetable: Vegetable): Vegetable[] => {
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
    });

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const availableVegetables = getAvailableVegetables();
    const randomVegetable = getRandomItem(availableVegetables);
    const options = generateOptions(randomVegetable);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomVegetable,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakVegetableName(randomVegetable.name);
  };

  const handleVegetableClick = async (selectedVegetable: Vegetable) => {
    if (!gameState.currentChallenge) return;

    if (selectedVegetable.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableVegetables = getAvailableVegetables();
      const randomVegetable = getRandomItem(availableVegetables);
      const options = generateOptions(randomVegetable);
      
      const onComplete = async () => {
        setGameState((prev) => ({
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
    });
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

```typescript
import { Vegetable } from "@/lib/types/game";

interface VegetableCardProps {
  vegetable: Vegetable;
  onClick: (vegetable: Vegetable) => void;
}

/**
 * VegetableCard - A component for displaying vegetable cards in the vegetable game
 * 
 * This component handles the rendering of individual vegetable cards with their
 * emoji and Hebrew names
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

```typescript
import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";
import { VEGETABLE_GAME_STEPS } from "@/lib/constants/uiConstants";
import { VegetableStartScreenProps } from "@/lib/types/startScreenTypes";
import { useGameStartScreenConfig } from "@/hooks/shared/useGameStartScreenConfig";

export default function StartScreen({ vegetables, onStart }: VegetableStartScreenProps) {
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
        />
      )}
    />
  );
}
```

### 4.5 `app/games/vegetables/page.tsx`

```typescript
"use client";

import { Vegetable } from "@/lib/types/game";
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
  const vegetables: Vegetable[] = ALL_VEGETABLES;

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

### Testing Checklist:
- [ ] Game loads without errors
- [ ] Start screen displays correctly
- [ ] Color and style settings match theme
- [ ] Audio works properly
- [ ] Score and levels function correctly
- [ ] Navigation works (back, reset)
- [ ] Game is registered on main page

---

## Important Guidelines

### 🎯 Things to Remember:
1. **Consistency** - Use the same patterns as existing games
2. **Naming** - Keep names consistent throughout (vegetable → vegetables)
3. **Colors** - Choose a color palette that fits the theme
4. **Emojis** - Ensure emojis are supported across all browsers
5. **Translation** - All Hebrew text should be accurate

### 🔧 Common Issues & Solutions:
- **TypeScript Errors**: Ensure all types are properly defined
- **Color Issues**: Use existing Tailwind CSS classes
- **Audio Issues**: Check that pronunciations are defined
- **Navigation Issues**: Verify href is correct in registration

### 📝 Advanced Development:
After the basic game works, you can add:
- Advanced animations
- Special sounds for each item
- Different difficulty levels
- Keyboard mapping support

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

### 🎨 Style Guidelines:
- Use gradient backgrounds: `bg-gradient-to-br from-[color]-100 via-[color]-100 to-[color]-100`
- Card hover effects: `hover:scale-110 transition-all duration-300`
- Consistent border radius: `rounded-3xl`
- Standard shadow: `shadow-xl hover:shadow-2xl`

---

That's it! Follow this guide and you'll be able to create a new game that integrates perfectly with the existing system.