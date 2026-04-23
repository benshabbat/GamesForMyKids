"""
Update all quiz-type result screens to use the shared QuizResultScreen component.
"""
import os

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'app', 'games')

def write(rel_path: str, content: str):
    path = os.path.join(BASE, rel_path)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  ✓ {rel_path}')

# ── Pattern A: { correctCount, total, score, onRestart } ──────────────────────
def pattern_a(name: str, theme: str) -> str:
    return f"""\
'use client';
import {{ QuizResultScreen }} from '@/components/game/quiz';

interface Props {{
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
}}

export default function {name}({{ correctCount, total, score, onRestart }}: Props) {{
  return <QuizResultScreen correctCount={{correctCount}} total={{total}} score={{score}} onRestart={{onRestart}} theme="{theme}" />;
}}
"""

# ── Pattern B: { correctCount, total, onRestart } (no score) ─────────────────
def pattern_b(name: str, theme: str) -> str:
    return f"""\
'use client';
import {{ QuizResultScreen }} from '@/components/game/quiz';

interface Props {{
  correctCount: number;
  total: number;
  onRestart: () => void;
}}

export default function {name}({{ correctCount, total, onRestart }}: Props) {{
  return <QuizResultScreen correctCount={{correctCount}} total={{total}} onRestart={{onRestart}} theme="{theme}" />;
}}
"""

# ── Pattern C: { score, total, onRestart } where score = correctCount ─────────
def pattern_c(name: str, theme: str) -> str:
    return f"""\
'use client';
import {{ QuizResultScreen }} from '@/components/game/quiz';

interface Props {{
  score: number;
  total: number;
  onRestart: () => void;
}}

export default function {name}({{ score, total, onRestart }}: Props) {{
  return <QuizResultScreen correctCount={{score}} total={{total}} onRestart={{onRestart}} theme="{theme}" />;
}}
"""

# ── Write all files ────────────────────────────────────────────────────────────
print("Updating quiz result screens...")

# Pattern A
write('riddles/components/RiddlesResultScreen.tsx',        pattern_a('RiddlesResultScreen',        'purple'))
write('nature/components/NatureResultScreen.tsx',          pattern_a('NatureResultScreen',          'green'))
write('capitals/components/CapitalsResultScreen.tsx',      pattern_a('CapitalsResultScreen',        'red'))
write('fractions/components/FractionsResultScreen.tsx',    pattern_a('FractionsResultScreen',       'purple'))
write('instruments/components/InstrumentsResultScreen.tsx',pattern_a('InstrumentsResultScreen',     'amber'))
write('sports-quiz/components/SportsQuizResultScreen.tsx', pattern_a('SportsQuizResultScreen',      'green'))
write('shapes-3d/components/Shapes3dResultScreen.tsx',     pattern_a('Shapes3dResultScreen',        'indigo'))
write('english-words/components/EnglishWordsResultScreen.tsx', pattern_a('EnglishWordsResultScreen','indigo'))
write('israel/components/IsraelResultScreen.tsx',          pattern_a('IsraelResultScreen',          'blue'))
write('emotions/components/EmotionsResultScreen.tsx',      pattern_a('EmotionsResultScreen',        'yellow'))

# Pattern B (no score prop)
write('opposites/components/OppositesResultScreen.tsx',    pattern_b('OppositesResultScreen',       'orange'))
write('spelling/components/SpellingResultScreen.tsx',      pattern_b('SpellingResultScreen',        'rose'))

# Pattern C (score prop = correctCount)
write('family/components/FamilyResultScreen.tsx',          pattern_c('FamilyResultScreen',          'rose'))
write('continents/components/ContinentsResultScreen.tsx',  pattern_c('ContinentsResultScreen',      'teal'))
write('healthy-food/components/HealthyFoodResultScreen.tsx',pattern_c('HealthyFoodResultScreen',    'lime'))
write('science/components/ScienceResultScreen.tsx',        pattern_c('ScienceResultScreen',         'cyan'))
write('color-mix/components/ColorMixResultScreen.tsx',     pattern_c('ColorMixResultScreen',        'violet'))
write('word-builder/components/WordBuilderResultScreen.tsx',pattern_c('WordBuilderResultScreen',    'amber'))

# ── Special cases ──────────────────────────────────────────────────────────────

# Transport: onRestart receives transportType
write('transport/components/TransportResultScreen.tsx', """\
'use client';
import type { TransportType } from '../data/transport';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  transportType: TransportType;
  onRestart: (type: TransportType) => void;
}

export default function TransportResultScreen({ score, total, transportType, onRestart }: Props) {
  return <QuizResultScreen correctCount={score} total={total} onRestart={() => onRestart(transportType)} theme="sky" />;
}
""")

# WorldLanguages: score = correctCount * 10
write('world-languages/components/WorldLanguagesResultScreen.tsx', """\
'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function WorldLanguagesResultScreen({ score, total, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="emerald" />;
}
""")

# Sequences: level (unused), score = correctCount * 10
write('sequences/components/SequencesResultScreen.tsx', """\
'use client';
import type { SequenceLevel } from '../data/sequences';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  level: SequenceLevel;
  score: number;
  total: number;
  onRestart: () => void;
}

export default function SequencesResultScreen({ score, total, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="sky" />;
}
""")

# Trivia: category (unused in result), score = correctCount * 10
write('trivia/components/TriviaResultScreen.tsx', """\
'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  category: string;
  onRestart: () => void;
}

export default function TriviaResultScreen({ score, total, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="amber" />;
}
""")

# HumanBody: onRestart(category)
write('human-body/components/HumanBodyResultScreen.tsx', """\
'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  category: string;
  onRestart: (category: string) => void;
}

export default function HumanBodyResultScreen({ score, total, category, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={() => onRestart(category)} theme="red" />;
}
""")

# Multiplication: correct/totalQuestions/level props, onRestart(level)
write('multiplication/components/MultiplicationResultScreen.tsx', """\
'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  level: number;
  correct: number;
  totalQuestions: number;
  score: number;
  onRestart: (level: number) => void;
}

export default function MultiplicationResultScreen({ level, correct, totalQuestions, score, onRestart }: Props) {
  return <QuizResultScreen correctCount={correct} total={totalQuestions} score={score} onRestart={() => onRestart(level)} theme="violet" />;
}
""")

print("\nDone! Run: npx tsc --noEmit")
