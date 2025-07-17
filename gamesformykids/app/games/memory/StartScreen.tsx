import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import GameItem from "@/components/shared/GameItem";
import { AnimalData } from "@/lib/types/game";

type StartScreenProps = {
  onStart: () => void;
  animals: AnimalData[];
  onSpeak?: (name: string) => void;
};

export default function StartScreen({ onStart, animals }: StartScreenProps) {
  const memorySteps = [
    { icon: "👀", title: "1. תראה", description: "לחץ על קלף כדי לחשוף חיה" },
    { icon: "🧠", title: "2. תזכור", description: "איפה ראית כל חיה" },
    { icon: "🎯", title: "3. תמצא", description: "זוגות תואמים של חיות" },
  ];
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #fce7f3 0%, #e879f9 25%, #a855f7 50%, #7c3aed 75%, #5b21b6 100%)",
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
          steps={memorySteps}
          bgClass="bg-pink-100 bg-opacity-90"
        />

        {/* כפתור התחלה */}
        <GameStartButton onStart={onStart} />

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
