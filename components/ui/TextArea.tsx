type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export default function TextArea({
  value,
  onChange,
  placeholder,
  rows = 6,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-none text-black rounded-md border border-gray-200 bg-white p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  );
}
