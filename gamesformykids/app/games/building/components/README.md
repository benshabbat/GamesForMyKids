# Building Game Components

This directory contains the modular components for the Building Game. State is managed by a **Zustand store** (`useBuildingStore`, composed from slices), not React Context — components read state via store selectors instead of props drilling or a context provider.

## Structure

Components are grouped into three subfolders:

```
components/
├── canvas/     # BlockRenderer, BlockShape, BuildingCanvas, EmptyCanvasWelcome
├── controls/   # ActionButtons, ColorPicker, SettingsPanel, ShapeCreator
└── ui/         # BuildingGameHeader, BuildingGameInstructions, ParticleSystem
```

### canvas/
- **BuildingCanvas** - main canvas for building blocks; handles drag and drop, shows `EmptyCanvasWelcome` when empty
- **BlockRenderer** - renders individual blocks/shapes, handles rotation and dragging (rotation button on hover, double-click to rotate 90°)
- **BlockShape** - SVG shape primitives (including the heart shape, built from bezier curves with gradient fills)
- **EmptyCanvasWelcome** - welcome message shown when the canvas is empty

### controls/
- **ColorPicker** - color palette selection, shows the current color
- **ShapeCreator** - available shapes + tool selection (normal, magic, rainbow)
- **ActionButtons** - game action buttons (magic shuffle, clear, undo, redo) via the store's history slice
- **SettingsPanel** - sound/grid/animation toggles, save functionality

### ui/
- **BuildingGameHeader** - game title, score, and achievements
- **BuildingGameInstructions** - game instructions and help
- **ParticleSystem** - particle effects for visual feedback

## State — Zustand store

`app/games/building/store/buildingStore.ts` composes the store from slices: `blockSlice`, `blockDragSlice`, `historySlice`, `particleSlice`, `achievementSlice`, `settingsSlice`.

```tsx
import { useBuildingStore } from '@/app/games/building/store/buildingStore';

function MyComponent() {
  const blocks = useBuildingStore((s) => s.blocks);
  const createBlock = useBuildingStore((s) => s.createBlock);
  // ...
}
```

## Usage

Import components from the local barrel:
```tsx
import { BuildingCanvas } from '@/app/games/building/components/canvas';
import { ColorPicker, ActionButtons } from '@/app/games/building/components/controls';
import { BuildingGameHeader } from '@/app/games/building/components/ui';
```
