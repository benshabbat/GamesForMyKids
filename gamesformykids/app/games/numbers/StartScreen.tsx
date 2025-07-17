import { Volume2 } from "lucide-react";
import { NumberItem } from "@/lib/types/game";
import GameInstructions from "@/components/shared/GameInstructions";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import GameStartButton from "@/components/shared/GameStartButton";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";

type StartScreenProps = {
  numbers: NumberItem[];
  onStart: () => void;
  onSpeak: (numberName: string) => void;
};

export default function StartScreen({ numbers, onStart }: StartScreenProps) {
  const numberSteps = [
    { icon: "👂", title: "1. תשמע", description: "איזה מספר אני אומר" },
    { icon: "🤔", title: "2. תחשוב", description: "איך נראה המספר" },
    { icon: "👆", title: "3. תלחץ", description: "על המספר הנכון" },
  ];

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #a5b4fc 50%, #818cf8 75%, #6366f1 100%)",
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
          steps={numberSteps}
          bgClass="bg-indigo-100 bg-opacity-90"
        />

        {/* כפתור התחלה */}
        <GameStartButton 
          onStart={onStart} 
          fromColor="indigo" 
          toColor="purple" 
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
              <div
                key={number.name}
                className="w-16 h-16 rounded-xl shadow-lg bg-white text-indigo-600 border-4 border-indigo-200 transform hover:scale-110 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-1"
                onClick={() => {
                  // הקראה מהירה ופשוטה
                  if (
                    typeof window !== "undefined" &&
                    window.speechSynthesis
                  ) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(
                      number.hebrew
                    );
                    utterance.lang = "he-IL";
                    utterance.rate = 0.8;
                    utterance.volume = 1.0;
                    utterance.pitch = 1.2;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <div className="text-2xl font-bold">{number.digit}</div>
                <div className="text-xs font-bold text-center">
                  {number.hebrew}
                </div>
                <Volume2 className="w-3 h-3 opacity-70" />
              </div>
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