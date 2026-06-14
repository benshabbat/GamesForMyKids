"use client";

import { SimpleGameInstructions } from "@/components/shared";
import { SimpleGameStartButton } from "@/components/shared";
import { StartScreenHeader } from "@/components/shared";
import { ButtonCheckAudio } from "@/components/shared";
import { ComponentTypes } from "@/lib/types";
import { useUniversalGame } from "@/hooks/shared/game-state/useUniversalGame";
import { useGameStore } from "@/lib/stores/gameStore";

type GenericStartScreenProps<T> = ComponentTypes.GenericStartScreenProps<T>;

/**
 * GenericStartScreen - מסך התחלה גנרי וגמיש
 * תומך בכל סוגי המשחקים עם אפשרויות עיצוב מלאות
 * כשלא מועברים props, קורא ישירות מ-useUniversalGame
 */

export default function GenericStartScreen<T>({
  title,
  subTitle,
  textColorHeader,
  textColorSubHeader,
  gameSteps,
  items,
  customOnStart,
  buttonFromColor,
  buttonToColor,
  backgroundStyle,
  itemsTitle,
  itemsDescription,
  itemsDescriptionColor,
  itemsGridClass,
  renderItem,
  customItemsRenderer,
  showAudioCheck = true,
  className = "",
}: GenericStartScreenProps<T>) {
  const { config, items: hookItems, startGame, gameType } = useUniversalGame();
  const prevBest = useGameStore((s) => s.highScores[gameType ?? ""] ?? 0);

  const resolvedTitle          = title               ?? config?.title          ?? "";
  const resolvedSubTitle       = subTitle            ?? config?.subTitle        ?? "";
  const resolvedTextHeader     = textColorHeader      ?? "text-purple-800";
  const resolvedTextSubHeader  = textColorSubHeader   ?? "text-purple-600";
  const resolvedSteps          = gameSteps            ?? (config?.steps ? [...config.steps] : []);
  const resolvedOnStart        = customOnStart        ?? startGame;
  const resolvedFromColor      = buttonFromColor      ?? config?.colors?.button?.from ?? "blue-400";
  const resolvedToColor        = buttonToColor        ?? config?.colors?.button?.to   ?? "blue-600";
  const resolvedBackground     = backgroundStyle      ?? config?.colors?.background;
  const resolvedItemsTitle     = itemsTitle           ?? config?.itemsTitle;
  const resolvedItemsDesc      = itemsDescription     ?? config?.itemsDescription;
  const resolvedItemsDescColor = itemsDescriptionColor ?? config?.colors?.itemsDescription ?? "text-gray-100";
  const resolvedItemsGridClass = itemsGridClass       ?? config?.grid?.className ?? "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto";
  const resolvedItems          = (items               ?? hookItems) as T[];

  return (
    <div
      className={`min-h-screen p-4 ${className}`}
      style={{ background: resolvedBackground }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title={resolvedTitle}
          subTitle={resolvedSubTitle}
          textColorHeader={resolvedTextHeader}
          textColorSubHeader={resolvedTextSubHeader}
        />

        {/* הסבר המשחק */}
        <SimpleGameInstructions
          title="איך משחקים?"
          instructions={resolvedSteps.map(step => step.description || step.stepText || "")}
          showSteps={true}
          variant="detailed"
        />

        {/* כפתור התחלה */}
        <SimpleGameStartButton
          customOnStart={resolvedOnStart}
          fromColor={resolvedFromColor}
          toColor={resolvedToColor}
        />

        {/* שיא אישי */}
        {prevBest > 0 && (
          <p className="text-white/80 text-base mt-3 font-medium">
            🏆 השיא שלך: {prevBest} — נסה לשבור אותו!
          </p>
        )}

        {/* כפתור בדיקת שמע */}
        {showAudioCheck && <ButtonCheckAudio />}

        {/* דוגמת פריטים */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            {resolvedItemsTitle}
          </h3>

          {customItemsRenderer ? (
            customItemsRenderer()
          ) : (
            <div className={resolvedItemsGridClass}>
              {renderItem && resolvedItems.map((item, index) => renderItem(item, index))}
            </div>
          )}

          <p className={`${resolvedItemsDescColor} mt-4`}>
            {resolvedItemsDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
