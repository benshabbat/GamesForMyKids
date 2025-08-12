# Supabase Integration Guide

## סקירה כללית

המערכת משלבת את Supabase כדי לספק:
- אימות משתמשים (Google, GitHub)
- שמירת התקדמות במשחקים
- מערכת הישגים
- ניהול פרופיל משתמש
- הגדרות אישיות

## התקנה ותצורה

### 1. התקנת חבילות

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. הגדרת משתני סביבה

צור קובץ `.env.local` עם המשתנים הבאים:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. הגדרת Supabase Database

רץ את הסקריפט `supabase/schema.sql` ב-Supabase SQL Editor:

```sql
-- הסקריפט יוצר את הטבלאות הבאות:
-- profiles - פרופילי משתמשים
-- game_progress - התקדמות במשחקים
-- achievements - הישגים
-- user_settings - הגדרות משתמש
```

### 4. הגדרת Authentication Providers

ב-Supabase Dashboard:
1. עבור ל-Authentication > Providers
2. הפעל Google OAuth
3. הפעל GitHub OAuth
4. הגדר Redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

## מבנה הקבצים

```
lib/supabase/
├── client.ts      # Client-side Supabase instance
├── server.ts      # Server-side Supabase instance
└── schema.sql     # Database schema

contexts/
└── AuthContext.tsx # Authentication context

hooks/shared/
├── useGameProgress.ts  # ניהול התקדמות משחקים
├── useUserProfile.ts   # ניהול פרופיל משתמש
└── useAchievements.ts  # ניהול הישגים

app/
├── auth/
│   ├── callback/route.ts       # OAuth callback
│   └── auth-code-error/page.tsx # שגיאת אימות
├── login/page.tsx              # דף התחברות
├── profile/page.tsx            # דף פרופיל
└── settings/page.tsx           # דף הגדרות

components/
└── UserProfile.tsx # רכיב פרופיל משתמש
```

## שימוש בקוד

### אימות משתמש

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, signOut, signInWithGoogle } = useAuth()
  
  if (!user) {
    return <button onClick={signInWithGoogle}>התחבר</button>
  }
  
  return (
    <div>
      <p>שלום {user.email}</p>
      <button onClick={signOut}>התנתק</button>
    </div>
  )
}
```

### שמירת התקדמות במשחק

```tsx
import { useGameProgress, useAchievements } from '@/hooks'

function GameComponent() {
  const { updateScore, updateLevel, addPlayTime } = useGameProgress('memory')
  const { checkScoreAchievements } = useAchievements('memory')
  
  const handleGameWin = async (score: number, level: number, playTime: number) => {
    await updateScore('memory', score)
    await updateLevel('memory', level)
    await addPlayTime('memory', playTime)
    await checkScoreAchievements('memory', score)
  }
}
```

### ניהול פרופיל

```tsx
import { useUserProfile } from '@/hooks'

function ProfileComponent() {
  const { profile, updateProfile, uploadAvatar } = useUserProfile()
  
  const handleNameUpdate = async (newName: string) => {
    await updateProfile({ full_name: newName })
  }
  
  const handleAvatarUpload = async (file: File) => {
    await uploadAvatar(file)
  }
}
```

## טבלאות מסד הנתונים

### profiles
- `id` - מזהה משתמש (UUID)
- `full_name` - שם מלא
- `avatar_url` - קישור לתמונת פרופיל

### game_progress
- `user_id` - מזהה משתמש
- `game_type` - סוג משחק
- `level` - רמה נוכחית
- `score` - ניקוד אחרון
- `best_score` - ניקוד הטוב ביותר
- `total_play_time` - סך זמן משחק (שניות)

### achievements
- `user_id` - מזהה משתמש
- `achievement_type` - סוג הישג
- `achievement_name` - שם הישג
- `description` - תיאור
- `game_type` - סוג משחק

### user_settings
- `sound_enabled` - הפעלת צלילים
- `music_enabled` - הפעלת מוזיקה
- `preferred_language` - שפה מועדפת
- `theme` - ערכת נושא
- `difficulty_level` - רמת קושי

## אבטחה

המערכת משתמשת ב-Row Level Security (RLS) כדי להבטיח שמשתמשים יוכלו לגשת רק לנתונים שלהם.

## Middleware

הקובץ `middleware.ts` מטפל באימות אוטומטי ומפנה משתמשים לא מחוברים לדף ההתחברות.

## הישגים מוגדרים מראש

המערכת כוללת הישגים אוטומטיים:
- ניקוד ראשון
- 100/500 נקודות
- רמות 5/10
- זמן משחק 10 דקות/שעה

## פתרון בעיות נפוצות

### שגיאת CORS
ודא ש-Site URL ו-Redirect URLs מוגדרים נכון ב-Supabase Dashboard.

### שגיאת RLS
ודא שה-policies מוגדרות נכון ושהמשתמש מחובר לפני ניסיון גישה לנתונים.

### שגיאת Environment Variables
ודא שכל משתני הסביבה מוגדרים ב-`.env.local` ושהשרת הופעל מחדש.
