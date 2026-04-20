'use client';

import { useEffect } from 'react';
import { 
  ColorPicker, 
  ShapeCreator, 
  ActionButtons, 
  SettingsPanel, 
  ParticleSystem,
  BuildingGameHeader,
  BuildingCanvas,
  BuildingGameInstructions
} from './components';
import { useBuildingStore } from '@/lib/stores/buildingStore';
import BuildingStartScreen from './BuildingStartScreen';

export default function BuildingGame() {
  const isPlaying = useBuildingStore((s) => s.isPlaying);

  // Particle animation — no subscription needed, read state inside interval
  useEffect(() => {
    const interval = setInterval(() => {
      const { particles, tickParticles } = useBuildingStore.getState();
      if (particles.length > 0) tickParticles();
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Block rotation animation — no subscription needed, check inside interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (!useBuildingStore.getState().animationMode) return;
      useBuildingStore.setState((s) => ({
        blocks: s.blocks.map((block) => ({
          ...block,
          rotation: (block.rotation + 2) % 360,
        })),
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isPlaying) {
    return <BuildingStartScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 p-2 md:p-4 relative overflow-hidden no-select">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl md:text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌟</div>
        <div className="absolute top-32 right-20 text-2xl md:text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🎨</div>
        <div className="absolute bottom-20 left-32 text-3xl md:text-5xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🏗️</div>
      </div>

      {/* Particles */}
      <ParticleSystem />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with score and achievements */}
        <BuildingGameHeader />

        {/* Enhanced Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <ColorPicker />
          <ShapeCreator />
          <ActionButtons />
          <SettingsPanel />
        </div>

        {/* Enhanced Building Canvas */}
        <BuildingCanvas />

        {/* Instructions */}
        <BuildingGameInstructions />
      </div>
    </div>
  );
}
