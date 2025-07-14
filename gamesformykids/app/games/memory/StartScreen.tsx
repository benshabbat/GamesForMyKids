import { AnimalData } from "@/types/game";
import { Home } from "lucide-react";

type StartScreenProps = {
  onStart: () => void;
  animals: AnimalData[];
  onSpeak?: (name: string) => void;
};

export default function StartScreen({
  onStart,
  animals,
  onSpeak,
}: StartScreenProps) {
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #f3e7e9 0%, #c9e4de 25%, #f7d9c4 50%, #e2ece9 75%, #f9e7e7 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="mb-4 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-bold text-purple-600 hover:bg-purple-50"
          >
            <Home className="inline w-6 h-6 ml-2" />← חזרה לעמוד הראשי
          </button>
          <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4">
            🧠 משחק זיכרון 🧠
          </h1>
          <p className="text-xl md:text-2xl text-purple-600 font-semibold mb-8">
            מצא זוגות של חיות!
          </p>
        </div>

        {/* הסבר המשחק */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            איך משחקים?
          </h2>
          <ul className="text-lg text-gray-700 list-disc list-inside text-right">
            <li>לחץ על קלף כדי לחשוף חיה.</li>
            <li>נסה למצוא זוגות תואמים של חיות.</li>
            <li>מצא את כל הזוגות כדי לנצח!</li>
          </ul>
        </div>

        {/* כפתור התחלה */}
        <button
          onClick={onStart}
          className="px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-3xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
        >
          בואו נתחיל! 🚀
        </button>

        {/* דוגמת חיות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">
            החיות שתפגוש במשחק:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {animals.map((animal) => (
              <div
                key={animal.name}
                className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold border-4 border-white cursor-pointer`}
                onClick={() => onSpeak && onSpeak(animal.name)}
                title={animal.name}
              >
                {animal.emoji}
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-4">
            לחץ על &quot;בואו נתחיל!&quot; כדי להתחיל לשחק ולגלות את כל החיות!
          </p>
        </div>
      </div>
    </div>
  );
}
