export default function ButtonCheckAudio() {
  return (
    <div className="mb-8">
      <button
        onClick={async () => {
          if (typeof window !== "undefined" && window.speechSynthesis) {
            try {
              const testUtter = new SpeechSynthesisUtterance("בדיקה");
              testUtter.lang = "he-IL";
              testUtter.rate = 0.7;
              testUtter.volume = 1.0;
              window.speechSynthesis.speak(testUtter);
            } catch {
              alert("❌ בעיה בהפעלת שמע. נסה דפדפן אחר");
            }
          }
        }}
        className="block w-full max-w-sm mx-auto px-8 py-4 bg-blue-500 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
      >
        🎤 בדיקת שמע
      </button>
      <p className="text-sm text-gray-600 mt-2">
        לחץ לבדיקה אם אתה שומע &quot;בדיקה&quot;
      </p>
    </div>
  );
}
