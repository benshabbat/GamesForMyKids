'use client';
import { useState } from 'react';
import { shuffleOptions } from '@/lib/quiz/shuffleOptions';
import { resolveText, type Character, type Setting, type StoryQuestion } from '../data/storyTemplates';

interface Props {
  question: StoryQuestion;
  questionNum: number;
  total: number;
  char1: Character;
  char2: Character;
  setting: Setting;
  /** Receives the index into the question's original options (what the store checks). */
  onAnswer: (originalIndex: number) => void;
}

export default function PuppetQuestion({ question, questionNum, total, char1, char2, setting, onAnswer }: Props) {
  // Shuffled once per question (the parent keys this component by question index) so the
  // right answer is not always the first button.
  const [{ options, order }] = useState(() => shuffleOptions(question.options, question.correctIndex));

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm" dir="rtl">
      <p className="text-xs text-purple-500">שאלה {questionNum} מתוך {total}</p>
      <div className="bg-white rounded-2xl p-5 shadow w-full text-center">
        <p className="text-5xl mb-3">🤔</p>
        <p className="text-lg font-bold text-gray-800">
          {resolveText(question.question, char1, char2, setting)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(order[i]!)}
            className="bg-white hover:bg-purple-50 active:scale-95 border-2 border-purple-200 text-gray-800 font-semibold text-sm px-3 py-3 rounded-2xl shadow transition text-center"
          >
            {resolveText(opt, char1, char2, setting)}
          </button>
        ))}
      </div>
    </div>
  );
}
