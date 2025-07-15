import { Home, Volume2 } from "lucide-react";
import GameInstructions from "./GameInstructions";
import { Letter } from "@/lib/types/game";

type StartScreenProps = {
  letters: Letter[];
  onStart: () => void;
  onSpeak: (letterName: string) => void;
};

export default function StartScreen({ letters, onStart }: StartScreenProps) {
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
        <div className="mb-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="mb-4 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-bold text-orange-600 hover:bg-orange-50"
          >
            <Home className="inline w-6 h-6 ml-2" />← חזרה לעמוד הראשי
          </button>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            🔤 משחק אותיות 🔤
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 font-semibold mb-8">
            למד אותיות דרך שמיעה!
          </p>
        </div>

        {/* הסבר המשחק */}
        <GameInstructions />

        {/* כפתור התחלה */}
        <button
          onClick={onStart}
          className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-3xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
        >
          בואו נתחיל! 🚀
        </button>

        {/* כפתור הפעלת שמע פשוט */}
        <div className="mb-8">
          <button
            onClick={async () => {
              if (typeof window !== 'undefined' && window.speechSynthesis) {
                try {
                  const testUtter = new SpeechSynthesisUtterance('אלף');
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

        {/* דוגמת אותיות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            כל האותיות שנלמד:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {letters.slice(0, 12).map((letter) => (
              <div
                key={letter.name}
                className="w-14 h-14 rounded-full shadow-lg bg-white text-orange-600 border-4 border-orange-200 transform hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center"
                onClick={() => {
                  // הקראה מהירה ופשוטה
                  if (typeof window !== 'undefined' && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(letter.hebrew);
                    utterance.lang = 'he-IL';
                    utterance.rate = 0.8;
                    utterance.volume = 1.0;
                    utterance.pitch = 1.2;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{letter.hebrew}</div>
                  <Volume2 className="w-3 h-3 mx-auto opacity-70" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {letters.slice(12, 22).map((letter) => (
              <div
                key={letter.name}
                className="w-14 h-14 rounded-full shadow-lg bg-white text-orange-600 border-4 border-orange-200 transform hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center"
                onClick={() => {
                  // הקראה מהירה ופשוטה
                  if (typeof window !== 'undefined' && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(letter.hebrew);
                    utterance.lang = 'he-IL';
                    utterance.rate = 0.8;
                    utterance.volume = 1.0;
                    utterance.pitch = 1.2;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{letter.hebrew}</div>
                  <Volume2 className="w-3 h-3 mx-auto opacity-70" />
                </div>
              </div>
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
