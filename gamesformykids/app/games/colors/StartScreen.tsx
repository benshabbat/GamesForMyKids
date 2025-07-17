import { Color } from "@/lib/types/game";
import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";

type StartScreenProps = {
  colors: Color[];
  onStart: () => void;
  onSpeak?: (colorName: string) => void;
};

export default function StartScreen({
  colors,
  onStart,
}: StartScreenProps) {
  const colorSteps = [
    { icon: "👀", title: "1. תראה", description: "איזה צבע אני מבקש" },
    { icon: "🎤", title: "2. תשמע", description: "את שם הצבע" },
    { icon: "👆", title: "3. תלחץ", description: "על הצבע הנכון" },
  ];

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader />

        {/* הסבר המשחק */}
        <GameInstructions steps={colorSteps} />
        
        {/* כפתור התחלה */}
        <GameStartButton onStart={onStart} />

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