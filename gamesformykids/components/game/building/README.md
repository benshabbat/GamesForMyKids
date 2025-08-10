# Building Game Components

This directory contains the modular components for the Building Game.

## Components

### ColorPicker
- Displays a color palette for selection
- Shows the currently selected color
- Props: `colors`, `selectedColor`, `onColorSelect`

### ShapeCreator
- Shows available shapes to create
- Includes tool selection (normal, magic, rainbow)
- Props: `shapes`, `shapeIcons`, `selectedColor`, `selectedTool`, `onCreateBlock`, `onToolSelect`

### ActionButtons
- Contains game action buttons (magic shuffle, clear, undo, redo)
- Handles history management
- Props: `historyIndex`, `historyLength`, `onMagicShuffle`, `onClearAll`, `onUndo`, `onRedo`

### SettingsPanel
- Game settings toggle buttons
- Sound, grid, animation controls
- Save functionality
- Props: `soundEnabled`, `showGrid`, `animationMode`, etc.

### BlockRenderer
- Renders individual blocks/shapes
- Handles rotation, dragging, and interactions
- Includes rotation button on hover
- Props: `block`, `isDragged`, `onMouseDown`, `onDoubleClick`, `onRotate`

### ParticleSystem
- Renders particle effects
- Simple component for visual feedback
- Props: `particles`

## Features Added

### Rotation Controls
- **Rotation Button**: Each block has a rotation button (⟲) that appears on hover
- **Double Click**: Double-clicking a block rotates it by 90°
- **Precision Rotation**: The rotation button rotates by 45° increments

### Enhanced Heart Shape ✨
The heart shape has been completely redesigned with:
- **SVG-based rendering** for crisp, scalable graphics
- **Gradient fills** with depth and dimension
- **Smooth bezier curves** for natural heart shape
- **Subtle highlights** for 3D appearance
- **Optimized performance** with unique IDs for each heart
- **Perfect symmetry** and balanced proportions
- Proper positioning and scaling

## Usage

Import all components from the index file:
```tsx
import { 
  ColorPicker, 
  ShapeCreator, 
  ActionButtons, 
  SettingsPanel, 
  BlockRenderer, 
  ParticleSystem 
} from '@/components/game/building';
```
