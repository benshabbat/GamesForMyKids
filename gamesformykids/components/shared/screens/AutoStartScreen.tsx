'use client';

/**
 * ===============================================
 * AutoStartScreen - קומפוננט StartScreen עם קונטקסט
 * ===============================================
 * 
 * 🎯 אפס props - הכל מהקונטקסט!
 */

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import { BaseGameItem } from '@/lib/types';
import GenericStartScreen from "./GenericStartScreen";
import UnifiedCard from "../cards/UnifiedCard";

/**
 * 🎯 AutoStartScreen עם קונטקסט - ללא props!
 */
export default function AutoStartScreen() {
  const { 
    gameType, 
    items, 
    startGame, 
    speakItemName, 
    config 
  } = useUniversalGame();
  
  if (!config) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-red-500">Game type not supported: {gameType}</p>
      </div>
    );
  }

  return (
    <>
      {/* הניווט מוסר מכאן - הוא עכשיו ב-layout */}
      
      <GenericStartScreen
      title={config.title}
      subTitle={config.subTitle}
      textColorHeader={config.colors?.header}
      textColorSubHeader={config.colors?.subHeader}
      gameSteps={config.steps ? [...config.steps] : undefined}
      gameStepsBgClass={config.colors?.stepsBg}
      items={items as BaseGameItem[]}
      customOnStart={startGame}
      buttonFromColor={config.colors?.button?.from}
      buttonToColor={config.colors?.button?.to}
      backgroundStyle={config.colors?.background}
      itemsTitle={config.itemsTitle}
      itemsDescription={config.itemsDescription}
      itemsDescriptionColor={config.colors?.itemsDescription}
      itemsGridClass={config.grid?.className}
      renderItem={(item) => {
        // Safe check for item properties
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
    </>
  );
}
