import GameInstructions from "@/components/shared/GameInstructions";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import GameStartButton from "@/components/shared/GameStartButton";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";
import { SHAPE_ICON_MAP } from "@/lib/constants/shapeConstants";
import { SHAPE_GAME_STEPS, GAME_BACKGROUNDS, START_BUTTON_COLORS } from "@/lib/constants/uiConstants";
import { ShapeStartScreenProps } from "@/lib/types/startScreenTypes";

export default function StartScreen({ shapes, onStart }: ShapeStartScreenProps) {

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: GAME_BACKGROUNDS.SHAPES,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title="🔷 משחק צורות 🔷"
          subTitle="למד צורות דרך שמיעה!"
          textColorHeader="text-white"
          textColorSubHeader="text-green-100"
        />
        {/* הסבר המשחק */}
        <GameInstructions steps={SHAPE_GAME_STEPS} />

        {/* כפתור התחלה */}
        <GameStartButton 
          onStart={onStart} 
          fromColor={START_BUTTON_COLORS.SHAPES.from} 
          toColor={START_BUTTON_COLORS.SHAPES.to} 
        />

        {/* כפתור הפעלת שמע פשוט */}
        <ButtonCheckAudio />

        {/* דוגמת צורות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            כל הצורות שנלמד:
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {shapes.map((shape) => {
              const IconComponent =
                SHAPE_ICON_MAP[shape.name as keyof typeof SHAPE_ICON_MAP] ||
                SHAPE_ICON_MAP.circle;

              return (
                <GameItem
                  key={shape.name}
                  name={shape.name}
                  hebrewText={shape.hebrew}
                  color={shape.color}
                  icon={<IconComponent size={40} />}
                  shape="rounded"
                  size="large"
                />
              );
            })}
          </div>
          <p className="text-green-100 mt-4">
            לחץ על צורה כדי לשמוע את השם שלה! (8 צורות שונות)
          </p>
        </div>
      </div>
    </div>
  );
}
