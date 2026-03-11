interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputEditor({ value, onChange }: Props) {
  return (
    <textarea
      className="min-h-[220px] w-full rounded-lg border border-gray-300 p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Paste or type your content here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
