-- ===============================================
-- Complete Game Data Migration to Database
-- This file contains ALL game data from constants files
-- ===============================================

-- First, let's clear existing data for fresh migration
TRUNCATE public.game_items RESTART IDENTITY CASCADE;
TRUNCATE public.game_types RESTART IDENTITY CASCADE;

-- ===============================================
-- BASIC GAME DATA - Colors, Letters, Numbers, Shapes
-- ===============================================

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
('bet', 'ב', 'B', 'ב', 'letters', '', ARRAY[494, 588, 740]),
('gimel', 'ג', 'G', 'ג', 'letters', '', ARRAY[523, 659, 784]),
('dalet', 'ד', 'D', 'ד', 'letters', '', ARRAY[587, 740, 880]),
('hey', 'ה', 'H', 'ה', 'letters', '', ARRAY[659, 831, 988]),
('vav', 'ו', 'V', 'ו', 'letters', '', ARRAY[392, 494, 622]),
('zayin', 'ז', 'Z', 'ז', 'letters', '', ARRAY[349, 440, 523]),
('het', 'ח', 'CH', 'ח', 'letters', '', ARRAY[330, 415, 494]),
('tet', 'ט', 'T', 'ט', 'letters', '', ARRAY[294, 370, 440]),
('yud', 'י', 'Y', 'י', 'letters', '', ARRAY[277, 349, 415]),
('kaf', 'כ', 'K', 'כ', 'letters', '', ARRAY[262, 330, 392]),
('lamed', 'ל', 'L', 'ל', 'letters', '', ARRAY[247, 311, 370]),
('mem', 'מ', 'M', 'מ', 'letters', '', ARRAY[233, 294, 349]),
('nun', 'נ', 'N', 'נ', 'letters', '', ARRAY[220, 277, 330]),
('samech', 'ס', 'S', 'ס', 'letters', '', ARRAY[208, 262, 311]),
('ayin', 'ע', 'A', 'ע', 'letters', '', ARRAY[196, 247, 294]),
('pey', 'פ', 'P', 'פ', 'letters', '', ARRAY[185, 233, 277]),
('tzadi', 'צ', 'TZ', 'צ', 'letters', '', ARRAY[175, 220, 262]),
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

-- ===============================================
-- NATURE DATA - Fruits, Vegetables, Animals
-- ===============================================

-- Insert Fruits
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('apple', 'תפוח', 'Apple', '🍎', 'fruits', 'bg-red-500', ARRAY[440, 550, 660]),
('banana', 'בננה', 'Banana', '🍌', 'fruits', 'bg-yellow-500', ARRAY[392, 494, 587]),
('orange_fruit', 'תפוז', 'Orange', '🍊', 'fruits', 'bg-orange-500', ARRAY[330, 415, 494]),
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

-- Insert Smell/Taste items
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('sweet', 'מתוק', 'Sweet', '🍯', 'smells_tastes', 'bg-yellow-400', ARRAY[523, 659, 784]),
('sour', 'חמוץ', 'Sour', '🍋', 'smells_tastes', 'bg-yellow-500', ARRAY[659, 831, 988]),
('salty', 'מלוח', 'Salty', '🧂', 'smells_tastes', 'bg-gray-400', ARRAY[440, 554, 659]),
('bitter', 'מר', 'Bitter', '☕', 'smells_tastes', 'bg-amber-800', ARRAY[330, 415, 494]),
('spicy', 'חריף', 'Spicy', '🌶️', 'smells_tastes', 'bg-red-500', ARRAY[392, 494, 587]),
('mint', 'נענע', 'Mint', '🌿', 'smells_tastes', 'bg-green-400', ARRAY[587, 740, 880]);

-- ===============================================
-- WORLD DATA - Transport, Tools, Space, Weather
-- ===============================================

