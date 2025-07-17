import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import GameItem from "@/components/shared/GameItem";
import { MEMORY_GAME_STEPS, GAME_BACKGROUNDS, START_BUTTON_COLORS } from "@/lib/constants/uiConstants";
import { MemoryStartScreenProps } from "@/lib/types/startScreenTypes";

export default function StartScreen({ onStart, animals }: MemoryStartScreenProps) {
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: GAME_BACKGROUNDS.MEMORY,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title="🧠 משחק זיכרון 🧠"
          subTitle="מצא זוגות של חיות חמודות!"
          textColorHeader="text-white"
          textColorSubHeader="text-pink-100"
        />
        {/* הסבר המשחק */}
        <GameInstructions
          steps={MEMORY_GAME_STEPS}
          bgClass="bg-pink-100 bg-opacity-90"
        />

        {/* כפתור התחלה */}
        <GameStartButton 
          onStart={onStart}
          fromColor={START_BUTTON_COLORS.MEMORY.from}
          toColor={START_BUTTON_COLORS.MEMORY.to}
        />

        {/* כפתור בדיקת שמע פשוט */}
        <ButtonCheckAudio />

        {/* דוגמת חיות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            החיות שתפגוש במשחק:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {animals.map((animal) => (
              <GameItem 
                key={animal.name}
                hebrewText={animal.name}
                icon={<span className="text-3xl">{animal.emoji}</span>}
                color="bg-purple-400"
                shape="circle"
                size="large"
              />
            ))}
          </div>
          <p className="text-pink-100 mt-4">
            לחץ על חיה כדי לשמוע את השם שלה! כל זוג חיות זהות מסתתר בין הקלפים
          </p>
        </div>
      </div>
    </div>
  );
}
