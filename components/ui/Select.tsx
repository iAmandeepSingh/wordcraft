type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export default function Select({
  value,
  onChange,
  options,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
