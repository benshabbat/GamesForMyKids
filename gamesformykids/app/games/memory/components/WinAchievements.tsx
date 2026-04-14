import { useMemoryStore } from "../stores/useMemoryStore";

export default function WinAchievements() {
  const achievements = useMemoryStore((s) => s.getWinAchievements());

  if (achievements.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {achievements.map((a) => (
        <div key={a.id} className={`${a.bgColor} ${a.textColor} px-3 py-1 rounded-full text-sm font-bold`}>
          {a.label}
        </div>
      ))}
    </div>
  );
}
