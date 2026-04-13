'use client';

import { usePuzzleContext } from '@/contexts';
import PuzzleHelpModal from './PuzzleHelpModal';
import HelpStepsSection from './HelpStepsSection';
import HelpTipsSection from './HelpTipsSection';
import HelpControlsSection from './HelpControlsSection';
import HelpKeyboardSection from './HelpKeyboardSection';

export default function CustomHelpModal() {
  const { toggleHelp } = usePuzzleContext();
  return (
    <PuzzleHelpModal size="lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🧩 איך לשחק?</h2>
        <button onClick={toggleHelp} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
      </div>
      <div className="space-y-4 text-right">
        <HelpStepsSection />
        <HelpTipsSection />
        <HelpControlsSection />
        <HelpKeyboardSection />
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={toggleHelp}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          סגירה
        </button>
      </div>
    </PuzzleHelpModal>
  );
}
