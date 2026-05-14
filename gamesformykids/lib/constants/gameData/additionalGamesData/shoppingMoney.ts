import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SHOPPING_MONEY_CONSTANTS: Record<string, BaseGameItem> = {
  COIN_1: { name: "coin-1", hebrew: "אגורה", english: "Agora", emoji: "🪙", color: "bg-amber-600", sound: [440, 550, 660] },
  COIN_5: { name: "coin-5", hebrew: "5 אגורות", english: "5 Agorot", emoji: "🪙", color: "bg-amber-500", sound: [392, 494, 587] },
  COIN_10: { name: "coin-10", hebrew: "10 אגורות", english: "10 Agorot", emoji: "🪙", color: "bg-amber-400", sound: [349, 440, 523] },
  SHEKEL_1: { name: "shekel-1", hebrew: "שקל", english: "Shekel", emoji: "💰", color: "bg-yellow-500", sound: [294, 370, 440] },
  SHEKEL_5: { name: "shekel-5", hebrew: "5 שקלים", english: "5 Shekels", emoji: "💰", color: "bg-yellow-600", sound: [330, 415, 494] },
  SHEKEL_10: { name: "shekel-10", hebrew: "10 שקלים", english: "10 Shekels", emoji: "💵", color: "bg-green-500", sound: [262, 330, 392] },
  SHOPPING_CART: { name: "shopping-cart", hebrew: "עגלת קניות", english: "Shopping Cart", emoji: "🛒", color: "bg-blue-500", sound: [523, 659, 784] },
  CASHIER: { name: "cashier", hebrew: "קופאי", english: "Cashier", emoji: "👨‍💼", color: "bg-purple-500", sound: [587, 698, 831] },
  RECEIPT: { name: "receipt", hebrew: "קבלה", english: "Receipt", emoji: "🧾", color: "bg-white", sound: [196, 247, 294] },
  CREDIT_CARD: { name: "credit-card", hebrew: "כרטיס אשראי", english: "Credit Card", emoji: "💳", color: "bg-blue-600", sound: [277, 349, 415] },
};

export const SHOPPING_MONEY_ITEMS = createItemsList(SHOPPING_MONEY_CONSTANTS);
export const SHOPPING_MONEY_PRONUNCIATIONS = createPronunciationDictionary(SHOPPING_MONEY_CONSTANTS);
export const SHOPPING_MONEY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק קניות וכסף",
  subTitle: "למד על כסף, מחירים וקניות!",
  description: "הכן לעולם הכלכלי היומיומי!",
  instructions: "לחץ על המטבע או הפריט הנכון",
};
