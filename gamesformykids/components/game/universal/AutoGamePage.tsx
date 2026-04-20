/**
 * ===============================================
 * AutoGamePage - הקומפוננט הקסום 🎯
 * ===============================================
 *
 * הופך כל דף משחק מ-120 שורות ל-3 שורות!
 * כל הלוגיקה במקום אחד - אוטומציה מושלמת
 * עכשיו עם קונטקסטים וhook מותאם - ללא props drilling!
 * 🚀 חדש: כל הלוגיקה ב-useAutoGame hook!
 */

"use client";

import { BaseGameItem } from "@/lib/types/core/base";
import { useAutoGame } from "@/hooks";
import { AutoStartScreen } from "../../shared";
import { ProgressDisplay } from "../../shared";
import { AutoGameHeader } from "./AutoGameHeader";
import { AutoGameBody } from "./AutoGameBody";

interface AutoGamePageProps {
  /** רינדר מותאם אישית לכרטיס - אופציונלי */
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode;
}

/**
 * 🎯 הקומפוננט הקסום שהופך כל משחק לאוטומטי
 * עכשיו ללא props drilling וכל הלוגיקה בhook מותאם!
 * 🚀 gameType אופציונלי - אם לא מועבר, יילקח מהקונטקסט
 */
export function AutoGamePage({ renderCard }: AutoGamePageProps) {
  const { gameState, isPlaying, config } = useAutoGame();

  // 🖥️ אם לא במשחק או gameState לא קיים, הראה StartScreen
  if (!gameState || !isPlaying) {
    return <AutoStartScreen />;
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{ background: config.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <AutoGameHeader />
        <AutoGameBody renderCard={renderCard} />

        {/* מודל סטטיסטיקות */}
        <ProgressDisplay
          stats={{
            totalItems: 10,
            completedItems: 5,
            averageTime: 2.5,
            accuracy: 85,
            streak: 3,
          }}
        />
      </div>
    </div>
  );
}