-- Insert Transport/Vehicles
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('car', 'מכונית', 'Car', '🚗', 'transport', 'bg-red-500', ARRAY[440, 550, 660]),
('bus', 'אוטובוס', 'Bus', '🚌', 'transport', 'bg-orange-500', ARRAY[392, 494, 587]),
('train', 'רכבת', 'Train', '🚂', 'transport', 'bg-green-500', ARRAY[349, 440, 523]),
('airplane', 'מטוס', 'Airplane', '✈️', 'transport', 'bg-blue-500', ARRAY[523, 659, 784]),
('ship', 'ספינה', 'Ship', '🚢', 'transport', 'bg-cyan-500', ARRAY[294, 370, 440]),
('bicycle', 'אופניים', 'Bicycle', '🚲', 'transport', 'bg-green-400', ARRAY[330, 415, 494]),
('motorcycle', 'אופנוע', 'Motorcycle', '🏍️', 'transport', 'bg-black', ARRAY[587, 698, 784]),
('truck', 'משאית', 'Truck', '🚚', 'transport', 'bg-gray-600', ARRAY[196, 247, 294]),
('helicopter', 'מסוק', 'Helicopter', '🚁', 'transport', 'bg-purple-500', ARRAY[659, 831, 988]),
('taxi', 'מונית', 'Taxi', '🚕', 'transport', 'bg-yellow-500', ARRAY[277, 349, 415]);

-- Insert Tools
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('hammer', 'פטיש', 'Hammer', '🔨', 'tools', 'bg-gray-600', ARRAY[440, 550, 660]),
('screwdriver', 'מברג', 'Screwdriver', '🪛', 'tools', 'bg-blue-500', ARRAY[392, 494, 587]),
('saw', 'מסור', 'Saw', '🪚', 'tools', 'bg-yellow-600', ARRAY[349, 440, 523]),
('scissors', 'מספריים', 'Scissors', '✂️', 'tools', 'bg-purple-500', ARRAY[294, 370, 440]);

-- Insert Space Objects
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('sun', 'שמש', 'Sun', '☀️', 'space', 'bg-yellow-500', ARRAY[523, 659, 784]),
('moon', 'ירח', 'Moon', '🌙', 'space', 'bg-gray-300', ARRAY[392, 494, 587]),
('star_space', 'כוכב', 'Star', '⭐', 'space', 'bg-yellow-400', ARRAY[659, 831, 988]),
('earth', 'כדור הארץ', 'Earth', '🌍', 'space', 'bg-blue-500', ARRAY[349, 440, 523]),
('rocket', 'חללית', 'Rocket', '🚀', 'space', 'bg-red-500', ARRAY[440, 554, 659]),
('planet', 'כוכב לכת', 'Planet', '🪐', 'space', 'bg-purple-500', ARRAY[330, 415, 494]);

-- Insert Weather
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('sunny', 'שמש', 'Sunny', '☀️', 'weather', 'bg-yellow-500', ARRAY[392, 494, 587]),
('rainy', 'גשום', 'Rainy', '🌧️', 'weather', 'bg-blue-500', ARRAY[523, 659, 784]),
('cloudy', 'מעונן', 'Cloudy', '☁️', 'weather', 'bg-gray-500', ARRAY[294, 370, 440]),
('snowy', 'שלג', 'Snowy', '❄️', 'weather', 'bg-cyan-500', ARRAY[659, 831, 988]),
('stormy', 'סערה', 'Stormy', '⛈️', 'weather', 'bg-purple-600', ARRAY[196, 247, 294]),
('windy', 'רוח', 'Windy', '💨', 'weather', 'bg-teal-500', ARRAY[349, 440, 523]),
('partly_cloudy', 'חלקית מעונן', 'Partly Cloudy', '⛅', 'weather', 'bg-orange-400', ARRAY[330, 415, 494]),
('foggy', 'ערפילי', 'Foggy', '🌫️', 'weather', 'bg-gray-400', ARRAY[220, 277, 330]),
('hot', 'חם', 'Hot', '🔥', 'weather', 'bg-red-600', ARRAY[440, 550, 660]),
('cold', 'קר', 'Cold', '🧊', 'weather', 'bg-blue-300', ARRAY[262, 330, 392]);

-- ===============================================
-- LIFESTYLE DATA - House, Clothing, Instruments, Professions, Emotions
-- ===============================================

