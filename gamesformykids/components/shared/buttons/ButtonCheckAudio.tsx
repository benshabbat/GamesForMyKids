import { testSpeech } from "@/lib/utils/speech/enhancedSpeechUtils";

export default function ButtonCheckAudio() {
  const handleTestSpeech = async () => {
    const success = await testSpeech();
    if (!success) {
      alert("❌ בעיה בהפעלת שמע. נסה דפדפן אחר");
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleTestSpeech}
        className="block w-full max-w-sm mx-auto px-8 py-4 cursor-pointer bg-blue-500 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
      >
        🎤 בדיקת שמע
      </button>
      <p className="text-sm text-gray-600 mt-2">
        לחץ לבדיקה אם אתה שומע &quot;בדיקה&quot;
      </p>
    </div>
  );
}
