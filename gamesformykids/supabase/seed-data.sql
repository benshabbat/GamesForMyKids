-- ===============================================
-- Supabase Seed Data - Game Content
-- ===============================================

-- Create table for game items (colors, shapes, numbers, letters, etc.)
CREATE TABLE IF NOT EXISTS public.game_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  hebrew TEXT NOT NULL,
  english TEXT NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT NOT NULL, -- 'colors', 'shapes', 'numbers', 'letters', 'fruits', etc.
  subcategory TEXT, -- optional subcategory
  color_class TEXT, -- CSS color class
  sound_frequencies INTEGER[] DEFAULT '{}', -- array of sound frequencies
  additional_data JSONB DEFAULT '{}', -- for shape, digit, svg, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_items_category ON public.game_items(category);
CREATE INDEX IF NOT EXISTS idx_game_items_name ON public.game_items(name);

-- Enable RLS
ALTER TABLE public.game_items ENABLE ROW LEVEL SECURITY;

-- Create policy - public read access for game items
CREATE POLICY "Game items are publicly readable" ON public.game_items
  FOR SELECT USING (true);

-- Insert Colors
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('red', 'אדום', 'Red', '🔴', 'colors', 'bg-gradient-to-br from-red-400 to-red-600', ARRAY[440, 550, 660]),
('blue', 'כחול', 'Blue', '🔵', 'colors', 'bg-gradient-to-br from-blue-400 to-blue-600', ARRAY[523, 659, 784]),
('green', 'ירוק', 'Green', '🟢', 'colors', 'bg-gradient-to-br from-green-400 to-green-600', ARRAY[349, 440, 523]),
('yellow', 'צהוב', 'Yellow', '🟡', 'colors', 'bg-gradient-to-br from-yellow-400 to-yellow-600', ARRAY[392, 494, 587]),
('purple', 'סגול', 'Purple', '🟣', 'colors', 'bg-gradient-to-br from-purple-400 to-purple-600', ARRAY[294, 370, 440]),
('orange', 'כתום', 'Orange', '🟠', 'colors', 'bg-gradient-to-br from-orange-400 to-orange-600', ARRAY[330, 415, 494]),
('pink', 'ורוד', 'Pink', '🩷', 'colors', 'bg-gradient-to-br from-pink-400 to-pink-600', ARRAY[587, 698, 784]),
('brown', 'חום', 'Brown', '🤎', 'colors', 'bg-gradient-to-br from-amber-500 to-amber-700', ARRAY[220, 277, 330]),
('black', 'שחור', 'Black', '⚫', 'colors', 'bg-gradient-to-br from-gray-800 to-gray-950', ARRAY[196, 247, 294]),
('white', 'לבן', 'White', '⚪', 'colors', 'bg-gradient-to-br from-gray-50 to-gray-200 border-2 border-gray-300', ARRAY[659, 784, 880]);

-- Insert Hebrew Letters
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('alef', 'א', 'A', 'א', 'letters', '', ARRAY[440, 550, 660]),
('bet', 'ב', 'B', 'ב', 'letters', '', ARRAY[415, 523, 622]),
('gimel', 'ג', 'G', 'ג', 'letters', '', ARRAY[392, 494, 587]),
('dalet', 'ד', 'D', 'ד', 'letters', '', ARRAY[370, 466, 554]),
('heh', 'ה', 'H', 'ה', 'letters', '', ARRAY[349, 440, 523]),
('vav', 'ו', 'V', 'ו', 'letters', '', ARRAY[392, 494, 622]),
('zayin', 'ז', 'Z', 'ז', 'letters', '', ARRAY[349, 440, 523]),
('het', 'ח', 'CH', 'ח', 'letters', '', ARRAY[330, 415, 494]),
('tet', 'ט', 'T', 'ט', 'letters', '', ARRAY[294, 370, 440]),
('yud', 'י', 'Y', 'י', 'letters', '', ARRAY[277, 349, 415]),
('kaf', 'כ', 'K', 'כ', 'letters', '', ARRAY[262, 330, 392]),
('lamed', 'ל', 'L', 'ל', 'letters', '', ARRAY[247, 311, 370]),
('mem', 'ם', 'M', 'ם', 'letters', '', ARRAY[233, 294, 349]),
('nun', 'ן', 'N', 'ן', 'letters', '', ARRAY[220, 277, 330]),
('samech', 'ס', 'S', 'ס', 'letters', '', ARRAY[208, 262, 311]),
('ayin', 'ע', 'A', 'ע', 'letters', '', ARRAY[196, 247, 294]),
('peh', 'פ', 'P', 'פ', 'letters', '', ARRAY[185, 233, 277]),
('tzadik', 'צ', 'TZ', 'צ', 'letters', '', ARRAY[175, 220, 262]),
('kuf', 'ק', 'K', 'ק', 'letters', '', ARRAY[165, 208, 247]),
('resh', 'ר', 'R', 'ר', 'letters', '', ARRAY[156, 196, 233]),
('shin', 'ש', 'SH', 'ש', 'letters', '', ARRAY[147, 185, 220]),
('tav', 'ת', 'T', 'ת', 'letters', '', ARRAY[139, 175, 208]);

