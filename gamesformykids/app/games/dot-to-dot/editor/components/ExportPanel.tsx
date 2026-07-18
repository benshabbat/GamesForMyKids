'use client';

interface Props {
  code: string;
  copied: boolean;
  disabled: boolean;
  onCopy: () => void;
}

export default function ExportPanel({ code, copied, disabled, onCopy }: Props) {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-indigo-200 font-semibold">קוד מיוצא</span>
        <button
          onClick={onCopy}
          disabled={disabled}
          className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-yellow-400 hover:bg-yellow-300 text-yellow-900 disabled:opacity-40 transition-all"
        >
          {copied ? '✅ הועתק' : '📋 העתק קוד'}
        </button>
      </div>
      <pre className="bg-black/40 text-indigo-100 text-xs rounded-xl p-4 overflow-x-auto whitespace-pre-wrap" dir="ltr">
        {code}
      </pre>
    </div>
  );
}
