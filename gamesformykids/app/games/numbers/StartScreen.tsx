import GameInstructions from "@/components/shared/GameInstructions";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import GameStartButton from "@/components/shared/GameStartButton";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";
import { NUMBER_GAME_STEPS, GAME_BACKGROUNDS, START_BUTTON_COLORS } from "@/lib/constants/uiConstants";
import { NumberStartScreenProps } from "@/lib/types/startScreenTypes";

export default function StartScreen({ numbers, onStart }: NumberStartScreenProps) {

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: GAME_BACKGROUNDS.NUMBERS,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title="🔢 משחק מספרים 🔢"
          subTitle="למד מספרים דרך שמיעה!"
          textColorHeader="text-white"
          textColorSubHeader="text-indigo-100"
        />
        
        {/* הסבר המשחק */}
        <GameInstructions
          steps={NUMBER_GAME_STEPS}
          bgClass="bg-indigo-100 bg-opacity-90"
        />

        {/* כפתור התחלה */}
        <GameStartButton 
          onStart={onStart} 
          fromColor={START_BUTTON_COLORS.NUMBERS.from} 
          toColor={START_BUTTON_COLORS.NUMBERS.to} 
        />

        {/* כפתור הפעלת שמע פשוט */}
        <ButtonCheckAudio />

        {/* דוגמת מספרים */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            כל המספרים שנלמד:
          </h3>
          <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto">
            {numbers.map((number) => (
              <GameItem
                key={number.name}
                hebrewText={number.hebrew}
                color="bg-indigo-500"
                shape="rounded"
                size="small"
                icon={<span className="text-xl font-bold">{number.digit}</span>}
              />
            ))}
          </div>
          <p className="text-indigo-100 mt-4">
            לחץ על מספר כדי לשמוע את השם שלו! (מספרים 0-9)
          </p>
        </div>
      </div>
    </div>
  );
}