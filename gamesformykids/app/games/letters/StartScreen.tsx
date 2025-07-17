import { Letter } from "@/lib/types/game";
import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";

type StartScreenProps = {
  letters: Letter[];
  onStart: () => void;
  onSpeak?: (letterName: string) => void;
};

export default function StartScreen({ letters, onStart }: StartScreenProps) {
  const letterSteps = [
    { icon: "👂", title: "1. תשמע", description: "איזו אות אני אומר" },
    { icon: "🤔", title: "2. תחשוב", description: "איך נראית האות" },
    { icon: "👆", title: "3. תלחץ", description: "על האות הנכונה" },
  ];
  
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #fed7aa 0%, #fdba74 25%, #fb923c 50%, #f97316 75%, #ea580c 100%)",
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
          steps={letterSteps}
          bgClass="bg-orange-100 bg-opacity-90"
        />

        {/* כפתור התחלה */}
        <GameStartButton
          onStart={onStart}
          fromColor="yellow"
          toColor="orange"
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
