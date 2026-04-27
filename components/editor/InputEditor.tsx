interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputEditor({ value, onChange }: Props) {
  return (
    <div className="relative">
      <textarea
        className="min-h-[220px] w-full rounded-lg border border-gray-300 p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste or type your content here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-2 rounded-md bg-white p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          title="Clear input"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
    </div>
  );
}
