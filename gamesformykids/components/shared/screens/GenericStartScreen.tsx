import { SimpleGameInstructions } from "@/components/shared";
import { SimpleGameStartButton } from "@/components/shared";
import { StartScreenHeader } from "@/components/shared";
import { ButtonCheckAudio } from "@/components/shared";
import { ComponentTypes } from "@/lib/types";

type GenericStartScreenProps<T> = ComponentTypes.GenericStartScreenProps<T>;

/**
 * GenericStartScreen - מסך התחלה גנרי וגמיש
 * תומך בכל סוגי המשחקים עם אפשרויות עיצוב מלאות
 */

export default function GenericStartScreen<T>({
  title,
  subTitle = "",
  textColorHeader = "text-purple-800",
  textColorSubHeader = "text-purple-600",
  gameSteps = [],
  items,
  customOnStart,
  buttonFromColor = "blue-400",
  buttonToColor = "blue-600",
  backgroundStyle,
  itemsTitle,
  itemsDescription,
  itemsDescriptionColor = "text-gray-100",
  itemsGridClass = "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
  renderItem,
  customItemsRenderer,
  showAudioCheck = true,
  className = "",
}: GenericStartScreenProps<T>) {
  return (
    <div
      className={`min-h-screen p-4 ${className}`}
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
        <SimpleGameInstructions
          title="איך משחקים?"
          instructions={gameSteps.map(step => step.description || step.stepText || "")}
          showSteps={true}
          variant="detailed"
        />

        {/* כפתור התחלה */}
        <SimpleGameStartButton
          customOnStart={customOnStart}
          fromColor={buttonFromColor}
          toColor={buttonToColor}
        />

        {/* כפתור בדיקת שמע */}
        {showAudioCheck && <ButtonCheckAudio />}

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

