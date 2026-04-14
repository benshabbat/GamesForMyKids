// ─── לייבלים ──────────────────────────────────────────────────────────────────

export const LOGIN_LABELS = {
  welcome:          'ברוכים הבאים!',
  signInSubtitle:   'התחברו לחשבון שלכם',
  registerSubtitle: 'צרו חשבון חדש',

  guestPlay:         'שחק בלי התחברות',
  guestEmoji:        '🎮',
  orSaveProgress:    'או התחברו כדי לשמור את ההתקדמות',
  orDivider:         'או',

  fieldName:            'שם מלא',
  fieldNamePlaceholder: 'השם שלכם',
  fieldEmail:            'אימייל',
  fieldEmailPlaceholder: 'הכניסו את האימייל שלכם',
  fieldPassword:            'סיסמה',
  fieldPasswordPlaceholder: 'הכניסו סיסמה',

  loadingBtn:    'טוען...',
  createAccount: 'צרו חשבון',
  signInBtn:     'התחברו',
  googleSignIn:  'התחבר עם Google',

  alreadyHaveAccount: 'יש לכם כבר חשבון? התחברו',
  noAccount:          'אין לכם חשבון? הירשמו',

  genericError: 'אירעה שגיאה, נסו שוב',

  footerLine1: 'משחקים זמינים לכולם!',
  footerLine2: 'התחברות שומרת את ההתקדמות והציונים',
} as const;

// ─── טייפים ───────────────────────────────────────────────────────────────────

export interface LoginPageViewModel {
  isRegistering: boolean;
  email:         string;
  password:      string;
  name:          string;
  error:         string;
  isSubmitting:  boolean;
  setEmail:      (v: string) => void;
  setPassword:   (v: string) => void;
  setName:       (v: string) => void;
  handleEmailAuth: (e: React.FormEvent) => Promise<void>;
  toggleMode:      () => void;
  continueAsGuest: () => void;
  signInWithGoogle: () => void;
}