-- Insert House Items
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('chair', 'כיסא', 'Chair', '🪑', 'house', 'bg-brown-500', ARRAY[440, 550, 660]),
('table', 'שולחן', 'Table', '🏓', 'house', 'bg-amber-600', ARRAY[392, 494, 587]),
('bed', 'מיטה', 'Bed', '🛏️', 'house', 'bg-blue-500', ARRAY[349, 440, 523]),
('sofa', 'ספה', 'Sofa', '🛋️', 'house', 'bg-red-500', ARRAY[330, 415, 494]),
('lamp', 'מנורה', 'Lamp', '💡', 'house', 'bg-yellow-500', ARRAY[294, 370, 440]);

-- Insert Clothing
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('shirt', 'חולצה', 'Shirt', '👕', 'clothing', 'bg-blue-500', ARRAY[440, 550, 660]),
('pants', 'מכנסיים', 'Pants', '👖', 'clothing', 'bg-indigo-600', ARRAY[392, 494, 587]),
('dress', 'שמלה', 'Dress', '👗', 'clothing', 'bg-pink-500', ARRAY[523, 659, 784]),
('shoes', 'נעליים', 'Shoes', '👟', 'clothing', 'bg-gray-600', ARRAY[349, 440, 523]),
('hat', 'כובע', 'Hat', '🧢', 'clothing', 'bg-red-500', ARRAY[330, 415, 494]),
('jacket', 'מעיל', 'Jacket', '🧥', 'clothing', 'bg-brown-600', ARRAY[262, 330, 392]);

-- Insert Instruments
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('piano', 'פסנתר', 'Piano', '🎹', 'instruments', 'bg-black', ARRAY[523, 659, 784]),
('guitar', 'גיטרה', 'Guitar', '🎸', 'instruments', 'bg-amber-600', ARRAY[330, 415, 494]),
('violin', 'כינור', 'Violin', '🎻', 'instruments', 'bg-amber-800', ARRAY[440, 554, 659]),
('drums', 'תופים', 'Drums', '🥁', 'instruments', 'bg-red-600', ARRAY[196, 247, 294]),
('trumpet', 'חצוצרה', 'Trumpet', '🎺', 'instruments', 'bg-yellow-500', ARRAY[587, 740, 880]),
('flute', 'חליל', 'Flute', '🪈', 'instruments', 'bg-gray-400', ARRAY[659, 831, 988]);

-- Insert Professions
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies, additional_data) VALUES
('doctor', 'רופאה', 'Doctor', '👩‍⚕️', 'professions', 'bg-gradient-to-br from-blue-200 to-blue-300', ARRAY[523, 659, 784], '{"description": "מטפלת בחולים ועוזרת להם להרגיש טוב"}'),
('teacher', 'מורה', 'Teacher', '👩‍🏫', 'professions', 'bg-gradient-to-br from-green-200 to-green-300', ARRAY[440, 554, 659], '{"description": "מלמדת ילדים ועוזרת להם ללמוד"}'),
('firefighter', 'כבאית', 'Firefighter', '👩‍🚒', 'professions', 'bg-gradient-to-br from-red-200 to-red-300', ARRAY[330, 415, 523], '{"description": "מכבה שרפות ומצילה אנשים"}'),
('police', 'שוטרת', 'Police Officer', '👮‍♀️', 'professions', 'bg-gradient-to-br from-indigo-200 to-indigo-300', ARRAY[392, 494, 587], '{"description": "שומרת על הביטחון ועוזרת לאנשים"}'),
('chef', 'טבחית', 'Chef', '👩‍🍳', 'professions', 'bg-gradient-to-br from-orange-200 to-orange-300', ARRAY[349, 440, 523], '{"description": "מכינה אוכל טעים ובריא"}');

-- Insert Emotions
INSERT INTO public.game_items (name, hebrew, english, emoji, category, color_class, sound_frequencies) VALUES
('happy', 'שמח', 'Happy', '😊', 'emotions', 'bg-yellow-400', ARRAY[523, 659, 784]),
('sad', 'עצוב', 'Sad', '😢', 'emotions', 'bg-blue-400', ARRAY[294, 370, 440]),
('angry', 'כועס', 'Angry', '😠', 'emotions', 'bg-red-500', ARRAY[392, 494, 587]),
('surprised', 'מופתע', 'Surprised', '😲', 'emotions', 'bg-orange-400', ARRAY[440, 554, 659]),
('scared', 'מפוחד', 'Scared', '😨', 'emotions', 'bg-purple-400', ARRAY[349, 440, 523]),
('excited', 'נרגש', 'Excited', '🤩', 'emotions', 'bg-pink-400', ARRAY[587, 740, 880]);

