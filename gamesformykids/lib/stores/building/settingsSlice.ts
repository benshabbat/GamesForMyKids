import type { StateCreator } from 'zustand';
import type { BuildingStore } from '../buildingStore';
import type { ToolType } from '@/app/games/building/types';
import { COLORS } from '@/app/games/building/constants';
import { makeSetter } from '@/lib/stores/utils/sliceUtils';

export type SettingsSlice = {
  soundEnabled: boolean;
  selectedTool: ToolType;
  selectedColor: string;
  selectedSize: number;
  showGrid: boolean;
  animationMode: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setSelectedTool: (tool: ToolType) => void;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: number) => void;
  setShowGrid: (show: boolean) => void;
  setAnimationMode: (mode: boolean) => void;
  handleColorSelect: (color: string) => void;
  handleToolSelect: (tool: ToolType) => void;
  handleSizeChange: (size: number) => void;
};

export const createSettingsSlice: StateCreator<BuildingStore, [], [], SettingsSlice> = (set) => ({
  soundEnabled: false,
  selectedTool: 'normal',
  selectedColor: COLORS[0],
  selectedSize: 1,
  showGrid: false,
  animationMode: false,

  setSoundEnabled: makeSetter(set, 'soundEnabled'),
  setSelectedTool: makeSetter(set, 'selectedTool'),
  setSelectedColor: makeSetter(set, 'selectedColor'),
  setSelectedSize: makeSetter(set, 'selectedSize'),
  setShowGrid: makeSetter(set, 'showGrid'),
  setAnimationMode: makeSetter(set, 'animationMode'),
  handleColorSelect: makeSetter(set, 'selectedColor'),
  handleToolSelect: makeSetter(set, 'selectedTool'),
  handleSizeChange: makeSetter(set, 'selectedSize'),
});
