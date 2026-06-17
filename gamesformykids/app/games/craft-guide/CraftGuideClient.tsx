'use client';
import { useEffect } from 'react';
import { useCraftGuide } from './useCraftGuide';
import CraftMenu from './components/CraftMenu';
import CraftStep from './components/CraftStep';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import { printCertificate } from '@/lib/utils/game/printCertificate';

export default function CraftGuideClient() {
  const {
    phase, project, projects, stepIndex, totalSteps, currentStep,
    selectProject, startSteps, nextStep, prevStep, backToMenu,
  } = useCraftGuide();

  useEffect(() => {
    if (phase === 'materials' && project) {
      const matList = project.materials.join(', ');
      speakHebrew(`נהדר! ל${project.name} תצטרך: ${matList}. לחץ על התחל כשאתה מוכן!`);
    }
  }, [phase, project]);

  if (phase === 'menu') {
    return <CraftMenu projects={projects} onSelect={selectProject} />;
  }

  if (phase === 'materials' && project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 100%)' }}
        dir="rtl">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-2">{project.emoji}</div>
            <h2 className="text-2xl font-extrabold text-orange-800">{project.name}</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-700 text-center">🛠️ מה תצטרך?</h3>
            <ul className="space-y-2">
              {project.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 text-lg">
                  <span className="text-green-500 font-bold">✓</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={backToMenu}
              className="bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-2xl active:scale-95 transition-transform">
              ← חזרה
            </button>
            <button onClick={startSteps}
              className={`bg-linear-to-br ${project.color} text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform`}>
              בואו נתחיל! 🎨
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'steps' && project && currentStep) {
    return (
      <CraftStep
        step={currentStep}
        stepNumber={stepIndex + 1}
        totalSteps={totalSteps}
        projectName={project.name}
        projectColor={project.color}
        onNext={nextStep}
        onPrev={prevStep}
        onBack={backToMenu}
      />
    );
  }

  if (phase === 'done' && project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #d1fae5 100%)' }}
        dir="rtl">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="text-7xl animate-bounce">{project.emoji}</div>
          <h2 className="text-3xl font-extrabold text-green-700">כל הכבוד! 🎉</h2>
          <p className="text-xl text-gray-700">יצרת {project.name} — עבודה מדהימה!</p>
          <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
            <div className="text-5xl">🏅</div>
            <p className="text-gray-600">אתה יוצר אמיתי!</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={backToMenu}
              className="bg-white border-2 border-orange-300 text-orange-700 font-bold py-3 rounded-2xl active:scale-95 transition-transform">
              🎨 עוד פרויקט
            </button>
            <button onClick={() => printCertificate({ emoji: project.emoji, title: `יצרתי ${project.name}!`, scorePercent: 100 })}
              className="bg-linear-to-br from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
              🖨️ הדפס תעודה
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
