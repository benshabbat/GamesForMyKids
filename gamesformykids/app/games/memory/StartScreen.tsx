import GameInstructions from "@/components/shared/GameInstructions";
import GameStartButton from "@/components/shared/GameStartButton";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
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
        <GameStartButton
          onStart={onStart}
        />

        {/* כפתור בדיקת שמע פשוט */}
        <div className="mb-8">
          <button
            onClick={() => {
              // צליל הצלחה פשוט
              if (typeof window !== "undefined" && window.speechSynthesis) {
                try {
                  const testUtter = new SpeechSynthesisUtterance("בדיקת שמע");
                  testUtter.lang = "he-IL";
                  testUtter.rate = 0.8;
                  testUtter.volume = 1.0;
                  window.speechSynthesis.speak(testUtter);
                } catch {
                  // צליל גיבוי באמצעות AudioContext
                  try {
                    const audioContext = new (window.AudioContext ||
                      (
                        window as unknown as {
                          webkitAudioContext: typeof AudioContext;
                        }
                      ).webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);

                    oscillator.frequency.setValueAtTime(
                      523,
                      audioContext.currentTime
                    );
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(
                      0.01,
                      audioContext.currentTime + 0.5
                    );

                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.5);
                  } catch {
                    alert("❌ בעיה בהפעלת שמע. נסה דפדפן אחר");
                  }
                }
              }
            }}
            className="block w-full max-w-sm mx-auto px-8 py-4 bg-blue-500 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            🎤 בדיקת שמע
          </button>
          <p className="text-pink-100 mt-2 text-sm">
            לחץ לבדיקה שהשמע עובד במכשיר שלך
          </p>
        </div>

        {/* דוגמת חיות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            החיות שתפגוש במשחק:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {animals.map((animal) => (
              <div
                key={animal.name}
                className="w-20 h-20 rounded-full shadow-lg bg-white flex items-center justify-center text-3xl font-bold border-4 border-pink-200 cursor-pointer transform hover:scale-110 transition-all duration-300"
                onClick={() => {
                  // הקראת שם החיה
                  if (typeof window !== "undefined" && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(animal.name);
                    utterance.lang = "he-IL";
                    utterance.rate = 0.8;
                    utterance.volume = 1.0;
                    utterance.pitch = 1.2;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                title={animal.name}
              >
                {animal.emoji}
              </div>
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
