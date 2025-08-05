/**
 * ===============================================
 * AutoStartScreen - קומפוננט StartScreen אוטומטי
 * ===============================================
 * 
 * 🚀 ULTRA DRY Solution!
 * מחליף את כל ה-StartScreen קבצים עם קומפוננט אחד חכם
 * 
 * מעבר מ-20+ קבצי StartScreen ל-1 קומפוננט!
 * רק צריך לציין את סוג המשחק והפריטים
 */

import { AutoStartScreenProps } from "@/lib/types/startScreen";
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";
import GenericStartScreen from "./GenericStartScreen";
import GameItem from "./GameItem";
import NavigationTips from "./NavigationTips";

/**
 * AutoStartScreen - קומפוננט אוטומטי ל-StartScreen
 * 
 * @param gameType - סוג המשחק (מהטיפוס GameType)
 * @param gameId - זהות המשחק לצורך הניווט
 * @param items - רשימת פריטי המשחק
 * @param onStart - פונקציה להתחלת המשחק
 * @param onSpeak - פונקציה אופציונלית להשמעת שמות
 */
export default function AutoStartScreen({ 
  gameType, 
  items, 
  onStart, 
  onSpeak 
}: Omit<AutoStartScreenProps, 'gameId'>) {
  const config = GAME_UI_CONFIGS[gameType];
  
  if (!config) {
    console.error(`❌ No UI config found for game type: ${gameType}`);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ שגיאת קונפיגורציה</h2>
          <p className="text-gray-600">לא נמצאה קונפיגורציה עבור משחק: <code>{gameType}</code></p>
          <p className="text-sm text-gray-500 mt-2">יש להוסיף את המשחק ל-GAME_UI_CONFIGS</p>
        </div>
      </div>
    );
  }

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
      items={items}
      onStart={onStart}
      buttonFromColor={config.colors.button.from}
      buttonToColor={config.colors.button.to}
      backgroundStyle={config.colors.background}
      itemsTitle={config.itemsTitle}
      itemsDescription={config.itemsDescription}
      itemsDescriptionColor={config.colors.itemsDescription}
      itemsGridClass={config.grid.className}
      renderItem={(item) => (
        <GameItem
          key={item.name}
          hebrewText={item.hebrew}
          color={item.color}
          icon={<span className="text-3xl">{item.emoji}</span>}
          shape="circle"
          size="large"
          onClick={() => onSpeak?.(item.name)}
          hideSoundIcon={!config.grid.showSpeaker}
        />
      )}
    />
    
    {/* טיפים לניווט */}
    <NavigationTips />
    </>
  );
}
