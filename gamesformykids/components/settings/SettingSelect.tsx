interface Props {
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SettingSelect({ label, description, value, options, onChange, disabled }: Props) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
