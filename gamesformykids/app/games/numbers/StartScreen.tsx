/**
 * ===============================================
 * StartScreen למספרים - גרסה חדשה ומשופרת!
 * ===============================================
 * 
 * 🚀 3 שורות במקום 150!
 * משתמש ב-AutoStartScreen החדש
 */

import AutoStartScreen from "@/components/shared/AutoStartScreen";
import { AutoStartScreenProps } from "@/lib/types/startScreen";

export default function StartScreen(props: Omit<AutoStartScreenProps, 'gameType' | 'gameId'>) {
  return <AutoStartScreen gameType="numbers" gameId="numbers" {...props} />;
}
