import type { StateCreator } from 'zustand';
import type { BuildingStore } from '../buildingStore';
import type { ToolType } from '@/app/games/building/types';
import { COLORS } from '@/app/games/building/constants';

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

  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setShowGrid: (show) => set({ showGrid: show }),
  setAnimationMode: (mode) => set({ animationMode: mode }),
  handleColorSelect: (color) => set({ selectedColor: color }),
  handleToolSelect: (tool) => set({ selectedTool: tool }),
  handleSizeChange: (size) => set({ selectedSize: size }),
});
