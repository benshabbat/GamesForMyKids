'use client';

import {
  ColorPicker,
  ShapeCreator,
  ActionButtons,
  SettingsPanel,
  ParticleSystem,
  BuildingGameHeader,
  BuildingCanvas,
  BuildingGameInstructions,
} from './components';
import { useBuildingStore } from '@/app/games/building/store/buildingStore';
import BuildingStartScreen from './BuildingStartScreen';
import { useBuildingGameLoop } from './useBuildingGameLoop';

export default function BuildingGameClient() {
  const isPlaying = useBuildingStore((s) => s.isPlaying);
  useBuildingGameLoop();

  if (!isPlaying) {
    return <BuildingStartScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 p-2 md:p-4 relative overflow-hidden no-select">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl md:text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌟</div>
        <div className="absolute top-32 right-20 text-2xl md:text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🎨</div>
        <div className="absolute bottom-20 left-32 text-3xl md:text-5xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🏗️</div>
      </div>
      <ParticleSystem />
      <div className="max-w-7xl mx-auto relative z-10">
        <BuildingGameHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <ColorPicker />
          <ShapeCreator />
          <ActionButtons />
          <SettingsPanel />
        </div>
        <BuildingCanvas />
        <BuildingGameInstructions />
      </div>
    </div>
  );
}
