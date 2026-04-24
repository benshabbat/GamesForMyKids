export type QuizTheme =
  | 'green'
  | 'blue'
  | 'purple'
  | 'teal'
  | 'rose'
  | 'indigo'
  | 'amber'
  | 'orange'
  | 'violet'
  | 'sky'
  | 'red'
  | 'emerald'
  | 'cyan';

export interface QuizThemeConfig {
  /** outer background gradient, e.g. 'from-green-50 to-emerald-100' */
  gradient: string;
  /** primary text color, e.g. 'text-green-700' */
  text: string;
  /** score badge classes, e.g. 'bg-green-100 text-green-700' */
  badge: string;
  /** progress bar fill, e.g. 'bg-green-500' */
  progress: string;
  /** question card inner background, e.g. 'bg-green-50' */
  card: string;
  /** idle answer button classes */
  answerIdle: string;
  /** CTA / next / restart button background */
  button: string;
}

export const QUIZ_THEMES: Record<QuizTheme, QuizThemeConfig> = {
  green: {
    gradient:    'from-green-50 to-emerald-100',
    text:        'text-green-700',
    badge:       'bg-green-100 text-green-700',
    progress:    'bg-green-500',
    card:        'bg-green-50',
    answerIdle:  'border-green-200 bg-green-50 hover:bg-green-100 text-green-800',
    button:      'bg-green-600 hover:bg-green-700',
  },
  blue: {
    gradient:    'from-blue-50 to-cyan-100',
    text:        'text-blue-700',
    badge:       'bg-blue-100 text-blue-700',
    progress:    'bg-blue-500',
    card:        'bg-blue-50',
    answerIdle:  'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800',
    button:      'bg-blue-600 hover:bg-blue-700',
  },
  purple: {
    gradient:    'from-purple-50 to-indigo-100',
    text:        'text-purple-700',
    badge:       'bg-purple-100 text-purple-700',
    progress:    'bg-purple-500',
    card:        'bg-purple-50',
    answerIdle:  'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800',
    button:      'bg-purple-600 hover:bg-purple-700',
  },
  teal: {
    gradient:    'from-teal-50 to-cyan-100',
    text:        'text-teal-700',
    badge:       'bg-teal-100 text-teal-700',
    progress:    'bg-teal-500',
    card:        'bg-teal-50',
    answerIdle:  'border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800',
    button:      'bg-teal-600 hover:bg-teal-700',
  },
  rose: {
    gradient:    'from-rose-50 to-pink-100',
    text:        'text-rose-700',
    badge:       'bg-rose-100 text-rose-700',
    progress:    'bg-rose-500',
    card:        'bg-rose-50',
    answerIdle:  'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800',
    button:      'bg-rose-600 hover:bg-rose-700',
  },
  indigo: {
    gradient:    'from-indigo-50 to-blue-100',
    text:        'text-indigo-700',
    badge:       'bg-indigo-100 text-indigo-700',
    progress:    'bg-indigo-500',
    card:        'bg-indigo-50',
    answerIdle:  'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800',
    button:      'bg-indigo-600 hover:bg-indigo-700',
  },
  amber: {
    gradient:    'from-amber-50 to-yellow-100',
    text:        'text-amber-700',
    badge:       'bg-amber-100 text-amber-700',
    progress:    'bg-amber-500',
    card:        'bg-amber-50',
    answerIdle:  'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800',
    button:      'bg-amber-600 hover:bg-amber-700',
  },
  orange: {
    gradient:    'from-orange-50 to-red-100',
    text:        'text-orange-700',
    badge:       'bg-orange-100 text-orange-700',
    progress:    'bg-orange-500',
    card:        'bg-orange-50',
    answerIdle:  'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-800',
    button:      'bg-orange-600 hover:bg-orange-700',
  },
  violet: {
    gradient:    'from-violet-50 to-purple-100',
    text:        'text-violet-700',
    badge:       'bg-violet-100 text-violet-700',
    progress:    'bg-violet-500',
    card:        'bg-violet-50',
    answerIdle:  'border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-800',
    button:      'bg-violet-600 hover:bg-violet-700',
  },
  sky: {
    gradient:    'from-sky-50 to-blue-100',
    text:        'text-sky-700',
    badge:       'bg-sky-100 text-sky-700',
    progress:    'bg-sky-500',
    card:        'bg-sky-50',
    answerIdle:  'border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800',
    button:      'bg-sky-600 hover:bg-sky-700',
  },
  red: {
    gradient:    'from-red-50 to-pink-100',
    text:        'text-red-700',
    badge:       'bg-red-100 text-red-700',
    progress:    'bg-red-500',
    card:        'bg-red-50',
    answerIdle:  'border-red-200 bg-red-50 hover:bg-red-100 text-red-800',
    button:      'bg-red-600 hover:bg-red-700',
  },
  emerald: {
    gradient:    'from-emerald-50 to-green-100',
    text:        'text-emerald-700',
    badge:       'bg-emerald-100 text-emerald-700',
    progress:    'bg-emerald-500',
    card:        'bg-emerald-50',
    answerIdle:  'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800',
    button:      'bg-emerald-600 hover:bg-emerald-700',
  },
  cyan: {
    gradient:    'from-cyan-50 to-indigo-100',
    text:        'text-cyan-700',
    badge:       'bg-cyan-100 text-cyan-700',
    progress:    'bg-cyan-500',
    card:        'bg-cyan-50',
    answerIdle:  'border-cyan-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-800',
    button:      'bg-cyan-600 hover:bg-cyan-700',
  },
};
