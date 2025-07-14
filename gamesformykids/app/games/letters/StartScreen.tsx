import { Home, Volume2 } from "lucide-react";
import GameInstructions from "./GameInstructions";
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
          <div className="bg-yellow-400 bg-opacity-90 rounded-xl p-4 mb-4 text-black">
            <h4 className="font-bold text-lg mb-2">🚨 חשוב למשתמשי מחשב!</h4>
            <p className="text-sm">הדפדפן חוסם שמע אוטומטי. עקוב אחר השלבים:</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={async () => {
                // הפעלה פשוטה של השמע
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  try {
                    // בדיקה פשוטה
                    const testUtter = new SpeechSynthesisUtterance('test');
                    testUtter.volume = 0.01; // שקט מאוד
                    testUtter.rate = 3; // מהיר מאוד
                    window.speechSynthesis.speak(testUtter);
                    
                    setTimeout(() => {
                      alert('✅ שמע הופעל! עכשיו נסה בדיקת קול');
                    }, 500);
                  } catch {
                    alert('❌ בעיה בהפעלת שמע. נסה דפדפן אחר');
                  }
                }
              }}
              className="block w-full max-w-sm mx-auto px-8 py-4 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 transition-all duration-300 shadow-lg"
            >
              🎯 שלב 1: הפעל שמע
            </button>
            
            <button
              onClick={async () => {
                // בדיקה פשוטה של עברית
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  try {
                    window.speechSynthesis.cancel();
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    const utter = new SpeechSynthesisUtterance('א');
                    utter.lang = 'he-IL';
                    utter.rate = 0.8;
                    utter.volume = 1.0;
                    
                    utter.onerror = () => {
                      // אם עברית נכשלת, ננסה אנגלית
                      setTimeout(() => {
                        const englishUtter = new SpeechSynthesisUtterance('Alef');
                        englishUtter.lang = 'en-US';
                        englishUtter.rate = 0.8;
                        window.speechSynthesis.speak(englishUtter);
                      }, 200);
                    };
                    
                    window.speechSynthesis.speak(utter);
                  } catch (error) {
                    console.log('Test failed:', error);
                  }
                }
              }}
              className="block w-full max-w-sm mx-auto px-8 py-4 bg-blue-500 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              🎤 שלב 2: בדיקת קול
            </button>

            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  const voices = window.speechSynthesis.getVoices();
                  const total = voices.length;
                  const hebrew = voices.filter(v => v.lang.includes('he') || v.lang.includes('iw')).length;
                  const english = voices.filter(v => v.lang.includes('en')).length;
                  
                  let message = `📊 מידע על קולות במערכת:\n\n`;
                  message += `🔹 סך הכל: ${total} קולות\n`;
                  message += `🔹 עברית: ${hebrew} קולות\n`;
                  message += `🔹 אנגלית: ${english} קולות\n\n`;
                  
                  if (hebrew > 0) {
                    message += '✅ יש קולות עבריים - תשמע בעברית!';
                  } else if (english > 0) {
                    message += '⚠️ אין עברית - תשמע באנגלית';
                  } else {
                    message += '❌ אין קולות זמינים';
                  }
                  
                  alert(message);
                }
              }}
              className="block w-full max-w-xs mx-auto px-6 py-3 bg-green-500 text-white rounded-full text-base font-bold hover:bg-green-600 transition-all duration-300 shadow-lg"
            >
              📋 מידע על קולות
            </button>
          </div>
          
          <div className="mt-4 text-sm text-orange-100 max-w-md mx-auto">
            <p><strong>💡 אם עדיין לא שומע:</strong></p>
            <p>• בדוק שהעוצמה פתוחה במחשב</p>
            <p>• נסה דפדפן Chrome (עובד הכי טוב)</p>
            <p>• במקרה הצורך - שחק בפלאפון</p>
          </div>
        </div>
          
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
  );
}