-- Insert Numbers
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies, additional_data) VALUES
('zero', 'אפס', 'Zero', '0️⃣', 'numbers', '', ARRAY[261, 329, 392], '{"digit": "0"}'),
('one', 'אחד', 'One', '1️⃣', 'numbers', '', ARRAY[293, 369, 440], '{"digit": "1"}'),
('two', 'שתיים', 'Two', '2️⃣', 'numbers', '', ARRAY[329, 415, 494], '{"digit": "2"}'),
('three', 'שלוש', 'Three', '3️⃣', 'numbers', '', ARRAY[349, 440, 523], '{"digit": "3"}'),
('four', 'ארבע', 'Four', '4️⃣', 'numbers', '', ARRAY[392, 494, 587], '{"digit": "4"}'),
('five', 'חמש', 'Five', '5️⃣', 'numbers', '', ARRAY[440, 554, 659], '{"digit": "5"}'),
('six', 'שש', 'Six', '6️⃣', 'numbers', '', ARRAY[493, 622, 740], '{"digit": "6"}'),
('seven', 'שבע', 'Seven', '7️⃣', 'numbers', '', ARRAY[523, 659, 784], '{"digit": "7"}'),
('eight', 'שמונה', 'Eight', '8️⃣', 'numbers', '', ARRAY[587, 740, 880], '{"digit": "8"}'),
('nine', 'תשע', 'Nine', '9️⃣', 'numbers', '', ARRAY[659, 831, 988], '{"digit": "9"}');

-- Insert Basic Shapes
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies, additional_data) VALUES
('circle', 'עיגול', 'Circle', '⭕', 'shapes', 'bg-blue-500', ARRAY[523, 659, 784], '{"svg": "circle"}'),
('square', 'ריבוע', 'Square', '⬜', 'shapes', 'bg-red-500', ARRAY[440, 550, 660], '{"svg": "square"}'),
('triangle', 'משולש', 'Triangle', '🔺', 'shapes', 'bg-green-500', ARRAY[349, 440, 523], '{"svg": "triangle"}'),
('rectangle', 'מלבן', 'Rectangle', '▬', 'shapes', 'bg-purple-500', ARRAY[294, 370, 440], '{"svg": "rectangle"}'),
('star', 'כוכב', 'Star', '⭐', 'shapes', 'bg-yellow-500', ARRAY[392, 494, 587], '{"svg": "star"}'),
('heart', 'לב', 'Heart', '❤️', 'shapes', 'bg-pink-500', ARRAY[587, 698, 784], '{"svg": "heart"}'),
('diamond', 'מעויין', 'Diamond', '💎', 'shapes', 'bg-indigo-500', ARRAY[277, 349, 415], '{"svg": "diamond"}'),
('oval', 'אליפסה', 'Oval', '⭕', 'shapes', 'bg-teal-500', ARRAY[220, 277, 330], '{"svg": "oval"}');

-- Insert Fruits
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('apple', 'תפוח', 'Apple', '🍎', 'fruits', 'bg-red-500', ARRAY[440, 550, 660]),
('banana', 'בננה', 'Banana', '🍌', 'fruits', 'bg-yellow-500', ARRAY[392, 494, 587]),
('orange', 'תפוז', 'Orange', '🍊', 'fruits', 'bg-orange-500', ARRAY[330, 415, 494]),
('grapes', 'ענבים', 'Grapes', '🍇', 'fruits', 'bg-purple-500', ARRAY[294, 370, 440]),
('strawberry', 'תות', 'Strawberry', '🍓', 'fruits', 'bg-pink-500', ARRAY[587, 698, 784]),
('watermelon', 'אבטיח', 'Watermelon', '🍉', 'fruits', 'bg-green-500', ARRAY[349, 440, 523]),
('peach', 'אפרסק', 'Peach', '🍑', 'fruits', 'bg-orange-400', ARRAY[277, 349, 415]),
('pear', 'אגס', 'Pear', '🍐', 'fruits', 'bg-green-400', ARRAY[262, 330, 392]),
('pineapple', 'אננס', 'Pineapple', '🍍', 'fruits', 'bg-yellow-600', ARRAY[233, 294, 349]),
('cherry', 'דובדבן', 'Cherry', '🍒', 'fruits', 'bg-red-600', ARRAY[523, 659, 784]);

