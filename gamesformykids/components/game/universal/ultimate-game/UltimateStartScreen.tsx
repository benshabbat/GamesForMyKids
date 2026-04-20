"use client";

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import { AutoStartScreen } from '../../../shared';

const DEFAULT_BG = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

/**
 * UltimateStartScreen - מסך הפתיחה של UltimateGamePage עם רקע
 */
export function UltimateStartScreen() {
  const { config } = useUniversalGame();

  return (
    <div
      style={{ background: config.colors?.background || DEFAULT_BG }}
      className="min-h-screen"
    >
      <AutoStartScreen />
    </div>
  );
}
