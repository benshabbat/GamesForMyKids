import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import { GameStep } from "@/lib/types/uiTypes";
import { ReactNode } from "react";

interface GenericStartScreenProps<T> {
  // Header props
  title: string;
  subTitle: string;
  textColorHeader?: string;
  textColorSubHeader?: string;
  
  // Game props
  gameSteps: GameStep[];
  gameStepsBgClass?: string;
  items: T[];
  onStart: () => void;
  onSpeak?: (name: string) => void;
  
  // Button colors
  buttonFromColor: string;
  buttonToColor: string;
  
  // Background
  backgroundStyle: string;
  
  // Items display
  itemsTitle: string;
  itemsDescription: string;
  itemsDescriptionColor?: string;
  itemsGridClass?: string;
  
  // Item rendering function - either use renderItem OR customItemsRenderer
  renderItem?: (item: T, index: number) => ReactNode;
  customItemsRenderer?: () => ReactNode;
}

export default function GenericStartScreen<T>({
  title,
  subTitle,
  textColorHeader = "text-purple-800",
  textColorSubHeader = "text-purple-600",
  gameSteps,
  gameStepsBgClass,
  items,
  onStart,
  buttonFromColor,
  buttonToColor,
  backgroundStyle,
  itemsTitle,
  itemsDescription,
  itemsDescriptionColor = "text-gray-100",
  itemsGridClass = "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
  renderItem,
  customItemsRenderer,
}: GenericStartScreenProps<T>) {
  return (
    <div
      className="min-h-screen p-4"
      style={{ background: backgroundStyle }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title={title}
          subTitle={subTitle}
          textColorHeader={textColorHeader}
          textColorSubHeader={textColorSubHeader}
        />

        {/* הסבר המשחק */}
        <GameInstructions
          steps={gameSteps}
          bgClass={gameStepsBgClass}
        />

        {/* כפתור התחלה */}
        <GameStartButton
          onStart={() => {
            console.log("GenericStartScreen: onStart called");
            onStart();
          }}
          fromColor={buttonFromColor}
          toColor={buttonToColor}
        />

        {/* כפתור בדיקת שמע */}
        <ButtonCheckAudio />

        {/* דוגמת פריטים */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            {itemsTitle}
          </h3>
          
          {customItemsRenderer ? (
            customItemsRenderer()
          ) : (
            <div className={itemsGridClass}>
              {renderItem && items.map((item, index) => renderItem(item, index))}
            </div>
          )}
          
          <p className={`${itemsDescriptionColor} mt-4`}>
            {itemsDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

