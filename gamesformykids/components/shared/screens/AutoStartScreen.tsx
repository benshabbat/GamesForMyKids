'use client';

import { useState, useCallback } from 'react';
import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import type { BaseGameItem } from '@/lib/types';
import GenericStartScreen from "./GenericStartScreen";
import UnifiedCard from "../cards/UnifiedCard";
import { StudyFirstPhase } from './StudyFirstPhase';
import RealPhotoToggleButton from '../buttons/RealPhotoToggleButton';
import { REAL_PHOTO_CARD_MAP } from '../GameCardMap';

export default function AutoStartScreen() {
  const { config, speakItemName, gameType, items, startGame } = useUniversalGame();
  const [studyMode, setStudyMode] = useState(false);
  const [inStudy, setInStudy] = useState(false);

  const handleStartWithStudy = useCallback(() => setInStudy(true), []);
  const handleStudyComplete = useCallback(() => {
    setInStudy(false);
    startGame();
  }, [startGame]);

  if (!config) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-red-500">Game type not supported: {gameType}</p>
      </div>
    );
  }

  if (inStudy) {
    return (
      <div className="min-h-screen" style={{ background: config.colors?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <StudyFirstPhase
          items={(items as BaseGameItem[]).slice(0, 20)}
          onSpeak={(name) => speakItemName?.(name)}
          onComplete={handleStudyComplete}
        />
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
      customOnStart={studyMode ? handleStartWithStudy : undefined}
      extraControls={
        <div className="flex justify-center gap-3 mt-3 flex-wrap">
          <button
            onClick={() => setStudyMode(v => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
              studyMode
                ? 'bg-amber-400 border-amber-500 text-amber-900 shadow-md'
                : 'bg-white/30 border-white/50 text-white hover:bg-white/40'
            }`}
            aria-pressed={studyMode}
          >
            📖 {studyMode ? 'לימוד קודם ✓' : 'לימוד קודם'}
          </button>
          {gameType && gameType in REAL_PHOTO_CARD_MAP && <RealPhotoToggleButton />}
        </div>
      }
    />
  );
}
