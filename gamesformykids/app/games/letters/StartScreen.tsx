import { Home, Volume2 } from "lucide-react";
import GameInstructions from "./GameInstructions";
import AudioHelper from "./AudioHelper";
import { Letter } from "@/types/game";

type StartScreenProps = {
  letters: Letter[];
  onStart: () => void;
  onSpeak: (letterName: string) => void;
};

export default function StartScreen({ letters, onStart, onSpeak }: StartScreenProps) {
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

        {/* עזרה לשמע במחשב */}
        <AudioHelper />

        {/* הסבר המשחק */}
        <GameInstructions />

        {/* כפתור התחלה */}
        <button
          onClick={onStart}
          className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-3xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
        >
          בואו נתחיל! 🚀
        </button>

        {/* כפתורי הפעלת שמע */}
        <div className="mb-8">
          <button
            onClick={async () => {
              // טעינת קולות
              if (typeof window !== 'undefined' && window.speechSynthesis) {
                const voices = window.speechSynthesis.getVoices();
                if (voices.length === 0) {
                  // טעינת קולות
                  window.speechSynthesis.getVoices();
                  await new Promise(resolve => {
                    window.speechSynthesis.onvoiceschanged = resolve;
                  });
                }
                
                // הפעלת AudioContext
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                  const tempCtx = new AudioContextClass();
                  if (tempCtx.state === 'suspended') {
                    await tempCtx.resume();
                  }
                  tempCtx.close();
                }
                
                // בדיקת קולות זמינים
                const availableVoices = window.speechSynthesis.getVoices();
                const hebrewVoices = availableVoices.filter(v => 
                  v.lang.includes('he') || v.lang.includes('iw')
                );
                
                if (hebrewVoices.length > 0) {
                  alert(`שמע הופעל! נמצאו ${hebrewVoices.length} קולות עבריים`);
                } else {
                  alert('שמע הופעל! לא נמצאו קולות עבריים - ישמע באנגלית');
                }
              }
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-full text-lg font-bold hover:bg-red-600 transition-all duration-300 shadow-lg mr-4"
          >
            🚀 הפעל שמע במחשב
          </button>
          
          <button
            onClick={async () => {
              await onSpeak("alef");
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg mr-4"
          >
            🎤 בדיקת קול
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined' && window.speechSynthesis) {
                const voices = window.speechSynthesis.getVoices();
                const hebrewVoices = voices.filter(v => 
                  v.lang.includes('he') || v.lang.includes('iw')
                );
                const englishVoices = voices.filter(v => 
                  v.lang.includes('en')
                );
                
                let message = `סך הכל ${voices.length} קולות זמינים:\n`;
                message += `🔹 עברית: ${hebrewVoices.length} קולות\n`;
                message += `🔹 אנגלית: ${englishVoices.length} קולות\n\n`;
                
                if (hebrewVoices.length > 0) {
                  message += 'קולות עבריים:\n';
                  hebrewVoices.forEach(v => message += `• ${v.name} (${v.lang})\n`);
                }
                
                alert(message);
              }
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold hover:bg-green-600 transition-all duration-300 shadow-lg"
          >
            📋 בדוק קולות
          </button>
          
          <p className="text-sm text-orange-100 mt-3 max-w-md mx-auto">
            <strong>במחשב:</strong> לחץ על הכפתור האדום קודם, ואז בדיקת קול<br/>
            <strong>💬 תשמע שמות אותיות בעברית או באנגלית!</strong>
          </p>
          
          <details className="mt-4 text-xs text-orange-200">
            <summary className="cursor-pointer hover:text-white">📋 עזרה נוספת</summary>
            <div className="mt-2 p-2 bg-orange-600 bg-opacity-30 rounded">
              <p>• וודא שהעוצמה מופעלת במחשב</p>
              <p>• נסה דפדפן אחר (Chrome עובד הכי טוב)</p>
              <p>• במקום אותיות, תשמע צלילים מוזיקליים</p>
            </div>
          </details>
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
                onClick={() => onSpeak(letter.name)}
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
                onClick={() => onSpeak(letter.name)}
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
