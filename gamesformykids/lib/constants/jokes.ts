export type JokeCategory = 'animals' | 'school' | 'food';

export interface Joke {
  id: number;
  category: JokeCategory;
  setup: string;
  punchline: string;
  emoji: string;
}

export const JOKES: Joke[] = [
  // Animals — בעלי חיים
  { id: 1,  category: 'animals', emoji: '🐟', setup: 'לָמָּה הַדָּג לֹא הָלַךְ לְבֵית סֵפֶר?',            punchline: 'כִּי הוּא כְּבָר יָם חָכָם! 😂' },
  { id: 2,  category: 'animals', emoji: '🐘', setup: 'לָמָּה לַפִּיל לֹא יָכוֹל לְהִסְתַּתֵּר?',            punchline: 'כִּי הוּא תָּמִיד בּוֹלֵט! 😄' },
  { id: 3,  category: 'animals', emoji: '🐸', setup: 'מָה אוֹמֵר הַצְּפַרְדֵּעַ לַחֲבֵרוֹ?',               punchline: 'קַרְקַר לִי, יְדִידִי! 🐸' },
  { id: 4,  category: 'animals', emoji: '🐶', setup: 'אֵיךְ הַכֶּלֶב אוֹמֵר שָׁלוֹם?',                punchline: 'הַב הַב הַב — שָׁלוֹם רָב! 🐾' },
  { id: 5,  category: 'animals', emoji: '🐱', setup: 'לָמָּה הֶחָתוּל יָשַׁב עַל הַמַּחְשֵׁב?',             punchline: 'כִּי הוּא רָצָה לִשְׁמֹר עַל הָעַכְבָּר! 😹' },
  { id: 6,  category: 'animals', emoji: '🐧', setup: 'מָה הַפִּינְגְּוִין עָשָׂה בְּחוֹף הַיָּם?',          punchline: 'הוּא הִצְטַנֵּן — כְּמוֹ תָּמִיד! ❄️' },
  { id: 7,  category: 'animals', emoji: '🐄', setup: 'לָמָּה הַפָּרָה עָבְרָה אֶת הַכְּבִישׁ?',             punchline: 'כִּי הָיָה שָׁם עֵשֶׂב יָרֹק יוֹתֵר! 🌿' },
  { id: 8,  category: 'animals', emoji: '🦁', setup: 'מָה אוֹמֵר הָאַרְיֵה כְּשֶׁנִּפְגָּשׁ עִם חֲמִשָּׁה אֲחֵרִים?', punchline: 'מָה הַהִזְדַּמְּנוּת! 🦁' },
  { id: 9,  category: 'animals', emoji: '🐰', setup: 'מָה אוֹכְלוֹת אַרְנָבוֹת מְרֻקָּסוֹת?',           punchline: 'גֶּזֶר בְּשַׁמְפַּנְיָה! 🥕' },
  { id: 10, category: 'animals', emoji: '🐍', setup: 'לָמָּה הַנָּחָשׁ קִבֵּל צִיּוּן גָּרוּעַ?',            punchline: 'כִּי לֹא הִצְלִיחַ לְהַחְזִיק עֵט! 😂' },
  { id: 11, category: 'animals', emoji: '🦊', setup: 'מָה עוֹשֶׂה שׁוּעָל שֶׁמַּרְגִּישׁ עָצוּב?',           punchline: 'בּוֹכֶה כְּמוֹ גּוּר! 🦊' },
  { id: 12, category: 'animals', emoji: '🐻', setup: 'לָמָּה הַדֹּב לֹא שָׁמַע אֶת הַשָּׁעוֹן?',            punchline: 'כִּי הוּא יָשֵׁן כָּל הַחֹרֶף! 😴' },
  { id: 13, category: 'animals', emoji: '🦒', setup: 'לָמָּה הַג׳ִּירָף לֹא עָבַר בַּדֶּלֶת?',             punchline: 'כִּי הוּא גָּבֹהַּ עַל עַצְמוֹ! 😄' },
  { id: 14, category: 'animals', emoji: '🐊', setup: 'מָה אָמַר הַתַּנִּין לַחֲבֶרְתּוֹ?',               punchline: 'אַתְּ לֹא נִתְפֶּסֶת! 🐊' },
  { id: 15, category: 'animals', emoji: '🦜', setup: 'לָמָּה הַתֻּכִּי לֹא שָׁתַק?',                  punchline: 'כִּי הוּא אוֹהֵב לַחֲזֹר עַל עַצְמוֹ! 🦜' },
  { id: 16, category: 'animals', emoji: '🐙', setup: 'כַּמָּה יָדַיִם לַתַּמְנוּן?',                  punchline: 'שְׁמוֹנֶה — וּבְכֻלָּן הוּא מְחַבֵּק! 🤗' },
  { id: 17, category: 'animals', emoji: '🦋', setup: 'מָה אָמְרָה הַפַּרְפֶּרֶת לַפֶּרַח?',               punchline: 'אֲנִי חַיֶּבֶת לָעוּף! יֵשׁ לִי פַּרְפָּרִים בַּבֶּטֶן! 🌸' },
  { id: 18, category: 'animals', emoji: '🐿️', setup: 'לָמָּה הַסְּנַאי קָפַץ מֵעֵץ לְעֵץ?',             punchline: 'כִּי הָאוֹטוֹבּוּס לֹא עָבַר! 🚌' },

  // School — בית ספר
  { id: 19, category: 'school', emoji: '📚', setup: 'לָמָּה הַסֵּפֶר בִּקֵּשׁ הַפְסָקָה?',                punchline: 'כִּי הָיוּ בּוֹ יוֹתֵר מִדַּי פְּרָקִים! 😄' },
  { id: 20, category: 'school', emoji: '✏️', setup: 'מָה אָמַר הָעִפָּרוֹן לַדַּף?',                 punchline: 'כְּבָר צִיַּרְתִּי עָלֶיךָ! ✏️' },
  { id: 21, category: 'school', emoji: '🎒', setup: 'לָמָּה הַתִּיק לֹא הִצְלִיחַ לָרוּץ?',             punchline: 'כִּי הָיָה עָמוּס בְּשִׁעוּרֵי בַּיִת! 🎒' },
  { id: 22, category: 'school', emoji: '📐', setup: 'לָמָּה הַמַּחְשְׁבוֹן עָצוּב?',                   punchline: 'כִּי הוּא סַךְ הַכֹּל בָּעִנְיָן! 🔢' },
  { id: 23, category: 'school', emoji: '🍎', setup: 'מָה עָשָׂה הַתַּלְמִיד עִם תַּפּוּחַ הַמּוֹרָה?',       punchline: 'אָכַל אוֹתוֹ וְאָמַר: זֶה הָיָה חִנּוּכִי! 😂' },
  { id: 24, category: 'school', emoji: '🖊️', setup: 'לָמָּה הָעֵט לֹא יָכוֹל לִשְׁמֹר סוֹד?',         punchline: 'כִּי הוּא תָּמִיד מוֹצִיא לָאוֹר! 📝' },
  { id: 25, category: 'school', emoji: '📏', setup: 'מָה אָמְרָה הַסַּרְגֵּל לָעִפָּרוֹן?',             punchline: 'אַתָּה מְאוֹד יָשָׁר! 📏' },
  { id: 26, category: 'school', emoji: '🔬', setup: 'לָמָּה הַמִּיקְרוֹסְקוֹפ פָּחַד?',                punchline: 'כִּי רָאָה דְּבָרִים גְּדוֹלִים יוֹתֵר מִדַּי! 😨' },
  { id: 27, category: 'school', emoji: '🎓', setup: 'מָה הַהֶבְדֵּל בֵּין מוֹרָה לְרַכֶּבֶת?',            punchline: 'הַמּוֹרָה אוֹמֵר: תּוֹצִיאוּ גּוּמִי! הָרַכֶּבֶת אוֹמֶרֶת: תִּשְׁמְרוּ עַל הַפַּסִּים! 🚂' },
  { id: 28, category: 'school', emoji: '📓', setup: 'לָמָּה הַמַּחְבֶּרֶת בָּכְתָה?',                    punchline: 'כִּי הָיוּ בָּהּ הַרְבֵּה שְׁגִיאוֹת! 😢' },
  { id: 29, category: 'school', emoji: '🎨', setup: 'מָה אָמַר הַצֶּבַע הָאָדֹם לַצֶּבַע הַכָּחֹל?',      punchline: 'אֲנִי צוֹבֵעַ מִמְּךָ! 🎨' },
  { id: 30, category: 'school', emoji: '📊', setup: 'לָמָּה הַגְּרָף עָלָה לְמַעְלָה?',                punchline: 'כִּי הוּא רָצָה לְהַגִּיעַ לַפִּסְגָּה! 📈' },
  { id: 31, category: 'school', emoji: '🔭', setup: 'מָה רָאָה הַיֶּלֶד בַּטֶּלֶסְקוֹפּ?',               punchline: 'כּוֹכָבִים — וְעוֹד שִׁעוּרֵי בַּיִת! 😩' },
  { id: 32, category: 'school', emoji: '🖥️', setup: 'לָמָּה הַמַּחְשֵׁב לָבַשׁ מְעִיל?',               punchline: 'כִּי הַחַלּוֹנוֹת שֶׁלּוֹ פְּתוּחִים! 🌬️' },
  { id: 33, category: 'school', emoji: '📌', setup: 'מָה אָמַר הַסִּכָּה לַלּוּחַ?',                 punchline: 'דָּבַקְתִּי בְּךָ! 📌' },

  // Food — אוכל
  { id: 34, category: 'food', emoji: '🍕', setup: 'לָמָּה הַפִּיצָה לֹא הִצְטַחְקָה?',                punchline: 'כִּי הִיא הָיְתָה עֲגֻלָּה מְאֹד! 🍕' },
  { id: 35, category: 'food', emoji: '🍌', setup: 'מָה אָמְרָה הַבָּנָנָה לַתַּפּוּחַ?',                punchline: 'הֵי, אַתָּה מְאוֹד אָדֹם הַיּוֹם! 🍎' },
  { id: 36, category: 'food', emoji: '🥕', setup: 'לָמָּה הַגֶּזֶר עָצוּב?',                      punchline: 'כִּי כֻּלָּם רוֹצִים לִנְגֹּס בּוֹ! 😄' },
  { id: 37, category: 'food', emoji: '🥚', setup: 'מָה אָמְרָה הַבֵּיצָה לַמַּחְבַת?',                punchline: 'אַתָּה מְחַמֵּם אֶת לִבִּי! 🍳' },
  { id: 38, category: 'food', emoji: '🍦', setup: 'לָמָּה הַגְּלִידָה בָּכְתָה?',                    punchline: 'כִּי הַיֶּלֶד לָקַח מִמֶּנָּה כַּדּוּר! 🍦' },
  { id: 39, category: 'food', emoji: '🥪', setup: 'מָה אָמַר הַכָּרִיךְ לֶחָלָב?',                 punchline: 'אַתָּה מַלְבִּין אֶת שְׁמִי! 🥛' },
  { id: 40, category: 'food', emoji: '🍫', setup: 'לָמָּה הַשּׁוֹקוֹלָד כָּל כָּךְ פּוֹפּוּלָרִי?',           punchline: 'כִּי כֻּלָּם נִמְסִים מִמֶּנּוּ! 😍' },
  { id: 41, category: 'food', emoji: '🍇', setup: 'מָה אָמַר הָעֵנָב לַחֲבֵרוֹ?',                  punchline: 'אֲנִי כָּזֶה מְרֻסָּק הַיּוֹם! 🍷' },
  { id: 42, category: 'food', emoji: '🥜', setup: 'לָמָּה הַבּוֹטֶן הִתְגַּלְגֵּל בָּרְחוֹב?',             punchline: 'כִּי הוּא נִסָּה לִבְרֹחַ מֵחֶמְאַת הַבּוֹטְנִים! 😂' },
  { id: 43, category: 'food', emoji: '🍰', setup: 'מָה אָמְרָה הָעוּגָה לַנֵּרוֹת?',               punchline: 'תַּפְסִיקוּ לְהַצִּית אוֹתִי! 🎂' },
  { id: 44, category: 'food', emoji: '🥦', setup: 'לָמָּה הַבְּרוֹקוֹלִי לֹא רָצָה לְהֵאָכֵל?',        punchline: 'כִּי הוּא לֹא רָצָה לִהְיוֹת יָרֹק מִכַּעַס! 🥦' },
  { id: 45, category: 'food', emoji: '🍓', setup: 'מָה אָמְרָה הַתּוּת לָאֹכֶל שֶׁלָּהּ?',            punchline: 'אַתָּה מְאוֹד מָתוֹק אִתִּי! 💕' },
  { id: 46, category: 'food', emoji: '🧀', setup: 'מָה אָמַר הַגְּבִינָה לַחֲבֶרְתָּהּ?',              punchline: 'עָבַרְתְּ צֶ׳דָר? 🧀' },
  { id: 47, category: 'food', emoji: '🥞', setup: 'לָמָּה הַפַּנְקֵייק שָׂמֵחַ?',                   punchline: 'כִּי מָרְחוּ עָלָיו דְּבַשׁ! 🍯' },
  { id: 48, category: 'food', emoji: '🥑', setup: 'מָה אָמַר הָאָבוֹקָדוֹ לַחֲבֵרוֹ?',              punchline: 'אֲנַחְנוּ גוּאָקִים יַחַד! 🥑' },
  { id: 49, category: 'food', emoji: '🍩', setup: 'לָמָּה הַסֻּפְגָּנִיָּה הָלְכָה לָרוֹפֵא?',           punchline: 'כִּי הָיָה לָהּ חוֹר בָּאֶמְצַע! 😂' },
  { id: 50, category: 'food', emoji: '🌽', setup: 'מָה אָמְרָה הַתִּירָס לַחֲבֶרְתָּהּ?',              punchline: 'אֲנִי כָּזֶה גַּרְעִין! 🌽' },

  // Extra mix — שונות
  { id: 51, category: 'animals', emoji: '🦓', setup: 'מָה הַהֶבְדֵּל בֵּין זֶבְּרָה לַפְּסַנְתֵּר?',          punchline: 'הַפְּסַנְתֵּר יֵשׁ לוֹ שָׁחוֹר-לָבָן, הַזֶּבְּרָה — לָבָן-שָׁחוֹר! 🎹' },
  { id: 52, category: 'school',  emoji: '🔢', setup: 'לָמָּה הַסִּפְרָה 6 פָּחֲדָה מ-7?',              punchline: 'כִּי שֶׁבַע אָכְלָה שְׁמוֹנֶה תֵּשַׁע! 😱' },
  { id: 53, category: 'food',    emoji: '🍜', setup: 'מָה אָמְרָה הַסְּפָּגֶטִי לָרֹטֶב?',             punchline: 'אַתָּה מִתְפַּלֵּשׁ עָלַי! 🍝' },
  { id: 54, category: 'animals', emoji: '🐌', setup: 'לָמָּה הַחִלָּזוֹן עָצוּב?',                  punchline: 'כִּי הוּא תָּמִיד מַרְגִּישׁ שֶׁהוּא נוֹשֵׂא הַכֹּל! 🐌' },
  { id: 55, category: 'school',  emoji: '🔋', setup: 'מָה אָמְרָה הַסּוֹלֵלָה לַיֶּלֶד?',              punchline: 'תִּהְיֶה מָלֵא! ⚡' },
  { id: 56, category: 'animals', emoji: '🦈', setup: 'מָה הַכָּרִישׁ אוֹכֵל בַּצָּהֳרַיִם?',             punchline: 'סִיט! 😂' },
  { id: 57, category: 'food',    emoji: '🫐', setup: 'מָה אָמְרָה הָאֻכְמָנִית לַחֲבֶרְתָּהּ?',          punchline: 'אֲנַחְנוּ מַמָּשׁ כְּחֻלּוֹת מֵהַצְּחוֹק! 💙' },
  { id: 58, category: 'school',  emoji: '🌍', setup: 'לָמָּה כַּדּוּר הָאָרֶץ לֹא לוֹמֵד הִיסְטוֹרְיָה?',    punchline: 'כִּי הוּא יוֹדֵעַ שֶׁהוּא נָסוֹב סְבִיבָהּ! 🌀' },
  { id: 59, category: 'animals', emoji: '🐝', setup: 'מָה אָמְרָה הַדְּבוֹרָה לַחָבֵר שֶׁלָּהּ?',           punchline: 'עֵז, עֵז, זוּזּ! 🍯' },
  { id: 60, category: 'food',    emoji: '🥐', setup: 'מָה אָמַר הַקְּרוּאָסוֹן לְכוֹס הַקָּפֶה?',        punchline: 'אֲנַחְנוּ פָּרִיז-פֶּקְטִיִּים יַחַד! ☕' },
  { id: 61, category: 'school',  emoji: '🎵', setup: 'לָמָּה הַגִּיטָרָה קִבְּלָה צִיּוּן מֻשְׁלָם?',       punchline: 'כִּי הִיא נִגְּנָה בְּכָל הַמֵּיתָרִים! 🎸' },
  { id: 62, category: 'animals', emoji: '🦩', setup: 'לָמָּה הַפְלָמִינְגּוֹ עוֹמֵד עַל רֶגֶל אַחַת?',      punchline: 'כִּי אִם יָרִים אֶת הַשְּׁנִיָּה הוּא יִפֹּל! 😂' },
  { id: 63, category: 'food',    emoji: '🍋', setup: 'מָה אָמַר הַלִּימוֹן שֶׁשָּׁתוּ אוֹתוֹ?',           punchline: 'זֶה כְּבָר לֹא חָמוּץ — זֶה מַר! 😬' },
  { id: 64, category: 'school',  emoji: '🕐', setup: 'מָה אָמְרָה הַשָּׁעָה שְׁתַּיִם לַשָּׁעָה שְׁתֵּים עֶשְׂרֵה?', punchline: 'כַּמָּה זְמַן עָבַר מֵאָז שֶׁהִתְרָאִינוּ! ⏰' },
  { id: 65, category: 'animals', emoji: '🐴', setup: 'מָה אָמַר הַסּוּס לֶחָצִיר?',               punchline: 'תֹּאכַל אוֹתִי! אֲנִי כְּבָר ה-יִ! 🌾' },
  { id: 66, category: 'food',    emoji: '🍪', setup: 'לָמָּה הָעוּגִיָּה הָלְכָה לָרוֹפֵא?',            punchline: 'כִּי הִיא הִרְגִּישָׁה עוּגְמָה! 😅' },
  { id: 67, category: 'animals', emoji: '🦔', setup: 'מָה אָמַר הַקִּפּוֹד לָרוּחַ?',               punchline: 'תַּפְסִיק לִנְשֹׁף — אֲנִי כְּבָר מְסוּקְסָקְס! 😤' },
  { id: 68, category: 'school',  emoji: '🌡️', setup: 'לָמָּה מַד הַחֹם עָצוּב?',                 punchline: 'כִּי כֻּלָּם מַרְגִּישִׁים גָּבוֹהַּ מִמֶּנּוּ! 🤒' },
  { id: 69, category: 'food',    emoji: '🧁', setup: 'מָה אָמְרָה הַקַּפְקֵייק לַנֵּר?',             punchline: 'תִּכְבֶּה! אֲנִי כְּבָר שָׂרוּף מֵהַשִּׂמְחָה! 🎉' },
  { id: 70, category: 'animals', emoji: '🦚', setup: 'לָמָּה הַטַּוָּס גֵּאֶה מְאֹד?',               punchline: 'כִּי כֻּלָּם מִסְתַּכְּלִים בַּזָּנָב שֶׁלּוֹ! 🌈' },
  { id: 71, category: 'school',  emoji: '📡', setup: 'לָמָּה הָאַנְטֶנָה קִבְּלָה צִיּוּן גָּבוֹהַּ?',        punchline: 'כִּי הִיא קָלְטָה הַכֹּל! 📶' },
  { id: 72, category: 'food',    emoji: '🥝', setup: 'מָה אָמַר הַקִּיוִוי לָאֲנָשִׁים שֶׁפָּחֲדוּ מִמֶּנּוּ?',   punchline: 'אַל תִּשְׁפְּטוּ סֵפֶר לְפִי הַכְּרִיכָה! 🍃' },
  { id: 73, category: 'animals', emoji: '🦭', setup: 'מָה אָכַל הָאוֹטֶם לַאֲרוּחַת עֶרֶב?',           punchline: 'דָּגִים — כַּמָּה הַפְתָּעָה! 🐟' },
  { id: 74, category: 'school',  emoji: '🏫', setup: 'לָמָּה בֵּית הַסֵּפֶר פָּתַח חַלּוֹן?',             punchline: 'כִּי הַכִּתָּה הָיְתָה מְלֵאָה תַּלְמִידִים! 😆' },
  { id: 75, category: 'food',    emoji: '🧇', setup: 'מָה אָמְרָה הַוַּפְל לַסִּירוֹפּ?',              punchline: 'תַּפְסִיק לִטְבֹּעַ בִּי! 🍁' },
  { id: 76, category: 'animals', emoji: '🐓', setup: 'לָמָּה הַתַּרְנְגוֹל קָם בְּחָמֵשׁ בַּבֹּקֶר?',          punchline: 'כִּי לֹא הָיָה לוֹ שָׁעוֹן מְעוֹרֵר! ⏰' },
  { id: 77, category: 'school',  emoji: '✂️', setup: 'מָה אָמְרָה הַמִּסְפָּרַיִם לַדַּף?',              punchline: 'אֲנִי חוֹתֶכֶת לְךָ! ✂️' },
  { id: 78, category: 'food',    emoji: '🫕', setup: 'מָה אָמְרָה הַמָּרָק לַצַּלַּחַת?',               punchline: 'אַתָּה חַם בִּשְׁבִילִי! 🍲' },
  { id: 79, category: 'animals', emoji: '🦦', setup: 'מָה עוֹשָׂה לוֹטְרָה שֶׁמְּשַׁעֲמֶמֶת לָהּ?',          punchline: 'מְרִימָה כַּפּוֹת וְאוֹמֶרֶת: מָה חָדָשׁ? 🐾' },
  { id: 80, category: 'school',  emoji: '🔦', setup: 'לָמָּה הַפָּנָס הֵבִיא מִטְרִיָּה לְבֵית סֵפֶר?',      punchline: 'כִּי שָׁמַע שֶׁיִּהְיֶה מִבְחָן בְּ״אוֹר״! ☔' },
];

export const JOKE_CATEGORY_LABELS: Record<JokeCategory, string> = {
  animals: '🐾 בעלי חיים',
  school:  '📚 בית ספר',
  food:    '🍕 אוכל',
};

export const JOKE_CATEGORY_COLORS: Record<JokeCategory, string> = {
  animals: 'from-green-400 to-emerald-500',
  school:  'from-blue-400 to-indigo-500',
  food:    'from-orange-400 to-amber-500',
};
