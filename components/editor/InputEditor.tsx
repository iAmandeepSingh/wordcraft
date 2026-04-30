interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputEditor({ value, onChange }: Props) {
  return (
    <div className="relative">
      <textarea
        className="min-h-[220px] w-full rounded-2xl border border-slate-200 font-sans leading-6 p-4 pr-12 text-slate-900 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all dark:border-slate-800 dark:text-slate-100"
        placeholder="Paste or type your content here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="content"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-3 rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm border border-slate-200 dark:border-slate-700"
          title="Clear input"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
    </div>
  );
}
