import { Home, Volume2 } from "lucide-react";
import GameInstructions from "./GameInstructions";
import { Shape } from "@/lib/types/game";
import { 
  CircleIcon, 
  SquareIcon, 
  TriangleIcon, 
  RectangleIcon, 
  StarIcon, 
  HeartIcon, 
  DiamondIcon, 
  OvalIcon 
} from "./ShapeIcons";

type StartScreenProps = {
  shapes: Shape[];
  onStart: () => void;
  onSpeak: (shapeName: string) => void;
};

const ShapeIconMap = {
  circle: CircleIcon,
  square: SquareIcon,
  triangle: TriangleIcon,
  rectangle: RectangleIcon,
  star: StarIcon,
  heart: HeartIcon,
  diamond: DiamondIcon,
  oval: OvalIcon,
};

export default function StartScreen({ shapes, onStart }: StartScreenProps) {
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #26b926 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="mb-4 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-bold text-green-600 hover:bg-green-50"
          >
            <Home className="inline w-6 h-6 ml-2" />← חזרה לעמוד הראשי
          </button>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            🔷 משחק צורות 🔷
          </h1>
          <p className="text-xl md:text-2xl text-green-100 font-semibold mb-8">
            למד צורות דרך שמיעה!
          </p>
        </div>

        {/* הסבר המשחק */}
        <GameInstructions />

        {/* כפתור התחלה */}
        <button
          onClick={onStart}
          className="px-12 py-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full text-3xl font-bold hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
        >
          בואו נתחיל! 🚀
        </button>

        {/* כפתור הפעלת שמע פשוט */}
        <div className="mb-8">
          <button
            onClick={async () => {
              if (typeof window !== 'undefined' && window.speechSynthesis) {
                try {
                  const testUtter = new SpeechSynthesisUtterance('עיגול');
                  testUtter.lang = 'he-IL';
                  testUtter.rate = 0.7;
                  testUtter.volume = 1.0;
                  window.speechSynthesis.speak(testUtter);
                } catch {
                  alert('❌ בעיה בהפעלת שמע. נסה דפדפן אחר');
                }
              }
            }}
            className="block w-full max-w-sm mx-auto px-8 py-4 bg-blue-500 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            🎤 בדיקת שמע
          </button>
        </div>

        {/* דוגמת צורות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            כל הצורות שנלמד:
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {shapes.map((shape) => {
              const IconComponent = ShapeIconMap[shape.name as keyof typeof ShapeIconMap] || CircleIcon;
              
              return (
                <div
                  key={shape.name}
                  className={`w-20 h-20 rounded-2xl shadow-lg ${shape.color} text-white border-4 border-white transform hover:scale-110 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-2`}
                  onClick={() => {
                    // הקראה מהירה ופשוטה
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(shape.hebrew);
                      utterance.lang = 'he-IL';
                      utterance.rate = 0.8;
                      utterance.volume = 1.0;
                      utterance.pitch = 1.2;
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  <IconComponent size={40} className="mb-1" />
                  <div className="text-xs font-bold text-center">{shape.hebrew}</div>
                  <Volume2 className="w-3 h-3 opacity-70" />
                </div>
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