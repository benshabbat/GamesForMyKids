import type { ModeCardProps } from '../types/ui';

export default function ModeCard({ onClick, icon, iconBgClass, title, description, emojis, badgeText, badgeClass }: ModeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="text-center">
        <div className={`w-20 h-20 ${iconBgClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-center gap-2 text-2xl mb-4">
          {emojis.map((e, i) => <span key={i}>{e}</span>)}
        </div>
        <div className={`${badgeClass} px-4 py-2 rounded-full text-sm font-bold`}>{badgeText}</div>
      </div>
    </div>
  );
}
