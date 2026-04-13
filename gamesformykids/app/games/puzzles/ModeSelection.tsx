'use client';

import { Camera, Puzzle, Home } from 'lucide-react';
import ModeCard from './components/ModeCard';
import LearningBenefits from './components/LearningBenefits';

interface ModeSelectionProps {
  onSimple: () => void;
  onCustom: () => void;
}

export default function ModeSelection({ onSimple, onCustom }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">🧩 משחקי פאזלים 🎨</h1>
          <p className="text-xl text-purple-600">בחר את סוג הפאזל שאתה רוצה לשחק!</p>
          <p className="text-sm text-purple-500 mt-2">💡 על מכשירים ניידים: געו וגררו את החלקים למקומם</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ModeCard
            onClick={onSimple}
            icon={<Puzzle className="w-10 h-10 text-yellow-600" />}
            iconBgClass="bg-yellow-100"
            title="פאזל תמונות"
            description="פאזלים עם תמונות יפות של שועלים, נסיכות, ובעלי חיים חמודים - מושלם לילדים!"
            emojis={['🦊', '🌈', '🌿', '🍄']}
            badgeText="מתאים לגילאי 3-6"
            badgeClass="bg-green-100 text-green-800"
          />
          <ModeCard
            onClick={onCustom}
            icon={<Camera className="w-10 h-10 text-blue-600" />}
            iconBgClass="bg-blue-100"
            title="פאזל תמונות מותאמות"
            description="העלה תמונה משלך ובנה ממנה פאזל מותאם אישית!"
            emojis={['📸', '🖼️', '🎨', '✨']}
            badgeText="מתאים לגילאי 5+"
            badgeClass="bg-blue-100 text-blue-800"
          />
        </div>

        <LearningBenefits />

        <div className="text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-purple-700 mx-auto"
          >
            <Home className="w-5 h-5" />
            חזרה לתפריט הראשי
          </button>
        </div>
      </div>
    </div>
  );
}
