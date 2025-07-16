import { Volume2 } from "lucide-react";
import { Color } from "@/lib/types/game";
import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";

type StartScreenProps = {
  colors: Color[];
  onStart: () => void;
  onSpeak: (colorName: string) => void;
};

export default function StartScreen({
  colors,
  onStart,
  onSpeak,
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
        <StartScreenHeader/>

        {/* הסבר המשחק */}
        <GameInstructions steps={colorSteps} />
        {/* כפתור התחלה */}
        <GameStartButton onStart={onStart} />

        {/* כפתור בדיקת דיבור */}
        <div className="mb-8">
          <button
            onClick={() => onSpeak("בדיקה")}
            className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            🎤 בדיקת קול
          </button>
          <p className="text-sm text-gray-600 mt-2">
            לחץ לבדיקה אם אתה שומע &quot;בדיקה&quot;
          </p>
        </div>

        {/* דוגמת צבעים */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">
            הצבעים שנלמד:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {colors.map((color) => (
              <div
                key={color.name}
                className={`w-20 h-20 rounded-full shadow-lg ${color.value} border-4 border-white transform hover:scale-110 transition-all duration-300 cursor-pointer`}
                onClick={() => onSpeak(color.hebrew)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-white opacity-70" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-4">לחץ על צבע כדי לשמוע את השם שלו!</p>
        </div>
      </div>
    </div>
  );
}
