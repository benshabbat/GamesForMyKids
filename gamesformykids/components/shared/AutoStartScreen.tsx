/**
 * ===============================================
 * AutoStartScreen - קומפוננט StartScreen עם קונטקסט
 * ===============================================
 * 
 * 🎯 אפס props - הכל מהקונטקסט!
 */

import { useUniversalGame } from '@/contexts/UniversalGameContext';
import GenericStartScreen from "./GenericStartScreen";
import GameItem from "./GameItem";

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

  // עבור משחק מתמטיקה - הצג דוגמאות תרגילים במקום items
  const getMathExamplesRenderer = () => {
    const mathExamples = [
      { equation: "3 + 2 = ?", emoji: "🍎", description: "חיבור תפוחים" },
      { equation: "5 - 1 = ?", emoji: "🎈", description: "חיסור בלונים" },
      { equation: "2 + 3 = ?", emoji: "🌟", description: "חיבור כוכבים" },
      { equation: "4 - 2 = ?", emoji: "🐶", description: "חיסור כלבים" },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {mathExamples.map((example, index) => (
          <div 
            key={index} 
            className="bg-white bg-opacity-90 rounded-xl p-4 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-4xl mb-3 text-center">{example.emoji}</div>
            <div className="text-gray-800 font-bold text-xl mb-2 text-center">{example.equation}</div>
            <div className="text-gray-600 text-sm text-center">{example.description}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* הניווט מוסר מכאן - הוא עכשיו ב-layout */}
      
      <GenericStartScreen
      title={config.title}
      subTitle={config.subTitle}
      textColorHeader={config.colors.header}
      textColorSubHeader={config.colors.subHeader}
      gameSteps={config.steps}
      gameStepsBgClass={config.colors.stepsBg}
      items={gameType === 'math' ? [] : items}
      customOnStart={startGame}
      buttonFromColor={config.colors.button.from}
      buttonToColor={config.colors.button.to}
      backgroundStyle={config.colors.background}
      itemsTitle={config.itemsTitle}
      itemsDescription={config.itemsDescription}
      itemsDescriptionColor={config.colors.itemsDescription}
      itemsGridClass={config.grid.className}
      customItemsRenderer={gameType === 'math' ? getMathExamplesRenderer : undefined}
      renderItem={gameType !== 'math' ? (item) => {
        // Safe check for item properties
        if (!item || typeof item !== 'object') return null;
        
        return (
          <GameItem
            key={item.name || String(item)}
            hebrewText={item.hebrew || ''}
            color={item.color || '#000'}
            icon={<span className="text-3xl">{item.emoji || '🎯'}</span>}
            shape="circle"
            size="large"
            onClick={() => speakItemName?.(item.name || '')}
            hideSoundIcon={!config.grid.showSpeaker}
          />
        );
      } : undefined}
    />
    </>
  );
}
