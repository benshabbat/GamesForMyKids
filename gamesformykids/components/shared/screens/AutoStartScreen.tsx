'use client';

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import type { BaseGameItem } from '@/lib/types';
import GenericStartScreen from "./GenericStartScreen";
import UnifiedCard from "../cards/UnifiedCard";

export default function AutoStartScreen() {
  const { config, speakItemName, gameType } = useUniversalGame();

  if (!config) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-red-500">Game type not supported: {gameType}</p>
      </div>
    );
  }

  return (
    <GenericStartScreen<BaseGameItem>
      renderItem={(item) => {
        if (!item || typeof item !== 'object') return null;
        return (
          <UnifiedCard
            key={item.name || String(item)}
            variant="simple"
            item={item}
            hebrewText={item.hebrew || ''}
            color={item.color || '#000'}
            icon={<span className="text-3xl">{item.emoji || '🎯'}</span>}
            shape="circle"
            size="large"
            onClick={() => speakItemName?.(item.name || '')}
            hideSoundIcon={!config.grid?.showSpeaker}
          />
        );
      }}
    />
  );
}
