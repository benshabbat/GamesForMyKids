import AutoStartScreen from "@/components/shared/AutoStartScreen";
import { AutoStartScreenProps } from "@/lib/types/startScreen";

export default function StartScreen(props: Omit<AutoStartScreenProps, 'gameType'>) {
  return <AutoStartScreen gameType="math" {...props} />;
}
