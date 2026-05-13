import { ProfessionItem } from "@/lib/types/games";
import { DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const PROFESSION_CONSTANTS: Record<string, ProfessionItem> = {
  DOCTOR: { id: "doctor", emoji: "👩‍⚕️", name: "doctor", hebrew: "רופאה", english: "Doctor", description: "מטפלת בחולים ועוזרת להם להרגיש טוב", sound: [523, 659, 784], color: "bg-gradient-to-br from-blue-200 to-blue-300" },
  TEACHER: { id: "teacher", emoji: "👩‍🏫", name: "teacher", hebrew: "מורה", english: "Teacher", description: "מלמדת ילדים ועוזרת להם ללמוד", sound: [440, 554, 659], color: "bg-gradient-to-br from-green-200 to-green-300" },
  FIREFIGHTER: { id: "firefighter", emoji: "👩‍🚒", name: "firefighter", hebrew: "כבאית", english: "Firefighter", description: "מכבה שרפות ומצילה אנשים", sound: [330, 415, 523], color: "bg-gradient-to-br from-red-200 to-red-300" },
  POLICE: { id: "police", emoji: "👮‍♀️", name: "police", hebrew: "שוטרת", english: "Police Officer", description: "שומרת על הביטחון ועוזרת לאנשים", sound: [392, 494, 587], color: "bg-gradient-to-br from-indigo-200 to-indigo-300" },
  CHEF: { id: "chef", emoji: "👩‍🍳", name: "chef", hebrew: "טבחית", english: "Chef", description: "מכינה אוכל טעים במטבח", sound: [349, 440, 523], color: "bg-gradient-to-br from-orange-200 to-orange-300" },
  PILOT: { id: "pilot", emoji: "👩‍✈️", name: "pilot", hebrew: "טייסת", english: "Pilot", description: "מטיסה מטוסים בשמיים", sound: [587, 698, 784], color: "bg-gradient-to-br from-sky-200 to-sky-300" },
  ENGINEER: { id: "engineer", emoji: "👷‍♀️", name: "engineer", hebrew: "מהנדסת", english: "Engineer", description: "בונה ומתכננת דברים חדשים", sound: [262, 330, 392], color: "bg-gradient-to-br from-yellow-200 to-yellow-300" },
  ARTIST: { id: "artist", emoji: "👩‍🎨", name: "artist", hebrew: "אמנית", english: "Artist", description: "יוצרת ציורים ויצירות אמנות יפות", sound: [659, 784, 880], color: "bg-gradient-to-br from-purple-200 to-purple-300" },
  FARMER: { id: "farmer", emoji: "👩‍🌾", name: "farmer", hebrew: "חקלאית", english: "Farmer", description: "מגדלת ירקות ופירות בשדה", sound: [294, 370, 440], color: "bg-gradient-to-br from-green-300 to-green-400" },
  MUSICIAN: { id: "musician", emoji: "👩‍🎤", name: "musician", hebrew: "מוזיקאית", english: "Musician", description: "מנגנת ושרה שירים יפים", sound: [440, 523, 659], color: "bg-gradient-to-br from-pink-200 to-pink-300" },
  VETERINARIAN: { id: "veterinarian", emoji: "🩺", name: "veterinarian", hebrew: "וטרינרית", english: "Veterinarian", description: "מרפאה בעלי חיים ועוזרת להם", sound: [196, 247, 294], color: "bg-gradient-to-br from-teal-200 to-teal-300" },
  DENTIST: { id: "dentist", emoji: "🦷", name: "dentist", hebrew: "רופאת שיניים", english: "Dentist", description: "מטפלת בשיניים ושומרת עליהן", sound: [523, 622, 740], color: "bg-gradient-to-br from-cyan-200 to-cyan-300" },
};

export const ALL_PROFESSIONS = Object.values(PROFESSION_CONSTANTS);

export const PROFESSION_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  doctor: "רופאה",
  teacher: "מורה",
  firefighter: "כבאית",
  police: "שוטרת",
  chef: "טבחית",
  pilot: "טייסת",
  engineer: "מהנדסת",
  artist: "אמנית",
  farmer: "חקלאית",
  musician: "מוזיקאית",
  veterinarian: "וטרינרית",
  dentist: "רופאת שיניים",
};

export const PROFESSION_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
