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

-- Insert Game Types
INSERT INTO public.game_types (name, display_name_hebrew, display_name_english, description, icon, category, min_age, max_age) VALUES
('colors', 'צבעים', 'Colors', 'למידת צבעים בסיסיים', '🎨', 'basic', 2, 5),
('shapes', 'צורות', 'Shapes', 'זיהוי צורות גיאומטריות', '🔷', 'basic', 2, 5),
('numbers', 'מספרים', 'Numbers', 'ספירה ומספרים 0-9', '🔢', 'educational', 3, 5),
('letters', 'אותיות', 'Hebrew Letters', 'אותיות האלפבית העברי', '🔤', 'educational', 3, 5),
('animals', 'חיות', 'Animals', 'הכרת חיות ובעלי חיים', '🐶', 'basic', 2, 5),
('fruits', 'פירות', 'Fruits', 'הכרת פירות שונים', '🍎', 'basic', 2, 5),
('vegetables', 'ירקות', 'Vegetables', 'הכרת ירקות שונים', '🥕', 'basic', 2, 5),
('memory', 'זיכרון', 'Memory Game', 'משחק זיכרון עם קלפים', '🧠', 'memory', 3, 5),
('puzzles', 'פאזלים', 'Puzzles', 'פתרון פאזלים', '🧩', 'creative', 3, 5),
('building', 'בנייה', 'Building', 'בנייה יצירתית', '🏗️', 'creative', 2, 5),
('drawing', 'ציור', 'Drawing', 'ציור חופשי', '✏️', 'creative', 2, 5),
('counting', 'ספירה', 'Counting', 'ספירה ומתמטיקה בסיסית', '🔢', 'educational', 3, 5),
('math', 'מתמטיקה', 'Math', 'חישובים פשוטים', '➕', 'educational', 4, 5),
('bubbles', 'בועות', 'Bubbles', 'משחק בועות צבעוניות', '🫧', 'basic', 2, 4),
('tetris', 'טטריס', 'Tetris', 'משחק טטריס מותאם לילדים', '🎯', 'creative', 4, 5),
('tzedakah', 'צדקה', 'Tzedakah', 'למידה על נתינה וצדקה', '💝', 'educational', 3, 5);

-- Create update trigger for game_items
CREATE OR REPLACE TRIGGER update_game_items_updated_at BEFORE UPDATE ON public.game_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create update trigger for game_types
CREATE OR REPLACE TRIGGER update_game_types_updated_at BEFORE UPDATE ON public.game_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
