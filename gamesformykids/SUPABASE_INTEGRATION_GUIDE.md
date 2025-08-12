# Supabase Integration - Complete Setup Guide

## 🎯 Overview
הפרויקט שלך מכיל כעת אינטגרציה מלאה עם Supabase עבור:
- **אימות משתמשים** (Authentication)
- **פרופילי משתמשים** (User Profiles)
- **מעקב התקדמות במשחקים** (Game Progress)
- **הישגים** (Achievements)
- **תוכן משחקים דינמי** (Dynamic Game Content)

## 📁 Files Created/Updated

### 🔧 Configuration
- `.env.local` - Supabase configuration
- `middleware.ts` - Session management
- `lib/supabase/client.ts` - Client-side Supabase adapter
- `lib/supabase/server.ts` - Server-side Supabase adapter

### 🗄️ Database & Migration
- `supabase/schema.sql` - Complete database schema
- `supabase/seed-data.sql` - Seed data for all game content
- `scripts/migrate-to-supabase.js` - CommonJS migration script
- `scripts/migrate-to-supabase.mjs` - ES Modules migration script

### 🎮 Hooks & Context
- `contexts/AuthContext.tsx` - Authentication context
- `hooks/shared/useUserProfile.ts` - User profile management
- `hooks/shared/useGameProgress.ts` - Game progress tracking
- `hooks/shared/useAchievements.ts` - Achievements system
- `hooks/shared/useGameData.ts` - Dynamic game content

### 🔄 Data Adapters
- `lib/adapters/supabaseDataAdapter.ts` - Converts DB data to app format

### 🎨 Example Components
- `components/shared/SupabaseGamePage.tsx` - DB-driven game page
- `components/examples/DatabaseGameExample.tsx` - Complete usage example

## 🚀 Getting Started

### Step 1: Environment Setup
Make sure your `.env.local` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 2: Create Database Tables
Run the schema in your Supabase dashboard:
```sql
-- Copy and paste the content from supabase/schema.sql
```

### Step 3: Migrate Game Data
Choose one of these migration options:

**Option A: CommonJS (Recommended)**
```bash
npm run supabase:migrate
```

**Option B: ES Modules**
```bash
npm run supabase:migrate-es
```

**Option C: Manual Seed (if you have Supabase CLI)**
```bash
npm run supabase:seed
```

### Step 4: Update Your Components
Replace static constants with dynamic data using the new hooks.

## 📋 Database Schema

### Tables Created:
1. **users** - User profiles and preferences
2. **user_settings** - User-specific settings
3. **game_progress** - Track progress per game/user
4. **achievements** - User achievements
5. **game_items** - All game content (colors, shapes, etc.)
6. **game_types** - Game type definitions

### Sample Data Included:
- ✅ 10 Colors (אדום, כחול, ירוק, etc.)
- ✅ 10 Hebrew Letters (א, ב, ג, etc.)
- ✅ 10 Numbers (0-9)
- ✅ 6 Basic Shapes (עיגול, ריבוע, משולש, etc.)
- ✅ 6 Fruits (תפוח, בננה, תפוז, etc.)
- ✅ 6 Animals (כלב, חתול, פרה, etc.)
- ✅ 6 Vehicles (מכונית, משאית, אוטובוס, etc.)
- ✅ 10 Game Types (צבעים, צורות, מספרים, etc.)

## 🎯 Usage Examples

### Basic Game Data Hook
```typescript
import { useGameData } from '@/hooks/shared/useGameData'

export function MyGameComponent() {
  const { 
    gameItems, 
    gameTypes, 
    loading, 
    error,
    getItemsByCategory,
    getGameType
  } = useGameData()

  if (loading) return <div>טוען...</div>
  if (error) return <div>שגיאה: {error}</div>

  const colors = getItemsByCategory('colors')
  const gameType = getGameType('colors')

  return (
    <div>
      <h1>{gameType?.display_name_hebrew}</h1>
      {colors.map(color => (
        <div key={color.id} className={color.color_class}>
          {color.emoji} {color.hebrew}
        </div>
      ))}
    </div>
  )
}
```

### User Authentication
```typescript
import { useAuth } from '@/contexts/AuthContext'

export function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth()

  if (loading) return <div>טוען...</div>

  return (
    <div>
      {user ? (
        <div>
          <p>שלום {user.email}!</p>
          <button onClick={signOut}>התנתק</button>
        </div>
      ) : (
        <button onClick={signIn}>התחבר</button>
      )}
    </div>
  )
}
```

### Game Progress Tracking
```typescript
import { useGameProgress } from '@/hooks/shared/useGameProgress'

export function GameComponent() {
  const { 
    updateProgress, 
    getProgress, 
    loading 
  } = useGameProgress()

  const handleGameComplete = async () => {
    await updateProgress('colors', {
      completed: true,
      score: 100,
      time_spent: 120
    })
  }

  const progress = getProgress('colors')

  return (
    <div>
      <p>ציון נוכחי: {progress?.score || 0}</p>
      <button onClick={handleGameComplete}>
        סיים משחק
      </button>
    </div>
  )
}
```

## 🔄 Migration from Static to Dynamic

### Before (Static):
```typescript
import { COLOR_CONSTANTS } from '@/lib/constants/gameData/basic'

export function ColorGame() {
  const colors = Object.values(COLOR_CONSTANTS)
  // ...
}
```

### After (Dynamic):
```typescript
import { useGameData } from '@/hooks/shared/useGameData'

export function ColorGame() {
  const { getItemsByCategory, loading } = useGameData()
  
  if (loading) return <div>טוען...</div>
  
  const colors = getItemsByCategory('colors')
  // ...
}
```

## 🛠️ Available Scripts

- `npm run supabase:migrate` - Run CommonJS migration
- `npm run supabase:migrate-es` - Run ES Modules migration
- `npm run supabase:seed` - Manual seed with CLI

## ⚡ Performance Tips

1. **Use Loading States**: Always handle loading states for better UX
2. **Cache Data**: The hooks include built-in caching
3. **Batch Operations**: Use batch inserts for better performance
4. **Optimize Queries**: Use specific category filters when possible

## 🔒 Security Features

- ✅ Row Level Security (RLS) enabled
- ✅ Public read access for game content
- ✅ User-specific data protection
- ✅ Secure authentication flow

## 🐛 Troubleshooting

### Migration Issues:
1. Check environment variables in `.env.local`
2. Ensure Supabase project is accessible
3. Verify service role key permissions
4. Check for existing table conflicts

### Runtime Issues:
1. Check browser console for authentication errors
2. Verify Supabase URL configuration
3. Ensure RLS policies are correctly set
4. Check network connectivity

## 🎉 Next Steps

1. **Run Migration**: Execute the migration script
2. **Test Authentication**: Try the login/logout flow
3. **Update Components**: Gradually migrate from static to dynamic data
4. **Add Features**: Use the progress and achievements systems
5. **Customize**: Extend the schema for your specific needs

---

**Ready to use!** 🚀
Your project now has a complete, scalable database-driven architecture with Supabase!
