'use client';
import type { CraftProject } from '@/lib/constants/craftProjects';

interface Props {
  projects: CraftProject[];
  onSelect: (id: string) => void;
}

export default function CraftMenu({ projects, onSelect }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎨</div>
          <h1 className="text-3xl font-extrabold text-orange-800">מדריך יצירה</h1>
          <p className="text-orange-600 mt-1">בחר פרויקט ובצע אותו שלב אחר שלב!</p>
        </div>
        <div className="space-y-3">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`w-full bg-linear-to-br ${p.color} text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg active:scale-95 transition-transform`}
            >
              <span className="text-4xl">{p.emoji}</span>
              <span className="text-xl font-bold">{p.name}</span>
              <span className="mr-auto text-white/70 text-sm">{p.steps.length} שלבים</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
