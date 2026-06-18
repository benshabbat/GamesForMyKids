'use client';
import { usePuppetStore } from './puppetStore';
import { CharacterPicker, SettingPicker } from './components/CharacterPicker';
import PuppetStage from './components/PuppetStage';
import { resolveText } from './data/storyTemplates';

export default function PuppetClient() {
  const {
    phase, pickStep, char1, char2, setting, template,
    panelIndex, questionIndex, correctAnswers,
    pickChar1, pickChar2, pickSetting, nextPanel, answerQuestion, restart,
  } = usePuppetStore();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 gap-4"
      style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #ede9fe 50%, #ddd6fe 100%)' }}
    >
      <h1 className="text-3xl font-bold text-purple-800" dir="rtl">🎭 תיאטרון בובות</h1>

      {/* ─── Picking phase ─── */}
      {phase === 'picking' && pickStep === 0 && (
        <CharacterPicker step={0} onPick={pickChar1} />
      )}
      {phase === 'picking' && pickStep === 1 && (
        <CharacterPicker step={1} excludeId={char1?.id} onPick={pickChar2} />
      )}
      {phase === 'picking' && pickStep === 2 && (
        <SettingPicker onPick={pickSetting} />
      )}

      {/* ─── Story phase ─── */}
      {phase === 'story' && template && char1 && char2 && setting && (
        <PuppetStage
          template={template}
          panelIndex={panelIndex}
          char1={char1}
          char2={char2}
          setting={setting}
          onNext={nextPanel}
        />
      )}

      {/* ─── Quiz phase ─── */}
      {phase === 'quiz' && template && char1 && char2 && setting && (() => {
        const q = template.questions[questionIndex];
        if (!q) return null;
        return (
          <div className="flex flex-col items-center gap-4 w-full max-w-sm" dir="rtl">
            <p className="text-xs text-purple-500">שאלה {questionIndex + 1} מתוך {template.questions.length}</p>
            <div className="bg-white rounded-2xl p-5 shadow w-full text-center">
              <p className="text-5xl mb-3">🤔</p>
              <p className="text-lg font-bold text-gray-800">
                {resolveText(q.question, char1, char2, setting)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(i)}
                  className="bg-white hover:bg-purple-50 active:scale-95 border-2 border-purple-200 text-gray-800 font-semibold text-sm px-3 py-3 rounded-2xl shadow transition text-center"
                >
                  {resolveText(opt, char1, char2, setting)}
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ─── Result phase ─── */}
      {phase === 'result' && template && (
        <div className="flex flex-col items-center gap-4 bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full text-center">
          <div className="text-5xl">
            {correctAnswers === template.questions.length ? '🌟' : correctAnswers >= 2 ? '👏' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-purple-800" dir="rtl">
            {correctAnswers === template.questions.length ? 'מעולה! ענית נכון על הכל!' : `ענית נכון על ${correctAnswers} מתוך ${template.questions.length}`}
          </h2>
          <div className="flex gap-2 text-3xl">
            {char1?.emoji}{char2?.emoji}{template.themeEmoji}
          </div>
          <p className="text-purple-600 font-semibold" dir="rtl">נושא הסיפור: {template.theme}</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={restart}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-5 py-2 rounded-xl transition-colors"
            >
              סיפור חדש
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
