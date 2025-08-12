# יצירת טבלאות ב-Supabase - הוראות מדויקות

## 🎯 צריך ליצור הטבלאות ידנית ב-Supabase Dashboard

### שלב 1: כניסה ל-Supabase Dashboard
1. לך ל: https://supabase.com/dashboard
2. בחר את הפרויקט שלך: `jscnbhomguaqxokmzhzc`
3. לחץ על "SQL Editor" בתפריט הצד

### שלב 2: הרצת ה-SQL ליצירת הטבלאות
העתק והדבק את הקוד הבא ב-SQL Editor ולחץ "Run":

```sql
-- יצירת טבלת game_items
CREATE TABLE IF NOT EXISTS public.game_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  hebrew TEXT NOT NULL,
  english TEXT NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  color_class TEXT DEFAULT '',
  sound_frequencies INTEGER[] DEFAULT '{}',
  additional_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- יצירת טבלת game_types
CREATE TABLE IF NOT EXISTS public.game_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name_hebrew TEXT NOT NULL,
  display_name_english TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  difficulty_level TEXT DEFAULT 'normal',
  min_age INTEGER DEFAULT 2,
  max_age INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- יצירת אינדקסים
CREATE INDEX IF NOT EXISTS idx_game_items_category ON public.game_items(category);
CREATE INDEX IF NOT EXISTS idx_game_items_name ON public.game_items(name);
CREATE INDEX IF NOT EXISTS idx_game_types_name ON public.game_types(name);
CREATE INDEX IF NOT EXISTS idx_game_types_category ON public.game_types(category);

-- הפעלת Row Level Security
ALTER TABLE public.game_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_types ENABLE ROW LEVEL SECURITY;

-- יצירת מדיניות גישה פומבית לקריאה
DROP POLICY IF EXISTS "Game items are publicly readable" ON public.game_items;
DROP POLICY IF EXISTS "Game types are publicly readable" ON public.game_types;

CREATE POLICY "Game items are publicly readable" ON public.game_items
  FOR SELECT USING (true);

CREATE POLICY "Game types are publicly readable" ON public.game_types
  FOR SELECT USING (true);
```

### שלב 3: וידוא שהטבלאות נוצרו
אחרי הרצת ה-SQL, תוכל לראות בצד שמאל תחת "Tables" את:
- ✅ game_items
- ✅ game_types

### שלב 4: הרצת המיגרציה
אחרי יצירת הטבלאות, חזור למסוף הפקודות והרץ:

```bash
npm run supabase:migrate
```

## 🔧 אם אתה מעדיף להשתמש ב-Supabase CLI

אלטרנטיבה: אם יש לך Supabase CLI מותקן:

```bash
# התקנת Supabase CLI (אם עוד לא מותקן)
npm install -g supabase

# חיבור לפרויקט
supabase link --project-ref jscnbhomguaqxokmzhzc

# הרצת הסכמה
supabase db push

# הרצת הנתונים
npm run supabase:migrate
```

## ✅ מה לצפות לאחר יצירת הטבלאות:

כשתריץ `npm run supabase:migrate` אחרי יצירת הטבלאות, תקבל פלט כזה:

```
🚀 Starting Supabase data migration...
✅ Table creation step complete
✅ Existing data cleared
✅ Game items inserted successfully
✅ Game types inserted successfully
🎉 Data migration completed successfully!
📊 Total game items: 54
📊 Total game types: 10
```

זה יאמר לך שהכל עבד כשורה והנתונים נטענו למאגר בהצלחה!
