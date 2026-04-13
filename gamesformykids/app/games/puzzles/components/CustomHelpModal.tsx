'use client';

import { usePuzzleContext } from '@/contexts';
import HelpStepsSection from './HelpStepsSection';
import HelpTipsSection from './HelpTipsSection';
import HelpControlsSection from './HelpControlsSection';
import HelpKeyboardSection from './HelpKeyboardSection';

export default function CustomHelpModal() {
  const { showHelp, toggleHelp: onToggleHelp } = usePuzzleContext();
  if (!showHelp) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onToggleHelp}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🧩 איך לשחק?</h2>
          <button onClick={onToggleHelp} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="space-y-4 text-right">
          <HelpStepsSection />
          <HelpTipsSection />
          <HelpControlsSection />
          <HelpKeyboardSection />
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onToggleHelp}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
}
