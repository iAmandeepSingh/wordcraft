import Loader from "@/components/ui/Loader";

interface Props {
  value: string;
  isLoading?: boolean;
}

export default function OutputEditor({ value, isLoading }: Props) {
  return (
    <div className="relative min-h-[220px] w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
      {isLoading && <Loader />}

      {!isLoading && (
        <pre className="whitespace-pre-wrap text-gray-800">
          {value || "AI output will appear here..."}
        </pre>
      )}
    </div>
  );
}
