import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";
import { COLOR_GAME_STEPS, GAME_BACKGROUNDS, START_BUTTON_COLORS } from "@/lib/constants/uiConstants";
import { ColorStartScreenProps } from "@/lib/types/startScreenTypes";

export default function StartScreen({
  colors,
  onStart,
}: ColorStartScreenProps) {

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: GAME_BACKGROUNDS.COLORS,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader />

        {/* הסבר המשחק */}
        <GameInstructions steps={COLOR_GAME_STEPS} />
        
        {/* כפתור התחלה */}
        <GameStartButton 
          onStart={onStart} 
          fromColor={START_BUTTON_COLORS.COLORS.from}
          toColor={START_BUTTON_COLORS.COLORS.to}
        />

        {/* כפתור בדיקת דיבור */}
        <ButtonCheckAudio />

        {/* דוגמת צבעים */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">
            הצבעים שנלמד:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {colors.map((color) => (
              <GameItem 
                key={color.name}
                hebrewText={color.hebrew}
                color={color.value}
                shape="circle"
                size="large"
              />
            ))}
          </div>
          <p className="text-gray-600 mt-4">לחץ על צבע כדי לשמוע את השם שלו!</p>
        </div>
      </div>
    </div>
  );
}