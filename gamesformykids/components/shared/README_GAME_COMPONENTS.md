# Generic Game Components

This README provides instructions on how to use the generic game components for different game types.

## Components Available

### 1. GameCard

A generic component for rendering game items (Color, Letter, Shape, Number, etc.)

```tsx
<GameCard
  item={item}                // The game item to display
  onClick={handleItemClick}  // Function to handle item click
  isCorrect={boolean}        // Whether this is the correct item (optional)
  showSoundIcon={boolean}    // Whether to show the sound icon (optional)
  backgroundColor="string"   // Custom background color (optional)
/>
```

### 2. GameCardGrid

A grid component for rendering multiple GameCard items.

```tsx
<GameCardGrid
  items={items}               // Array of items to display
  onItemClick={handleClick}   // Function to handle item click
  currentChallenge={current}  // The current challenge item (optional)
  gridCols="grid-cols-2"      // CSS grid columns (optional)
  maxWidth="max-w-3xl"        // Max width of the grid (optional)
  showSoundIcon={true}        // Whether to show sound icons (optional)
/>
```

## How to Use

### For Color Game

```tsx
import { GameCardGrid } from "@/components/shared/GameCardGrid";

// In your component:
<GameCardGrid
  items={gameState.options}
  onItemClick={handleColorClick}
  currentChallenge={gameState.currentChallenge}
  showSoundIcon={true}
/>
```

### For Letter Game

```tsx
import { GameCardGrid } from "@/components/shared/GameCardGrid";

// In your component:
<GameCardGrid
  items={gameState.options}
  onItemClick={handleLetterClick}
  currentChallenge={gameState.currentChallenge}
  gridCols="grid-cols-2"
  showSoundIcon={true}
/>
```

### For Shape Game

```tsx
import { GameCardGrid } from "@/components/shared/GameCardGrid";

// In your component:
<GameCardGrid
  items={gameState.options}
  onItemClick={handleShapeClick}
  currentChallenge={gameState.currentChallenge}
  showSoundIcon={true}
/>
```

### For Number Game

```tsx
import { GameCardGrid } from "@/components/shared/GameCardGrid";

// In your component:
<GameCardGrid
  items={gameState.options}
  onItemClick={handleNumberClick}
  currentChallenge={gameState.currentChallenge}
  showSoundIcon={true}
/>
```

## Custom Rendering

You can also provide custom rendering for items:

```tsx
<GameCardGrid
  items={gameState.options}
  onItemClick={handleClick}
  currentChallenge={gameState.currentChallenge}
  renderCustomCard={(item, isCorrect) => (
    <YourCustomComponent
      item={item}
      isCorrect={isCorrect}
      // other props
    />
  )}
/>
```
