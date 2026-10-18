'use client';
import { usePuppetStore } from './puppetStore';
import { CharacterPicker, SettingPicker } from './components/CharacterPicker';
import PuppetStage from './components/PuppetStage';
import PuppetQuestion from './components/PuppetQuestion';

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
          <PuppetQuestion
            key={questionIndex}
            question={q}
            questionNum={questionIndex + 1}
            total={template.questions.length}
            char1={char1}
            char2={char2}
            setting={setting}
            onAnswer={answerQuestion}
          />
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