-- Insert Vegetables
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('carrot', 'גזר', 'Carrot', '🥕', 'vegetables', 'bg-orange-500', ARRAY[440, 550, 660]),
('tomato', 'עגבנייה', 'Tomato', '🍅', 'vegetables', 'bg-red-500', ARRAY[392, 494, 587]),
('cucumber', 'מלפפון', 'Cucumber', '🥒', 'vegetables', 'bg-green-500', ARRAY[349, 440, 523]),
('pepper', 'פלפל', 'Pepper', '🫑', 'vegetables', 'bg-green-600', ARRAY[330, 415, 494]),
('onion', 'בצל', 'Onion', '🧅', 'vegetables', 'bg-yellow-600', ARRAY[294, 370, 440]),
('lettuce', 'חסה', 'Lettuce', '🥬', 'vegetables', 'bg-green-400', ARRAY[262, 330, 392]),
('potato', 'תפוח אדמה', 'Potato', '🥔', 'vegetables', 'bg-amber-600', ARRAY[220, 277, 330]),
('corn', 'תירס', 'Corn', '🌽', 'vegetables', 'bg-yellow-500', ARRAY[494, 587, 698]);

-- Insert Animals
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('dog', 'כלב', 'Dog', '🐶', 'animals', 'bg-brown-500', ARRAY[200, 300, 150]),
('cat', 'חתול', 'Cat', '🐱', 'animals', 'bg-gray-500', ARRAY[800, 1000, 600]),
('cow', 'פרה', 'Cow', '🐄', 'animals', 'bg-pink-300', ARRAY[100, 200, 150]),
('horse', 'סוס', 'Horse', '🐴', 'animals', 'bg-amber-600', ARRAY[300, 500, 400]),
('sheep', 'כבש', 'Sheep', '🐑', 'animals', 'bg-gray-200', ARRAY[400, 600, 500]),
('pig', 'חזיר', 'Pig', '🐷', 'animals', 'bg-pink-400', ARRAY[250, 350, 200]),
('chicken', 'תרנגולת', 'Chicken', '🐔', 'animals', 'bg-yellow-400', ARRAY[600, 800, 700]),
('duck', 'ברווז', 'Duck', '🦆', 'animals', 'bg-blue-300', ARRAY[500, 700, 600]),
('rabbit', 'ארנב', 'Rabbit', '🐰', 'animals', 'bg-gray-300', ARRAY[400, 500, 600]),
('frog', 'צפרדע', 'Frog', '🐸', 'animals', 'bg-green-400', ARRAY[200, 400, 300]);

-- Insert Colored Shapes (combinations)
INSERT INTO public.game_items (name, hebrew, english, emoji, category, subcategory, color_class, sound_frequencies, additional_data) VALUES
-- Red Shapes
('red_circle', 'עיגול אדום', 'Red Circle', '🔴', 'shapes', 'colored', 'bg-gradient-to-br from-red-400 to-red-600', ARRAY[440, 550, 660], '{"shape": "circle", "shapeHebrew": "עיגול", "svg": "circle", "value": "#ef4444", "tailwindClass": "bg-red-500"}'),
('red_square', 'ריבוע אדום', 'Red Square', '🟥', 'shapes', 'colored', 'bg-gradient-to-br from-red-400 to-red-600', ARRAY[440, 550, 660], '{"shape": "square", "shapeHebrew": "ריבוע", "svg": "square", "value": "#ef4444", "tailwindClass": "bg-red-500"}'),
-- Blue Shapes
('blue_circle', 'עיגול כחול', 'Blue Circle', '🔵', 'shapes', 'colored', 'bg-gradient-to-br from-blue-400 to-blue-600', ARRAY[523, 659, 784], '{"shape": "circle", "shapeHebrew": "עיגול", "svg": "circle", "value": "#3b82f6", "tailwindClass": "bg-blue-500"}'),
('blue_square', 'ריבוע כחול', 'Blue Square', '🟦', 'shapes', 'colored', 'bg-gradient-to-br from-blue-400 to-blue-600', ARRAY[523, 659, 784], '{"shape": "square", "shapeHebrew": "ריבוע", "svg": "square", "value": "#3b82f6", "tailwindClass": "bg-blue-500"}'),
-- Green Shapes
('green_circle', 'עיגול ירוק', 'Green Circle', '🟢', 'shapes', 'colored', 'bg-gradient-to-br from-green-400 to-green-600', ARRAY[349, 440, 523], '{"shape": "circle", "shapeHebrew": "עיגול", "svg": "circle", "value": "#10b981", "tailwindClass": "bg-green-500"}'),
('green_square', 'ריבוע ירוק', 'Green Square', '🟩', 'shapes', 'colored', 'bg-gradient-to-br from-green-400 to-green-600', ARRAY[349, 440, 523], '{"shape": "square", "shapeHebrew": "ריבוע", "svg": "square", "value": "#10b981", "tailwindClass": "bg-green-500"}'),
-- Yellow Shapes
('yellow_circle', 'עיגול צהוב', 'Yellow Circle', '🟡', 'shapes', 'colored', 'bg-gradient-to-br from-yellow-400 to-yellow-600', ARRAY[392, 494, 587], '{"shape": "circle", "shapeHebrew": "עיגול", "svg": "circle", "value": "#eab308", "tailwindClass": "bg-yellow-500"}'),
('yellow_square', 'ריבוע צהוב', 'Yellow Square', '🟨', 'shapes', 'colored', 'bg-gradient-to-br from-yellow-400 to-yellow-600', ARRAY[392, 494, 587], '{"shape": "square", "shapeHebrew": "ריבוע", "svg": "square", "value": "#eab308", "tailwindClass": "bg-yellow-500"}'),
-- Purple Shapes
('purple_triangle', 'משולש סגול', 'Purple Triangle', '🔺', 'shapes', 'colored', 'bg-gradient-to-br from-purple-400 to-purple-600', ARRAY[294, 370, 440], '{"shape": "triangle", "shapeHebrew": "משולש", "svg": "triangle", "value": "#a855f7", "tailwindClass": "bg-purple-500"}'),
('yellow_star', 'כוכב צהוב', 'Yellow Star', '⭐', 'shapes', 'colored', 'bg-gradient-to-br from-yellow-400 to-yellow-600', ARRAY[392, 494, 587], '{"shape": "star", "shapeHebrew": "כוכב", "svg": "star", "value": "#eab308", "tailwindClass": "bg-yellow-500"}'),
('pink_heart', 'לב ורוד', 'Pink Heart', '💗', 'shapes', 'colored', 'bg-gradient-to-br from-pink-400 to-pink-600', ARRAY[587, 698, 784], '{"shape": "heart", "shapeHebrew": "לב", "svg": "heart", "value": "#ec4899", "tailwindClass": "bg-pink-500"}');