-- ===============================================
-- COLORED SHAPES (combinations)
-- ===============================================

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

-- ===============================================
-- GAME TYPES
-- ===============================================

INSERT INTO public.game_types (name, display_name_hebrew, display_name_english, description, icon, category, min_age, max_age) VALUES
-- Basic Learning Games
('colors', 'צבעים', 'Colors', 'למידת צבעים בסיסיים', '🎨', 'basic', 2, 5),
('shapes', 'צורות', 'Shapes', 'זיהוי צורות גיאומטריות', '🔷', 'basic', 2, 5),
('colored-shapes', 'צורות צבעוניות', 'Colored Shapes', 'צורות עם צבעים שונים', '🌈', 'basic', 2, 5),
('numbers', 'מספרים', 'Numbers', 'ספירה ומספרים 0-9', '🔢', 'educational', 3, 5),
('letters', 'אותיות', 'Hebrew Letters', 'אותיות האלפבית העברי', '🔤', 'educational', 3, 5),
('hebrew-letters', 'כתיבה עברית', 'Hebrew Writing', 'תרגול כתיבת אותיות', '✍️', 'educational', 3, 5),

-- Nature & Food
('animals', 'חיות', 'Animals', 'הכרת חיות ובעלי חיים', '🐶', 'basic', 2, 5),
('fruits', 'פירות', 'Fruits', 'הכרת פירות שונים', '🍎', 'basic', 2, 5),
('vegetables', 'ירקות', 'Vegetables', 'הכרת ירקות שונים', '🥕', 'basic', 2, 5),

-- World & Science
('transport', 'תחבורה', 'Transportation', 'כלי תחבורה שונים', '🚗', 'basic', 2, 5),
('tools', 'כלי עבודה', 'Tools', 'כלי עבודה שונים', '🔨', 'basic', 3, 5),
('space', 'חלל', 'Space', 'גופי השמים והחלל', '🚀', 'educational', 3, 5),
('weather', 'מזג אוויר', 'Weather', 'מצבי מזג אוויר שונים', '☀️', 'basic', 2, 5),

-- Lifestyle & Society
('house', 'בית', 'House Items', 'חפצים בבית', '🏠', 'basic', 2, 5),
('clothing', 'בגדים', 'Clothing', 'פריטי לבוש שונים', '👕', 'basic', 2, 5),
('instruments', 'כלי נגינה', 'Instruments', 'כלי נגינה מוזיקליים', '🎵', 'creative', 3, 5),
('professions', 'מקצועות', 'Professions', 'מקצועות שונים', '👩‍⚕️', 'educational', 3, 5),
('emotions', 'רגשות', 'Emotions', 'רגשות שונים', '😊', 'educational', 3, 5),
('smelltaste', 'ריחות וטעמים', 'Smells & Tastes', 'ריחות וטעמים שונים', '👃', 'basic', 3, 5),

-- Game Types
('memory', 'זיכרון', 'Memory Game', 'משחק זיכרון עם קלפים', '🧠', 'memory', 3, 5),
('puzzles', 'פאזלים', 'Puzzles', 'פתרון פאזלים', '🧩', 'creative', 3, 5),
('building', 'בנייה', 'Building', 'בנייה יצירתית', '🏗️', 'creative', 2, 5),
('drawing', 'ציור', 'Drawing', 'ציור חופשי', '✏️', 'creative', 2, 5),
('counting', 'ספירה', 'Counting', 'ספירה ומתמטיקה בסיסית', '🔢', 'educational', 3, 5),
('math', 'מתמטיקה', 'Math', 'חישובים פשוטים', '➕', 'educational', 4, 5),
('bubbles', 'בועות', 'Bubbles', 'משחק בועות צבעוניות', '🫧', 'basic', 2, 4),
('tetris', 'טטריס', 'Tetris', 'משחק טטריס מותאם לילדים', '🎯', 'creative', 4, 5),
('tzedakah', 'צדקה', 'Tzedakah', 'למידה על נתינה וצדקה', '💝', 'educational', 3, 5);

-- Add success message
SELECT 'Complete migration successful! All game data has been moved to the database.' as status;
