import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";
import { LETTER_GAME_STEPS, GAME_BACKGROUNDS, START_BUTTON_COLORS } from "@/lib/constants/uiConstants";
import { LetterStartScreenProps } from "@/lib/types/startScreenTypes";

export default function StartScreen({ letters, onStart }: LetterStartScreenProps) {
  
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: GAME_BACKGROUNDS.LETTERS,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title="🔤 משחק אותיות 🔤"
          subTitle="למד אותיות דרך שמיעה!"
          textColorHeader="text-white"
          textColorSubHeader="text-orange-100"
        />

        {/* הסבר המשחק */}
        <GameInstructions
          steps={LETTER_GAME_STEPS}
          bgClass="bg-orange-100 bg-opacity-90"
        />

        {/* כפתור התחלה */}
        <GameStartButton
          onStart={onStart}
          fromColor={START_BUTTON_COLORS.LETTERS.from}
          toColor={START_BUTTON_COLORS.LETTERS.to}
        />

        {/* כפתור הפעלת שמע פשוט */}
        <ButtonCheckAudio />

        {/* דוגמת אותיות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            כל האותיות שנלמד:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {letters.slice(0, 12).map((letter) => (
              <GameItem
                key={letter.name}
                hebrewText={letter.hebrew}
                color="bg-orange-500"
                shape="circle"
                size="small"
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {letters.slice(12, 22).map((letter) => (
              <GameItem
                key={letter.name}
                hebrewText={letter.hebrew}
                color="bg-orange-500"
                shape="circle"
                size="small"
              />
            ))}
          </div>
          <p className="text-orange-100 mt-4">
            לחץ על אות כדי לשמוע את השם שלה! (22 אותיות באלף-בית העברי)
          </p>
        </div>
      </div>
    </div>
  );
}