-- Create game types reference table
CREATE TABLE IF NOT EXISTS public.game_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name_hebrew TEXT NOT NULL,
  display_name_english TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT, -- 'basic', 'educational', 'creative', 'memory', etc.
  difficulty_level TEXT DEFAULT 'normal', -- 'easy', 'normal', 'hard'
  min_age INTEGER DEFAULT 2,
  max_age INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for game types
ALTER TABLE public.game_types ENABLE ROW LEVEL SECURITY;

-- Create policy - public read access for game types
CREATE POLICY "Game types are publicly readable" ON public.game_types
  FOR SELECT USING (true);

-- Insert Game Types (all 131 games as of May 2026)
INSERT INTO public.game_types (name, display_name_hebrew, display_name_english, description, icon, category, min_age, max_age) VALUES
-- Basic learning
('memory',           'משחק זיכרון',             'Memory Game',             'מצא את הזוגות!',                                     '🧠', 'basic',           3, 8),
('colors',           'משחק צבעים',              'Colors',                  'למד צבעים!',                                         '🌈', 'basic',           2, 5),
('letters',          'משחק אותיות',             'Hebrew Letters',          'למד אותיות!',                                        'א',  'educational',     3, 6),
('hebrew-letters',   'תרגול כתיבה בעברית',      'Hebrew Writing Practice', 'תרגל כתיבת כל האותיות!',                            '✍️', 'educational',     4, 8),
('shapes',           'משחק צורות',              'Shapes',                  'למד צורות!',                                         '🔷', 'basic',           2, 5),
('colored-shapes',   'משחק צורות צבעוניות',     'Colored Shapes',          'בחר צורה בצבע הנכון!',                               '🟡', 'basic',           3, 6),
('numbers',          'משחק מספרים',             'Numbers',                 'למד מספרים!',                                        '🔢', 'basic',           2, 5),
('fruits',           'משחק פירות',              'Fruits',                  'למד פירות!',                                         '🍎', 'basic',           2, 5),
('bubbles',          'בועות מוזיקליות',          'Musical Bubbles',         'פוצץ בועות ושמע צלילים!',                            '🎵', 'basic',           2, 5),
('counting',         'משחק ספירה',              'Counting',                'ספור אימוג׳ים!',                                     '🔟', 'educational',     3, 6),
('weather',          'משחק מזג אוויר',           'Weather',                 'למד על מזג האוויר!',                                 '⛅', 'knowledge',       3, 7),
-- Math & logic
('math',             'משחק חשבון',              'Math',                    'למד חיבור וחיסור!',                                  '➕', 'educational',     4, 8),
('multiplication',   'לוח הכפל',                'Multiplication',          'תרגל כפל במהירות עם טיימר!',                        '✖️', 'educational',     6, 12),
('arithmetic',       'חשבון מהיר',              'Fast Arithmetic',         'חבר, חסר וכפל במהירות!',                            '➕', 'educational',     5, 10),
('fractions',        'שברים פשוטים',            'Fractions',               'זהה שברים לפי ייצוג ויזואלי!',                      '½',  'educational',     6, 12),
('sequences',        'סדרות מספרים',            'Number Sequences',        'מה המספר הבא בסדרה?',                               '🔢', 'educational',     5, 10),
('emoji-math',       'מתמטיקה עם אמוג׳י',       'Emoji Math',              'ספור אמוג׳י ופתור תרגילי חיבור וחיסור!',            '🧮', 'educational',     4, 8),
('math-race',        'מרוץ מתמטיקה',            'Math Race',               'פתור כמה שיותר תרגילים ב-30 שניות!',                '🏎️', 'educational',     5, 10),
('number-bubbles',   'בועות מספרים',            'Number Bubbles',          'פוצץ את הבועות לפי הסדר: 1, 2, 3!',                '🫧', 'educational',     3, 7),
('clock',            'הכרת השעון',              'Reading the Clock',       'למד לקרוא שעון עם שעון אנלוגי!',                   '🕐', 'educational',     5, 9),
('logic-games',      'משחקי חשיבה ולוגיקה',     'Logic Games',             'פתח את יכולות החשיבה והלוגיקה!',                   '🧩', 'educational',     5, 12),
-- Language & literacy
('spelling',         'כתיב עברי',               'Hebrew Spelling',         'בחר את האיות הנכון בעברית!',                        '📝', 'educational',     5, 10),
('word-builder',     'בניית מילים',             'Word Builder',            'הרכב מילים בעברית מאותיות מפוזרות!',                '🔤', 'educational',     5, 9),
('word-scramble',    'מילים מבולבלות',           'Word Scramble',           'סדר את האותיות ליצירת המילה הנכונה!',               '🔡', 'educational',     5, 10),
('english-words',    'אנגלית לילדים',            'English for Kids',        'למד מילים בסיסיות באנגלית!',                        '🔤', 'educational',     4, 9),
('world-languages',  'שפות העולם',              'World Languages',         'באיזו שפה מדברים בכל מדינה?',                       '🌐', 'knowledge',       7, 14),
('opposites',        'ניגודים',                 'Opposites',               'גדול-קטן, חם-קר ועוד הפכים!',                      '↔️', 'educational',     3, 7),
('riddles',          'חידות לילדים',             'Kids Riddles',            'פתור חידות מסקרנות ומהנות!',                        '💡', 'knowledge',       5, 12),
-- Creative
('drawing',          'משחק ציורים',             'Drawing',                 'צייר יצירות אמנות!',                                '✏️', 'creative',        2, 10),
('coloring',         'צביעת תמונות',            'Coloring',                'בחר צבע וצבע ציורים מהנים!',                        '🎨', 'creative',        2, 8),
('building',         'סטודיו הבנייה הקסום',      'Magic Building Studio',   'בנה יצירות עם צורות צבעוניות!',                     '🏗️', 'creative',        2, 7),
('puzzles',          'משחק פאזלים',             'Puzzles',                 'הרכב תמונות יפות!',                                 '🧩', 'creative',        3, 8),
('art-craft',        'אמנות ויצירה',            'Art & Craft',             'הכר כלי אמנות וצור יצירות מדהימות!',               '🖌️', 'creative',        3, 9),
('color-mix',        'ערבוב צבעים',             'Color Mixing',            'מה מקבלים כשמערבבים צבעים?',                       '🎨', 'creative',        4, 8),
-- Nature & science
('nature-sounds',    'משחק צלילי הטבע',          'Nature Sounds',           'הקשב לקולות הטבע ובעלי החיים!',                     '🌿', 'nature',          2, 8),
('ocean-life',       'משחק חיי הים',             'Ocean Life',              'גלה את עולם הים הקסום וחיותיו!',                    '🐠', 'nature',          3, 9),
('garden-plants',    'משחק הגינה והצמחים',        'Garden & Plants',         'למד על צמחים, פרחים וגידול בגינה!',                 '🌸', 'nature',          3, 8),
('birds',            'משחק ציפורים',             'Birds',                   'הכר ציפורים מדהימות מרחבי העולם!',                  '🦅', 'nature',          3, 9),
('exotic-birds',     'ציפורים אקזוטיות',         'Exotic Birds',            'זהה ציפורים מסביב העולם!',                          '🦩', 'knowledge',       6, 14),
('bugs-insects',     'חרקים ופרפרים',            'Bugs & Insects',          'עולם זעיר ומרתק של חרקים!',                         '🦋', 'nature',          3, 9),
('butterflies',      'פרפרים',                  'Butterflies',             'זהה פרפרים ועשים מסביב העולם!',                     '🦋', 'knowledge',       6, 14),
('nature',           'עולם הטבע',               'World of Nature',         'למד על הטבע סביבנו!',                               '🌿', 'nature',          3, 9),
('recycling',        'משחק מחזור וקיימות',        'Recycling & Sustainability','למד על מחזור וחשיבות שמירה על הסביבה!',          '♻️', 'nature',          4, 10),
('camping',          'טיול ושטח',               'Camping & Outdoors',      'הכן את הציוד להרפתקאה בטבע!',                      '⛺', 'nature',          4, 10),
('climate-planet',   'אקלים וכדור הארץ',         'Climate & Planet Earth',  'גלה יבשות, אוקיינוסים ואזורי אקלים!',               '🌍', 'knowledge',       6, 12),
('solar-system',     'מערכת השמש',              'Solar System',            'זהה כוכבי לכת וגרמי שמים!',                        '🪐', 'knowledge',       5, 12),
-- Space
('space',            'משחק גופי השמים',          'Space & Stars',           'חקור את החלל והכוכבים!',                            '🌟', 'knowledge',       4, 10),
('space-adventure',  'משחק הרפתקת החלל',         'Space Adventure',         'טוס לחלל וגלה כוכבי לכת!',                          '🚀', 'knowledge',       4, 10),
-- Animals & creatures
('animals',          'בעלי חיים',               'Animals',                 'זהה בעלי חיים ולמד עליהם!',                         '🐘', 'basic',           2, 7),
('dinosaurs',        'משחק דינוזאורים',          'Dinosaurs',               'למד על דינוזאורים מדהימים מהעבר!',                  '🦖', 'knowledge',       4, 10),
('dog-breeds',       'גזעי כלבים',              'Dog Breeds',              'זהה גזעי כלבים מסביב העולם!',                       '🐕', 'knowledge',       6, 14),
('cat-breeds',       'גזעי חתולים',             'Cat Breeds',              'זהה גזעי חתולים מסביב העולם!',                      '🐱', 'knowledge',       6, 14),
-- Body & health
('body-parts',       'משחק חלקי הגוף',           'Body Parts',              'למד על חלקי הגוף השונים!',                          '🖐️', 'educational',     2, 6),
('human-body',       'גוף האדם',                'Human Body',              'גלה את פלאות גוף האדם!',                            '🫀', 'knowledge',       6, 12),
('medicine',         'משחק מרקחת ותרופות',        'Medicine & First Aid',    'הכר כלי רפואה ומתן עזרה ראשונה!',                  '💊', 'knowledge',       5, 10),
('healthy-food',     'אוכל בריא',               'Healthy Food',            'למד על תזונה נכונה ומזינה!',                        '🥗', 'knowledge',       4, 9),
-- Social & emotional
('feelings',         'משחק רגשות ותחושות',        'Feelings & Senses',       'זהה ולמד על רגשות ותחושות שונות!',                  '😄', 'social-emotional', 2, 7),
('emotions',         'עולם הרגשות',              'World of Emotions',       'זהה רגשות לפי תיאור!',                              '😊', 'social-emotional', 3, 8),
('emotional-social', 'מציאות רגשית וחברתית',     'Emotional & Social',      'פתח אינטליגנציה רגשית וחברתית!',                   '💖', 'social-emotional', 4, 10),
('family',           'המשפחה',                  'Family',                  'למד על קשרים משפחתיים!',                            '👨‍👩‍👧‍👦', 'social-emotional', 2, 6),
('body-movements',   'תנועות גוף וריקוד',         'Body Movements & Dance',  'תרגל תנועות, יוגה וריקוד אינטראקטיבי!',            '🤸', 'social-emotional', 2, 8),
('touch-senses',     'מגע וחושים',              'Touch & Senses',          'חקור מרקמים, טמפרטורות וחושי גוף!',                '🤚', 'social-emotional', 2, 7),
-- Culture & society
('professions',      'משחק מקצועות',             'Professions',             'למד על מקצועות שונים!',                             '👩‍⚕️', 'knowledge',     3, 8),
('new-professions',  'מקצועות מודרניים',         'Modern Professions',      'למד על מקצועות חדשים וטכנולוגיים!',                '💼', 'knowledge',       6, 12),
('shopping-money',   'משחק קניות וכסף',          'Shopping & Money',        'למד על כסף, מחירים וקניות!',                        '🛒', 'educational',     4, 9),
('road-safety',      'משחק בטיחות בדרכים',        'Road Safety',             'למד כללי בטיחות חשובים בדרכים!',                   '🚦', 'educational',     3, 8),
('transport',        'כלי תחבורה',              'Transport',               'גלה כלי רכב מהיבשה, הים והאוויר!',                  '🚗', 'knowledge',       2, 7),
-- Jewish & Israeli culture
('tzedakah',         'משחק קופת הצדקה',          'Tzedakah',                'תפוס מטבעות לצדקה!',                                '🪙', 'cultural',        3, 8),
('jewish-holidays',  'חגים יהודיים',             'Jewish Holidays',         'למד על חגי ישראל ומסורותיהם!',                      '🕎', 'cultural',        3, 10),
('holidays',         'חגי ישראל',               'Israeli Holidays',        'למד על חגי ישראל ומשמעותם!',                        '🕍', 'cultural',        3, 10),
('seasons-holidays', 'עונות השנה ומועדים',        'Seasons & Holidays',      'למד על עונות השנה והחגים היהודיים!',                '🍂', 'cultural',        3, 8),
('tzadikim',         'סיפורי צדיקים',            'Stories of the Righteous','למד על גדולי ישראל ומה שלמדנו מהם!',                '📜', 'cultural',        5, 12),
('israel',           'ישראל שלי',               'My Israel',               'ידע על מדינת ישראל!',                               '🇮🇱', 'cultural',       5, 12),
-- Geography & world knowledge
('geography',        'גאוגרפיה',                'Geography',               'בירות, דגלים ויבשות של העולם!',                     '🗺️', 'knowledge',       7, 14),
('capitals',         'בירות העולם',              'World Capitals',          'מה הבירה של כל מדינה?',                             '🏛️', 'knowledge',       7, 14),
('continents',       'יבשות העולם',              'Continents',              'גלה את 7 יבשות כדור הארץ!',                         '🌍', 'knowledge',       5, 12),
('flags',            'דגלי מדינות',              'Country Flags',           'זהה דגלים של מדינות מסביב לעולם!',                  '🚩', 'knowledge',       6, 14),
('world-landmarks',  'אתרים מפורסמים',           'World Landmarks',         'זהה אתרים מפורסמים מסביב לעולם!',                   '🗼', 'knowledge',       7, 14),
-- Science & environment
('science',          'מדע לילדים',              'Kids Science',            'גוף, חלל, טבע ופיזיקה לילדים!',                    '🔬', 'knowledge',       5, 12),
('shapes-3d',        'גופים גיאומטריים',         '3D Shapes',               'למד גופים תלת-ממדיים!',                             '📐', 'educational',     5, 10),
-- Food & home
('vegetables',       'משחק ירקות',              'Vegetables',              'למד ירקות בריאים!',                                 '🥦', 'basic',           2, 6),
('world-food',       'מזון מסביב לעולם',          'World Food',              'הכר מאכלים מתרבויות שונות!',                        '🍜', 'knowledge',       4, 10),
('cooking-kitchen',  'בישול ומטבח',             'Cooking & Kitchen',       'למד לבשל ולהכין מאכלים טעימים!',                   '👨‍🍳', 'knowledge',     4, 10),
('kitchen',          'משחק כלי מטבח',            'Kitchen Tools',           'למד על כלי מטבח ובישול!',                           '🍳', 'knowledge',       3, 8),
('house',            'משחק חפצי הבית',           'Household Objects',       'למד חפצים בבית!',                                   '🏠', 'basic',           2, 6),
('tools',            'משחק כלי עבודה',           'Work Tools',              'למד כלי עבודה שונים!',                              '🔧', 'knowledge',       3, 8),
('clothing',         'משחק בגדים ואביזרים',       'Clothing & Accessories',  'למד על פריטי לבוש שונים!',                          '👗', 'basic',           2, 6),
('smells-tastes',    'משחק ריחות וטעמים',         'Smells & Tastes',         'זהה ריחות וטעמים שונים!',                           '👃', 'knowledge',       3, 8),
-- Sports & music
('sports',           'משחק ספורט',              'Sports',                  'למד על ספורט ופעילות גופנית!',                      '⚽', 'knowledge',       3, 10),
('soccer',           'כדורגל',                  'Soccer',                  'שאלות על ספורט המלכים!',                            '⚽', 'knowledge',       5, 14),
('sports-quiz',      'חידון ספורט',             'Sports Quiz',             'שאלות על עולם הספורט!',                             '🏆', 'knowledge',       6, 14),
('soccer-logos',     'סמלי כדורגל',             'Soccer Logos',            'זהה סמלים של קבוצות כדורגל!',                       '⚽', 'knowledge',       6, 14),
('nba-teams',        'קבוצות NBA',              'NBA Teams',               'זהה לוגואים של קבוצות הבסקטבול!',                   '🏀', 'knowledge',       7, 14),
('instruments',      'כלי נגינה',               'Musical Instruments',     'זהה כלי נגינה לפי תיאורם!',                        '🎸', 'knowledge',       4, 10),
('sound-imitation',  'חיקוי קולות ורעשים',        'Sound Imitation',         'חקה קולות של חיות, מכונות וטבע!',                   '🎤', 'creative',        2, 8),
-- Tech & modern
('tech-logos',       'לוגואים טכנולוגיה',         'Tech Logos',              'זהה לוגואים של חברות הטכנולוגיה!',                  '📱', 'knowledge',       8, 16),
('car-brands',       'לוגואים של מכוניות',        'Car Brand Logos',         'זהה לוגואים של מותגי מכוניות!',                     '🚗', 'knowledge',       7, 14),
('virtual-reality',  'מציאות מדומה',             'Virtual Reality',         'גלה עולמות חדשים במציאות מדומה!',                   '🥽', 'knowledge',       6, 12),
-- Arts & culture (general)
('famous-paintings', 'ציורים מפורסמים',          'Famous Paintings',        'זהה ציורים מפורסמים מהיסטוריית האמנות!',            '🖼️', 'knowledge',       7, 14),
('magic-fairy-tales','אגדות וקסמים',            'Magic & Fairy Tales',     'היכנס לעולם הקסמים והאגדות!',                       '🧚', 'creative',        2, 8),
('fairy-tale-chars', 'דמויות מאגדות',            'Fairy Tale Characters',   'גלה דמויות קסומות מאגדות מרתקות!',                 '🧚', 'creative',        3, 9),
('circus-show',      'הקרקס והמופע',             'Circus Show',             'הצטרף למופע הקרקס המרהיב!',                         '🎪', 'creative',        2, 8),
('superheroes',      'גיבורי על',               'Superheroes',             'למד על כוחות סופר וגיבורים מדהימים!',               '🦸', 'creative',        3, 9),
-- General knowledge
('trivia',           'ידע כללי',                'General Knowledge',       'שאלות על טבע, מדע, חלל ועוד!',                     '🎯', 'knowledge',       6, 14),
('true-false',       'נכון או לא נכון',          'True or False',           'ענה נכון/לא נכון על עובדות מעניינות!',              '✅', 'knowledge',       5, 12),
('time-clock',       'זמן ושעות היום',            'Time & Clock',            'למד על זמן, שעות, ימים ועונות!',                    '⏰', 'educational',     4, 8),
('advanced-weather', 'מזג אוויר מתקדם',          'Advanced Weather',        'למד על תופעות מזג אוויר מיוחדות!',                  '⛈️', 'knowledge',       6, 12),
('advanced-colors',  'צבעים מתקדמים',            'Advanced Colors',         'גלה צבעים מיוחדים וערבובי צבעים!',                  '🌈', 'educational',     5, 10),
-- Arcade games
('tetris',           'טטריס לילדים',             'Kids Tetris',             'המשחק הכי כיפי בעולם!',                             '🟦', 'arcade',          5, 12),
('flappy-bird',      'ציפור מעופפת',             'Flappy Bird',             'עזור לציפור לעבור בין הצינורות!',                   '🐦', 'arcade',          4, 12),
('snake',            'נחש',                     'Snake',                   'אסוף פירות וגדל — אל תפגע בקירות!',                '🐍', 'arcade',          5, 14),
('dino-runner',      'דינוזאור קופץ',             'Dino Runner',             'קפוץ מעל המכשולים והגע רחוק!',                      '🦖', 'arcade',          4, 12),
('catch-fruit',      'תפוס פירות',              'Catch Fruit',             'הזז את הסל ותפוס פירות!',                           '🧺', 'arcade',          3, 10),
('space-defender',   'מגן החלל',                'Space Defender',          'ירה באסטרואידים והגן על כדור הארץ!',                '🚀', 'arcade',          5, 14),
('whack-a-mole',     'חבט על החפרפרת',           'Whack-a-Mole',            'חבט על החפרפרות לפני שהן נעלמות!',                  '🔨', 'arcade',          3, 10),
('brick-breaker',    'שובר לבנים',              'Brick Breaker',           'שבר את כל הלבנים עם הכדור!',                        '🧱', 'arcade',          5, 14),
('balloon-pop',      'פוצץ בלונים',             'Balloon Pop',             'פוצץ בלונים לפני שהם בורחים!',                      '🎈', 'arcade',          2, 10),
('pong',             'פונג',                    'Pong',                    'שחק פונג קלאסי מול המחשב!',                         '🏓', 'arcade',          5, 14),
('meteor-dodge',     'התחמק ממטאורים',           'Meteor Dodge',            'התחמק ממטאורים נופלים — אסוף כוכבים!',              '☄️', 'arcade',          5, 14),
('frogger',          'צפרדע חוצה',              'Frogger',                 'עזור לצפרדע לחצות את הכביש!',                       '🐸', 'arcade',          4, 12),
('stack',            'ערם לבנים',               'Stack',                   'הפל לבנים בזמן הנכון ובנה מגדל גבוה!',              '🏗️', 'arcade',          4, 12),
('color-tap',        'צבע נכון',                'Color Tap',               'לחץ על הצבע הנכון לפני שהזמן יגמר!',                '🎨', 'arcade',          3, 10),
('jumper',           'קפצן',                    'Jumper',                  'קפץ על הפלטפורמות וטפס גבוה ככל האפשר!',            '🦘', 'arcade',          4, 12),
('reflex',           'מהירות תגובה',             'Reflex',                  'לחץ על הסמלים לפני שהם נעלמים!',                   '⚡', 'arcade',          4, 12),
-- Board games
('simon',            'שיימון אומר',              'Simon Says',              'זכור את סדר הצבעים וחזור עליהם!',                  '🔴', 'board',           4, 12),
('taki',             'טאקי',                    'Taki',                    'משחק הקלפים הישראלי הקלאסי!',                       '🃏', 'board',           5, 14),
('checkers',         'דמקה',                    'Checkers',                'משחק הדמקה הקלאסי — קפוץ מעל האסימונים!',           '♟️', 'board',           5, 14),
('chess',            'שחמט',                    'Chess',                   'שחמט קלאסי נגד המחשב!',                             '♚',  'board',           7, 99),
('shesh-besh',       'שש-בש',                   'Backgammon',              'משחק השש-בש הקלאסי!',                               '🎲', 'board',           7, 99)
ON CONFLICT (name) DO UPDATE SET
  display_name_hebrew = EXCLUDED.display_name_hebrew,
  display_name_english = EXCLUDED.display_name_english,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  min_age = EXCLUDED.min_age,
  max_age = EXCLUDED.max_age;

-- Create update trigger for game_items
CREATE OR REPLACE TRIGGER update_game_items_updated_at BEFORE UPDATE ON public.game_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create update trigger for game_types
CREATE OR REPLACE TRIGGER update_game_types_updated_at BEFORE UPDATE ON public.game_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
